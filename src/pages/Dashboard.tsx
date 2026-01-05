import { Binary } from "lucide-react";
import { easeIn, motion } from "motion/react";
import { lazy, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Connector from "../components/connector";

const Sidebar = lazy(() => import("@/components/dashborad/Sidebar"));

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const { pathname } = useLocation();
  const show = pathname.includes("/profile");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return (
    <section className="bg-background text-foreground transition-colors  ">
      {/* Top header */}
      <div className=" p-2 ">
        <h1 className="w-full text-center font-semibold">
          <Binary className="w-6 h-6 inline-block mr-2" />
        </h1>
      </div>

      {/* Layout grid */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.2,
            ease: easeIn,
          },
        }}
        className="relative h-[900px] "
      >
        <div className="grid grid-cols-[70px_1fr] h-full">
          {/* Sidebar with avatars */}
          <Sidebar />

          {/* Main content area */}
          <div className="border-l border-t border-border rounded-l-md">
            <Outlet />
          </div>
        </div>
      </motion.div>
      <div className="relative">{show || <Connector />}</div>
    </section>
  );
}
