import { Stack, Button } from '@chakra-ui/react';
import { Badge, Box, Center, Container, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/layout';
import { Table, Tbody, Tr, Td } from '@chakra-ui/table';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { firestore } from '../../services/firebase';
import ImageGallery from 'react-image-gallery';
import { displayContentBlocks, formatCurrency } from '../../lib/helpers';

export default function KatalogPage({ catalogueData }) {
  const catalogue = catalogueData[0];

  const calculateDiscountPercentage = () => {
    let discountPercentage = 0;
    if (catalogue.discountPrice) {
      discountPercentage = Math.round((catalogue.discountPrice / catalogue.normalPrice) * 100);
    }

    return 100 - discountPercentage;
  };

  return (
    <Box bg="gray.50" py="6">
      {catalogue?.title ? (
        <>
          <Head>
            <title>{catalogue?.title} - Batik Girilayu</title>
            <meta name="description" content={catalogue?.excerpt} />
            <link rel="icon" href="/logo192.png" />
            <meta property="og:title" content={`${catalogue?.title} - Batik Girilayu`} />
            <meta property="og:description" content={catalogue?.excerpt} />
            <meta property="og:image" content={catalogue?.images[0].thumbnail} />
          </Head>

          <Container maxW="container.xl" color="gray.700" fontSize={{ base: 'sm', lg: 'md' }}>
            <Box as="main">
              <Stack direction={{ base: 'column', md: 'row' }} spacing="6" alignItems="flex-start">
                <Box w={{ base: 'full', md: '30%' }} pos={{ base: 'static', md: 'sticky' }} top="calc(70px + 1.5rem)">
                  <ImageGallery showFullscreenButton={false} showPlayButton={false} items={catalogue.images} />
                </Box>
                <Box w={{ base: 'full', md: '70%' }} bg="white" rounded="xl" borderWidth="1px" p="4">
                  <Heading as="h1" fontSize="2xl" mb="2" color="#c28e35">
                    {catalogue.title}
                  </Heading>

                  {catalogue.discountPrice ? (
                    <>
                      <Text textDecor="line-through" fontSize="xs">
                        {formatCurrency(catalogue.normalPrice)}
                      </Text>
                      <Text fontWeight="bold">
                        {formatCurrency(catalogue.discountPrice)}{' '}
                        {catalogue.discountPrice ? (
                          <Badge colorScheme="green">Diskon {calculateDiscountPercentage()}%</Badge>
                        ) : null}
                      </Text>
                    </>
                  ) : (
                    <Text fontWeight="bold">{formatCurrency(catalogue.normalPrice)}</Text>
                  )}

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
                      {catalogue.details.map((detailItem, idx) => (
                        <Tr key={idx * 200}>
                          <Td px="0" py="1">
                            {detailItem.title}
                          </Td>
                          <Td px="0" py="1">
                            :
                          </Td>
                          <Td px="0" py="1">
                            {detailItem.content}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>

                  <Heading fontSize="lg" mt="4" mb="1">
                    Deksripsi
                  </Heading>
                  <VStack alignItems="start" spacing="3">
                    {displayContentBlocks(catalogue?.blocks || [])}
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

export async function getServerSideProps(context) {
  const { slug } = context.query;

  let colRef = firestore.collection('katalog');
  colRef = colRef.where('slug', '==', slug);
  colRef = colRef.where('isPublished', '==', true);

  let catalogueData = [];
  const fetch = await colRef.get();

  if (fetch.docs.length) {
    catalogueData = fetch.docs.map((doc) => doc.data());
  }

  return {
    props: { catalogueData },
  };
}
