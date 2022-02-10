import React from 'react';
import {
  Box,
  Container,
  BoxProps,
  Stack,
  Spacer,
  Heading,
  Text,
  Flex,
  Img,
  Divider,
  Wrap,
  WrapItem,
  useTheme,
  Center,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { HStack } from '@chakra-ui/react';
import { sosmed } from '../data/sosial-media';
import Link from 'next/link';

export const Footer = ({ homeUrl = '/', brand, question, navItems, socialMedia, copyrightText, ...props }) => {
  return (
    <Box as="footer" w="full" fontSize={{ base: 'sm', lg: 'md' }} flexShrink={0} borderTopWidth="1px" {...props}>
      <Container py="8" maxW="container.xl">
        <Stack direction={{ base: 'column', md: 'row' }}>
          <Box>
            <Image src="/assets/logo.png" height="12" mb="6" alt="" />

            <HStack spacing="4" alignItems="center" mb="4">
              {sosmed.map((item, idx) => {
                return (
                  <Link key={idx} href={item.url} passHref>
                    <Center
                      as="a"
                      target="_blank"
                      p="2"
                      rounded="lg"
                      bg="white"
                      borderWidth="1px"
                      borderColor="gray.400"
                      h="10"
                      w="10"
                    >
                      <FontAwesomeIcon icon={item.icon} />
                    </Center>
                  </Link>
                );
              })}
            </HStack>

            <Text maxW="md" mb="4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s.
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
