import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditIcon, SaveIcon, X } from "lucide-react";
import { motion } from "motion/react";
import Membership from "@/components/setting/membership";
import UserInfoCard from "@/components/setting/userInfoCard";
import Banner from "@/components/setting/banner";
export const Route = createFileRoute("/dashboard/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const [OnEdit, setOnEdit] = useState(false);
  const [picture, setPicture] = useState("");
  return (
    <section className="bg-background text-foreground   transition-colors  ">
      <div className="container max-w-5xl m-auto relative space-y-5">
        <Banner />
        <div className="text-right px-2">
          {OnEdit ? (
            <div className="flex items-center gap-2 justify-end  ">
              <Button onClick={() => setOnEdit(false)}>Cancel</Button>
              <Button>
                <SaveIcon /> Save Edit
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setPicture(true)}>
              <EditIcon />
              Edit Profile
            </Button>
          )}
        </div>
        <motion.div
          className="flex flex-col p-2 gap-5 h-full "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <UserInfoCard OnEdit={OnEdit} />

          <Membership OnEdit={OnEdit} />
        </motion.div>
      </div>
    </section>
  );
}
