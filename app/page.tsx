import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#050810" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #1E2235", padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 900, fontSize: "22px", letterSpacing: "-0.5px", color: "#00E5FF" }}>FlightRisk</div>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link href="/login" style={{ color: "#9CA3AF", textDecoration: "none", fontSize: "14px" }}>Sign In</Link>
          <Link href="/signup" style={{ background: "#00E5FF", color: "#050810", padding: "8px 20px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>Get Access — $4,000/mo</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "100px 48px 60px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#00E5FF", textTransform: "uppercase", marginBottom: "20px" }}>HR & Workforce Intelligence</div>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "24px" }}>
          HR Attrition Signal Intelligence
        </h1>
        <p style={{ fontSize: "18px", color: "#9CA3AF", maxWidth: "580px", lineHeight: 1.7, marginBottom: "40px" }}>
          Real-time departure signals for financial services professionals. Powered by the APEX TLS Engine with 86% predictive accuracy.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link href="/signup" style={{ background: "#00E5FF", color: "#050810", padding: "16px 36px", fontWeight: 900, fontSize: "15px", textDecoration: "none", letterSpacing: "1px" }}>
            START SUBSCRIPTION — $4,000/MO
          </Link>
          <Link href="/login" style={{ border: "1px solid #1E2235", color: "#9CA3AF", padding: "16px 36px", fontSize: "15px", textDecoration: "none" }}>
            Sign In
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ borderTop: "1px solid #1E2235", borderBottom: "1px solid #1E2235", padding: "40px 48px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
          <div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#00E5FF" }}>86%</div>
            <div style={{ fontSize: "12px", color: "#6B7280", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>Predictive Accuracy</div>
          </div>
          <div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#00E5FF" }}>50K+</div>
            <div style={{ fontSize: "12px", color: "#6B7280", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>Advisors Tracked</div>
          </div>
          <div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#00E5FF" }}>$${p['price']:,}</div>
            <div style={{ fontSize: "12px", color: "#6B7280", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>Per Month</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#6B7280", textTransform: "uppercase", marginBottom: "40px" }}>What's Included</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}><span style={{ color: "#00E5FF", fontSize: "18px" }}>✓</span> TLS Score Dashboard</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}><span style={{ color: "#00E5FF", fontSize: "18px" }}>✓</span> Advisor Departure Alerts</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}><span style={{ color: "#00E5FF", fontSize: "18px" }}>✓</span> Firm-Level Attrition Map</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}><span style={{ color: "#00E5FF", fontSize: "18px" }}>✓</span> Signal Source Breakdown</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}><span style={{ color: "#00E5FF", fontSize: "18px" }}>✓</span> CSV Data Export</li>
        </ul>
      </div>

      {/* CTA */}
      <div style={{ borderTop: "1px solid #1E2235", padding: "60px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h2 style={{ fontWeight: 900, fontSize: "32px", marginBottom: "16px" }}>Ready to start?</h2>
          <p style={{ color: "#6B7280", marginBottom: "32px" }}>No free trial. Immediate access upon payment.</p>
          <Link href="/signup" style={{ background: "#00E5FF", color: "#050810", padding: "16px 48px", fontWeight: 900, fontSize: "16px", textDecoration: "none", display: "inline-block" }}>
            Subscribe — $4,000/month
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #1E2235", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "12px", color: "#4B5563" }}>© 2026 FlightRisk · A Huit Data Ventures Company</div>
        <div style={{ fontSize: "12px", color: "#4B5563" }}>data.huit.ai</div>
      </div>
    </div>
  );
}
