"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  BotIcon,
  Command,
  Frame,
  GalleryVerticalEnd,
  GraduationCap,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";

// This is sample data.
const data = {
  teams: [
    {
      name: "All Uni assist",
      logo: BotIcon,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Find Universities",
      url: "#",
      icon: GraduationCap,
      isActive: true,
      items: [
        {
          title: "Find",
          url: "/dashboard",
        },
        {
          title: "Get Assistance",
          url: "/dashboard/chat",
        },
        // {
        //   title: "Settings",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Application Review",
          url: "/dashboard/models",
        },
        // {
        //   title: "Explorer",
        //   url: "#",
        // },
        // {
        //   title: "Quantum",
        //   url: "#",
        // },
      ],
    },
    // {
    //   title: "Application Review",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Comming soon...",
    //       url: "#",
    //     },
    // {
    //   title: "Get Started",
    //   url: "#",
    // },
    // {
    //   title: "Tutorials",
    //   url: "#",
    // },
    // {
    //   title: "Changelog",
    //   url: "#",
    // },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const users = useSelector((store: any) => store.auth.user);
  const user = {
    name: users?.name || "",
    email: users?.email || "",
    avatar: "/logo.webp",
  };
  return (
    <Sidebar collapsible="icon" {...props} suppressHydrationWarning>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
