"use client";

import { NavMain } from "@ui/components/nav-main";
import { NavSecondary } from "@ui/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@ui/components/ui/sidebar";
import { Settings, Telescope } from "lucide-react";
import type * as React from "react";

const data = {
  user: {
    name: "WIP",
    email: "wip@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Discover",
      url: "/discover",
      icon: Telescope,
      isActive: true,
      items: [
        {
          title: "Entry Points",
          url: "/entry-points",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/home">
                <div className="grid flex-1 text-left text-xl leading-tight">
                  <span className="truncate font-bold">Nexus Archive</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
