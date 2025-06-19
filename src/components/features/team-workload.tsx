"use client";
import { SectionWrapper } from "@/components/section-wrapper";
import { Icons } from "@/components/icons";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamMemberWorkload {
  name: string;
  tasksAssigned: number;
  capacity: "Overload" | "Normal" | "Under Capacity";
  maxCapacity: number;
}

const workloadData: TeamMemberWorkload[] = [
  { name: "Alice W.", tasksAssigned: 12, capacity: "Overload", maxCapacity: 10 },
  { name: "Bob B.", tasksAssigned: 7, capacity: "Normal", maxCapacity: 10 },
  { name: "Carol D.", tasksAssigned: 9, capacity: "Normal", maxCapacity: 10 },
  { name: "David C.", tasksAssigned: 4, capacity: "Under Capacity", maxCapacity: 8 },
  { name: "Eve H.", tasksAssigned: 11, capacity: "Overload", maxCapacity: 9 },
  { name: "Frank F.", tasksAssigned: 8, capacity: "Normal", maxCapacity: 8 },
];

const capacityColors = {
  "Overload": "hsl(var(--destructive))",
  "Normal": "hsl(var(--chart-1))", // Teal
  "Under Capacity": "hsl(var(--chart-2))", // Gray
};

const chartConfig = {
  tasksAssigned: { label: "Tasks Assigned" },
  // Add capacity colors to config if needed for legend or specific tooltips
  ...Object.fromEntries(
    Object.entries(capacityColors).map(([key, value]) => [key, { label: key, color: value }])
  ),
} satisfies ChartConfig;


export function TeamWorkload() {
  return (
    <SectionWrapper title="Team Capacity & Workload" icon={Icons.Team}>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-md font-medium">Task Assignments per Team Member</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] p-2">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <BarChart data={workloadData} margin={{ top: 5, right: 5, left: -25, bottom: 45 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={10} 
                dy={10} 
                interval={0} 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as TeamMemberWorkload;
                    return (
                      <div className="bg-popover text-popover-foreground p-2 rounded-md shadow-md border border-border">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm">Tasks: {data.tasksAssigned}</p>
                        <p className="text-sm">Status: 
                          <Badge 
                            variant={data.capacity === "Overload" ? "destructive" : data.capacity === "Normal" ? "default" : "secondary"}
                            className={`ml-1 text-xs ${data.capacity === "Normal" ? 'bg-accent text-accent-foreground' : ''}`}
                          >
                            {data.capacity}
                          </Badge>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="tasksAssigned" radius={[4, 4, 0, 0]} barSize={30}>
                {workloadData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={capacityColors[entry.capacity]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground mb-1">Status Overview:</h4>
        <div className="flex flex-wrap gap-2">
          {workloadData.map(member => (
            <Badge
              key={member.name}
              variant={member.capacity === "Overload" ? "destructive" : member.capacity === "Normal" ? "default" : "secondary"}
              className={`text-xs ${member.capacity === "Normal" ? 'bg-accent text-accent-foreground' : ''}`}
            >
              {member.name}: {member.capacity} ({member.tasksAssigned}/{member.maxCapacity})
            </Badge>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
