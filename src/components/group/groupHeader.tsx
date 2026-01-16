import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Moon, Search } from "lucide-react";

export default function GroupHeader() {
  return (
    <header className="px-4 py-3 border-b border-border bg-background/60 backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* Channel Name */}
        <h2 className="font-semibold text-primary text-lg flex items-center gap-1.5">
          <span className="text-primary/60 text-xl font-bold">#</span>
          general
        </h2>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search"
              className="pl-8 pr-3 py-1 h-8 rounded-md text-sm bg-muted/30 border-border focus-visible:ring-1 focus-visible:ring-primary/40"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
