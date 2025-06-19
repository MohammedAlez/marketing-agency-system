"use client";
import { SectionWrapper } from "@/components/section-wrapper";
import { Icons } from "@/components/icons";
import { KpiCard } from "@/components/kpi-card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const complianceData = {
  kpi: { complianceRate: 92.5, overdueTasks: 3 },
  chartData: [
    { taskType: "Reporting", compliant: 95, nonCompliant: 5 },
    { taskType: "Comms", compliant: 88, nonCompliant: 12 },
    { taskType: "Setup", compliant: 98, nonCompliant: 2 },
    { taskType: "Review", compliant: 90, nonCompliant: 10 },
    { taskType: "Billing", compliant: 100, nonCompliant: 0 },
  ],
  overdueTasks: [
    { id: "t1", name: "Monthly Report - Client A", client: "Innovate Corp", dueDate: "2024-07-30", assignee: "Alice W.", priority: "High" },
    { id: "t2", name: "Follow-up Email - Client B", client: "Synergy Solutions", dueDate: "2024-07-29", assignee: "Bob B.", priority: "Medium" },
    { id: "t3", name: "Campaign Review - Client C", client: "Momentum Inc.", dueDate: "2024-07-28", assignee: "Carol D.", priority: "High" },
    { id: "t4", name: "Invoice Prep - Client D", client: "Apex Enterprises", dueDate: "2024-08-01", assignee: "David C.", priority: "Low" },
  ],
};

const chartConfig = {
  compliant: { label: "Compliant", color: "hsl(var(--chart-1))" }, // Teal
  nonCompliant: { label: "Non-Compliant", color: "hsl(var(--destructive))" }, // Red
} satisfies ChartConfig;

export function SopCompliance() {
  return (
    <SectionWrapper title="SOP Compliance & Service Delivery" icon={Icons.SOP}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <KpiCard
          title="Overall SOP Compliance"
          value={`${complianceData.kpi.complianceRate}%`}
          icon={Icons.Success}
          description="Across all standard operating procedures"
          valueClassName="text-accent"
        />
        <KpiCard
          title="Overdue Critical Tasks"
          value={complianceData.kpi.overdueTasks.toString()}
          icon={Icons.Overdue}
          description="Tasks past their due date"
          valueClassName="text-destructive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-md font-medium">Compliance by Task Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] p-2">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <BarChart data={complianceData.chartData} layout="vertical" margin={{ right: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="taskType" type="category" width={80} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent hideLabel />} />
                <Legend />
                <Bar dataKey="compliant" stackId="a" fill="var(--color-compliant)" radius={[0, 4, 4, 0]} barSize={15} />
                <Bar dataKey="nonCompliant" stackId="a" fill="var(--color-nonCompliant)" radius={[0, 4, 4, 0]} barSize={15} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-md font-medium">Pending & Overdue Tasks</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[250px] pr-3">
              <ul className="space-y-3 p-3">
                {complianceData.overdueTasks.map(task => (
                  <li key={task.id} className="flex items-center justify-between p-3 bg-background rounded-md border border-border hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium">{task.name}</p>
                      <p className="text-xs text-muted-foreground">{task.client} - Due: {task.dueDate}</p>
                    </div>
                    <Badge variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "secondary" : "outline"} className="text-xs">
                      {task.priority}
                    </Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
