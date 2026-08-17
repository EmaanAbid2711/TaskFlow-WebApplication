import { getBillingApi, updateBillingPlanApi, updatePaymentMethodApi} from "@/api/billing.api";
import type { Billing, BillingPlan} from "@/interfaces/billing";

export const getBilling = async (): Promise<Billing> => {
  const response = await getBillingApi();

  return response.data;
};

export const updateBillingPlan = async (
  plan: BillingPlan
): Promise<Billing> => {
  const response = await updateBillingPlanApi(plan);

  return response.data;
};

export const updatePaymentMethod = async (
  cardBrand: string,
  cardLast4: string,
  cardExpiry: string
): Promise<Billing> => {
  const response = await updatePaymentMethodApi({
    cardBrand,
    cardLast4,
    cardExpiry,
  });

  return response.data;
};