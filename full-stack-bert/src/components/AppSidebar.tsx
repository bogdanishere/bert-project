import { Home, LogIn, LogOut, User } from "lucide-react";

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
import { SignOutButton } from "@clerk/nextjs";

const items = [
  {
    title: "Home",
    url: "/1",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Sign In",
    url: "/sign-in",
    icon: LogIn,
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
                <ThemeToggle />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <ChatBotButtonToggle />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <div className="flex items-center gap-2 pl-1.5 pt-1">
                  <LogOut size={20} />
                  <SignOutButton />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
