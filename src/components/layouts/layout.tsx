import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./Header/app-sidebar"

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
        <SidebarTrigger className="lg:hidden sm:block size-20 mx-4"/>
        {children}
    </SidebarProvider>
  )
}