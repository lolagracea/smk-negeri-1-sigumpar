import { useState } from "react";
import Layout from "../../components/layout/Layout";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import ActivityCard from "../../components/dashboard/ActivityCard";
import AnnouncementsList from "../../components/announcements/AnnouncementsList";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("beranda");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Layout
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="space-y-6">
        <WelcomeCard />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityCard />
          <AnnouncementsList />
        </div>
      </div>
    </Layout>
  );
}
