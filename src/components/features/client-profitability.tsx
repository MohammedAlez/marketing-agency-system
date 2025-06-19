"use client";
import React, { useState, useMemo } from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Icons } from "@/components/icons";
import { KpiCard } from "@/components/kpi-card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const profitabilityData = {
  clients: [
    { name: "Innovate Corp", profit: 15000, revenue: 85000, cost: 70000 },
    { name: "Synergy Solutions", profit: 8000, revenue: 62000, cost: 54000 },
    { name: "Momentum Inc.", profit: 25000, revenue: 130000, cost: 105000 },
    { name: "Apex Enterprises", profit: 5000, revenue: 40000, cost: 35000 },
    { name: "Starlight Group", profit: 12000, revenue: 75000, cost: 63000 },
  ],
  kpis: {
    totalProfit: 55000,
    mostProfitableClient: "Momentum Inc.",
    avgProfitMargin: 16.5, // Example: (Total Profit / Total Revenue) * 100
  }
};

const PIE_COLORS = [
  "hsl(var(--chart-1))", // Teal
  "hsl(var(--chart-2))", // Gray
  "hsl(var(--chart-3))", // Orange-ish
  "hsl(var(--chart-4))", // Purple-ish
  "hsl(var(--chart-5))", // Pink-ish
];

const chartConfigPie = profitabilityData.clients.reduce((acc, client, index) => {
  acc[client.name] = { label: client.name, color: PIE_COLORS[index % PIE_COLORS.length] };
  return acc;
}, {} as ChartConfig);


const chartConfigBar = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
  cost: { label: "Cost", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

export function ClientProfitability() {
  const [timePeriod, setTimePeriod] = useState("last-quarter");

  // Memoize for potential future data changes based on timePeriod
  const currentData = useMemo(() => profitabilityData, [timePeriod]);


  return (
    <SectionWrapper
      title="Client Profitability Insights"
      icon={Icons.Profitability}
      headerActions={
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px] bg-background text-sm">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-month" className="text-sm">Last Month</SelectItem>
            <SelectItem value="last-quarter" className="text-sm">Last Quarter</SelectItem>
            <SelectItem value="year-to-date" className="text-sm">Year to Date</SelectItem>
          </SelectContent>
        </Select>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KpiCard title="Total Profit" value={`$${currentData.kpis.totalProfit.toLocaleString()}`} icon={Icons.Revenue} valueClassName="text-accent" />
        <KpiCard title="Avg. Profit Margin" value={`${currentData.kpis.avgProfitMargin.toFixed(1)}%`} icon={Icons.ROI}/>
        <KpiCard title="Most Profitable" value={currentData.kpis.mostProfitableClient} icon={Icons.Dashboard}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-md font-medium">Profit Distribution by Client</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] p-2 flex items-center justify-center">
            <ChartContainer config={chartConfigPie} className="w-full max-w-xs aspect-square">
              <PieChart>
                <Tooltip 
                  cursor={{ fill: "hsl(var(--muted))" }} 
                  content={<ChartTooltipContent hideLabel nameKey="name" />} 
                />
                <Pie
                  data={currentData.clients}
                  dataKey="profit"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text x={x} y={y} fill="hsl(var(--foreground))" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs">
                        {name} ({(percent * 100).toFixed(0)}%)
                      </text>
                    );
                  }}
                >
                  {currentData.clients.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-md font-medium">Revenue vs. Cost by Client</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] p-2">
            <ChartContainer config={chartConfigBar} className="w-full h-full">
              <BarChart data={currentData.clients} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="name" tickFormatter={(value) => value.substring(0,3)} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `$${(value/1000)}k`} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} barSize={15} />
                <Bar dataKey="cost" fill="var(--color-cost)" radius={[4, 4, 0, 0]} barSize={15} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}

