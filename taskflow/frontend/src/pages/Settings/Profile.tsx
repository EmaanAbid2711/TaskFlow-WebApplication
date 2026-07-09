import { useRef, useState } from "react";
import { MapPin } from "lucide-react";

import { Button, ProfileAvatar } from "@/components";

function Profile() {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const defaultAvatar =
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200";

  const [fullName, setFullName] =
    useState("Alex Morgan");

  const [username, setUsername] =
    useState("alexmorgan");

  const [bio, setBio] = useState(
    "Product designer & developer. Building tools that help teams move faster."
  );

  const [location, setLocation] =
    useState("San Francisco, CA");

  const [website, setWebsite] =
    useState("alexmorgan.dev");

  const [role, setRole] =
    useState("Designer");

  const [timezone, setTimezone] =
    useState("Pacific Time (PT)");

  const [avatar, setAvatar] =
    useState(defaultAvatar);

  const handleImageChange = (
    file: File
  ) => {
    const imageUrl =
      URL.createObjectURL(file);

    setAvatar(imageUrl);
  };

  const handleRemoveAvatar = () => {
    setAvatar(defaultAvatar);
  };

  const handleSave = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    console.log({
      fullName,
      username,
      bio,
      location,
      website,
      role,
      timezone,
      avatar,
    });
  };

  const handleDiscard = () => {
    setFullName("Alex Morgan");
    setUsername("alexmorgan");

    setBio(
      "Product designer & developer. Building tools that help teams move faster."
    );

    setLocation(
      "San Francisco, CA"
    );

    setWebsite(
      "alexmorgan.dev"
    );

    setRole("Designer");

    setTimezone(
      "Pacific Time (PT)"
    );

    setAvatar(defaultAvatar);
  };

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
              onChange={handleImageChange}
            />

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Profile photo
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                JPG, PNG or GIF · Max
                5MB
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
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

              {/* Hidden input for Upload button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file =
                    e.target.files?.[0];

                  if (!file) return;

                  handleImageChange(
                    file
                  );
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
              <div className="
                flex rounded-xl
                border border-slate-200
                bg-slate-50
                focus-within:border-[#0052cc]
                focus-within:bg-white
              ">
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
                  className="
                    w-full
                    bg-transparent
                    py-3 pr-4
                    outline-none
                  "
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

          {/* Location */}
          <div className="grid gap-2 md:grid-cols-3 md:gap-8">
            <label className="pt-2 text-sm font-semibold text-slate-900">
              Location
            </label>

            <div className="md:col-span-2">
              <div className="
                flex rounded-xl
                border border-slate-200
                bg-slate-50
                focus-within:border-[#0052cc]
                focus-within:bg-white
              ">
                <span className="flex items-center pl-4 text-slate-400">
                  <MapPin size={18} />
                </span>

                <input
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    bg-transparent
                    px-4 py-3
                    outline-none
                  "
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
              <div className="
                flex rounded-xl
                border border-slate-200
                bg-slate-50
                focus-within:border-[#0052cc]
                focus-within:bg-white
              ">
                <span className="
                  flex items-center
                  border-r border-slate-200
                  px-4
                  text-sm text-slate-400
                ">
                  https://
                </span>

                <input
                  value={website}
                  onChange={(e) =>
                    setWebsite(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    bg-transparent
                    px-4 py-3
                    outline-none
                  "
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
                className="
                  w-full
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-3
                  outline-none
                  transition
                  focus:border-[#0052cc]
                  focus:bg-white
                "
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
                className="
                  w-full
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-3
                  outline-none
                  transition
                  focus:border-[#0052cc]
                  focus:bg-white
                "
              >
                <option>
                  Pacific Time (PT)
                </option>
                <option>
                  Eastern Time (ET)
                </option>
                <option>
                  Central Europe Time
                  (CET)
                </option>
                <option>
                  Pakistan Standard Time
                  (PKT)
                </option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-8">
            <div className="w-[220px]">
              <Button type="submit">
                Save Changes
              </Button>
            </div>

            <button
              type="button"
              onClick={handleDiscard}
              className="
                rounded-xl
                px-5 py-3
                text-sm font-medium
                text-slate-500
                transition
                hover:bg-red-50
                hover:text-red-600
              "
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