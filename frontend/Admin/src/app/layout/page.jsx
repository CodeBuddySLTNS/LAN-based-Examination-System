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
  const [path, setPath] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location) {
      switch (location.pathname) {
        case "/accounts":
          setPath("Manage Accounts");
          break;

        case "/accounts/add":
          setPath("Manage Accounts/Add Account");
          break;

        default:
          setPath(null);
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
                {path?.split("/")[0] && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink onClick={() => navigate("/accounts")}>
                        {path?.split("/")[0]}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                {path?.split("/")[1] && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink>{path?.split("/")[1]}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                {path?.split("/")[2] && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink>{path?.split("/")[2]}</BreadcrumbLink>
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
