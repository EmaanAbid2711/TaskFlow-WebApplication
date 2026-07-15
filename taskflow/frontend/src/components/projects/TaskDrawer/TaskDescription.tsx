interface Props {
  title: string;

  description: string;

  onChange: (
    field: "title" | "description",
    value: string
  ) => void;
}


function TaskDescription({
  title,
  description,
  onChange,
}: Props) {


  return (
    <section>


      {/* Title */}

      <div>

        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Task Title
        </label>


        <input
          type="text"
          value={title}
          onChange={(e) =>
            onChange(
              "title",
              e.target.value
            )
          }
          placeholder="Enter task title"
          className="
          w-full rounded-xl
          border border-slate-200
          bg-white
          px-4 py-3
          text-lg font-semibold
          text-slate-900
          outline-none
          focus:border-[#0052cc]
          "
        />

      </div>



      {/* Description */}

      <div className="mt-6">


        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Description
        </label>



        <textarea

          value={description}

          onChange={(e)=>
            onChange(
              "description",
              e.target.value
            )
          }

          rows={8}

          placeholder="Describe the task..."

          className="
          w-full resize-none
          rounded-xl
          border border-slate-200
          bg-white
          p-4
          text-sm
          leading-7
          text-slate-700
          outline-none
          focus:border-[#0052cc]
          "

        />

      </div>


    </section>
  );
}


export default TaskDescription;