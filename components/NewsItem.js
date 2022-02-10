import { Box, Heading, Stack, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import React from 'react';

export default function NewsItem(props) {
  return (
    <Link href={'/berita/' + props.path || ''} passHref>
      <Stack
        as="a"
        bg="white"
        direction={{ base: 'column-reverse', md: 'row' }}
        rounded="xl"
        shadow="lg"
        mb="4"
        p="4"
        spacing="4"
        borderWidth="1px"
      >
        <Box width={{ base: 'full', md: '70%' }} flexShrink="0">
          <Heading as="h2" fontSize={{ base: 'lg', lg: 'xl' }} color="#c28e35" mt="0" mb="2">
            {props.title}
          </Heading>
          <Text>{props.excerpt}</Text>
        </Box>
        <Box
          width="100%"
          height="150px"
          bg="gray.300"
          rounded="lg"
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundImage={`url('${props.thumbnail}')`}
        ></Box>
      </Stack>
    </Link>
  );
}
