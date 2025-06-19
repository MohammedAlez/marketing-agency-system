"use client";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  description?: string | React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  valueClassName?: string;
}

export const KpiCard = ({ title, value, description, icon: Icon, className, valueClassName }: KpiCardProps) => {
  return (
    <Card className={cn("shadow-sm hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
        {description && <div className="text-xs text-muted-foreground pt-1">{description}</div>}
      </CardContent>
    </Card>
  );
};
