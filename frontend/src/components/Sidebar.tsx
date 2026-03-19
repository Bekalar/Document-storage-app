import "./css/Sidebar.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from 'react-icons/fi';

import { type NavItem } from "../modules/routes/types/routes";

interface SidebarProps {
  routes: NavItem[];
}

function Sidebar({ routes }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isSmallWidth, setIsSmallWidth] = useState(window.innerWidth < 750);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const renderIcon = (iconName: string) => {
    const IconComponent = (FiIcons as any)[iconName] || (FaIcons as any)[iconName];

    return IconComponent ? <IconComponent /> : <FaIcons.FaCircle />;
  };

  const toggleSidebar = () => setCollapsed(!collapsed);
  const handleClickContent = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsSmallWidth(window.innerWidth < 750);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSmallWidth) setCollapsed(true);
  }, [isSmallWidth]);

  useEffect(() => {
    if (!sidebarRef.current) return;
    const contentDiv = sidebarRef.current.nextSibling as HTMLElement | null;
    if (!contentDiv) return;

    contentDiv.addEventListener("click", handleClickContent)
    return () => contentDiv.removeEventListener("click", handleClickContent);
  }, []);

  return (
    <div
      className={`sidebar-wrapper ${collapsed ? "collapsed" : ""} 
        ${isSmallWidth ? "smallWidth" : ""}`}
      ref={sidebarRef}
    >
      <aside className="sidebar">
        {routes.map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.route}`}
            className="sidebar-item"
          >
            {renderIcon(item.icon)}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </aside>

      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {collapsed ? <FaIcons.FaChevronRight /> : <FaIcons.FaChevronLeft />}
      </div>
    </div>
  );
};

export default Sidebar;
