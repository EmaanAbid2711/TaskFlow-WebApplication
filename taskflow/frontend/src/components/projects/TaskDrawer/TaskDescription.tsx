import type { Task } from "@/interfaces/projects";

interface Props {
  task: Task;

  onChange: (
    field: keyof Task,
    value: any
  ) => void;
}

function TaskDescription({
  task,
  onChange,
}: Props) {
  return (
    <section>
      <div>

        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Task Title
        </label>

        <input
          type="text"
          value={task.title}
          onChange={(e) =>
            onChange(
              "title",
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-lg font-semibold outline-none focus:border-[#0052cc]"
        />

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Description
        </label>

        <textarea
          rows={8}
          value={task.description}
          onChange={(e) =>
            onChange(
              "description",
              e.target.value
            )
          }
          className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 outline-none focus:border-[#0052cc]"
        />

      </div>
    </section>
  );
}

export default TaskDescription;