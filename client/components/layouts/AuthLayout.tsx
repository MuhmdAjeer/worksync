import { Background } from "@/components/Background";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Background />
      <div className="relative z-10 flex h-screen w-screen justify-center">
        {children}
      </div>
    </>
  );
}
