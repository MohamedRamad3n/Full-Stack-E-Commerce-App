import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "@chakra-ui/color-mode";
import { ICartItem } from "../utils";

const ProductCard = ({ attributes }: { attributes: ICartItem }) => {
  console.log(attributes);

  const { colorMode } = useColorMode();
  return ( 
    <Card.Root
      bg={"none"}
      p={"10px"}
      border={"1px solid #a8b5c8"}
      overflow="hidden"
    >
      <Image
        src={`${import.meta.env.VITE_SERVER_URL}${attributes?.thumbnail?.url}`}
        alt="Green double couch with wooden legs"
        width={"200px"}
        height={"200px"}
        borderRadius={"50%"}
        mx="auto"
        objectFit="cover"
      />
      <Card.Body gap="2">
        <Card.Title fontSize={"md"} textAlign={"center"}>
          {attributes.title}
        </Card.Title>
        <Card.Description fontSize={20} textAlign={"center"}>
          {attributes.description}
        </Card.Description>
        <Text
          textAlign={"center"}
          color={"blue.500"}
          textStyle="2xl"
          fontWeight="medium"
          letterSpacing="tight"
          mt="2"
        >
          ${attributes.price}
        </Text>
      </Card.Body>
      <Card.Footer justifyContent="center" padding="10px 0">
        <Link
          style={{ width: "100%" }}
          to={`/product/${attributes.documentId}`}
        >
          <Button
            bg={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#9f7aea" : "white"}
            _hover={{
              bg: colorMode !== "light" ? "#9f7aea" : "#e6f3fd",
              color: "white",
              border: "1px solid #a8b5c8",
            }}
            variant="outline"
            colorScheme="blue"
            size={"xl"}
            w={"full"}
          >
            View Details
          </Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
