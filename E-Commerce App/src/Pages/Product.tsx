import {
  Flex,
  Spinner,
  Text,
  Image,
  Box,
  Center,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const fetchProduct = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/products/${id}?populate=*`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const result = await response.json();
    return result.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    enabled: !!id,
  });
  console.log(data);

  if (isLoading) {
    return (
      <Center mt={10}>
        <Spinner size="xl"  color="teal.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt={10}>
        <Text color="red.500" fontSize="lg">
          Failed to load product details. Please try again later.
        </Text>
      </Center>
    );
  }

  const product = data;

  return (
    <Box p={6}>
      <Button onClick={() => navigate(-1)} mb={4} variant="outline">
        ← Back
      </Button>
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        gap={6}
      >
        {product?.thumbnail?.url && (
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${product?.thumbnail?.url}`}
            alt={product.title}
            boxSize="300px"
            objectFit="cover"
            borderRadius="lg"
            shadow="lg"
            loading="lazy"
          />
        )}

        <Box maxW="500px" textAlign={{ base: "center", md: "left" }}>
          <Text fontSize="3xl" fontWeight="bold" mb={2}>
            {product?.title}
          </Text>
          <Text fontSize="md" mb={4} color="gray.600">
            {product?.description}
          </Text>
          <Text fontSize="xl" fontWeight="semibold" color="teal.500">
            ${product?.price}
          </Text>
          <Text fontSize="sm" mt={2} color="gray.500">
            Created at: {new Date(product?.createdAt).toLocaleDateString()}
          </Text>
        </Box>
      </Flex>

      <Box mx={"auto"} mt={6} textAlign="center">
        <Button
          colorScheme="teal"
          size="xl"
          mt={4}
          _hover={{ bg: "teal.600", transform: "scale(1.05)" }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default Product;
