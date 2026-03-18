import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { supabase } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get("limit") || "50");
  const employer = url.searchParams.get("employer") || "";
  const band = url.searchParams.get("band") || "";
  
  let query = supabase
    .from("tls_scores_finserv")
    .select("crd_number,advisor_name,current_employer,tls_score,tls_band,srda_confidence,signal_count,alert_triggered,alert_reason,scored_at,license_signal,employment_signal,stress_event_signal,comp_gap_signal")
    .order("tls_score", { ascending: false })
    .limit(limit);
  
  if (employer) query = query.ilike("current_employer", `%${employer}%`);
  if (band) query = query.eq("tls_band", band);
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Summary stats
  const { count: total } = await supabase.from("tls_scores_finserv").select("*", { count: "exact", head: true });
  const { count: alerts } = await supabase.from("tls_scores_finserv").select("*", { count: "exact", head: true }).eq("alert_triggered", true);
  const { count: highRisk } = await supabase.from("tls_scores_finserv").select("*", { count: "exact", head: true }).eq("tls_band", "HIGH");
  
  return NextResponse.json({ data, stats: { total, alerts, highRisk }, refreshed: new Date().toISOString() });
}

export async function POST(req: Request) {
  // CSV export
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { data } = await supabase
    .from("tls_scores_finserv")
    .select("crd_number,advisor_name,current_employer,tls_score,tls_band,srda_confidence,signal_count,alert_triggered,scored_at")
    .order("tls_score", { ascending: false })
    .limit(1000);
  
  const csv = [
    "CRD,Name,Employer,TLS Score,Band,Confidence,Signals,Alert,Scored At",
    ...(data || []).map(r => `${r.crd_number},${r.advisor_name},${r.current_employer},${r.tls_score},${r.tls_band},${r.srda_confidence},${r.signal_count},${r.alert_triggered},${r.scored_at}`)
  ].join("\n");
  
  return new Response(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": "attachment; filename=flightrisk-export.csv" } });
}
