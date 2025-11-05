import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="layout-body">
        <Sidebar />
        <div className="content">
        </div>
      </div>
    </div>
  );
};

export default MainLayout;