import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Plus, SearchIcon, UserCheck } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

export default function SearchModle({
  error,
  fetchSearchUser,
  sendRequest,
  users,
}) {
  const [search, setSearch] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          <span>Add Friends</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-primary/70">Search your Friends</span>
          </DialogTitle>
        </DialogHeader>
        <div>
          <InputGroup>
            <InputGroupInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchSearchUser(search)}
              placeholder="search"
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <pre className="text-[10px] text-center text-primary">
          <code> press </code> + <code>enter for search</code>
        </pre>
        <ScrollArea.Root className="rounded-lg border bg-muted/30">
          <ScrollArea.Viewport>
            <div className="p-3 space-y-2">
              {error ? (
                <p className="text-red-500 text-xs font-mono ">{error} </p>
              ) : (
                users.map(({ name, displayName, picture }) => (
                  <div
                    key={displayName}
                    className="flex items-center justify-between p-2 "
                  >
                    {/* Avatar + name */}
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={picture} alt={name} />
                      </Avatar>
                      <p className="font-medium text-sm text-primary/80">
                        {displayName}
                      </p>
                    </div>

                    {/* Action button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={sendRequest}
                          className="cursor-pointer"
                        >
                          <UserCheck className="w-4 h-4 text-primary/80" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span className="text-sm">Send friend request</span>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))
              )}
            </div>
          </ScrollArea.Viewport>

          {/* Scrollbar */}
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex select-none touch-none p-1 bg-transparent"
          >
            <ScrollArea.Thumb className="flex-1 bg-muted-foreground/40 hover:bg-muted-foreground/60 rounded-full transition" />
          </ScrollArea.Scrollbar>

          <ScrollArea.Corner />
        </ScrollArea.Root>
      </DialogContent>
    </Dialog>
  );
}
