import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      className={`font-on grid min-h-screen ${
        collapsed ? "grid-cols-sidebar-collapsed" : "grid-cols-sidebar"
      } transition-[grid-template-columns] duration-300 ease-in-out`}
    >
      {/* sidebar */}
      {/* content */}
      <div>
        <Navbar onMenuButtonClick={() => setShowSidebar((prev) => !prev)} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
