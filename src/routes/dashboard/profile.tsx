import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CameraIcon, EditIcon, SaveIcon, X } from "lucide-react";

export const Route = createFileRoute("/dashboard/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const [OnEdit, setOnEdit] = useState(false);
  const [picture, setPicture] = useState("");
  return (
    <section className="bg-background text-foreground   transition-colors  ">
      <div className="container max-w-5xl m-auto relative space-y-5">
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
      </div>
    </section>
  );
}
