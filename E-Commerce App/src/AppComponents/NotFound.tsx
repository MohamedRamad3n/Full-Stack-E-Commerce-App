import { Box, Text, Heading, Center, Stack, useBreakpointValue, VStack, Icon, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { IoMdSad } from 'react-icons/io'; // A "sad" icon to enhance the design
import { useColorModeValue } from '../components/ui/color-mode';

const NotFound = () => {
  const buttonSize = useBreakpointValue<"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl">({ base: 'sm', md: 'md' }) || 'md';

  // Using useColorModeValue for dynamic colors based on light/dark mode
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const boxBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("teal.600", "teal.300");
  const sadIconColor = useColorModeValue("teal.500", "teal.400");

  return (
    <Center h="100vh" flexDirection="column" bg={bgColor} color={textColor}>
      <Box 
        textAlign="center" 
        p={8} 
        bg={boxBgColor} 
        borderRadius="lg" 
        shadow="2xl" 
        maxW="lg"
        boxShadow="xl"
      >
        <VStack spacing={4} align="center">
          <Icon as={IoMdSad} w={16} h={16} color={sadIconColor} />
          <Heading size="2xl" color={headingColor} fontWeight="bold">
            404 - Page Not Found
          </Heading>
          <Text fontSize="lg" color={textColor} maxW="400px" mx="auto">
            Sorry, the page you are looking for might have been moved or doesn't exist.
          </Text>
          <Stack mt={6} spacing={4} direction={{ base: 'column', md: 'row' }} justify="center">
            <Button
              as={RouterLink}
              to="/"
              size={buttonSize}
              colorScheme="teal"
              variant="solid"
              width={{ base: 'full', sm: 'auto' }}
            >
              Go to Home
            </Button>
            <Button
              as={RouterLink}
              to="/contact"
              size={buttonSize}
              colorScheme="gray"
              variant="outline"
              width={{ base: 'full', sm: 'auto' }}
            >
              Contact Support
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Center>
  );
};

export default NotFound;
