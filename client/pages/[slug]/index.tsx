import Sidebar from "@/components/Sidebar";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { AppLayout } from "@/layouts/app/AppLayout";

const Page: NextPageWithLayout = () => {
  return (
    <div className="space-y-7 md:p-7 p-3 bg-custom-background-90 h-full w-full flex flex-col overflow-y-auto">
      <h1>Dashboard widgets</h1>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
