import api from "./axios";

export const getBillingApi = async () => {
  const response = await api.get("/api/billing");

  return response.data;
};

export const updatePaymentMethodApi =
  async () => {
    const response =
      await api.patch(
        "/api/billing/payment-method"
      );

    return response.data;
  };