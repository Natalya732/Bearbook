import { Book, Home, Loader, MessagesSquare, Phone, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useApp } from "@contexts/AppContext";
import { useGetProfile } from "@hooks/getProfile";
import { useLocation   } from "react-router-dom";
import Logo from "@components/appLogo/Logo";
import ProfileDiv from "./profile";



const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Chats",
    url: "#",
    icon: MessagesSquare,
  },
  {
    title: "About",
    url: "#",
    icon: Book,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Contact",
    url: "#",
    icon: Phone,
  },
];

export function AppSidebar() {
  const { user } = useApp();
  const { state } = useSidebar();
  const location = useLocation();
  const { profile, isLoading } = useGetProfile(user?.id || "");

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loader className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <SidebarGroup className="my-8 gap-6">
            <SidebarGroupLabel>
              <Logo collapsed={state === "collapsed"} />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-5 mt-4">
                {items.map((item) => {
                  console.log(
                    "item",
                    location.pathname === item.url ? item.url : false
                  );
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        variant={
                          location.pathname === item.url ? "default" : "outline"
                        }
                        isActive={location.pathname === item.url}
                        className={` flex items-center border-none outline-none transition-all duration-200 [&>svg]:group-data-[collapsible=icon]:!w-6 [&>svg]:group-data-[collapsible=icon]:!h-5 ${
                          location.pathname === item.url
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "hover:bg-blue-500 hover:text-white"
                        }`}
                      >
                        <a className="font-semibold" href={item.url}>
                          {" "}
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="mb-4 px-3">
        <ProfileDiv profile={profile} sidebarState={state} />
      </SidebarFooter>
    </Sidebar>
  );
}
