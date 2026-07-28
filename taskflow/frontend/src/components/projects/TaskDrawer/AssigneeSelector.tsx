import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Assignee, UserOption } from "@/interfaces/projects";
import { cn } from "@/lib/utils";
import { getAvatarUrl } from "@/lib/image";

interface Props {
  value: Assignee | null; 
  users: UserOption[];
  onChange: (member: Assignee | null) => void; 
  disabled?: boolean;
}

function AssigneeSelector({ value, users, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false);

  // Helper to check if a valid assignee is selected
  const hasSelectedValue = value && (value.name || value.avatar);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            type="button"
            disabled={disabled}
            className="w-full justify-between rounded-lg"
          />
        }
      >
        <div className="flex items-center gap-2">
          
          {hasSelectedValue ? (
            <Avatar className="h-7 w-7">
              <AvatarImage src={getAvatarUrl(value.avatar)} />
              <AvatarFallback>{value.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : null}

          
          <span>{value?.name || "Unassigned"}</span>
        </div>

        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search member..." />
          <CommandList>
            <CommandEmpty>No member found.</CommandEmpty>
            <CommandGroup>

              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  onSelect={() => {
                    onChange({
                      id: user.id,
                      name: user.name,
                      avatar: user.avatar ?? "",
                    });
                    setOpen(false);
                  }}
                >
                  
                  {(user.name || user.avatar) && (
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={getAvatarUrl(user.avatar)} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  {user.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value?.id === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default AssigneeSelector;