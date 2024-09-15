import { ReactNode } from "react";
import DashboardNavbar from "../../components/Shared/DashboardNavbar/DashboardNavbar";
import Sidebar from "../../components/Shared/Sidebar/Sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-3 hidden md:block">
        <Sidebar role="admin" />
      </div>
      <div className="col-span-12 md:col-span-9">
        <DashboardNavbar role="admin">{children}</DashboardNavbar>
      </div>
    </div>
  );
};

export default AdminLayout;
