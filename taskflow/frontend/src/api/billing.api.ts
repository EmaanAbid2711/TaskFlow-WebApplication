import api from "./axios";

export const getBillingApi = async () => {
  const response = await api.get("/api/billing");

  return response.data;
};

export const updateBillingPlanApi = async (
  plan: "FREE" | "PRO" | "ENTERPRISE"
) => {
  const response = await api.patch(
    "/api/billing/plan",
    {
      plan,
    }
  );

  return response.data;
};

export const updatePaymentMethodApi = async (
  data: {
    cardBrand: string;
    cardLast4: string;
    cardExpiry: string;
  }
) => {
  const response = await api.patch(
    "/api/billing/payment",
    data
  );

  return response.data;
};