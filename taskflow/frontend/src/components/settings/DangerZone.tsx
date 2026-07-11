import { AlertTriangle } from "lucide-react";

function DangerZone() {
  return (
    <section className="flex items-start gap-4 rounded-3xl border border-red-100 bg-red-50/40 p-8">
      <div className="text-red-500">
        <AlertTriangle
          size={22}
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-900">
          Delete Account
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Permanently delete your
          TaskFlow account and all
          associated data. This action
          cannot be undone.
        </p>

        <button
          type="button"
          className="
            mt-6
            rounded-xl
            border border-red-200
            bg-white
            px-5 py-3
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
  );
}

export default DangerZone;