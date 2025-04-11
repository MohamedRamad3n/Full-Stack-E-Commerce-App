import { Image, Table, Button } from "@chakra-ui/react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../app/features/apiSlice";
import { ICartItem } from "../utils";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";
import AlertDialog from "../shared/AlertDialog";
import CookieServices from "../services/CookieServices";
import { toaster } from "../components/ui/toaster";
const DashBoardProductsTable = () => {
  const { data } = useGetProductsQuery({ page: 1 });
  const [clickedProduct, setClickedProduct] = useState<string | null>(null);
  const [deleteDashBoardProduct, { isLoading: isDestroying, isSuccess }] =
    useDeleteProductMutation();
  const [isOpen, setIsOpen] = useState(false);
  console.log(CookieServices.getCookie("jwt"));
  
  const openDialog = () => setIsOpen(true);

  const closeDialog = () => setIsOpen(false);
  useEffect(() => {
    if (isSuccess) {
      closeDialog();
      toaster.create({
        title: "Product Deleted",
        description: "Product deleted successfully",
        type: "success",
      });
    }
  },  [isSuccess]);

  return (
    <Table.Root
      variant="outline"
      borderWidth="1px"
      borderRadius="md"
      maxW="95%"
      mx="auto"
      my={10}
    >
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader textAlign="center">Id</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Title</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Category</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Image</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Price</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Stock</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Action</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data?.data?.map((product: ICartItem) => (
          <Table.Row key={product.id}>
            <Table.Cell textAlign="center">{product.id}</Table.Cell>
            <Table.Cell textAlign="center">{product.title}</Table.Cell>
            <Table.Cell textAlign="center">
              {product.category ? product.category.title : "No Category"}
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Image
                src={`${import.meta.env.VITE_SERVER_URL}${
                  product?.thumbnail?.url
                }`}
                alt={product.title}
                width="50px"
                height="50px"
                borderRadius="50%"
                mx="auto"
                objectFit="cover"
              />
            </Table.Cell>
            <Table.Cell textAlign="center">${product.price}</Table.Cell>
            <Table.Cell textAlign="center">{product.stock}</Table.Cell>
            <Table.Cell textAlign="center">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Link to={`/product/${product.documentId}`}>
                  <Button variant="solid" colorScheme="blue" size="sm">
                    <AiOutlineEye />
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setClickedProduct(product.documentId);
                    openDialog();
                  }}
                  variant="solid"
                  colorScheme="blue"
                  size="sm"
                >
                  <BsTrash />
                </Button>
                <Button variant="solid" colorScheme="red" size="sm">
                  <FiEdit2 />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <AlertDialog
        isOpen={isOpen}
        closeDialog={closeDialog}
        title="Are you sure?"
        dec="This action cannot be undone. This will permanently delete the item and remove it from our systems."
        OkTxt="Delete"
        CancelTxt="Cancel"
        isLoading={isDestroying}
        onDelete={() => deleteDashBoardProduct(clickedProduct)}
      />
    </Table.Root>
  );
};

export default DashBoardProductsTable;
