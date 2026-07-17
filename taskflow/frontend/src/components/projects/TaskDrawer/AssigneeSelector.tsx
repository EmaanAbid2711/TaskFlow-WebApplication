import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { teamMembers } from "@/data/teamMembers";
import { Button } from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import { Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import type { Assignee } from "@/interfaces/projects";
import { cn } from "@/lib/utils";

interface Props {
  value: Assignee;

  onChange: (member: Assignee) => void;
}

function AssigneeSelector({
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            type="button"
            className="w-full justify-between rounded-lg"
          />
        }
      >
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={value.avatar} />

            <AvatarFallback>
              {value.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <span>{value.name}</span>
        </div>

        <ChevronsUpDown
          className="ml-2 h-4 w-4 opacity-50"
        />
      </PopoverTrigger>

      <PopoverContent
        className="w-[300px] p-0"
        align="start"
      >
        <Command>

          <CommandInput
            placeholder="Search member..."
          />

          <CommandList>

            <CommandEmpty>
              No member found.
            </CommandEmpty>

            <CommandGroup>

              {teamMembers.map((member) => (

                <CommandItem
                  key={member.id}
                  value={member.name}
                  onSelect={() => {

                    onChange(member);

                    setOpen(false);

                  }}
                >

                  <Avatar className="h-7 w-7">

                    <AvatarImage
                      src={member.avatar}
                    />

                    <AvatarFallback>
                      {member.name.charAt(0)}
                    </AvatarFallback>

                  </Avatar>

                  {member.name}

                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value.id === member.id
                        ? "opacity-100"
                        : "opacity-0"
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