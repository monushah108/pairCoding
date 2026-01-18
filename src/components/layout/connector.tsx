import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.js";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip.js";
import { Button } from "../ui/button.js";
import {
  ChevronDown,
  HeadphoneOff,
  Headphones,
  MicIcon,
  MicOffIcon,
} from "lucide-react";
import { ButtonGroup } from "../ui/button-group.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.js";
import { memo, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import micOut from "../../assets/mic-of.wav";
import pop from "../../assets/pop-of.wav";
import mic from "../../assets/mic.wav";
import popOut from "../../assets/mic-of.wav";
import { Link, useNavigate } from "@tanstack/react-router";

interface userData {
  name: string;
  picture: string;
  email: string;
  password: string;
}

const Connector = memo(function Connector() {
  const [MicOpen, setMicOpen] = useState(true);
  const [DefedOpen, setDefedOpen] = useState(true);
  const [Userdata, setUserData] = useState<userData>(null);
  const navigate = useNavigate();
  const sound = new Audio();
  console.log("connector");
  const triggerMic = () => {
    sound.src = MicOpen ? pop : popOut;
    sound.currentTime = 0;
    sound.play();
    setMicOpen(!MicOpen);
  };

  const triggerDefed = () => {
    sound.src = DefedOpen ? mic : micOut;
    sound.currentTime = 0;
    sound.play();
    setDefedOpen(!DefedOpen);
  };

  return (
    <div className="absolute z-50 bottom-8 left-5 p-2 border border-border rounded-md bg-background shadow-sm">
      <Toaster position="top-center" />
      <div className="grid grid-cols-3 gap-2 items-center justify-items-center justify-between">
        {/* Avatar Section */}
        <div className="w-fit">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link to="profile">
                <Avatar className="rounded-full cursor-pointer hover:scale-105 transition-transform size-7">
                  <AvatarImage src={Userdata?.picture} />
                  <AvatarFallback>EF</AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top">
              <div className="flex items-center gap-1.5">
                <Avatar className="size-5">
                  <AvatarImage src={Userdata?.picture} alt="Hallie Richards" />
                  <AvatarFallback className="text-xs">HR</AvatarFallback>
                </Avatar>
                <p className="font-medium">{Userdata?.name}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Mic Button Group */}
        <ButtonGroup>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={`${
                  MicOpen && "bg-red-600/80 text-primary-foreground"
                } cursor-pointer`}
                onClick={triggerMic}
              >
                {MicOpen ? <MicOffIcon /> : <MicIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Mute</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            {/* Tooltip outside DropdownMenuTrigger */}
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon-small"
                    className={`${
                      MicOpen && "bg-red-600/80 text-primary-foreground"
                    }  cursor-pointer`}
                  >
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Input Options</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent
              side="top"
              align="end"
              sideOffset={8}
              collisionPadding={10}
              className="[--radius:1rem] p-2 w-48"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className="!cursor-default flex flex-col items-start gap-3 p-3 hover:bg-muted/40 rounded-lg transition-all">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground">
                        Input Volume
                      </p>
                      <span className="text-xs text-muted-foreground">80%</span>
                    </div>

                    <div className="relative w-full">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="80"
                        className="w-full accent-primary cursor-pointer h-2 rounded-lg bg-muted 
                          [&::-webkit-slider-thumb]:appearance-none 
                          [&::-webkit-slider-thumb]:h-3 
                          [&::-webkit-slider-thumb]:w-3 
                          [&::-webkit-slider-thumb]:rounded-full 
                          [&::-webkit-slider-thumb]:bg-primary"
                      />
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>

        {/* Headphones Button Group */}
        <ButtonGroup>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={triggerDefed}
                className={
                  !DefedOpen && "bg-red-600/80 text-primary-foreground"
                }
              >
                {DefedOpen ? <Headphones /> : <HeadphoneOff />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Deafen</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon-small"
                    className={
                      !DefedOpen && "bg-red-600/80 text-primary-foreground"
                    }
                  >
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Output Options</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent
              side="top"
              align="end"
              sideOffset={8}
              collisionPadding={10}
              className="[--radius:1rem] p-2 w-48"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className="!cursor-default flex flex-col items-start gap-3 p-3 hover:bg-muted/40 rounded-lg transition-all">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground">
                        Output Volume
                      </p>
                      <span className="text-xs text-muted-foreground">65%</span>
                    </div>

                    <div className="relative w-full">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="65"
                        className="w-full accent-primary cursor-pointer h-2 rounded-lg bg-muted 
                          [&::-webkit-slider-thumb]:appearance-none 
                          [&::-webkit-slider-thumb]:h-3 
                          [&::-webkit-slider-thumb]:w-3 
                          [&::-webkit-slider-thumb]:rounded-full 
                          [&::-webkit-slider-thumb]:bg-primary"
                      />
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>
    </div>
  );
});

export default Connector;
