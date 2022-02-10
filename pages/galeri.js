import { Stack, Center } from '@chakra-ui/react';
import { Box, Container, Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import GalleryItem from '../components/GalleryItem';

export default function GaleriPage() {
  return (
    <Box bg="gray.50" minH="100vh" py="6">
      <Head>
        <title>Galeri - Batik Girilayu</title>
        <meta name="description" content="Website resmi dari Batik Girilayu" />
        <link rel="icon" href="/logo192.png" />
      </Head>

      <Container maxW="container.xl" color="gray.700" fontSize={{ base: 'sm', lg: 'md' }}>
        <Box as="main">
          <Stack direction={{ base: 'column', md: 'row' }} spacing="6">
            <Center
              bg="gray.300"
              w={{ base: 'full', md: '30%' }}
              h={{ base: '200px', md: '250px' }}
              flexShrink="0"
              rounded="xl"
              backgroundPosition="center"
              backgroundSize="cover"
              backgroundImage="url('/assets/dark/asset-1.jpg')"
            >
              <Heading color="white" fontSize="4xl">
                Galeri
              </Heading>
            </Center>
            <Box w={{ base: 'full', md: '70%' }}>
              <GalleryItem
                image="/assets/original/asset-4.jpg"
                title="Judul Galeri 1"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
              />
              <GalleryItem
                image="/assets/original/asset-2.jpg"
                title="Judul Galeri 2"
                description="standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to"
              />
              <GalleryItem
                image="/assets/original/asset-3.jpg"
                title="Judul Galeri 3"
                description="make a type specimen book."
              />
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
