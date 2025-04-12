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
    //Get All Products
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
    //Delete Product
    deleteProduct: builder.mutation({
      query: (documentId) => ({
        url: `/api/products/${documentId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CookieServices.getCookie("jwt")}`,
        },
      }),
      invalidatesTags: (documentId) => {
        return [{ type: "Products", documentId }];
      },
    }),
    updateProduct: builder.mutation({
      query: ({ documentId, body }) => {
        // If body is FormData, log its contents
        if (body instanceof FormData) {
          body.forEach((value, key) => {
            console.log(`${key}: ${value}`);
          });
        } else {
          console.log("Update Product Body:", body); // For non-FormData bodies
        }
    
        return {
          url: `/api/products/${documentId}`,
          method: "PUT",
          body,
          headers: {
            Authorization: `Bearer ${CookieServices.getCookie("jwt")}`,
          },
        };
      },
      async onQueryStarted({ documentId, body }, { dispatch, queryFulfilled }) {
        console.log("Starting update for product ID:", documentId);
    
        if (body instanceof FormData) {
          body.forEach((value, key) => {
            console.log(`${key}: ${value}`); // Log FormData contents
          });
        } else {
          console.log("Product update body:", body); // Log regular body
        }
    
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProducts", documentId, (draft) => {
            Object.assign(draft, body);
          })
        );
    
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    
    
    createProduct: builder.mutation({
      query: (body) => {
        console.log("Creating Product with Body:", body); // Logging the body
        return {
          url: "/api/products",
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${CookieServices.getCookie("jwt")}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
} = apiSlice;
