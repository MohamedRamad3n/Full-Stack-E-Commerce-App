import {
  Flex,
  Box,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage, 
} from "@chakra-ui/form-control"; // Updated import

import { useColorModeValue } from "../components/ui/color-mode";
import { useState } from "react";
import { GrView } from "react-icons/gr";
import { IoMdEyeOff } from "react-icons/io";

export default function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (name === "email") setIsEmailValid(validateEmail(value));
    if (name === "password") setIsPasswordValid(validatePassword(value));
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailIsValid = validateEmail(user.email);
    const passwordIsValid = validatePassword(user.password);

    setIsEmailValid(emailIsValid);
    setIsPasswordValid(passwordIsValid);

    if (emailIsValid && passwordIsValid) {
      console.log("✅ Form submitted:", user);
    } else {
      console.log("❌ Invalid form");
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
          <Text fontSize="lg" color="gray.600">
            to enjoy all of our cool <Text color="blue.400">features</Text> ✌️
          </Text>
        </Stack>
        <Box
          as="form"
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
          onSubmit={onSubmitHandler}
        >
          <Stack spacing={4}>
            <FormControl isInvalid={!isEmailValid} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={onChangeHandler}
                borderColor={!isEmailValid ? "red.500" : "gray.200"}
                _focus={{
                  borderColor: !isEmailValid ? "red.500" : "blue.400",
                  boxShadow: !isEmailValid ? "0 0 0 1px red" : "0 0 0 1px blue",
                }}
              />
              {!isEmailValid && (
                <FormErrorMessage
                  color="red.500"
                  fontSize="sm"
                  mt={1}
                  fontWeight="medium"
                >
                  Invalid email format
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!isPasswordValid} isRequired>
              <FormLabel>Password</FormLabel>
              <Box position="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={onChangeHandler}
                  pr="3rem"
                  borderColor={!isPasswordValid ? "red.500" : "gray.200"}
                  _focus={{
                    borderColor: !isPasswordValid ? "red.500" : "blue.400",
                    boxShadow: !isPasswordValid
                      ? "0 0 0 1px red"
                      : "0 0 0 1px blue",
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword((prev) => !prev)}
                  position="absolute"
                  top="50%"
                  right="0.5rem"
                  transform="translateY(-50%)"
                  zIndex={2}
                >
                  {showPassword ? <GrView /> : <IoMdEyeOff />}
                </Button>
              </Box>
              { !isPasswordValid && (
                <FormErrorMessage
                  color="red.500"
                  fontSize="sm"
                  mt={1}
                  fontWeight="medium"
                >
                  Password must be at least 6 characters
                </FormErrorMessage>
              )}
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align="start"
                justify="space-between"
              >
                <Checkbox.Root>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Remember Me</Checkbox.Label>
                </Checkbox.Root>
                <Text color="blue.400">Forgot password?</Text>
              </Stack>
              <Button
                type="submit"
                bg="blue.400"
                color="white"
                _hover={{ bg: "blue.500" }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
