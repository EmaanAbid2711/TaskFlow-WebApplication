import { useEffect, useState } from "react";

import { TeamMemberCard } from "@/components";
import { getAllUsersService } from "@/services/user.service";
import type { TeamMember } from "@/interfaces/dashboard";

function Team() {

  const [members, setMembers] =
    useState<TeamMember[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers =
    async () => {
      try {

        const users =
          await getAllUsersService();

        setMembers(users);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        Loading team...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">

      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-3xl font-bold text-slate-900">
          Team Members
        </h1>

        <div className="space-y-4">

          {members.map((member) => (

            <div
              key={member.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <TeamMemberCard
                member={member}
              />
            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Team;