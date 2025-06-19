import {
  ListChecks,
  ClipboardCheck,
  TrendingUp,
  Bot,
  Users,
  PieChart as LucidePieChart, // Renamed to avoid conflict with chart components
  LayoutDashboard,
  DollarSign,
  Clock,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  MinusCircle,
  LucideIcon,
} from 'lucide-react';

export const Icons = {
  Dashboard: LayoutDashboard,
  Onboarding: ListChecks,
  SOP: ClipboardCheck,
  ROI: TrendingUp,
  Automation: Bot,
  Team: Users,
  Profitability: LucidePieChart,
  Revenue: DollarSign,
  Time: Clock,
  BarChart: BarChart3,
  Success: CheckCircle2,
  Warning: AlertCircle,
  Overdue: AlertCircle,
  Normal: CheckCircle2,
  UnderCapacity: MinusCircle,
};

export type IconKey = keyof typeof Icons;

export const Logo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </svg>
);
