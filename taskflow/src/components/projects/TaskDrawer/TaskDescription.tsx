interface Props {
  title: string;
  description: string;
}

function TaskDescription({title, description,
}: Props) {
  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>

      <div>

        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Description
        </label>

        <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700 whitespace-pre-line">
          {description}
        </div>

      </div>

    </>
  );
}

export default TaskDescription;