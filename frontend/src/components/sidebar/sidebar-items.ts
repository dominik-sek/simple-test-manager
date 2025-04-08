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
  },
  {
    label: "Test Collections",
    route: "/collections",
    icon: LuFolder
  },
  {
    label: "Test Cases",
    route: "/cases",
    icon: LuFileText,

  },
  {
    label: "Test Runs",
    route: "/runs",
    icon: LuCirclePlay ,

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
  },
];
