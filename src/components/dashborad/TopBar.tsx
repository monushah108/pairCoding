import { Button } from "@/components/ui/button";
import { Bell, Moon, Users } from "lucide-react";
import { motion } from "motion/react";
import SearchModle from "./module/SearchModle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import {
  SendNotifications,
  SearchUser,
  getNotifications,
  RespondToFriendRequest,
} from "../../api/Authapi.js";
import { toast, Toaster } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar.js";
import { ButtonGroup } from "../ui/button-group.js";

// import { io } from "socket.io-client";

export default function TopBar({ selectedTab, setTab, Allfriends }) {
  const [notifications, setNotifications] = useState([]);

  // user
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [receiver, setreceiver] = useState(null);

  // request action

  const [status, setStatus] = useState<string | null>(null);

  const fetchSearchUser = async (nickName: string) => {
    if (!nickName) return;
    try {
      const response = await SearchUser({ nickName });
      setError("");
      setUsers([response]);
      setreceiver(response.id);
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  const sendRequest = async () => {
    try {
      const res = await SendNotifications({ receiver });

      toast.success(res.response.data.message);
    } catch (err: any) {
      toast.error(err.response.data?.message ?? err.response.data.error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res);
    } catch (err) {
      console.log(0);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [users]);

  const ResponseOnAccept = async () => {
    try {
      await RespondToFriendRequest({ receiver, status: "accepted" });
      setStatus("accepted");
    } catch (err: any) {
      toast.error("something went wrong!!");
    }
  };

  const ResponseOnReject = async () => {
    try {
      await RespondToFriendRequest({ receiver, status: "rejected" });
      setStatus("rejected");
    } catch (err: any) {
      toast.error("something went wrong!!");
    }
  };

  return (
    <div className=" border-b border-border [&>button]:text-xs">
      <Toaster position="top-center" />
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 after:content-['*'] after:block   ">
            <Users className="w-4 h-4" />
            <span className="text-xs font-semibold">Friends</span>
          </div>

          {!!Allfriends.length && (
            <Button
              variant="secondary"
              className="text-xs cursor-pointer"
              onClick={() => setTab("friends")}
            >
              All
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost">
            <Moon className="w-4 h-4" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="relative">
                <Bell />
                {notifications.length > 0 && (
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
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Notification</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-3">
                {notifications.length === 0 ? (
                  <div className="h-[100px] p-2 flex items-center justify-center">
                    <div className="italic text-xs font-semibold font-mono text-primary/60">
                      -- No new notifications --
                    </div>
                  </div>
                ) : (
                  notifications.map(({ _id, name, nickName, picture }) => (
                    <div
                      key={_id}
                      className="group flex items-center justify-between   px-2 pt-2 mb-2 hover:bg-accent border-border pb-3 border-b "
                    >
                      <div className="flex items-center">
                        <Avatar className="size-5">
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=m`}
                          />
                        </Avatar>
                        <div className="text-xs font-semibold ml-2">
                          <span>{name}</span>
                          <span className="group-hover:inline-block hidden text-xs italic ml-1 text-primary/60">
                            {nickName}
                          </span>
                        </div>
                      </div>
                      <ButtonGroup>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={ResponseOnAccept}
                        >
                          <span className="text-xs"> Accept</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={ResponseOnReject}
                        >
                          <span className="text-xs">reject</span>
                        </Button>
                      </ButtonGroup>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>

          <SearchModle
            error={error}
            fetchSearchUser={fetchSearchUser}
            sendRequest={sendRequest}
            users={users}
          />
        </div>
      </div>
    </div>
  );
}
