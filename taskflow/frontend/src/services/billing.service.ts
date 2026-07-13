import {getBillingApi, updatePaymentMethodApi} from "@/api/billing.api";

export const getBillingService =
  async () => {
    return await getBillingApi();
  };

export const updatePaymentMethodService =
  async () => {
    return await updatePaymentMethodApi();
  };