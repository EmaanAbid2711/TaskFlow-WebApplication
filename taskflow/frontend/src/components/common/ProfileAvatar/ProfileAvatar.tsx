import { useRef, useState } from "react";
import {Camera, Upload, Eye, Trash2} from "lucide-react";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

interface ProfileAvatarProps {
  image?: string;
  name: string;
  onChange: (file: File) => void;
  onRemove?: () => void;
}

function ProfileAvatar({
  image,
  name,
  onChange,
  onRemove,
}: ProfileAvatarProps) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    onChange(file);

    event.target.value = "";
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      <DropdownMenu>
        <DropdownMenuTrigger
          type="button"
          className="group relative outline-none"
        >
          <Avatar className="h-20 w-20 cursor-pointer ring-2 ring-slate-200 transition-all duration-200 group-hover:ring-[#0052cc]">
            <AvatarImage
              src={image}
              alt={name}
            />

            <AvatarFallback className="bg-[#0052cc] text-lg font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="absolute right-0 bottom-0 rounded-full bg-[#0052cc] p-1.5 text-white shadow-lg transition group-hover:scale-110">
            <Camera size={14} />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-56"
        >
          <DropdownMenuItem
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="cursor-pointer"
          >
            <Upload
              size={16}
              className="mr-2"
            />
            Upload New Photo
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={!image}
            onClick={() =>
              setPreviewOpen(true)
            }
            className="cursor-pointer"
          >
            <Eye
              size={16}
              className="mr-2"
            />
            View Photo
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={!image}
            onClick={onRemove}
            variant="destructive"
            className="cursor-pointer"
          >
            <Trash2
              size={16}
              className="mr-2"
            />
            Remove Photo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Profile Photo
            </DialogTitle>
          </DialogHeader>

          {image && (
            <img
              src={image}
              alt={name}
              className="mx-auto max-h-[420px] w-full rounded-2xl object-cover"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProfileAvatar;