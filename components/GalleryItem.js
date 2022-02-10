import { Stack, Text } from '@chakra-ui/react';
import { Box, Heading } from '@chakra-ui/layout';

export default function GalleryItem(props) {
  return (
    <Stack w="full" direction="column" bg="white" spacing="4" mb="4" p="4" rounded="xl" shadow="xl" borderWidth="1px">
      <Box
        bg="gray.300"
        h={{ base: '250px', md: '350px' }}
        flexShrink="0"
        rounded="lg"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundImage={`url('${props.image}')`}
      ></Box>
      <Box>
        <Heading as="h2" fontSize={{ base: 'lg', lg: 'xl' }} color="#c28e35">
          {props.title}
        </Heading>
        <Text>{props.description}</Text>
      </Box>
    </Stack>
  );
}
