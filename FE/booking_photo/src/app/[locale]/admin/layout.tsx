import Sidebar from "@/app/(component)/Sidebar";
import React, { Children } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
};

export default layout;
