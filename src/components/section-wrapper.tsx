import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import React from "react";

interface SectionWrapperProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerActions?: React.ReactNode;
}

export const SectionWrapper = ({ title, icon: Icon, children, className, contentClassName, headerActions }: SectionWrapperProps) => {
  return (
    <Card className={cn("flex flex-col h-full shadow-lg rounded-xl overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-4 px-5 bg-card border-b">
        <div className="flex items-center space-x-3">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          <CardTitle className="text-base font-semibold text-foreground">{title}</CardTitle>
        </div>
        {headerActions && <div className="ml-auto">{headerActions}</div>}
      </CardHeader>
      <CardContent className={cn("flex-grow p-5 overflow-y-auto", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};
