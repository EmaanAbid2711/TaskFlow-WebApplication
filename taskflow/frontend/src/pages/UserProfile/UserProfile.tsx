import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Globe, MapPin } from "lucide-react";
import { toast } from "sonner";

import { getUserByIdService } from "@/services/user.service";
import type { UserProfileData } from "@/interfaces/user";

function UserProfile() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<UserProfileData | null>(
      null
    );

  useEffect(() => {
    if (!id) return;

    loadUser();
  }, [id]);

  const loadUser =
    async () => {
      try {
        setLoading(true);

        const response =
          await getUserByIdService(id!);

        setUser(response.data);
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load user."
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        User not found.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">

      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#0052cc]"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex flex-col items-center">

          {user.avatar ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${user.avatar}`}
              alt={user.name}
              className="h-36 w-36 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#0052cc] text-5xl font-bold text-white">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
          )}

          <h1 className="mt-6 text-3xl font-bold">
            {user.name}
          </h1>

          <p className="mt-2 text-slate-500">
            @{user.username || "username"}
          </p>

          <span className="mt-4 rounded-full bg-[#0052cc]/10 px-4 py-1 text-sm font-medium text-[#0052cc]">
            {user.role || "Member"}
          </span>

        </div>

        <div className="mt-10 grid gap-6">

          <InfoCard
            title="Email"
            value={user.email}
          />

          <InfoCard
            title="Bio"
            value={
              user.bio ||
              "No bio available."
            }
          />

          <InfoCard
            title="Location"
            icon={<MapPin size={18} />}
            value={
              user.location ||
              "Not specified"
            }
          />

          <InfoCard
            title="Website"
            icon={<Globe size={18} />}
            value={
              user.website ||
              "Not specified"
            }
          />

          <InfoCard
            title="Timezone"
            value={
              user.timezone ||
              "Not specified"
            }
          />

        </div>

      </div>

    </div>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

function InfoCard({
  title,
  value,
  icon,
}: InfoCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 p-5">

      <div className="mb-2 flex items-center gap-2">

        {icon}

        <h3 className="font-semibold">
          {title}
        </h3>

      </div>

      <p className="text-slate-600">
        {value}
      </p>

    </div>
  );
}

export default UserProfile;