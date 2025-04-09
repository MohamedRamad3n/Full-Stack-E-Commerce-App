"use client";

import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Portal,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { closeCartDrawer, openCartDrawer } from "../app/features/globalSlice";
import { RootState } from "../app/store";
import CartDrawerItem from "./CartDrawerItem";
import { clearCart } from "../app/features/cartSlice";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isOpenCartDrawer } = useSelector((state: RootState) => state.global);
  const { cartProducts } = useSelector((state: RootState) => state.cart);

  return (
    <Drawer.Root
      open={isOpenCartDrawer}
      onOpenChange={(open) => {
        if (open) dispatch(closeCartDrawer());
        else dispatch(openCartDrawer());
      }}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            display="flex"
            flexDirection="column"
            h="100vh"
            maxW="sm"
          >
            {/* Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={4}
              py={3}
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              <Text fontSize="lg" fontWeight="bold">
                Your Cart
              </Text>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Box>

            {/* Body */}
            <Box flex="1" overflowY="auto" px={2} py={2}>
              <VStack align="stretch">
                {cartProducts.length ? (
                  cartProducts.map((item) => (
                    <CartDrawerItem
                      key={item.id}
                      {...item}
                      thumbnail={item.thumbnail?.url}
                    />
                  ))
                ) : (
                  <Text textAlign="center" color="gray.500">
                    Your cart is empty.
                  </Text>
                )}
              </VStack>
            </Box>

            {/* Footer */}
            <Drawer.Footer px={4} py={3}>
              <Button
                colorScheme="red"
                w="full"
                onClick={() => dispatch(clearCart())}
              >
                Clear All
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default CartDrawer;
