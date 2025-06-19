"use client";
import { SectionWrapper } from "@/components/section-wrapper";
import { Icons } from "@/components/icons";
import { KpiCard } from "@/components/kpi-card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const automationData = {
  kpi: { totalAutomations: 1256, totalTimeSavedHours: 320 },
  log: [
    { id: "a1", name: "Daily Report Generation", timestamp: "2024-07-30 08:00", status: "Success", details: "Generated for 15 clients" },
    { id: "a2", name: "Lead Nurturing Email Sequence", timestamp: "2024-07-30 07:30", status: "Success", details: "Sent 56 emails" },
    { id: "a3", name: "Social Media Posting - Client X", timestamp: "2024-07-30 07:00", status: "Failed", details: "API connection error" },
    { id: "a4", name: "Keyword Rank Tracking", timestamp: "2024-07-29 23:00", status: "Success", details: "Updated 250 keywords" },
    { id: "a5", name: "Ad Spend Optimization", timestamp: "2024-07-29 18:00", status: "Success", details: "Adjusted bids for 3 campaigns" },
    { id: "a6", name: "New Client Slack Welcome", timestamp: "2024-07-29 15:30", status: "Success", details: "Welcomed Apex Enterprises" },
  ],
};

export function AutomationLog() {
  return (
    <SectionWrapper title="Automation Insights" icon={Icons.Automation}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <KpiCard
          title="Total Automations Run (Last 30d)"
          value={automationData.kpi.totalAutomations.toLocaleString()}
          icon={Icons.BarChart}
        />
        <KpiCard
          title="Estimated Time Saved (Last 30d)"
          value={`${automationData.kpi.totalTimeSavedHours} hrs`}
          icon={Icons.Time}
          description="Based on manual effort replacement"
          valueClassName="text-accent"
        />
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-md font-medium">Recent Automation Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[300px] pr-3">
            <ul className="space-y-3 p-3">
              {automationData.log.map(item => (
                <li key={item.id} className="flex items-start justify-between p-3 bg-background rounded-md border border-border hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
                  </div>
                  <Badge variant={item.status === "Success" ? "default" : "destructive"} className={item.status === "Success" ? "bg-accent text-accent-foreground" : ""}>
                    {item.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
