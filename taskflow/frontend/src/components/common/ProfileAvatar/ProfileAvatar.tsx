import { useRef } from "react";
import { Camera } from "lucide-react";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface ProfileAvatarProps {
  image: string;
  name: string;
  onChange: (file: File) => void;
}

function ProfileAvatar({
  image,
  name,
  onChange,
}: ProfileAvatarProps) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    onChange(file);
  };

  return (
    <>
      <button
        type="button"
        onClick={() =>
          fileInputRef.current?.click()
        }
        className="
          group
          relative
          cursor-pointer
        "
      >
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={image}
            alt={name}
          />

          <AvatarFallback>
            {name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Hover overlay */}
        <div
          className="
            absolute inset-0
            flex items-center justify-center
            rounded-full
            bg-black/0
            transition-all
            duration-200
            group-hover:bg-black/40
          "
        >
          <Camera
            size={20}
            className="
              text-white
              opacity-0
              transition
              duration-200
              group-hover:opacity-100
            "
          />
        </div>

        {/* Camera badge */}
        <div
          className="
            absolute bottom-0 right-0
            rounded-full
            bg-[#0052cc]
            p-1
            text-white
            shadow-md
          "
        >
          <Camera size={12} />
        </div>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />
    </>
  );
}

export default ProfileAvatar;