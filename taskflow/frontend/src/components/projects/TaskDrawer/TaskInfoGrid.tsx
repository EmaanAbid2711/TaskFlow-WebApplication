import {
  CalendarDays,
  ChevronDown,
} from "lucide-react";

import type {
  Task
} from "@/interfaces/projects";


interface Props {

  task: Task;

  onChange: (
    field: keyof Task,
    value: any
  ) => void;

}



function TaskInfoGrid({
  task,
  onChange
}: Props) {


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

onChange={(e)=>
onChange(
"status",
e.target.value
)
}

className="
w-full appearance-none
rounded-lg border
border-slate-200
bg-white
px-3 py-2
pr-10 text-sm
outline-none
focus:border-[#0052cc]
"

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
className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
/>


</div>

</div>



{/* Priority */}

<div>


<label className="mb-2 block text-xs font-semibold text-slate-500">
Priority
</label>



<div className="grid grid-cols-3 gap-2">


{
(["High","Medium","Low"] as const)
.map(priority=>(


<button

key={priority}

type="button"

onClick={()=>
onChange(
"priority",
priority
)
}

className={`
rounded-lg
border
py-2
text-xs
font-medium
${
task.priority===priority
?
"bg-white shadow border-[#0052cc]"
:
"bg-slate-50"
}
`}

>

{priority}

</button>


))
}



</div>

</div>





{/* Due Date */}

<div>


<label className="mb-2 block text-xs font-semibold text-slate-500">
Due Date
</label>


<div className="relative">


<input

type="date"

value={task.dueDate}

onChange={(e)=>
onChange(
"dueDate",
e.target.value
)
}


className="
w-full rounded-lg
border border-slate-200
px-3 py-2
text-sm
outline-none
focus:border-[#0052cc]
"

/>


<CalendarDays

size={16}

className="
absolute right-3
top-1/2
-translate-y-1/2
text-slate-400
"

/>


</div>


</div>





{/* Assignee */}

<div>


<label className="mb-2 block text-xs font-semibold text-slate-500">
Assignee
</label>


<input

value={
task.assignee.name
}

onChange={(e)=>

onChange(
"assignee",
{
...task.assignee,
name:e.target.value
}
)

}


placeholder="Assignee name"

className="
w-full rounded-lg
border border-slate-200
px-3 py-2
text-sm
outline-none
focus:border-[#0052cc]
"

/>


</div>



</div>


)

}


export default TaskInfoGrid;