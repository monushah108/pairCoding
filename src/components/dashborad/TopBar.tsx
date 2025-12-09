import { Button } from "@/components/ui/button";
import { Bell, Plus, Sun, Moon, Users } from "lucide-react";
import { motion } from "motion/react";
import SearchModle from "./module/SearchModle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { Separator } from "../ui/separator";

export default function TopBar({ selectedTab, setTab }) {
  const [notifications, setNotifications] = useState([]);
  console.log(selectedTab);

  return (
    <div className="flex items-center justify-between p-2 border-b border-border [&>button]:text-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 after:content-['*'] after:block   ">
          <Users className="w-4 h-4" />
          <span className="text-xs font-semibold">Friends</span>
        </div>

        <Button
          variant="secondary"
          className="text-xs cursor-pointer"
          onClick={() => setTab("friends")}
        >
          All
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost">
          <Moon className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <div>
                {notifications.length === 0 ? (
                  <div className="h-[100px] p-2 flex items-center justify-center">
                    <div className="italic text-xs font-semibold font-mono text-primary/60">
                      -- No new notifications --
                    </div>
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <div key={index}>{notification}</div>
                  ))
                )}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <SearchModle />
      </div>
    </div>
  );
}
