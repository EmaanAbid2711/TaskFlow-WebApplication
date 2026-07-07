interface Props {
  title: string;
  description: string;
}

function TaskDescription({
  title,
  description,
}: Props) {
  return (
    <section>

      <h2 className="break-words text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
        {title}
      </h2>

      <div className="mt-6">

        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Description
        </label>

        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700 whitespace-pre-line">
          {description}
        </div>

      </div>

    </section>
  );
}

export default TaskDescription;