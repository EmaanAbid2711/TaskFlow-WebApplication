import { MessageSquare } from "lucide-react";

import type {TeamMember as TeamMemberInterface} from "../../../interfaces/dashboard";

interface TeamMemberProps {
  member: TeamMemberInterface;
}

function TeamMember({
  member,
}: TeamMemberProps) {
  return (
    <div className="flex items-center justify-between">

      {/* Left Side */}
      <div className="flex items-center gap-3">

        {/* Avatar */}
        <div className="relative">
          <img
            src={member.avatar}
            alt={member.name}
            className={`h-10 w-10 rounded-full object-cover ${
              !member.online ? "opacity-70" : ""
            }`}
          />

          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
              member.online
                ? "bg-emerald-500"
                : "bg-slate-300"
            }`}
          />
        </div>

        {/* Name & Role */}
        <div>
          <h3
            className={`text-sm font-semibold ${
              member.online
                ? "text-slate-900"
                : "text-slate-500"
            }`}
          >
            {member.name}
          </h3>

          <p className="text-xs text-slate-500">
            {member.role} • {member.online ? "Online" : "Offline"}
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