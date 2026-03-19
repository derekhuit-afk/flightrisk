import type { Metadata } from "next";
import "./globals.css";
import AgentWidget from '@/components/AgentWidget';

export const metadata: Metadata = {
  title: "FlightRisk — HR Attrition Signal Intelligence",
  description: "Real-time departure signals for financial services professionals. Powered by the APEX TLS Engine wit",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#050810", color: "#E8EAF0", fontFamily: "monospace" }}>
        {children}
            <AgentWidget />
    </body>
    </html>
  );
}
