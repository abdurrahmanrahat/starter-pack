import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: (args: Record<string, any>) => ({
        url: "/payments",
        method: "GET",
        params: args,
      }),
      providesTags: ["payment"],
    }),
    getSinglePayment: builder.query({
      query: (paymentID: string) => ({
        url: `/payments/${paymentID}`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
    makePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payments/create-payment",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["payment"],
    }),
    updatePayment: builder.mutation({
      query: (payload) => ({
        url: `/payments/${payload.paymentID}`,
        method: "PATCH",
        body: payload.updatedData,
      }),
      invalidatesTags: ["payment"],
    }),
    deletePayment: builder.mutation({
      query: (paymentID: string) => ({
        url: `/payments/${paymentID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetSinglePaymentQuery,
  useMakePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
