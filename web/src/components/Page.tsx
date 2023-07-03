import { ReactNode } from "react";
import { SidbarLeft } from "./SidbarLeft";

interface PageProps {
  children: ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <>
      <div className="flex flex-row relative bg-background">
        <SidbarLeft />
        <div className="flex-grow flex flex-col min-h-screen overflow-hidden relative">
          {children}
        </div>
      </div>
    </>
  );
}
