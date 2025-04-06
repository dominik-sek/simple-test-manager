import { IconType } from 'react-icons/lib';
import {
  LuWarehouse,
  LuFolder,
  LuFileText,
  LuCirclePlay,
  LuChartBar,
  LuBell,
  LuSettings,
  LuUser,
  LuShield,
} from "react-icons/lu";


export interface SidebarItem {
  label: string;
  route: string;
  icon: IconType;
  children?: SidebarItem[];
  requiresRole?: 'admin' | 'manager' | 'tester';
  className?: string;
}

export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    route: "/",
    icon: LuWarehouse
  },
  {
    label: "Projects",
    route: "/projects",
    icon: LuFolder,
    children: [
      { label: "All Projects", route: "/projects", icon: LuFolder  },
      { label: "Create Project", route: "/projects/create", icon: LuFolder  },
    ],
  },
  {
    label: "Test Cases",
    route: "/cases",
    icon: LuFileText,
    children: [
      { label: "All Cases", route: "/cases", icon: LuFileText },
      { label: "Create Case", route: "/cases/create", icon: LuFileText },
    ],
  },
  {
    label: "Test Runs",
    route: "/runs",
    icon: LuCirclePlay ,
    children: [
      { label: "All Runs", route: "/runs", icon: LuCirclePlay },
      { label: "Start New Run", route: "/runs/new", icon: LuCirclePlay },
    ],
  },
  {
    label: "Reports",
    route: "/reports",
    icon: LuChartBar,
  },
  {
    label: "Notifications",
    route: "/notifications",
    icon: LuBell ,
  },
  {
    label: "Admin",
    route: "/admin",
    icon: LuSettings ,
    requiresRole: "admin",
    children: [
      { label: "Users", route: "/admin/users", icon: LuUser },
      { label: "Roles & Permissions", route: "/admin/roles", icon: LuShield },
    ],
  },
];
