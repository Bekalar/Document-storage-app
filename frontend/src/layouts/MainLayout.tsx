import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { type NavItem } from "../modules/routes/types/routes";

interface MainLayoutProps {
  routes: NavItem[];
}

function MainLayout({ routes }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="layout-body">
        <Sidebar routes={routes} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
