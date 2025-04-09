import { toaster } from "../components/ui/toaster";
import { IProduct } from "../Pages/Products";

export interface ICartItem extends IProduct {
  quantity: number;
  shoppingCartItems: ICartItem[];
}
export const addItemToShoppingCart = (
  cartItem: ICartItem,
  shoppingCartItems: ICartItem[]
) => {
  const existingCartItem = shoppingCartItems.find(
    (item) => item.id === cartItem.id
  );
  if (existingCartItem) {
    toaster.create({
      title: "Added to Cart",
      description: "This item is already in your cart, increasing quantity.",
      type: "success",
      duration: 2000,
      meta: { closable: true },
    });
    return shoppingCartItems.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  toaster.create({
    title: "Added to Cart",
    description: "Item added to your cart.",
    type: "success",
    duration: 2000,
    meta: { closable: true },
  });
  return [...shoppingCartItems, { ...cartItem, quantity: 1 }];
};
