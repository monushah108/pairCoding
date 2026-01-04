import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ChevronRight, CodeXml, UserPlus, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Separator } from "../../ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../ui/input-group";
import { Field, FieldDescription, FieldGroup } from "../../ui/field";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { useNavigate } from "react-router-dom";

export default function PermissionModel() {
  const [selected, setSelected] = useState("public");
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const [next, setNext] = useState(false);
  const navigate = useNavigate();

  const joinOPtions = [
    {
      id: crypto.randomUUID(),
      title: "public",
      description: "Any users can code and watch",
      font_icons: <Users className="w-5 h-5" />,
    },
    {
      id: crypto.randomUUID(),
      title: "private",
      description: "You and selected users can code together",
      font_icons: <UserPlus className="w-5 h-5" />,
    },
  ];

  const nextStep = () => {
    if (selected == "private") {
      setNext(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <CodeXml />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>
          <div className="flex gap-2 text-sm items-center">
            <CodeXml className="w-5 h-5" /> PlayGround
          </div>
          <DialogDescription>Code with everyone</DialogDescription>
        </DialogTitle>

        <AnimatePresence>
          {next ? (
            <motion.div exit={{ x: 100, opacity: 0 }}>
              <ScrollArea.Root
                className="rounded-md bg-[#cccc] p-3 "
                style={{ height: "350px" }}
              >
                <ScrollArea.Viewport className="w-full h-full">
                  {Array(2)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-sm  px-1 py-1 mb-2 hover:bg-accent"
                      >
                        <div className="flex items-center">
                          <Avatar>
                            <AvatarImage src="" />
                          </Avatar>
                          <span className="text-sm">monu</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <span className="text-xs">invite</span>
                        </Button>
                      </div>
                    ))}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="flex select-none touch-none p-0.5 bg-transparent"
                >
                  <ScrollArea.Thumb className="flex-1 bg-[#555] rounded" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
              </ScrollArea.Root>
            </motion.div>
          ) : (
            <motion.div
              exit={{ x: 100, opacity: 0 }}
              className="flex flex-col gap-2 border p-3 rounded bg-accent/50"
            >
              {joinOPtions.map((option) => (
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value={option.title}
                    checked={selected === option.title}
                    onChange={() => setSelected(option.title)}
                  />
                  <div>
                    <p className="flex items-center gap-3 font-semibold text-sm">
                      {option.font_icons}
                      <span>{option.title}</span>
                    </p>
                    <p className="ml-8 font-semibold text-xs text-primary/60">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <Separator />

        <DialogFooter>
          <FieldGroup>
            {next && (
              <>
                <FieldDescription>
                  or invite them through link :
                </FieldDescription>
                <Field>
                  <InputGroup>
                    <InputGroupInput />
                    <InputGroupAddon align="inline-end">
                      <Button size="sm">
                        <span className="text-xs">Copy</span>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </>
            )}

            <Button
              disabled={!selected}
              onClick={
                selected == "private"
                  ? nextStep
                  : () => navigate("/playground/join_public/123")
              }
              className="text-sm font-medium cursor-pointer"
            >
              {selected == "private" ? "next" : "Join PlayGround"}
            </Button>
          </FieldGroup>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
