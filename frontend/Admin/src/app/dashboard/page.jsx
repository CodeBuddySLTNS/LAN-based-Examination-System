import { AppSidebar } from "@/components/app-sidebar";
import ChartStats from "@/components/chart";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between pr-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card className="bg-muted/50 aspect-video rounded-xl text-center">
              <div className="flex flex-col justify-between gap-1">
                <div className="text-xl font-bold font-['Nunito']">
                  Total Students
                </div>
                <div className="text-4xl">321</div>
              </div>
            </Card>
            <Card className="bg-muted/50 aspect-video rounded-xl text-center">
              <div className="flex flex-col justify-between gap-1">
                <div className="text-xl font-bold font-['Nunito']">
                  Scheduled Exams
                </div>
                <div className="text-4xl">8</div>
              </div>
            </Card>
            <Card className="bg-muted/50 aspect-video rounded-xl text-center">
              <div className="flex flex-col justify-between gap-1">
                <div className="text-xl font-bold font-['Nunito']">
                  Total Questions
                </div>
                <div className="text-4xl">61</div>
              </div>
            </Card>
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <ChartStats />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
