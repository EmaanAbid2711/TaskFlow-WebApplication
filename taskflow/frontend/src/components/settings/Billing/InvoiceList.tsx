import InvoiceItem from "./InvoiceItem";
import type {
  Invoice,
} from "@/interfaces/billing";

interface Props {
  invoices: Invoice[];
}

function InvoiceList({
  invoices,
}: Props) {
  return (
    <section>
      <h2
        className="
          mb-4
          text-xs
          font-bold
          uppercase
          tracking-wider
          text-slate-400
        "
      >
        Recent Invoices
      </h2>

      <div className="divide-y divide-slate-100">
        {invoices.map(
          (invoice) => (
            <InvoiceItem
              key={invoice.id}
              invoice={invoice}
            />
          )
        )}
      </div>
    </section>
  );
}

export default InvoiceList;