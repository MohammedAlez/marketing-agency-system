"use client";
import React, { useState, useMemo } from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Icons } from "@/components/icons";
import { KpiCard } from "@/components/kpi-card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const allClientData = {
  "Innovate Corp": {
    roiData: [
      { month: "Jan", roi: 2.5, revenue: 10000, spend: 4000 },
      { month: "Feb", roi: 2.8, revenue: 12000, spend: 4285 },
      { month: "Mar", roi: 3.1, revenue: 15000, spend: 4838 },
      { month: "Apr", roi: 2.9, revenue: 14000, spend: 4827 },
      { month: "May", roi: 3.5, revenue: 18000, spend: 5142 },
      { month: "Jun", roi: 3.2, revenue: 16000, spend: 5000 },
    ],
    kpis: { totalRevenue: 85000, totalSpend: 28092, netRoi: 202.58 }
  },
  "Synergy Solutions": {
    roiData: [
      { month: "Jan", roi: 1.8, revenue: 8000, spend: 4444 },
      { month: "Feb", roi: 2.0, revenue: 9000, spend: 4500 },
      { month: "Mar", roi: 2.2, revenue: 11000, spend: 5000 },
      { month: "Apr", roi: 1.9, revenue: 9500, spend: 5000 },
      { month: "May", roi: 2.5, revenue: 13000, spend: 5200 },
      { month: "Jun", roi: 2.3, revenue: 11500, spend: 5000 },
    ],
    kpis: { totalRevenue: 62000, totalSpend: 29144, netRoi: 112.73 }
  },
  "Momentum Inc.": {
    roiData: [
      { month: "Jan", roi: 4.0, revenue: 20000, spend: 5000 },
      { month: "Feb", roi: 4.2, revenue: 22000, spend: 5238 },
      { month: "Mar", roi: 3.8, revenue: 19000, spend: 5000 },
      { month: "Apr", roi: 4.5, revenue: 25000, spend: 5555 },
      { month: "May", roi: 4.1, revenue: 23000, spend: 5609 },
      { month: "Jun", roi: 3.9, revenue: 21000, spend: 5384 },
    ],
    kpis: { totalRevenue: 130000, totalSpend: 31786, netRoi: 308.99 }
  }
};

const clients = Object.keys(allClientData);

const chartConfig = {
  roi: { label: "ROI", color: "hsl(var(--chart-1))" }, // Teal
  revenue: { label: "Revenue", color: "hsl(var(--chart-2))" }, // Gray
  spend: { label: "Spend", color: "hsl(var(--chart-3))" }, // Orange-ish
} satisfies ChartConfig;

export function ClientRoi() {
  const [selectedClient, setSelectedClient] = useState<string>(clients[0]);

  const currentClientData = useMemo(() => {
    return allClientData[selectedClient as keyof typeof allClientData] || allClientData[clients[0]];
  }, [selectedClient]);

  return (
    <SectionWrapper
      title="Live Client ROI Dashboard"
      icon={Icons.ROI}
      headerActions={
        <Select value={selectedClient} onValueChange={setSelectedClient}>
          <SelectTrigger className="w-[180px] bg-background text-sm">
            <SelectValue placeholder="Select Client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map(client => (
              <SelectItem key={client} value={client} className="text-sm">{client}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KpiCard title="Total Revenue" value={`$${currentClientData.kpis.totalRevenue.toLocaleString()}`} icon={Icons.Revenue} valueClassName="text-accent"/>
        <KpiCard title="Total Ad Spend" value={`$${currentClientData.kpis.totalSpend.toLocaleString()}`} icon={Icons.Revenue} />
        <KpiCard title="Net ROI" value={`${currentClientData.kpis.netRoi.toFixed(2)}%`} icon={Icons.ROI} valueClassName="text-accent" />
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-md font-medium">Monthly Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] p-2">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <LineChart data={currentClientData.roiData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="month" tickLine={false} axisLine={false} dy={5} />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" tickLine={false} axisLine={false} dx={-5} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" tickFormatter={(value) => `$${(value/1000)}k`} tickLine={false} axisLine={false} dx={5} />
              <Tooltip content={<ChartTooltipContent indicator="line" />} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="roi" stroke="var(--color-roi)" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="spend" stroke="var(--color-spend)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
