interface NotificationToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

function NotificationToggle({
  enabled,
  onToggle,
}: NotificationToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`
        relative
        inline-flex
        h-5
        w-10
        shrink-0
        cursor-pointer
        rounded-full
        border-2
        border-transparent
        transition-colors
        duration-200
        md:h-6
        md:w-11
        ${
          enabled
            ? "bg-[#0052cc]"
            : "bg-slate-200"
        }
      `}
    >
      <span
        className={`
          pointer-events-none
          inline-block
          h-4
          w-4
          rounded-full
          bg-white
          shadow-sm
          transition
          duration-200
          md:h-5
          md:w-5
          ${
            enabled
              ? "translate-x-5 md:translate-x-5"
              : "translate-x-0"
          }
        `}
      />
    </button>
  );
}

export default NotificationToggle;