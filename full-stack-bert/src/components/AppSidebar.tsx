import { Home } from "lucide-react";
import { PlusSquare } from "lucide-react";
// import { Trash2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import logo from "../../public/icon.png";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import ChatBotButtonToggle from "./ChatBotButtonToggle";

const items = [
  {
    title: "Home",
    url: "/1",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: PlusSquare,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="justify-center flex w-full h-[7rem] p-5">
        <Link href="/1">
          <Image
            src={logo}
            alt="Logo user"
            width={75}
            height={75}
            className="object-contain"
          />
        </Link>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <ThemeToggle />
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <ChatBotButtonToggle />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
