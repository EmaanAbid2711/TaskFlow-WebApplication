import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";

function DangerZone() {
  const [open, setOpen] =
    useState(false);

  const handleDeleteAccount = () => {
    setOpen(false);
    toast.error(
      "Account deletion requires backend confirmation."
    );
    // Later:
    // Call delete account API here
  };

  return (
    <>
      <section
        className="
          flex
          items-start
          gap-4
          rounded-3xl
          border border-red-100
          bg-red-50/40
          p-8
        "
      >

        <div className="text-red-500">
          <AlertTriangle size={22} />
        </div>

        <div className="flex-1">

          <h3 className="text-lg font-bold text-slate-900">
            Delete Account
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Permanently delete your TaskFlow account and all
            associated data. This action cannot be undone.
          </p>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              mt-6
              rounded-xl
              border border-red-200
              bg-white
              px-5
              py-3
              text-sm
              font-medium
              text-red-600
              shadow-sm
              transition
              hover:bg-red-50
            "
          >
            Delete My Account
          </button>
        </div>
      </section>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete Account
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete
              your TaskFlow account? All your projects,
              tasks, and account data will be removed.
              This action cannot be undone.
            </DialogDescription>

          </DialogHeader>

          <DialogFooter>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                rounded-lg
                border border-slate-200
                px-4
                py-2
                text-sm
                font-medium
                text-slate-600
                transition
                hover:bg-slate-50
              "
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="
                rounded-lg
                bg-red-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-red-700
              "
            >
              Delete Account
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
}

export default DangerZone;