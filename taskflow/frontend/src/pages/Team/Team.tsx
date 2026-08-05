import { useEffect, useState } from "react";

import { TeamMemberCard } from "@/components";
import { toast } from "sonner";
import type { TeamMember } from "@/interfaces/dashboard";
import { getTeamMembersService, inviteTeamMemberService} from "@/services/team.service";

function Team() {
  const [members, setMembers] =
    useState<TeamMember[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showInviteModal, setShowInviteModal] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [sending, setSending] =
    useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await getTeamMembersService();

const formattedMembers = data.map(
  (item: any) => ({
    id: item.member.id,
    name: item.member.name,
    email: item.member.email,
    avatar: item.member.avatar,
    username: item.member.username,
    role: "Member",
  })
);
setMembers(formattedMembers);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendInvitation = async () => {
    if (!email.trim()) return;

    try {
      setSending(true);

      await inviteTeamMemberService({
        email,
      });

      toast.success("Invitation sent successfully.");

      setEmail("");

      setShowInviteModal(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to send invitation."
      );
    } finally {
      setSending(false);
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

        <div className="mb-8 flex items-center justify-between">

          <h1 className="text-3xl font-bold text-slate-900">
            Team Members
          </h1>

          <button
            onClick={() =>
              setShowInviteModal(true)
            }
            className="rounded-xl bg-[#0052cc] px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Invite Member
          </button>

        </div>

        <div className="space-y-4">

          {members.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
              No teammates yet.
            </div>
          )}

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

      {showInviteModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="w-[420px] rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="text-xl font-semibold">
              Invite Team Member
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Enter the email address of a registered TaskFlow user.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="example@gmail.com"
              className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0052cc]"
            />

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowInviteModal(false)
                }
                className="rounded-xl border border-slate-300 px-5 py-2"
              >
                Cancel
              </button>

              <button
                disabled={sending}
                onClick={sendInvitation}
                className="rounded-xl bg-[#0052cc] px-5 py-2 text-white disabled:opacity-50"
              >
                {sending
                  ? "Sending..."
                  : "Send Invitation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Team;