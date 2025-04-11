import React from "react";
import { Box, Flex, Image, Text, Spacer, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../app/features/cartSlice";

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
};

const CartDrawerItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  quantity,
  thumbnail,
}) => {
  const dispatch = useDispatch();
  return (
    <Flex
      align="center"
      borderBottom="1px solid"
      borderColor="gray.200"
      py={3}
      px={2}
    >
      {thumbnail ? (
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${thumbnail}`}
          alt={title}
          boxSize="60px"
          objectFit="cover"
          borderRadius="md"
          mr={4}
        />
      ) : (
        <Box boxSize="60px" bg="gray.100" borderRadius="md" mr={4} />
      )}

      <Box>
        <Text fontWeight="medium">Title: {title}</Text>
        <Text fontSize="sm" color="gray.500">
          Quantity: {quantity}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          Price: ${price.toFixed(2)}
        </Text>
      </Box>
      <Spacer />
      <Button
        onClick={() => dispatch(removeFromCart({id}))}
        variant="outline"
        colorScheme="red"
        size="sm"
        ml={4}
      >
        Remove
      </Button>
    </Flex>
  );
};

export default CartDrawerItem;
