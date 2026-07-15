import { ArrowRightLeft } from "lucide-react";

import type { Activity } from "@/interfaces/projects";

interface Props {
  activities: Activity[];
}

function ActivityTimeline({
  activities,
}: Props) {

  return (
    <div>

      <div className="mb-5 flex items-center gap-2 border-t border-slate-100 pt-4">

        <ArrowRightLeft
          size={16}
          className="text-slate-400"
        />

        <h3 className="text-sm font-semibold">
          Activity Timeline
        </h3>

      </div>



      {activities.length === 0 ? (

        <p className="text-sm text-slate-400">
          No activity yet
        </p>

      ) : (


        <div className="relative space-y-6 border-l-2 border-slate-100 pl-5">


          {activities.map((activity) => (

            <div
              key={activity.id}
              className="relative"
            >


              {activity.type === "system" ? (

                <>

                  <div className="absolute -left-7 flex h-5 w-5 items-center justify-center rounded-full border border-blue-200 bg-blue-50">

                    <ArrowRightLeft
                      size={10}
                      className="text-[#0052cc]"
                    />

                  </div>


                  <p className="text-sm">
                    {activity.text}
                  </p>


                  <span className="mt-1 block text-xs text-slate-400">
                    {activity.time}
                  </span>

                </>


              ) : (

                <>


                  {activity.avatar ? (

                    <img
                      src={activity.avatar}
                      alt={activity.user}
                      className="absolute -left-8 h-6 w-6 rounded-full border-2 border-white object-cover"
                    />

                  ) : (

                    <div className="absolute -left-8 flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs">
                      ?
                    </div>

                  )}



                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">


                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">


                      <span className="text-xs font-semibold">
                        {activity.user}
                      </span>


                      <span className="text-[10px] text-slate-400">
                        {activity.time}
                      </span>


                    </div>



                    <p className="text-xs leading-5 text-slate-600">
                      {activity.text}
                    </p>


                  </div>


                </>

              )}


            </div>

          ))}


        </div>

      )}


    </div>
  );
}


export default ActivityTimeline;