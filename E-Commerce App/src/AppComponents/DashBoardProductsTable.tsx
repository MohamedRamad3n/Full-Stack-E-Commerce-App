import {
  Image,
  Table,
  Button,
  Stack,
  Field,
  Input,
  NumberInput,
  Flex,
} from "@chakra-ui/react";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../app/features/apiSlice";
import { ICartItem } from "../utils";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";
import AlertDialog from "../shared/AlertDialog";
import { toaster } from "../components/ui/toaster";
import Modal from "../shared/Modal";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { IProduct } from "../Pages/Products";
import DashBoardProductsTableSkeleton from "./TableSkelton";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const DashBoardProductsTable = () => {
  const { data: productsData, isLoading } = useGetProductsQuery({ page: 1 });
  const [clickedProduct, setClickedProduct] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const initialProductState = {
    id: 0,
    title: "",
    description: "",
    price: 0,
    stock: 0,
    thumbnail: { url: "" },
    image: "",
    createdAt: "",
    documentId: "",
  };

  const [productToEdit, setProductToEdit] =
    useState<IProduct>(initialProductState);
  const [productToCreate, setProductToCreate] =
    useState<IProduct>(initialProductState);

  const [deleteDashBoardProduct, { isLoading: isDestroying, isSuccess }] =
    useDeleteProductMutation();
  const [
    updateDashBoardProduct,
    { isLoading: isUpdating, isSuccess: IsUpdatedSuccess },
  ] = useUpdateProductMutation();
  const [
    createDashBoardProduct,
    { isLoading: isCreating, isSuccess: IsCreatedSuccess },
  ] = useCreateProductMutation();
  const { isOnline } = useSelector((state: RootState) => state.network);
  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalToCreate, setIsOpenModalToCreate] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const openModalToCreate = () => setIsOpenModalToCreate(true);
  const closeModalToCreate = () => setIsOpenModalToCreate(false);

  const onchangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
  };

  const onChangeCreateHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductToCreate({
      ...productToCreate,
      [name]: value,
    });
  };

  const onChangePriceHandler = (value: number | string, isCreate = false) => {
    const val = +value;
    if (isCreate) {
      setProductToCreate({
        ...productToCreate,
        price: val,
      });
    } else {
      setProductToEdit({
        ...productToEdit,
        price: val,
      });
    }
  };

  const onChangeStockHandler = (value: number | string, isCreate = false) => {
    const val = +value;
    if (isCreate) {
      setProductToCreate({
        ...productToCreate,
        stock: val,
      });
    } else {
      setProductToEdit({
        ...productToEdit,
        stock: val,
      });
    }
  };

  const validateProduct = (product: IProduct) => {
    const errors = [];
    if (!product.title.trim()) errors.push("Title is required");
    if (!product.description.trim()) errors.push("Description is required");
    if (product.price <= 0) errors.push("Price must be positive");
    if (product.stock < 0) errors.push("Stock cannot be negative");
    return errors;
  };

  const logFormData = (formData: FormData) => {
    console.log("FormData contents:");
    for (const [key, value] of formData.entries()) {
      if (key === "data") {
        try {
          console.log(key, JSON.parse(value as string));
        } catch {
          console.log(key, "Could not parse JSON:", value);
        }
      } else {
        console.log(key, value);
      }
    }
  };

  const handleUpdateProduct = () => {
    if (!clickedProduct) return;

    const validationErrors = validateProduct(productToEdit);
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        toaster.create({
          title: "Validation Error",
          description: error,
          type: "error",
        });
      });
      return;
    }

    const formData = new FormData();
    const productData = {
      title: productToEdit.title,
      description: productToEdit.description,
      price: productToEdit.price,
      stock: productToEdit.stock,
    };

    formData.append("data", JSON.stringify(productData));

    if (thumbnailFile) {
      formData.append("files.thumbnail", thumbnailFile);
    } else if (productToEdit.thumbnail?.url) {
      formData.append("thumbnail", productToEdit.thumbnail.url);
    }

    logFormData(formData);
    updateDashBoardProduct({ documentId: clickedProduct, body: formData });
  };

  const handleCreateProduct = () => {
    const validationErrors = validateProduct(productToCreate);
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        toaster.create({
          title: "Validation Error",
          description: error,
          type: "error",
        });
      });
      return;
    }

    if (!thumbnailFile) {
      toaster.create({
        title: "Error",
        description: "Thumbnail image is required",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price,
        stock: productToEdit.stock,
      })
    );

    formData.append("files.thumbnail", thumbnailFile);

    logFormData(formData);
    createDashBoardProduct(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setClickedProduct(null);
      closeDialog();
      toaster.create({
        title: "Product Deleted",
        description: "Product deleted successfully",
        type: "success",
      });
    }
    if (IsUpdatedSuccess) {
      setClickedProduct(null);
      closeModal();
      setThumbnailFile(null);
      toaster.create({
        title: "Product Updated",
        description: "Product Updated successfully",
        type: "success",
      });
    }
    if (IsCreatedSuccess) {
      setProductToCreate(initialProductState);
      setThumbnailFile(null);
      closeModalToCreate();
      toaster.create({
        title: "Product Created",
        description: "Product created successfully",
        type: "success",
      });
    }
  }, [isSuccess, IsUpdatedSuccess, IsCreatedSuccess]);
  if (isLoading || !isOnline) return <DashBoardProductsTableSkeleton />
  return (
    <>
      <Flex direction={"column"} mx={"auto"} my={6}>
        <Button
          colorPalette="teal"
          variant="solid"
          w={"fit-content"}
          ml={"auto"}
          mr={"30px"}
          onClick={openModalToCreate}
        >
          Create
        </Button>
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
              <Table.ColumnHeader textAlign="center">
                Category
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Image</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Price</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Stock</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Action</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {productsData?.data?.map((product: ICartItem) => (
              <Table.Row key={product.id}>
                <Table.Cell textAlign="center">{product.id}</Table.Cell>
                <Table.Cell textAlign="center">{product.title}</Table.Cell>
                <Table.Cell textAlign="center">
                  {product.category ? product.category.title : "No Category"}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Image
                    src={`${import.meta.env.VITE_SERVER_URL}${product?.thumbnail?.url
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
                  <Flex justify="center" gap="10px">
                    <Link to={`/product/${product.documentId}`}>
                      <Button variant="outline" colorPalette="blue" size="sm">
                        <AiOutlineEye />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        setClickedProduct(product.documentId);
                        openDialog();
                      }}
                      variant="outline"
                      colorPalette="red"
                      size="sm"
                    >
                      <BsTrash />
                    </Button>
                    <Button
                      onClick={() => {
                        setClickedProduct(product.documentId);
                        setProductToEdit(product);
                        openModal();
                      }}
                      variant="outline"
                      colorPalette="green"
                      size="sm"
                    >
                      <FiEdit2 />
                    </Button>
                  </Flex>
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
          <Modal
            open={isOpenModal}
            close={closeModal}
            title={"Update Product"}
            okTxt="Update"
            onConfirm={handleUpdateProduct}
            isLoading={isUpdating}
          >
            <Stack gap="4">
              <Field.Root>
                <Field.Label>Title</Field.Label>
                <Input
                  placeholder="Product Title"
                  name="title"
                  value={productToEdit.title}
                  onChange={onchangeHandler}
                  required
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Input
                  placeholder="Product Description"
                  name="description"
                  value={productToEdit.description}
                  onChange={onchangeHandler}
                  required
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Price</Field.Label>
                <NumberInput.Root w="full" min={0}>
                  <NumberInput.Control />
                  <NumberInput.Input
                    name="price"
                    value={productToEdit.price}
                    onChange={(e) => onChangePriceHandler(e.target.value)}
                    placeholder="Price"
                    required
                  />
                </NumberInput.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label>Stock</Field.Label>
                <NumberInput.Root w="full" min={0}>
                  <NumberInput.Control />
                  <NumberInput.Input
                    name="stock"
                    value={productToEdit.stock}
                    onChange={(e) => onChangeStockHandler(e.target.value)}
                    placeholder="Stock"
                    required
                  />
                </NumberInput.Root>
              </Field.Root>
              <FormControl>
                <FormLabel>Thumbnail</FormLabel>
                <Input
                  id="thumbnail"
                  type="file"
                  h={"full"}
                  onChange={(e) =>
                    setThumbnailFile(e.target.files?.[0] || null)
                  }
                  p={2}
                  accept="image/png, image/gif,image/jpeg"
                />
              </FormControl>
            </Stack>
          </Modal>

          <Modal
            open={isOpenModalToCreate}
            close={closeModalToCreate}
            title={"Create Product"}
            okTxt="Create"
            onConfirm={handleCreateProduct}
            isLoading={isCreating}
          >
            <Stack gap="4">
              <Field.Root>
                <Field.Label>Title</Field.Label>
                <Input
                  placeholder="Product Title"
                  name="title"
                  value={productToCreate.title}
                  onChange={onChangeCreateHandler}
                  required
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Input
                  placeholder="Product Description"
                  name="description"
                  value={productToCreate.description}
                  onChange={onChangeCreateHandler}
                  required
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Price</Field.Label>
                <NumberInput.Root w="full" min={0}>
                  <NumberInput.Control />
                  <NumberInput.Input
                    name="price"
                    value={productToCreate.price}
                    onChange={(e) => onChangePriceHandler(e.target.value, true)}
                    placeholder="Price"
                    required
                  />
                </NumberInput.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label>Stock</Field.Label>
                <NumberInput.Root w="full" min={0}>
                  <NumberInput.Control />
                  <NumberInput.Input
                    name="stock"
                    value={productToCreate.stock}
                    onChange={(e) => onChangeStockHandler(e.target.value, true)}
                    placeholder="Stock"
                    required
                  />
                </NumberInput.Root>
              </Field.Root>
              <FormControl isRequired>
                <FormLabel>Thumbnail</FormLabel>
                <Input
                  id="thumbnail"
                  type="file"
                  h={"full"}
                  onChange={(e) =>
                    setThumbnailFile(e.target.files?.[0] || null)
                  }
                  p={2}
                  accept="image/png, image/gif,image/jpeg"
                />
              </FormControl>
            </Stack>
          </Modal>
        </Table.Root>
      </Flex>
    </>
  );
};

export default DashBoardProductsTable;
