import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieServices from "../../services/CookieServices";
import { IProduct } from "../../Pages/Products";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => {
        const { page } = args;
        return `/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=7`;
      },
      providesTags: (result) => {
        const tags =
          result?.data?.map((product: IProduct) => ({
            type: "Products",
            id: product.id,
          })) || [];

        return [...tags, { type: "Products", id: "LIST" }];
      },
    }),
    deleteProduct: builder.mutation({
      query: (documentId) => ({
        url: `/api/products/${documentId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CookieServices.getCookie("jwt")}`,
        },
      }),
      invalidatesTags: (result, error, documentId) => {
        return [{ type: "Products", documentId }];
      },
    }),
  }),
});

export const { useGetProductsQuery, useDeleteProductMutation } = apiSlice;
