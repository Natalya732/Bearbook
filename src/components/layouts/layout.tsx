import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./Header/app-sidebar";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
