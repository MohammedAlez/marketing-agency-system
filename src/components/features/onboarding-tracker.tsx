
"use client";
import { SectionWrapper } from "@/components/section-wrapper";
import { Icons } from "@/components/icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface OnboardingTask {
  id: string;
  clientName: string;
  clientLogo?: string;
  status: "Pending" | "In Progress" | "Completed" | "Delayed" | "On Hold";
  progress: number;
  manager: string;
  managerAvatar?: string;
  lastUpdate: string;
}

const onboardingData: OnboardingTask[] = [
  { id: "1", clientName: "Innovate Corp", clientLogo: "https://placehold.co/40x40/7F7F7F/FFFFFF.png?text=IC", status: "In Progress", progress: 60, manager: "Alice Wonderland", managerAvatar: "https://placehold.co/32x32/A9A9A9/FFFFFF.png?text=AW", lastUpdate: "2024-07-28" },
  { id: "2", clientName: "Synergy Solutions", clientLogo: "https://placehold.co/40x40/8A2BE2/FFFFFF.png?text=SS", status: "Completed", progress: 100, manager: "Bob The Builder", managerAvatar: "https://placehold.co/32x32/D3D3D3/FFFFFF.png?text=BB", lastUpdate: "2024-07-25" },
  { id: "3", clientName: "Momentum Inc.", clientLogo: "https://placehold.co/40x40/FF8C00/FFFFFF.png?text=MI", status: "Delayed", progress: 30, manager: "Carol Danvers", managerAvatar: "https://placehold.co/32x32/C0C0C0/FFFFFF.png?text=CD", lastUpdate: "2024-07-29" },
  { id: "4", clientName: "Apex Enterprises", clientLogo: "https://placehold.co/40x40/008080/FFFFFF.png?text=AE", status: "Pending", progress: 0, manager: "David Copperfield", managerAvatar: "https://placehold.co/32x32/B0B0B0/FFFFFF.png?text=DC", lastUpdate: "2024-07-30" },
  { id: "5", clientName: "Starlight Group", clientLogo: "https://placehold.co/40x40/FFD700/000000.png?text=SG", status: "On Hold", progress: 15, manager: "Eve Harrington", managerAvatar: "https://placehold.co/32x32/E0E0E0/FFFFFF.png?text=EH", lastUpdate: "2024-07-22" },
];

const statusColors: Record<OnboardingTask["status"], string> = {
  "Pending": "bg-gray-500",
  "In Progress": "bg-blue-500",
  "Completed": "bg-green-500",
  "Delayed": "bg-red-500",
  "On Hold": "bg-yellow-500 text-black",
};


export function OnboardingTracker() {
  return (
    <SectionWrapper title="Onboarding Tracker" icon={Icons.Onboarding} contentClassName="p-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[150px]">Progress</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead className="text-right">Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {onboardingData.map((task) => (
              <TableRow key={task.id} className="hover:bg-muted/50 transition-colors">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={task.clientLogo || `https://placehold.co/40x40.png?text=${task.clientName.substring(0,1)}`} alt={task.clientName} data-ai-hint="company logo" />
                      <AvatarFallback>{task.clientName.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{task.clientName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={task.status === "Completed" ? "default" : task.status === "Delayed" ? "destructive" : "secondary"}
                    className={cn(
                      task.status === "Completed" && "bg-accent text-accent-foreground",
                      task.status === "In Progress" && "bg-blue-500/20 text-blue-700 border-blue-500/30",
                      task.status === "Pending" && "bg-slate-500/20 text-slate-700 border-slate-500/30",
                      task.status === "On Hold" && "bg-amber-500/20 text-amber-700 border-amber-500/30",
                    )}
                  >
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Progress value={task.progress} aria-label={`${task.clientName} onboarding progress ${task.progress}%`} className="h-2" indicatorClassName={
                      task.status === "Delayed" ? "bg-destructive" : 
                      task.status === "Completed" ? "bg-accent" : 
                      task.status === "In Progress" ? "bg-blue-500" : "bg-primary"
                    }/>
                    <span className="text-xs text-muted-foreground">{task.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={task.managerAvatar || `https://placehold.co/32x32.png?text=${task.manager.substring(0,1)}`} alt={task.manager} data-ai-hint="person avatar" />
                      <AvatarFallback>{task.manager.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.manager}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">{task.lastUpdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SectionWrapper>
  );
}
