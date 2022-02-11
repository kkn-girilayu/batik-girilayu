import { Box, Center, Container, Heading, Text, VStack } from '@chakra-ui/layout';
import Head from 'next/head';
import { firestore } from '../../services/firebase';
import { Image } from '@chakra-ui/image';
import { displayContentBlocks, getMonthString } from '../../lib/helpers';

export default function BeritaPage({ newsData }) {
  const news = newsData[0] || {};
  const publishTime = news ? new Date(news.publishTime) : new Date();

  return (
    <>
      {news.title ? (
        <>
          <Head>
            <title>{news?.title} - Batik Girilayu</title>
            <meta name="description" content={news?.excerpt} />
            <link rel="icon" href="/logo192.png" />
            <meta property="og:title" content={`${news?.title} - Batik Girilayu`} />
            <meta property="og:description" content={news?.excerpt} />
            <meta property="og:image" content={news?.imgUrl} />
          </Head>

          <Container maxW="container.lg" py="10">
            <Box textAlign="center" mb="6">
              <Text fontSize="xs">{`${publishTime.getDate()} ${getMonthString(
                publishTime.getMonth()
              )} ${publishTime.getFullYear()}`}</Text>
              <Heading color="#c28e35">{news?.title}</Heading>
            </Box>

            <Image src={news?.imgUrl} mb="6" maxW={{ base: 'full', md: 'lg' }} mx="auto" alt="" />

            <VStack maxW={{ base: 'full', md: '70%' }} marginX="auto" alignItems="start" spacing="4">
              {displayContentBlocks(news?.blocks || [])}
            </VStack>
          </Container>
        </>
      ) : (
        <>
          <Head>
            <title>Tidak Ditemukan - Batik Girilayu</title>
            <meta name="description" content="Website resmi dari Batik Girilayu" />
            <link rel="icon" href="/logo192.png" />
          </Head>

          <Center minH="60vh">
            <Box textAlign="center">
              <Heading>Berita tidak ditemukan</Heading>
              <Text>Silahkan kembali ke halaman Beranda kami.</Text>
            </Box>
          </Center>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  let colRef = firestore.collection('berita');
  colRef = colRef.where('slug', '==', slug);
  colRef = colRef.where('isPublished', '==', true);

  let newsData = [];
  const fetch = await colRef.get();

  if (fetch.docs.length) {
    newsData = fetch.docs.map((doc) => doc.data());
  }

  return {
    props: { newsData },
  };
}
