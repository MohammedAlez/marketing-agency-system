
"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons, Logo, IconKey } from "@/components/icons";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, LogOut } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: IconKey;
  segment?: string;
}

const navItems: NavItem[] = [
  { href: "#onboarding-tracker", label: "Onboarding Tracker", icon: "Onboarding" },
  { href: "#sop-compliance", label: "SOP Compliance", icon: "SOP" },
  { href: "#client-roi", label: "Client ROI", icon: "ROI" },
  { href: "#automation-log", label: "Automation Log", icon: "Automation" },
  { href: "#team-workload", label: "Team Workload", icon: "Team" },
  { href: "#client-profitability", label: "Client Profitability", icon: "Profitability" },
];

interface SidebarNavProps {
  agencyName: string;
  agencyLogoUrl?: string;
}

export function SidebarNav({ agencyName, agencyLogoUrl }: SidebarNavProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = React.useState<string>("");

  React.useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      navItems.forEach(item => {
        const element = document.getElementById(item.href.substring(1));
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust condition to activate when section is near top or scrolled past a bit
          if (rect.top <= window.innerHeight * 0.2 && rect.bottom >= window.innerHeight * 0.1) {
            currentSection = item.href;
          }
        }
      });

      if (currentSection) {
        setActiveSection(currentSection);
      } else {
        // Fallback if no section is actively in the "sweet spot"
        // This can be refined, e.g., to find the topmost visible section
        let foundFallback = false;
        for (const item of navItems) {
          const element = document.getElementById(item.href.substring(1));
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) { // Check if any part of the section is visible
              setActiveSection(item.href);
              foundFallback = true;
              break;
            }
          }
        }
        if (!foundFallback) { // If nothing is visible (e.g. scrolled way down), default to first or last, or clear
           // Or set to first item: setActiveSection(navItems[0]?.href || "");
        }
      }
    };

    const scrollableElement = document.querySelector("main[class*='overflow-y-auto']");

    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    handleScroll(); // Initial check

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Setting active section immediately on click provides better UX
      // The scroll listener will then confirm or adjust if needed
      setActiveSection(href);
    }
  };

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 min-w-0"> {/* Added min-w-0 for truncation parent */}
          {agencyLogoUrl ? (
            <img
              src={agencyLogoUrl}
              alt={`${agencyName} Logo`}
              className="h-8 w-8 object-contain shrink-0"
              data-ai-hint="agency logo"
            />
          ) : (
            <Logo className="w-12 h-12 text-primary shrink-0" />
          )}
          <span
            className="text-sm font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden truncate"
            title={agencyName}
          >
            {agencyName}
          </span>
        </div>
        <div className="md:hidden ml-auto">
            <SidebarTrigger />
        </div>
      </SidebarHeader>
      <Separator className="bg-sidebar-border" />
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => {
            const IconComponent = Icons[item.icon];
            const isActive = activeSection === item.href || (item.href === "#onboarding-tracker" && activeSection === "");
            return (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    asChild={false}
                    isActive={isActive}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, item.href)}
                    className="justify-start"
                    tooltip={{content: item.label, side: "right", align: "center"}}
                  >
                    <IconComponent className={`h-5 w-5 ${isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/80'}`} />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="bg-sidebar-border mt-auto" />
      <SidebarFooter className="p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:text-sidebar-foreground group-data-[collapsible=icon]:justify-center">
          <Settings className="h-5 w-5" />
          <span className="group-data-[collapsible=icon]:hidden">Settings</span>
        </Button>
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:py-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-sidebar-foreground">Jane Doe</p>
            <p className="text-xs text-sidebar-foreground/70">Admin</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto group-data-[collapsible=icon]:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
}
