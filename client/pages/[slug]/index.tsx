import Sidebar from "@/components/Sidebar";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { AppLayout } from "@/layouts/app/AppLayout";
import { useWorkspace } from "@/hooks/workspace";

const Page: NextPageWithLayout = () => {
  const { currentWorkspace } = useWorkspace();
  return (
    <div className="space-y-7 md:p-7 p-3 bg-custom-background-90 h-full w-full flex flex-col overflow-y-auto">
      <h1>Dashboard widgets</h1>
      {currentWorkspace.name}
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
