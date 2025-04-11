import { Skeleton, Flex, Stack } from "@chakra-ui/react";

const DashBoardProductsTableSkeleton = ({ rows = 8 }) => {
    
    
  return (
    <Stack maxW={"85%"} mx={"auto"} my={10}>
      {Array.from({ length: rows }).map((_, i) => (
        <Flex
          key={i}
          alignItems={"center"}
          justifyContent={"space-between"}
          border={"1px solid #333"}
          h={"60px"}
          rounded={"md"}
          p={2}
        >
          <Skeleton h="9px" w={"120px"} bg={"gray"} />
          <Skeleton h="9px" w={"120px"} bg={"gray"} />
          <Skeleton h="9px" w={"120px"} bg={"gray"} />
          <Skeleton h="9px" w={"120px"} bg={"gray"} />
          <Skeleton h="9px" w={"120px"} bg={"gray"} />
          <Flex>
            <Skeleton height="30px" width="50px" bg={"red.500"} mr={4} />
            <Skeleton height="30px" width="50px" bg="blue.300" />
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
};

export default DashBoardProductsTableSkeleton;
