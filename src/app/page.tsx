
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { OnboardingTracker } from "@/components/features/onboarding-tracker";
import { SopCompliance } from "@/components/features/sop-compliance";
import { ClientRoi } from "@/components/features/client-roi";
import { AutomationLog } from "@/components/features/automation-log";
import { TeamWorkload } from "@/components/features/team-workload";
import { ClientProfitability } from "@/components/features/client-profitability";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AgencyData {
  name: string;
  logoUrl: string;
}

const defaultAgency: AgencyData = {
  name: "Agency Insights Hub",
  logoUrl: "", // Empty string triggers default SVG logo in SidebarNav
};

async function getAgencyData(agencyId: string): Promise<AgencyData> {
  if (!agencyId || agencyId === "default") {
    return defaultAgency;
  }
  try {
    const agencyDocRef = doc(db, "agencies", agencyId);
    const agencyDocSnap = await getDoc(agencyDocRef);

    if (agencyDocSnap.exists()) {
      const data = agencyDocSnap.data();
      return {
        name: data.name || defaultAgency.name,
        logoUrl: data.logoUrl || defaultAgency.logoUrl,
      };
    } else {
      console.warn(`Agency with ID "${agencyId}" not found. Using default.`);
      return defaultAgency;
    }
  } catch (error) {
    console.error("Error fetching agency data:", error);
    return defaultAgency;
  }
}

export default async function DashboardPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const agencyId = typeof searchParams?.id === 'string' ? searchParams.id : "default";
  const currentAgency = await getAgencyData(agencyId);

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" side="left" className="border-r border-sidebar-border">
        <SidebarNav agencyName={currentAgency.name} agencyLogoUrl={currentAgency.logoUrl} />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <h1 className="text-lg font-semibold text-foreground hidden md:block truncate" title={currentAgency.name}>
            {currentAgency.name}
          </h1>
          <div className="relative flex-1 md:ml-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search dashboard..."
              className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[320px] focus-visible:ring-primary"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            <div id="onboarding-tracker">
              <OnboardingTracker />
            </div>
            <div id="sop-compliance">
              <SopCompliance />
            </div>
            <div id="client-roi" className="lg:col-span-1">
              <ClientRoi />
            </div>
            <div id="automation-log">
              <AutomationLog />
            </div>
            <div id="team-workload">
              <TeamWorkload />
            </div>
            <div id="client-profitability">
              <ClientProfitability />
            </div>
          </div>
        </main>
        <footer className="border-t py-4 px-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {currentAgency.name}. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
