import {AccountSection, SecuritySection, DangerZone} from "@/components";

function Account() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-12">
        <AccountSection />

        <SecuritySection />

        <DangerZone />
      </div>
    </div>
  );
}

export default Account;