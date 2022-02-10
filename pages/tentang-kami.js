import { Stack, Text } from '@chakra-ui/react';
import { Box, Center, Container, Heading } from '@chakra-ui/layout';
import Head from 'next/head';

export default function AboutPage() {
  return (
    <Box bg="gray.50" minH="100vh" py="6">
      <Head>
        <title>Tentang Kami - Batik Girilayu</title>
        <meta name="description" content="Website resmi dari Batik Girilayu" />
        <link rel="icon" href="/logo192.png" />
      </Head>

      <Container maxW="container.xl" color="gray.700" fontSize={{ base: 'sm', lg: 'md' }}>
        <Box as="main">
          <Center
            bg="gray.300"
            w="full"
            h="250px"
            rounded="xl"
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundImage="url('/assets/dark/asset-2.jpg')"
          >
            <Heading color="white" fontSize="4xl">
              Tentang Kami
            </Heading>
          </Center>

          <Box bg="white" rounded="xl" border="1px" borderColor="gray.200" p="4" mt="6" shadow="xl">
            <Stack direction={{ base: 'column', md: 'row' }} spacing="4" mb="6">
              <Box
                bg="gray.300"
                w={{ base: 'full', md: '30%' }}
                h="250px"
                rounded="lg"
                flexShrink="0"
                backgroundPosition="center"
                backgroundSize="cover"
                backgroundImage="url('/assets/konten-2.jpg')"
              ></Box>
              <Box>
                <Heading as="h2" fontSize="xl" color="#c28e35" mb="2">
                  Sub judul deskripsi 1
                </Heading>
                <Text mb="4">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
                <Text mb="4">
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                  classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                  professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
                  literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book
                  is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem
                  Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                </Text>
              </Box>
            </Stack>

            <Stack direction={{ base: 'column-reverse', md: 'row' }} spacing="4">
              <Box>
                <Heading as="h2" fontSize="xl" color="#c28e35" mb="2">
                  Sub judul deskripsi 2
                </Heading>
                <Text mb="4">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
                <Text mb="4">
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                  classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                  professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
                  literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book
                  is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem
                  Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                </Text>
              </Box>
              <Box
                bg="gray.300"
                w={{ base: 'full', md: '30%' }}
                h="250px"
                rounded="lg"
                flexShrink="0"
                backgroundPosition="center"
                backgroundSize="cover"
                backgroundImage="url('/assets/konten-1.jpg')"
              ></Box>
            </Stack>
          </Box>
        </Box>
      </Container>

      <footer></footer>
    </Box>
  );
}
