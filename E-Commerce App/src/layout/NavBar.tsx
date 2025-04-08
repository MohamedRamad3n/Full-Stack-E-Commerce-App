import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Center,
  Link,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/menu";
import { Avatar } from "@chakra-ui/avatar";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import { IoSunnySharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import CookieServices from "../services/CookieServices";
interface Props {
  children: React.ReactNode;
  to: string;
}

const Links = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Products", path: "/products" },
  { label: "Team", path: "/team" },
];

const NavLink = (props: Props) => {
  const { children, to } = props;

  return (
    <Link
      as={RouterLink}
      to={to}
      px={4} // Increased padding for better clickable area
      py={2}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        backgroundColor: useColorModeValue("gray.200", "gray.700"), // Light/dark background color on hover
        color: useColorModeValue("gray.800", "white"), // Light/dark text color on hover
      }}
      transition="all 0.2s ease" // Smooth transition for hover effect
    >
      {children}
    </Link>
  );
};

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = CookieServices.getCookie("jwt");

  const logoutHandler = () => {
    CookieServices.removeCookie("jwt");
    window.location.reload();
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            /*  icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} */
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack alignItems={"center"}>
            <Box>Logo</Box>
            <HStack as={"nav"} display={{ base: "none", md: "flex" }}>
              {Links.map((link) => (
                <NavLink key={link.label} to={link.path}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"}>
              <Button onClick={toggleColorMode} variant={"ghost"}>
                {colorMode === "light" ? <FaMoon /> : <IoSunnySharp />}
              </Button>
              {!token && (
              <NavLink to={"/login"}>Login</NavLink>
              )}
              {token && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"ghost"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      boxSize="40px"
                      src="https://avatars.dicebear.com/api/male/username.svg"
                    />
                  </MenuButton>
                  <MenuList
                    p={4}
                    borderRadius="lg"
                    boxShadow="lg"
                    border="1px solid"
                    borderColor="gray.200"
                    minW="250px"
                  >
                    <Center>
                      <Avatar
                        size="xl"
                        src="https://avatars.dicebear.com/api/male/username.svg"
                      />
                    </Center>
                    <Center mt={2}>
                      <p>Username</p>
                    </Center>
                    <MenuDivider />
                    <MenuItem _hover={{ bg: "gray.100" }}>
                      Your Servers
                    </MenuItem>
                    <MenuItem _hover={{ bg: "gray.100" }}>
                      Account Settings
                    </MenuItem>
                    <MenuItem
                    cursor={"pointer"}
                      onClick={logoutHandler}
                      _hover={{ bg: "red.50", color: "red.500" }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"}>
              {Links.map((link) => (
                <NavLink key={link.label} to={link.path}>
                  {link.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
