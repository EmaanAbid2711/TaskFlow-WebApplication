import { getBillingApi, updateBillingPlanApi, updatePaymentMethodApi} from "@/api/billing.api";
import type { Billing, BillingPlan} from "@/interfaces/billing";

interface BillingApiResponse {
  success: boolean;
  data: Billing;
}

export const getBilling = async (): Promise<Billing> => {
  const response =
    (await getBillingApi()) as BillingApiResponse;

  return response.data;
};

export const updateBillingPlan = async (
  plan: BillingPlan
): Promise<Billing> => {
  const response =
    (await updateBillingPlanApi(plan)) as BillingApiResponse;

  return response.data;
};

export const updatePaymentMethod = async (
  cardBrand: string,
  cardLast4: string,
  cardExpiry: string
): Promise<Billing> => {
  const response =
    (await updatePaymentMethodApi({
      cardBrand,
      cardLast4,
      cardExpiry,
    })) as BillingApiResponse;

  return response.data;
};