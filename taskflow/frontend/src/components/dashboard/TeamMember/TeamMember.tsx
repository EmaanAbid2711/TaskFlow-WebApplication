import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { TeamMember as TeamMemberInterface } from "../../../interfaces/dashboard";

interface TeamMemberProps {
  member: TeamMemberInterface;
}

function TeamMember({
  member,
}: TeamMemberProps) {
  const navigate = useNavigate();

  const openProfile = () => {
    navigate(`/team/${member.id}`);
  };

  return (
    <div className="flex items-center justify-between">

      {/* Left Side */}
      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={openProfile}
          className="transition hover:opacity-80"
        >
          {member.avatar ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${member.avatar}`}
              alt={member.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0052cc] text-sm font-semibold text-white">
              {member.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
        </button>

        <div>

          <button
            type="button"
            onClick={openProfile}
            className="text-left"
          >
            <h3 className="text-sm font-semibold text-slate-900 transition hover:text-[#0052cc]">
              {member.name}
            </h3>
          </button>

          <p className="text-xs text-slate-500">
            {member.role || "Member"}
          </p>

        </div>

      </div>

      {/* Chat Button */}
      <button
        type="button"
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#0052cc]"
      >
        <MessageSquare size={18} />
      </button>

    </div>
  );
}

export default TeamMember;