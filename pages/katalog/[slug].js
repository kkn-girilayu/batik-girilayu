import { useState, useEffect } from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { Badge, Box, Center, Container, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/layout';
import { Table, Tbody, Tr, Td } from '@chakra-ui/table';
import { Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { firestore } from '../../services/firebase';
import ImageGallery from 'react-image-gallery';
import { formatCurrency } from '../../lib/helpers';

export default function KatalogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [catalogue, setCatalogue] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const colRef = firestore.collection('katalog').where('slug', '==', slug || '');

      colRef.get().then((snapshot) => {
        const _catalogue = [];
        snapshot.forEach((doc) => {
          const _catalogueData = doc.data();
          _catalogueData['tanggal'] = new Date(_catalogueData.tanggal.seconds * 1000);
          _catalogueData['konten'] = _catalogueData.konten.split('\\n');

          _catalogue.push(_catalogueData);
        });

        setCatalogue(_catalogue[0]);
        setLoading(false);
      });
    }
  }, [slug]);

  const calculateDiscountPercentage = () => {
    let discountPercentage = 0;
    if (catalogue.hargaPenuh) {
      discountPercentage = Math.round((catalogue.harga / catalogue.hargaPenuh) * 100);
    }

    return discountPercentage;
  };

  return (
    <Box bg="gray.50" py="6">
      {loading ? (
        <Center minH="70vh">
          <Box textAlign="center">
            <Spinner size="lg" />
            <Text mt="4">Loading...</Text>
          </Box>
        </Center>
      ) : catalogue?.judul ? (
        <>
          <Head>
            <title>{catalogue.judul} - Batik Girilayu</title>
            <meta name="description" content="Website resmi dari Batik Girilayu" />
            <link rel="icon" href="/logo192.png" />
          </Head>

          <Container maxW="container.xl" color="gray.700" fontSize={{ base: 'sm', lg: 'md' }}>
            <Box as="main">
              <Stack direction={{ base: 'column', md: 'row' }} spacing="6" alignItems="flex-start">
                <Box w={{ base: 'full', md: '30%' }} pos={{ base: 'static', md: 'sticky' }} top="calc(70px + 1.5rem)">
                  <ImageGallery showFullscreenButton={false} showPlayButton={false} items={catalogue.gambar} />
                </Box>
                <Box w={{ base: 'full', md: '70%' }} bg="white" rounded="xl" borderWidth="1px" p="4">
                  <Heading as="h1" fontSize="2xl" mb="2" color="#c28e35">
                    {catalogue.judul}
                  </Heading>

                  {catalogue.hargaPenuh ? (
                    <Text textDecor="line-through" fontSize="xs">
                      {formatCurrency(catalogue.hargaPenuh)}
                    </Text>
                  ) : null}
                  <Text fontWeight="bold">
                    {formatCurrency(catalogue.harga)}{' '}
                    {catalogue.hargaPenuh ? (
                      <Badge colorScheme="green">Diskon {calculateDiscountPercentage()}%</Badge>
                    ) : null}
                  </Text>

                  <HStack mt="4">
                    <Button
                      leftIcon={<FontAwesomeIcon icon={faEnvelope} height="1.2rem" />}
                      colorScheme="orange"
                      variant="outline"
                      size="lg"
                    >
                      Chat
                    </Button>
                    <Button
                      leftIcon={<FontAwesomeIcon icon={faShoppingCart} height="1.2rem" />}
                      colorScheme="orange"
                      size="lg"
                    >
                      Beli Sekarang
                    </Button>
                  </HStack>

                  <Heading fontSize="lg" mt="6">
                    Detail
                  </Heading>
                  <Table variant="unstyled" size="sm" maxW="xs" mt="1">
                    <Tbody>
                      {catalogue.detail.map((d, idx) => (
                        <Tr key={idx * 200}>
                          <Td px="0" py="1">
                            {d.judul}
                          </Td>
                          <Td px="0" py="1">
                            :
                          </Td>
                          <Td px="0" py="1">
                            {d.konten}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>

                  <Heading fontSize="lg" mt="4" mb="1">
                    Deksripsi
                  </Heading>
                  <VStack spacing="3">
                    {catalogue.konten.map((k, idx) => (
                      <ReactMarkdown key={idx * 1000}>{k}</ReactMarkdown>
                    ))}
                  </VStack>
                </Box>
              </Stack>
            </Box>
          </Container>
        </>
      ) : (
        <>
          <Head>
            <title>Tidak Ditemukan - Batik Girilayu</title>
            <meta name="description" content="Website resmi dari Batik Girilayu" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Center minH="60vh">
            <Box textAlign="center">
              <Heading>Katalog tidak ditemukan</Heading>
              <Text>Silahkan kembali ke halaman Beranda kami.</Text>
            </Box>
          </Center>
        </>
      )}
    </Box>
  );
}
