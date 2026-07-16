import {AtSign, Image, Smile} from "lucide-react";

import type { Task } from "@/interfaces/projects";

interface Props {
  task: Task;

  onChange: (
    field: keyof Task,
    value: any
  ) => void;
}

function CommentBox({
  task,
}: Props) {

  return (
    <div className="border-t border-slate-100 bg-white p-4">
      <div className="flex items-start gap-3">
        {
          task.assignee.avatar
          ?
          <img
            src={task.assignee.avatar}
            alt="User"
            className="h-8 w-8 rounded-full object-cover"
          />
          :
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs">
            ?
          </div>
        }

        <div className="flex-1 rounded-lg border border-slate-200">
          <textarea
            rows={3}
            placeholder="Write a comment..."
            className="w-full resize-none rounded-t-lg px-3 py-2 text-sm outline-none"

          />
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex gap-3 text-slate-400">
              <button>
                <AtSign size={16}/>
              </button>
              <button>
                <Smile size={16}/>
              </button>
              <button>
                <Image size={16}/>
              </button>
            </div>
            <button
              className="w-full rounded-md bg-[#0052cc] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;