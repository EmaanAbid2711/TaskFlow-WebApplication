import { Badge } from "@/components/ui/badge";
import type { Invoice } from "@/interfaces/billing";

interface Props {
  invoice: Invoice;
}

function InvoiceItem({
  invoice,
}: Props) {
  return (
    <div
      className="
        flex flex-col gap-4
        py-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div>
        <h4 className="text-sm font-medium text-slate-900">
          {invoice.date}
        </h4>

        <p className="mt-1 text-xs text-slate-400">
          {invoice.plan}
          {" "}
          · Monthly
        </p>
      </div>

      <div
        className="
          flex flex-wrap
          items-center
          gap-4
        "
      >
        <span className="text-sm font-semibold text-slate-900">
          ${invoice.amount.toFixed(2)}
        </span>

        <Badge
          className="
            bg-green-100
            text-green-700
            hover:bg-green-100
          "
        >
          {invoice.status}
        </Badge>

      </div>
    </div>
  );
}

export default InvoiceItem;