import { useState } from "react";
import { AtSign, Image, Smile } from "lucide-react";

import type { Task } from "@/interfaces/projects";
import { getAvatarUrl } from "@/lib/image";
import { useAuth } from "@/context/AuthContext";
import { createTaskCommentApi } from "@/api/task.api";

interface Props {
  task: Task;
  refreshTasks: () => Promise<Task[]>;
  onChangeTask: (task: Task) => void;
}

function CommentBox({ task, refreshTasks, onChangeTask }: Props) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostComment = async () => {
    if (!comment.trim()) return;

    try {
      setLoading(true);
      await createTaskCommentApi(task.id, comment);

      const tasks = await refreshTasks();
      const updatedTask = tasks.find((t) => t.id === task.id);

      if (updatedTask) {
        onChangeTask(updatedTask);
      }

      setComment("");
    } catch (error) {
      console.error("Failed to create comment", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-slate-100 bg-white p-4">
      <div className="flex items-start gap-3">
        {user?.avatar ? (
          <img
            src={getAvatarUrl(user.avatar)}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-medium">
            {(user?.name ?? "")
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
        )}

        <div className="flex-1 rounded-lg border border-slate-200">
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full resize-none rounded-t-lg px-3 py-2 text-sm outline-none"
          />

          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3 text-slate-400">
              <button type="button">
                <AtSign size={16} />
              </button>
              <button type="button">
                <Smile size={16} />
              </button>
              <button type="button">
                <Image size={16} />
              </button>
            </div>

            <button
              type="button"
              disabled={loading || !comment.trim()}
              onClick={handlePostComment}
              className="w-full rounded-md bg-[#0052cc] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;