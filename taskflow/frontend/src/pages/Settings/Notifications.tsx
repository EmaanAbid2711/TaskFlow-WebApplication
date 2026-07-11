import { toast } from "sonner";

import {NotificationSection} from "@/components";
import {NotificationActions} from "@/components";

function Notification() {
  const handleSave = () => {
    toast.success(
      "Notification settings saved."
    );
  };

  const handleDiscard = () => {
    toast.success(
      "Changes discarded."
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <NotificationSection />

        <NotificationActions
          onSave={handleSave}
          onDiscard={handleDiscard}
        />
      </div>
    </div>
  );
}

export default Notification;