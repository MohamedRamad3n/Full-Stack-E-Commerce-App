import { Grid, Text, Center } from "@chakra-ui/react";
import ProductCard from "../AppComponents/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skelton from "../AppComponents/Skelton";

export interface IProduct {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: ICategory;
  createdAt: string;
  thumbnail: {
    url: string;
  };
}
interface ICategory {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ProductsPage = () => {
  const fetchProducts = async (): Promise<IProduct[]> => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products?populate=*`
      );
      return data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const { data, isLoading, error } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  if (isLoading) {
    return (
      <Grid
        margin={30}
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        gap={6}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <Skelton key={index} />
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Center mt={10}>
        <Text color="red.500">Failed to load products.</Text>
      </Center>
    );
  }

  return (
    <Grid
      margin={30}
      templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
      gap={6}
    >
      {data?.map((product) => (
        <ProductCard
          key={product.id}
          attributes={{
            ...product,
            quantity: 0,
            shoppingCartItems: [],
          }}
        />
      ))}
    </Grid>
  );
};

export default ProductsPage;
