import type {SidebarItem, Activity, ChartPoint, Deadline, Metric, ProjectProgress, TeamMember} from "../interfaces/dashboard";

export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: "dashboard",
    route: "/dashboard",
  },
  {
    id: 2,
    title: "Projects",
    icon: "projects",
    route: "/projects",
  },
  {
    id: 3,
    title: "Team",
    icon: "team",
    route: "/team",
  },
  {
    id: 4,
    title: "Activity",
    icon: "activity",
    route: "/activity",
  },
  {
    id: 5,
    title: "Settings",
    icon: "settings",
    route: "/settings",
  },
];

export const metrics: Metric[] = [
  {
    id: 1,
    title: "Total Projects",
    value: 24,
    badge: "+12%",
    badgeColor: "green",
    icon: "folder",
  },
  {
    id: 2,
    title: "Total Tasks",
    value: 148,
    badge: "Active",
    badgeColor: "gray",
    icon: "clipboard",
  },
  {
    id: 3,
    title: "Completed Tasks",
    value: 114,
    badge: "92%",
    badgeColor: "green",
    icon: "check",
  },
  {
    id: 4,
    title: "Pending Tasks",
    value: 34,
    badge: "Due Soon",
    badgeColor: "orange",
    icon: "clock",
  },
];

export const projectProgress: ProjectProgress[] = [
  {
    id: 1,
    name: "UI Redesign",
    progress: 78,
    color: "#0052cc",
  },
  {
    id: 2,
    name: "API Integration",
    progress: 45,
    color: "#d97706",
  },
  {
    id: 3,
    name: "User Feedback",
    progress: 22,
    color: "#64748b",
  },
];

export const activities: Activity[] = [
  {
    id: 1,
    user: "Sarah",
    action: "updated",
    project: "Core Design System",
    time: "2 hours ago",
    icon: "file",
  },
  {
    id: 2,
    user: "James",
    action: "completed",
    project: "Authentication Module",
    time: "4 hours ago",
    icon: "check",
  },
  {
    id: 3,
    user: "You",
    action: "added",
    project: "Elena to Team",
    time: "Yesterday",
    icon: "user",
  },
];

export const deadlines: Deadline[] = [
  {
    id: 1,
    title: "Q4 Financial Reporting",
    project: "Finance",
    due: "In 2 days",
    badgeColor: "red",
  },
  {
    id: 2,
    title: "Website Launch",
    project: "Marketing",
    due: "In 5 days",
    badgeColor: "orange",
  },
  {
    id: 3,
    title: "Cloud Migration",
    project: "DevOps",
    due: "Oct 12",
    badgeColor: "gray",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: "Designer",
    avatar: "https://i.pravatar.cc/100?img=5",
    online: true,
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Engineer",
    avatar: "https://i.pravatar.cc/100?img=12",
    online: true,
  },
  {
    id: 3,
    name: "David Miller",
    role: "Project Lead",
    avatar: "https://i.pravatar.cc/100?img=15",
    online: false,
  },
];

export const weeklyChart: ChartPoint[] = [
  { day: "Mon", completed: 20 },
  { day: "Tue", completed: 34 },
  { day: "Wed", completed: 42 },
  { day: "Thu", completed: 31 },
  { day: "Fri", completed: 58 },
  { day: "Sat", completed: 41 },
  { day: "Sun", completed: 62 },
];