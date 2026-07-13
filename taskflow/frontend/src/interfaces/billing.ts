export interface Invoice {
  id: string;
  date: string;
  plan: string;
  amount: number;
  status: "Paid" | "Pending";
  downloadUrl: string;
}

export interface BillingInfo {
  plan: string;
  price: number;
  billingCycle: string;
  renewDate: string;

  paymentMethod: {
    brand: string;
    last4: string;
    expiry: string;
  };

  invoices: Invoice[];
}