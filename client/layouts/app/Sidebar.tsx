import Sidebar from "@/components/Sidebar";
import SidebarQuickAction from "@/components/workspace/SidebarQuickAction";
import WorkspaceSidebarDropdown from "@/components/workspace/sidebar-dropdown";
import { useRef } from "react";

export const AppSideBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const sidebarCollapsed = true;
  return (
    <div
      className={` h-full inset-y-0 z-20 flex  flex-shrink-0 flex-grow-0 flex-col border-r border-green-500 bg-yellow-300
        duration-300 md:relative w-[280px]
        ${sidebarCollapsed ? "-ml-[280px]" : ""}
        sm:${sidebarCollapsed ? "-ml-[280px]" : ""}
        md:ml-0 ${sidebarCollapsed ? "w-[80px]" : "w-[280px]"}
        lg:ml-0 ${sidebarCollapsed ? "w-[80px]" : "w-[280px]"}
      `}
      style={{ width: "280px" }}
    >
      <div ref={ref} className="flex h-full w-full flex-1 flex-col">
        <WorkspaceSidebarDropdown />
        <SidebarQuickAction />
        <Sidebar />
        {/* <WorkspaceSidebarDropdown />
        <WorkspaceSidebarQuickAction />
        <WorkspaceSidebarMenu />
        <ProjectSidebarList />
        <WorkspaceHelpSection /> */}
      </div>
    </div>
  );
};
