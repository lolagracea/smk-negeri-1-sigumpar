import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function Layout({
  children,
  activeMenu,
  setActiveMenu,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <div className="h-screen flex flex-col">
      <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 flex">
          {/* Wrapper Sidebar dengan lebar dinamis */}
          <div
            className={`h-full transition-all duration-200 ease-out ${
              sidebarOpen ? "w-64" : "w-0"
            } overflow-hidden`}
          >
            <Sidebar
              active={activeMenu}
              setActive={setActiveMenu}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
          {/* Dashboard menempati sisa ruang */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
