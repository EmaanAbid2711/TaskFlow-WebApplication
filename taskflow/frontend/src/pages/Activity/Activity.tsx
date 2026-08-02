import { useEffect, useState } from "react";

import { DashboardLayout } from "@/components";
import ActivityItem from "@/components/activity/ActivityItem";
import { getActivitiesService } from "@/services/activity.service";
import type { ActivityItem as ActivityType } from "@/interfaces/activity";

function Activity() {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });

  useEffect(() => {
    loadActivities(page);
  }, [page]);

  const loadActivities = async (currentPage: number) => {
    try {
      setLoading(true);
      const data = await getActivitiesService(currentPage, 20);
      setActivities(data.activities);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Activity</h1>
        <p className="mt-2 text-slate-500">
          Recent activity across your projects.
        </p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : activities.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-400">No activity yet.</p>
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-between border-t pt-6">
            <button
              onClick={() => setPage((previous) => previous - 1)}
              disabled={!pagination.hasPrevious}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                pagination.hasPrevious
                  ? "bg-[#0052cc] text-white hover:bg-[#0047b3]"
                  : "cursor-not-allowed bg-slate-200 text-slate-500"
              }`}
            >
              Previous
            </button>

            <div className="text-sm text-slate-600">
              Page <span className="font-semibold">{pagination.page}</span> of{" "}
              <span className="font-semibold">{pagination.totalPages}</span>
            </div>

            <button
              onClick={() => setPage((previous) => previous + 1)}
              disabled={!pagination.hasNext}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                pagination.hasNext
                  ? "bg-[#0052cc] text-white hover:bg-[#0047b3]"
                  : "cursor-not-allowed bg-slate-200 text-slate-500"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Activity;