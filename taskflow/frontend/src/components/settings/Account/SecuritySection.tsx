import {  Shield} from "lucide-react";
import {useEffect, useState} from "react";
import {toast} from "sonner";

import {getSecurityService, updateSecurityService} from "@/services/account.service";

function SecuritySection() {
  const [
    twoFactorEnabled,
    setTwoFactorEnabled,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    loadSecurity();
  }, []);

  const loadSecurity =
    async () => {
      try {
        setLoading(true);

        const response =
          await getSecurityService();

        setTwoFactorEnabled(
          response.data
            .twoFactorEnabled
        );
      } catch {
        toast.error(
          "Failed to load security settings."
        );
      } finally {
        setLoading(false);
      }
    };

  const handleToggle2FA =
    async () => {
      const newState =
        !twoFactorEnabled;

      try {
        setTwoFactorEnabled(
          newState
        );

        await updateSecurityService(
          newState
        );

        if (newState) {
          toast.success(
            "Two-factor authentication enabled."
          );
        } else {
          toast.success(
            "Two-factor authentication disabled."
          );
        }
      } catch {
        setTwoFactorEnabled(
          !newState
        );

        toast.error(
          "Failed to update security settings."
        );
      }
    };

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <p className="text-slate-500">
          Loading security settings...
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Security & Privacy
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage two-factor authentication and privacy controls.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div
          className="
            flex items-center justify-between
            rounded-2xl
            border border-slate-100
            bg-slate-50
            p-5
          "
        >
          <div className="flex items-start gap-4">
            <div
              className={`
                rounded-xl
                border
                p-3
                ${
                  twoFactorEnabled
                    ? "border-green-100 bg-green-50 text-green-600"
                    : "border-slate-200 bg-white text-slate-400"
                }
              `}
            >
              <Shield size={20} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Two-factor authentication
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {twoFactorEnabled
                  ? "Your account is protected with 2FA."
                  : "Add an extra layer of security to your account."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={
              handleToggle2FA
            }
            className={`
              relative
              h-6
              w-11
              rounded-full
              transition
              ${
                twoFactorEnabled
                  ? "bg-[#0052cc]"
                  : "bg-slate-300"
              }
            `}
          >
            <span
              className={`
                absolute
                top-1
                h-4
                w-4
                rounded-full
                bg-white
                shadow-sm
                transition
                ${
                  twoFactorEnabled
                    ? "right-1"
                    : "left-1"
                }
              `}
            />
          </button>
        </div>

        {twoFactorEnabled && (
          <div
            className="
              flex items-center justify-between
              rounded-2xl
              border border-green-100
              bg-green-50
              px-5 py-4
            "
          >
            <p
              className="
                text-sm
                font-medium
                text-green-800
              "
            >
              2FA is enabled.
              Authenticator app configured.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SecuritySection;