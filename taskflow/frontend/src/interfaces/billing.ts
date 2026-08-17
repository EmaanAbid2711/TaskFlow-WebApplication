export type BillingPlan =
  | "FREE"
  | "PRO"
  | "ENTERPRISE";

export interface PaymentMethod {
  brand: string;
  last4: string;
  expiry: string;
}

export interface Invoice {
  id: string;
  date: string;
  plan: BillingPlan;
  amount: number;
  status: "Paid" | "Pending";
  downloadUrl: string;
}

export interface Billing {
  plan: BillingPlan;
  price: number;
  billingCycle: string;
  renewDate: string;
  paymentMethod: PaymentMethod;
  features: string[];
  invoices: Invoice[];
}