import { Input } from "../ui/input";
import { Moon, Search, Users } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";

export default function GroupHeader() {
  return (
    <header className="px-4 py-2.5 border-b border-border bg-background/60 backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* Channel Name */}
        <h2 className="font-semibold text-primary text-lg flex items-center gap-1.5">
          <span className="text-primary/60 text-xl font-bold">#</span>
          general
        </h2>

        <div className="flex items-center gap-5">
          <Button variant="outline">
            <Users />
          </Button>

          <InputGroup className="w-max">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search" />
          </InputGroup>
        </div>
      </div>
    </header>
  );
}
