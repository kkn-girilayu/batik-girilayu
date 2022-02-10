import { useState, useEffect } from 'react';
import { Stack } from '@chakra-ui/react';
import { Box, Center, Container, Heading, Text } from '@chakra-ui/layout';
import Head from 'next/head';
import CatalogueItem from '../components/CatalogueItem';
import { firestore } from '../services/firebase';
import { Spinner } from '@chakra-ui/react';

export default function KatalogPage() {
  const [catalogues, setCatalogues] = useState([]);

  useEffect(() => {
    const colRef = firestore.collection('katalog').orderBy('tanggal', 'desc');

    colRef.get().then((snapshot) => {
      const _news = [];
      snapshot.forEach((doc) => {
        _news.push(doc.data());
      });

      setCatalogues(_news);
    });
  }, []);

  return (
    <Box bg="gray.50" py="6">
      <Head>
        <title>Katalog - Batik Girilayu</title>
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
              backgroundImage="url('/assets/dark/asset-2.jpg')"
            >
              <Heading color="white" fontSize="4xl">
                Katalog
              </Heading>
            </Center>
            <Box w={{ base: 'full', md: '70%' }}>
              {catalogues.length ? (
                catalogues.map((catalogue, idx) => (
                  <CatalogueItem
                    key={idx * -100}
                    path={catalogue.slug}
                    title={catalogue.judul}
                    fullPrice={catalogue.hargaPenuh}
                    price={catalogue.harga}
                    thumbnail={catalogue.gambar[0].thumbnail}
                  >
                    {catalogue.intisari}
                  </CatalogueItem>
                ))
              ) : (
                <Center py="14">
                  <Box textAlign="center">
                    <Spinner size="lg" />
                    <Text mt="4">Loading...</Text>
                  </Box>
                </Center>
              )}
            </Box>
          </Stack>
        </Box>
      </Container>

      <footer></footer>
    </Box>
  );
}
