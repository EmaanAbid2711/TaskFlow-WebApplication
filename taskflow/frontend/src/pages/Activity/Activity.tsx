import { useEffect, useState} from "react";

import { DashboardLayout} from "@/components";
import ActivityItem from "@/components/activity/ActivityItem";
import { getActivitiesService} from "@/services/activity.service";
import type { ActivityItem as ActivityType} from "@/interfaces/activity";

function Activity() {

  const [
    activities,
    setActivities,
  ] =
  useState<ActivityType[]>([]);

  const [
    loading,
    setLoading,
  ] =
  useState(true);

  useEffect(() => {

    loadActivities();

  }, []);

  const loadActivities =
  async () => {

    try {

      const data =
        await getActivitiesService();

      setActivities(data);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Activity

        </h1>

        <p className="mt-2 text-slate-500">

          Recent activity across your projects.

        </p>

      </div>

      {loading ? (

        <p>

          Loading...

        </p>

      ) : activities.length === 0 ? (

        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">

          <p className="text-slate-400">

            No activity yet.

          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {activities.map(
            activity => (

              <ActivityItem
                key={activity.id}
                activity={activity}
              />

            )
          )}

        </div>

      )}

    </DashboardLayout>

  );

}

export default Activity;