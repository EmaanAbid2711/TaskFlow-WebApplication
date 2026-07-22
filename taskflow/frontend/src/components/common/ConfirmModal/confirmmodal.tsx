import { AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  open,
  title = "Are you sure?",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,

}: Props) {


  if (!open) return null;


  return (
    <div
      className="
      fixed inset-0
      z-[100]
      flex items-center
      justify-center
      bg-black/40
      px-4
      "
    >

      <div
        className="
        w-full
        max-w-sm
        rounded-xl
        bg-white
        p-6
        shadow-2xl
        "
      >

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <div
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-red-100
            text-red-600
            "
          >

            <AlertTriangle size={22}/>

          </div>


          <h3
            className="
            text-lg
            font-semibold
            text-slate-800
            "
          >
            {title}
          </h3>

        </div>


        <p
          className="
          mt-4
          text-sm
          text-slate-500
          "
        >
          {message}
        </p>


        <div
          className="
          mt-6
          flex
          justify-end
          gap-3
          "
        >

          <button
            onClick={onCancel}
            className="
            rounded-md
            border
            border-slate-200
            px-4
            py-2
            text-sm
            font-medium
            text-slate-600
            hover:bg-slate-50
            "
          >
            {cancelText}

          </button>


          <button
            onClick={onConfirm}
            className="
            rounded-md
            bg-red-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            hover:bg-red-700
            "
          >
            {confirmText}

          </button>


        </div>


      </div>


    </div>
  );
}


export default ConfirmModal;