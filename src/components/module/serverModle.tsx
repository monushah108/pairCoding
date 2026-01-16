import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Newserver } from "../../api/Serverapi.js";

export default function ServerModel() {
  const [Img, setImg] = useState("  No image selected");
  const [serverName, setServerName] = useState("");

  // const copyLink = async () => {
  //   try {
  //     await navigator.clipboard.writeText("text");
  //   } catch (err) {
  //     console.error("Failed to copy: ", err);
  //   }
  // };

  const Createserver = async (picture, name) => {
    try {
      const response = await Newserver({ picture, name });

      if (response.ok) {
        console.log("Server created successfully");
      } else {
        console.error("Failed to create server");
      }
    } catch (error) {
      console.error("Error creating server:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Create a new server
          </DialogTitle>
          <DialogDescription>
            Create your server and start chatting or voice calling with friends.
          </DialogDescription>
        </DialogHeader>

        <main className="space-y-6 mt-4">
          {/* Server Icon */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Server Icon</p>
            <InputGroup className="flex items-center justify-between px-3 py-2">
              <InputGroupText className="text-muted-foreground">
                {Img}
              </InputGroupText>

              <InputGroupAddon align="inline-end">
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="serverIcon" className="cursor-pointer">
                    Select image
                    <input
                      type="file"
                      id="serverIcon"
                      className="hidden"
                      accept="image/*"
                      name="img"
                      onChange={(e) => setImg(e.target.files[0].name)}
                    />
                  </label>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Server Name */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Server Name</p>
            <InputGroup>
              <InputGroupInput
                placeholder="My awesome server"
                name="serverName"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              />
            </InputGroup>
          </div>
        </main>
        <DialogFooter>
          <Button onClick={() => Createserver(Img, serverName)}>
            create server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
