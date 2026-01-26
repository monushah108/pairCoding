import { Input } from "../ui/input";
import { Moon, Search, Users } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePanel } from "@/store/feature/roomSlice";

export default function GroupHeader() {
  const [panel, setPanel] = useState(false);
  const dispatch = useDispatch();

  const handlShow = () => {
    setPanel((pre) => !pre);
    dispatch(updatePanel(panel));
  };
  return (
    <header className="px-4 py-2.5 border-b border-border bg-background/60 backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* Channel Name */}
        <h2 className="font-semibold text-primary text-lg flex items-center gap-1.5">
          <span className="text-primary/60 text-xl font-bold">#</span>
          general
        </h2>

        <div className="flex items-center gap-5">
          <Button variant="outline" onClick={handlShow}>
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
