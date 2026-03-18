'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TLSRecord {
  crd_number: string; advisor_name: string; current_employer: string;
  tls_score: number; tls_band: string; srda_confidence: number;
  signal_count: number; alert_triggered: boolean; alert_reason: string; scored_at: string;
}

const BAND_COLORS: Record<string, string> = { HIGH: "#FF4444", MEDIUM: "#FF6B35", LOW: "#00E5FF", MINIMAL: "#00FF88" };

export default function Dashboard() {
  const [data, setData] = useState<TLSRecord[]>([]);
  const [stats, setStats] = useState<{total: number; alerts: number; highRisk: number}>({total: 0, alerts: 0, highRisk: 0});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [band, setBand] = useState("");
  const [refreshed, setRefreshed] = useState("");
  const router = useRouter();

  async function fetchData() {
    setLoading(true);
    const params = new URLSearchParams({ limit: "100" });
    if (search) params.set("employer", search);
    if (band) params.set("band", band);
    const res = await fetch(`/api/data?${params}`);
    if (res.status === 401) { router.push("/login"); return; }
    const json = await res.json();
    setData(json.data || []); setStats(json.stats || {}); setRefreshed(json.refreshed || "");
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, [search, band]);

  async function exportCSV() {
    const res = await fetch("/api/data", { method: "POST" });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "flightrisk-export.csv"; a.click();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050810" }}>
      <nav style={{ borderBottom: "1px solid #1E2235", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 900, fontSize: "18px", color: "#00E5FF" }}>FlightRisk</div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <button onClick={exportCSV} style={{ background: "transparent", border: "1px solid #1E2235", color: "#6B7280", padding: "6px 16px", cursor: "pointer", fontSize: "12px" }}>Export CSV</button>
          <button onClick={logout} style={{ background: "transparent", border: "none", color: "#6B7280", cursor: "pointer", fontSize: "12px" }}>Sign Out</button>
        </div>
      </nav>

      <div style={{ padding: "32px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Total Advisors", value: stats.total?.toLocaleString() || "—" },
            { label: "Active Alerts", value: stats.alerts?.toLocaleString() || "—", color: "#FF4444" },
            { label: "High Risk", value: stats.highRisk?.toLocaleString() || "—", color: "#FF6B35" },
            { label: "Data Refreshed", value: refreshed ? new Date(refreshed).toLocaleDateString() : "—" },
          ].map(s => (
            <div key={s.label} style={{ background: "#080C1A", border: "1px solid #1E2235", padding: "20px 24px" }}>
              <div style={{ fontSize: "28px", fontWeight: 900, color: s.color || "#E8EAF0" }}>{s.value}</div>
              <div style={{ fontSize: "10px", color: "#6B7280", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <input placeholder="Search employer..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: "#080C1A", border: "1px solid #1E2235", color: "#E8EAF0", padding: "10px 16px", fontSize: "13px", outline: "none", width: "300px" }} />
          <select value={band} onChange={e => setBand(e.target.value)}
            style={{ background: "#080C1A", border: "1px solid #1E2235", color: "#E8EAF0", padding: "10px 16px", fontSize: "13px", outline: "none" }}>
            <option value="">All Bands</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
            <option value="MINIMAL">MINIMAL</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ border: "1px solid #1E2235", background: "#080C1A", overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1E2235" }}>
                {["CRD", "Advisor", "Employer", "TLS Score", "Band", "Confidence", "Signals", "Alert", "Scored"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#6B7280", letterSpacing: "1px", fontSize: "10px", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>Loading data...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={9} style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>No records found</td></tr>
              ) : data.map((r, i) => (
                <tr key={r.crd_number} style={{ borderBottom: "1px solid #0F1420", background: i % 2 === 0 ? "#080C1A" : "#0A0E1C" }}>
                  <td style={{ padding: "10px 16px", color: "#6B7280" }}>{r.crd_number}</td>
                  <td style={{ padding: "10px 16px" }}>{r.advisor_name}</td>
                  <td style={{ padding: "10px 16px", color: "#9CA3AF" }}>{r.current_employer}</td>
                  <td style={{ padding: "10px 16px", fontWeight: 700, color: BAND_COLORS[r.tls_band] || "#E8EAF0" }}>{r.tls_score}</td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{ background: (BAND_COLORS[r.tls_band] || "#1E2235") + "20", color: BAND_COLORS[r.tls_band] || "#6B7280", padding: "2px 8px", fontSize: "10px", letterSpacing: "1px" }}>{r.tls_band}</span>
                  </td>
                  <td style={{ padding: "10px 16px", color: "#9CA3AF" }}>{r.srda_confidence?.toFixed(2)}</td>
                  <td style={{ padding: "10px 16px", color: "#9CA3AF" }}>{r.signal_count}</td>
                  <td style={{ padding: "10px 16px" }}>
                    {r.alert_triggered ? <span style={{ color: "#FF4444", fontSize: "10px" }}>⚠ ALERT</span> : <span style={{ color: "#4B5563" }}>—</span>}
                  </td>
                  <td style={{ padding: "10px 16px", color: "#6B7280" }}>{r.scored_at ? new Date(r.scored_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: "12px", fontSize: "11px", color: "#4B5563" }}>
          Showing {data.length} of {stats.total?.toLocaleString()} records · Powered by APEX TLS Engine v1.0
        </div>
      </div>
    </div>
  );
}
