import { Button } from "@/components/ui/button";
import { Bell, Plus, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import SearchModle from "./module/SearchModle";

export default function TopBar({ darkMode }) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-border [&>button]:text-xs">
      <Button variant="ghost" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="relative">
          <Bell />
          <motion.span
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-red-500 w-1 h-1 rounded-full absolute top-3 left-3.5 "
          />
        </Button>
        <SearchModle />
      </div>
    </div>
  );
}
