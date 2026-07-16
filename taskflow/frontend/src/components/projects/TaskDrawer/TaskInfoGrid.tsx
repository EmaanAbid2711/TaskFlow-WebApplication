import { useState } from "react";
import { format } from "date-fns";
import {CalendarDays, ChevronDown} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import type {Task} from "@/interfaces/projects";

interface Props {
  task: Task;

  onChange: (
    field: keyof Task,
    value: any
  ) => void;
}

function TaskInfoGrid({
  task,
  onChange,
}: Props) {

  const [calendarOpen, setCalendarOpen] =
    useState(false);

  const selectedDate =
    task.dueDate
      ? new Date(task.dueDate)
      : undefined;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

      {/* Status */}
      <div>

        <label className="mb-2 block text-xs font-semibold text-slate-500">
          Status
        </label>

        <div className="relative">

          <select
            value={task.status}
            onChange={(e) =>
              onChange(
                "status",
                e.target.value
              )
            }
            className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm outline-none focus:border-[#0052cc]"
          >

            <option value="todo">
              Todo
            </option>

            <option value="progress">
              In Progress
            </option>

            <option value="review">
              Review
            </option>

            <option value="completed">
              Completed
            </option>

          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

        </div>

      </div>

      {/* Priority */}

      <div>

        <label className="mb-2 block text-xs font-semibold text-slate-500">
          Priority
        </label>

        <div className="grid grid-cols-3 gap-2">

          {(["High", "Medium", "Low"] as const).map(
            (priority) => (

              <button
                key={priority}
                type="button"
                onClick={() =>
                  onChange(
                    "priority",
                    priority
                  )
                }
                className={`rounded-lg border py-2 text-xs font-medium transition-all ${
                  task.priority === priority
                    ? "border-[#0052cc] bg-[#eef4ff] text-[#0052cc]"
                    : "bg-slate-50 hover:bg-slate-100"
                }`}
              >
                {priority}
              </button>

            )
          )}

        </div>

      </div>

      {/* Due Date */}

      <div>

        <label className="mb-2 block text-xs font-semibold text-slate-500">
          Due Date
        </label>

        <Popover
          open={calendarOpen}
          onOpenChange={setCalendarOpen}
        >

          <PopoverTrigger
            className="w-full"
          >
            <Button
              type="button"
              variant="outline"
              className="flex w-full justify-between rounded-lg border-slate-200 font-normal"
            >
              {selectedDate
                ? format(selectedDate, "PPP")
                : "Select due date"}

              <CalendarDays
                size={16}
                className="text-slate-500"
              />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-auto p-0"
          >

            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (!date) return;
              
                onChange(
                  "dueDate",
                  format(date, "yyyy-MM-dd")
                );
              
                setCalendarOpen(false);
              }}
              disabled={(date) =>
                date <
                new Date(
                  new Date().setHours(0, 0, 0, 0)
                )
              }
            />

          </PopoverContent>

        </Popover>

      </div>

      {/* Assignee */}

      <div>

        <label className="mb-2 block text-xs font-semibold text-slate-500">
          Assignee
        </label>

        <input
          value={task.assignee.name}
          onChange={(e) =>
            onChange(
              "assignee",
              {
                ...task.assignee,
                name: e.target.value,
              }
            )
          }
          placeholder="Assignee"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0052cc]"
        />

      </div>

    </div>
  );

}

export default TaskInfoGrid;