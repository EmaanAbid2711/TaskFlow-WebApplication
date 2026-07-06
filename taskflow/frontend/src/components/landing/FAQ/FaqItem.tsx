import { ChevronDown } from "lucide-react";

interface Props {
  question: string;
}

function FaqItem({
  question,
}: Props) {
  return (
    <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300">
      <span className="font-medium text-slate-800">
        {question}
      </span>

      <ChevronDown
        size={18}
        className="text-slate-500 transition group-hover:text-slate-700"
      />
    </div>
  );
}

export default FaqItem;