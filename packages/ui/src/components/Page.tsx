import { AppSidebar } from "./app-sidebar";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export default function SidebarPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="relative flex h-full w-full grow-0">
      <AppSidebar className="absolute" />
      <SidebarInset>
        <div className="overflow-hidden absolute inset-0 flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
          </header>
          <ScrollArea className="@container/scroll-area">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-[100cqw]">
              {children}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
