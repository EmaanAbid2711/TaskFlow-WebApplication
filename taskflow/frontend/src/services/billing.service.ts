import { getBillingApi, updateBillingPlanApi, updatePaymentMethodApi,} from "@/api/billing.api";
import type { Billing, BillingPlan} from "@/interfaces/billing";

export const getBilling = (): Promise<Billing> => {
  return getBillingApi();
};

export const updateBillingPlan = (
  plan: BillingPlan
): Promise<Billing> => {
  return updateBillingPlanApi(plan);
};

export const updatePaymentMethod = (
  cardBrand: string,
  cardLast4: string,
  cardExpiry: string
): Promise<Billing> => {
  return updatePaymentMethodApi({
    cardBrand,
    cardLast4,
    cardExpiry,
  });
};