import { useEffect, useState } from "react";
import { DashboardLayout, TeamMemberCard } from "@/components";
import { getAllUsersService } from "@/services/user.service";
import type { TeamMember } from "@/interfaces/dashboard";

function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const users = await getAllUsersService();
      setMembers(users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <p className="mt-2 text-slate-500">
          All registered users of TaskFlow.
        </p>
      </div>

      {loading ? (
        <div className="text-slate-500">Loading...</div>
      ) : (
        <div className="space-y-5">
          {members.map((member) => (
            <div
              key={member.id}
              className=" w-full rounded-xl border bg-white p-5 shadow-sm "
            >
              <TeamMemberCard
                member={member}
              />
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Team;