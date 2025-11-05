import "./css/Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  FaCog,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import {
  FiFileText,
  FiFile,
  FiArchive,
} from 'react-icons/fi';
import { useState, useEffect, useRef } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isSmallWidth, setIsSmallWidth] = useState(window.innerWidth < 750);
  const sidebarRef = useRef<HTMLDivElement>(null);

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
        <NavLink to="/documents" className="sidebar-item">
          <FiFileText /> <span>Dokumenty</span>
        </NavLink>
        <NavLink to="/files" className="sidebar-item">
          <FiFile /> <span>Pliki</span>
        </NavLink>
        <NavLink to="/archive" className="sidebar-item">
          <FiArchive /> <span>Archiwum</span>
        </NavLink>
        <NavLink to="/settings" className="sidebar-item">
          <FaCog /> <span>Ustawienia</span>
        </NavLink>
      </aside>

      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </div>
    </div>
  );
};

export default Sidebar;