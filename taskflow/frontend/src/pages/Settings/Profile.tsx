import {useEffect, useMemo, useRef, useState} from "react";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

import {Button, ProfileAvatar} from "@/components";
import { useAuth } from "@/context/AuthContext";
import {getProfileService, updateProfileService} from "@/services/user.service";
import type { UserProfile } from "@/interfaces/user";

function Profile() {
  const { updateUser } = useAuth();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [fullName, setFullName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [website, setWebsite] =
    useState("");

  const [role, setRole] =
    useState("");

  const [timezone, setTimezone] =
    useState("");

  const [avatar, setAvatar] =
    useState("");

  const [avatarFile, setAvatarFile] =
    useState<File | null>(null);

  const [removeAvatar, setRemoveAvatar] =
  useState(false);

  const [initialProfile, setInitialProfile] =
  useState<UserProfile | null>(
    null
  );
  const hasChanges = useMemo(() => {
    if (!initialProfile) {
      return false;
    }
    return (
      fullName !== (initialProfile.name ?? "") ||
      username !== (initialProfile.username ?? "") ||
      bio !== (initialProfile.bio ?? "") ||
      location !== (initialProfile.location ?? "") ||
      website !== (initialProfile.website ?? "") ||
      role !== (initialProfile.role ?? "") ||
      timezone !== (initialProfile.timezone ?? "") ||
      avatarFile !== null ||
        avatar !==
          (
            initialProfile.avatar
              ? `${import.meta.env.VITE_API_URL}${initialProfile.avatar}`
              : ""
          )
    );
  }, [fullName, username, bio, location, website, role, timezone, avatar, initialProfile ]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        setLoading(true);
        const response =
          await getProfileService();
        const user: UserProfile =
          response.data;
          setInitialProfile(user);

        setFullName(user.name ?? "");
        setUsername(user.username ?? "");
        setBio(user.bio ?? "");
        setLocation(user.location ?? "");
        setWebsite(user.website ?? "");
        setRole(user.role ?? "");
        setTimezone(user.timezone ?? "");
        setInitialProfile(user);

        const avatarUrl =
          user.avatar
            ? `${import.meta.env.VITE_API_URL}${user.avatar}`
            : "";

        setAvatar(avatarUrl);
        setAvatarFile(null);
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );
      
        toast.error(
          "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

  const handleImageChange =
    (
      file: File
    ) => {
      const imageUrl =
        URL.createObjectURL(file);
    
      setAvatar(imageUrl);
    
      setAvatarFile(file);

      setRemoveAvatar(false);
    };
  const handleRemoveAvatar =
    () => {
      setAvatar("");
      setAvatarFile(null);
      setRemoveAvatar(true);
    };

  const handleSave =
    async (
      event: React.FormEvent
    ) => {
      event.preventDefault();
    
      if (!hasChanges) {
        return;
      }
    
      try {
        setSaving(true);
      
        const formData =
          new FormData();
      
        formData.append(
          "name",
          fullName
        );
      
        formData.append(
          "username",
          username
        );
      
        formData.append(
          "bio",
          bio
        );
      
        formData.append(
          "location",
          location
        );
      
        formData.append(
          "website",
          website
        );
      
        formData.append(
          "role",
          role
        );
      
        formData.append(
          "timezone",
          timezone
        );

        formData.append(
          "removeAvatar",
          String(removeAvatar)
        );
      
        if (avatarFile) {
          formData.append(
            "avatar",
            avatarFile
          );
        }
      
        const response =
          await updateProfileService(
            formData
          );
        
        const updatedUser =
          response.data;

        const avatarUrl =
          updatedUser.avatar
            ? `${import.meta.env.VITE_API_URL}${updatedUser.avatar}`
            : "";

        setAvatar(avatarUrl);

        setAvatarFile(null);

        setInitialProfile(updatedUser);

        /*
         * Update the global authenticated user.
         * Every component using useAuth() will
         * immediately re-render.
         */
        updateUser({
          name: updatedUser.name,
          avatar: updatedUser.avatar,
        });

        toast.success(
          "Profile updated successfully!"
        );
      } catch (error) {
        console.error(
          "Failed to update profile:",
          error
        );
      
        toast.error(
          "Failed to update profile."
        );
      } finally {
        setSaving(false);
      }
    };

  const handleDiscard =
    async () => {
      await loadProfile();
    };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 pb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your public profile
            information visible to
            teammates and collaborators.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="mt-8 space-y-8"
        >
          {/* Avatar */}
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <ProfileAvatar
              image={avatar}
              name={fullName}
              onChange={
                handleImageChange
              }
              onRemove={
                handleRemoveAvatar
              }
            />

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Profile photo
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                JPG, PNG or GIF ·
                Max 5MB
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="
                    rounded-lg
                    border border-slate-200
                    bg-white
                    px-4 py-2
                    text-sm font-medium
                    text-slate-700
                    shadow-sm
                    transition
                    hover:bg-slate-50
                  "
                >
                  Upload New
                </button>

                <button
                  type="button"
                  onClick={
                    handleRemoveAvatar
                  }
                  className="
                    rounded-lg
                    px-4 py-2
                    text-sm font-medium
                    text-slate-500
                    transition
                    hover:bg-red-50
                    hover:text-red-600
                  "
                >
                  Remove
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file =
                    e.target.files?.[0];
                                
                  if (!file) {
                    return;
                  }
                
                  handleImageChange(file);
                
                  e.target.value = "";
                }}
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="grid gap-2 md:grid-cols-3 md:gap-8">
            <label className="pt-2 text-sm font-semibold text-slate-900">
              Full Name
            </label>

            <div className="md:col-span-2">
              <input
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-[#0052cc]
                  focus:bg-white
                "
              />
            </div>
          </div>

          {/* Username */}
          <div className="grid gap-2 md:grid-cols-3 md:gap-8">
            <div>
              <label className="text-sm font-semibold text-slate-900">
                Username
              </label>

              <p className="mt-1 text-xs text-slate-400">
                taskflow.app/@username
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="    flex    rounded-xl    border border-slate-200    bg-slate-50    focus-within:border-[#0052cc]    focus-within:bg-white">
                <span className="flex items-center px-4 text-slate-400">
                  @
                </span>

                <input
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                  className="    w-full    bg-transparent    py-3 pr-4    outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="grid gap-2 md:grid-cols-3 md:gap-8">
            <div>
              <label className="text-sm font-semibold text-slate-900">
                Bio
              </label>

              <p className="mt-1 text-xs text-slate-400">
                Max 160 characters
              </p>
            </div>

            <div className="md:col-span-2">
              <textarea
                rows={4}
                maxLength={160}
                value={bio}
                onChange={(e) =>
                  setBio(
                    e.target.value
                  )
                }
                className="   w-full    rounded-xl    border border-slate-200    bg-slate-50    px-4 py-3    text-sm    outline-none    transition    focus:border-[#0052cc]    focus:bg-white"
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid gap-2 md:grid-cols-3 md:gap-8">
            <label className="pt-2 text-sm font-semibold text-slate-900">
              Location
            </label>

            <div className="md:col-span-2">
              <div className="    flex    rounded-xl    border border-slate-200    bg-slate-50    focus-within:border-[#0052cc]    focus-within:bg-white">
                <span className="flex items-center pl-4 text-slate-400">
                  <MapPin
                    size={18}
                  />
                </span>

                <input
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  className="    w-full    bg-transparent    px-4 py-3    outline-none"
                />
              </div>
            </div>
          </div>

          {/* Website */}
          <div className="grid gap-2 md:grid-cols-3 md:gap-8">
            <label className="pt-2 text-sm font-semibold text-slate-900">
              Website
            </label>

            <div className="md:col-span-2">
              <div className="    flex    rounded-xl    border border-slate-200    bg-slate-50    focus-within:border-[#0052cc]    focus-within:bg-white">
                <span className="  flex items-center  border-r border-slate-200  px-4   text-sm text-slate-400 ">
                  https://
                </span>

                <input
                  value={website}
                  onChange={(e) =>
                    setWebsite(
                      e.target.value
                    )
                  }
                  className=" w-full bg-transparent px-4 py-3 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="grid gap-2 md:grid-cols-3 md:gap-8">
            <label className="pt-2 text-sm font-semibold text-slate-900">
              Role
            </label>

            <div className="md:col-span-2">
              <input
                value={role}
                onChange={(e) =>
                  setRole(
                    e.target.value
                  )
                }
                className="  w-full  rounded-xl  border border-slate-200  bg-slate-50  px-4 py-3  outline-none  transition  focus:border-[#0052cc]  focus:bg-white "
              />
            </div>
          </div>

          {/* Timezone */}
          <div className="grid gap-2 md:grid-cols-3 md:gap-8">
            <label className="pt-2 text-sm font-semibold text-slate-900">
              Timezone
            </label>

            <div className="md:col-span-2">
              <select
                value={timezone}
                onChange={(e) =>
                  setTimezone(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0052cc] focus:bg-white "
              >
                <option>
                  Pacific Time (PT)
                </option>
                <option>
                  Eastern Time (ET)
                </option>
                <option>
                  Central Europe Time (CET)
                </option>
                <option>
                  Pakistan Standard Time (PKT)
                </option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-8">
            <div className="w-[220px]">
              <Button
                type="submit"
                loading={saving}
                disabled={
                  saving || !hasChanges
                }
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </div>

            <button
              type="button"
              onClick={
                handleDiscard
              }
              className="rounded-xl  px-5 py-3  text-sm font-medium  text-slate-500  transition  hover:bg-red-50  hover:text-red-600"
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Profile;