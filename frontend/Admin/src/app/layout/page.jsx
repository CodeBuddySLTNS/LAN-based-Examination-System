import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Page({ className, ...props }) {
  const [path, setPath] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location) {
      switch (location.pathname) {
        case "/exams":
          setPath({ name: "Exam Schedules", url: "/exams" });
          break;

        case "/exams/add":
          setPath({
            name: "Exam Schedules/Add Exam Schedule",
            url: "/exams/add",
          });
          break;

        case "/exams/sessions":
          setPath({
            name: "Exam Sessions",
            url: "/exams/sessions",
          });
          break;

        case "/exams/history":
          setPath({
            name: "Exam Schedules/History",
            url: "/exams/history",
          });
          break;

        case "/accounts":
          setPath({ name: "Manage Accounts", url: "/accounts" });
          break;

        case "/accounts/add":
          setPath({
            name: "Manage Accounts/Add Account",
            url: "/accounts/add",
          });
          break;

        case "/questions":
          setPath({ name: "Question Bank", url: "/questions" });
          break;

        case "/questions/add":
          setPath({
            name: "Question Bank/Add Question",
            url: "/questions/add",
          });
          break;

        case "/subjects":
          setPath({ name: "Manage Subjects", url: "/subjects" });
          break;

        case "/subjects/add":
          setPath({
            name: "Manage Subjects/Add Subject",
            url: "/subjects/add",
          });
          break;

        default:
          setPath({});
          break;
      }
    }
  }, [location]);

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
                  <BreadcrumbLink onClick={() => navigate("/")}>
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {path.name?.split("/")[0] && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        onClick={() => navigate("/" + path.url?.split("/")[1])}
                      >
                        {path.name?.split("/")[0]}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                {path.name?.split("/")[1] && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink onClick={() => navigate(path.url)}>
                        {path.name?.split("/")[1]}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                {path.name?.split("/")[2] && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink onClick={() => navigate(path.url)}>
                        {path.name?.split("/")[2]}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        <div className={className} {...props} />
      </SidebarInset>
    </SidebarProvider>
  );
}
