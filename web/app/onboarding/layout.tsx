import Sidebar from "@/components/Sidebar";
import Typography from "@/components/ui/Typography";
import { Card } from "@/components/ui/card";
import React from "react";

const OnboardingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="p-20 h-screen">
      <div className="flex items-center w-full justify-between">
        <Typography className="text-slate-800" variant="h1">
          Worksync+
        </Typography>
        <Typography variant="h4" affects="small">
          muhdajeer@gmail.com
        </Typography>
      </div>
      <Card className="mx-20 mt-8 h-full border outline-1 outline outline-offset-4 outline-white border-black border-opacity-20 rounded-lg shadow-2xl">
        {/* {children} */}
        <div className="flex h-full">
          <div className="w-1/5 ">
            <Sidebar />
          </div>
          <div className="flex-1 p-20">{children}</div>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingLayout;
