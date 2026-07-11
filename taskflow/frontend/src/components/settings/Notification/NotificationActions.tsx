import { Button } from "@/components";

interface NotificationActionsProps {
  onSave: () => void;
  onDiscard: () => void;
}

function NotificationActions({
  onSave,
  onDiscard,
}: NotificationActionsProps) {
  return (
    <div className="flex items-center gap-6 pt-2">
      <div className="w-[220px]">
        <Button
          type="button"
          onClick={onSave}
        >
          Save Changes
        </Button>
      </div>

      <button
        type="button"
        onClick={onDiscard}
        className="
          text-sm
          font-medium
          text-slate-500
          transition
          hover:text-slate-700
        "
      >
        Discard
      </button>
    </div>
  );
}

export default NotificationActions;