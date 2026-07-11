import {NotificationSection} from "@/components";

function Notification() {
    return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <NotificationSection />
      </div>
    </div>
  );
}

export default Notification;