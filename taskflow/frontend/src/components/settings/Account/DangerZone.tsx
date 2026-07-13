import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { deleteAccountService } from "@/services/account.service";

function DangerZone() {
  const [open, setOpen] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const navigate =
    useNavigate();

  const handleDeleteAccount =
    async () => {
      try {
        setDeleting(true);

        await deleteAccountService();

        localStorage.removeItem(
          "token"
        );

        setOpen(false);

        toast.success(
          "Account deleted successfully."
        );

        navigate("/login");
      } catch (error: any) {
        console.error(error);

        toast.error(
          error.response?.data
            ?.message ??
            "Failed to delete account."
        );
      } finally {
        setDeleting(false);
      }
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
            Permanently delete your
            TaskFlow account and all
            associated data. This
            action cannot be undone.
          </p>

          <button
            type="button"
            onClick={() =>
              setOpen(true)
            }
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
              Are you sure you want
              to permanently delete
              your TaskFlow account?
              All your projects,
              tasks, and account
              data will be removed.
              This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <button
              type="button"
              disabled={
                deleting
              }
              onClick={() =>
                setOpen(false)
              }
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
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={
                deleting
              }
              onClick={
                handleDeleteAccount
              }
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {deleting
                ? "Deleting..."
                : "Delete Account"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DangerZone;