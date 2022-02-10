import { useState } from 'react';
import { Box, Container, Stack, VStack } from '@chakra-ui/layout';
import { NavLink } from './NavLink';
import { Image } from '@chakra-ui/image';
import Link from 'next/link';

export default function Nav() {
  const [isOpen, setOpen] = useState(false);

  function toggleNav() {
    setOpen(!isOpen);
  }

  return (
    <Box as="nav" bg="white" shadow="xl">
      <Container maxW="container.xl">
        <Stack direction="row" h="70px" justifyContent="space-between" alignItems="center">
          <Link href="/" passHref>
            <Box as="a">
              <Image src="/assets/logo.png" height="12" pos="relative" zIndex="20" alt="" />
            </Box>
          </Link>

          <Stack
            bg={{ base: 'white', md: '' }}
            position={{ base: 'absolute', md: 'relative' }}
            direction={{ base: 'column', md: 'row' }}
            height={{ base: 'calc(100vh - 70px)', md: 'auto' }}
            fontSize={{ base: 'xl', lg: 'md' }}
            top={{ base: '70px', md: 'auto' }}
            left={{ base: '0px', md: 'auto' }}
            right={{ base: '0px', md: 'auto' }}
            display={{ base: 'flex', md: 'block' }}
            alignItems="center"
            justifyContent="center"
            spacing="4"
            className={`nav-links ${isOpen ? 'nav-mobile-active' : ''}`}
            zIndex="10"
          >
            <NavLink href="/" exact onClick={() => isOpen && setOpen(false)}>
              Beranda
            </NavLink>
            <NavLink href="/katalog" onClick={() => isOpen && setOpen(false)}>
              Katalog
            </NavLink>
            <NavLink href="/galeri" exact onClick={() => isOpen && setOpen(false)}>
              Galeri
            </NavLink>
            <NavLink href="/tentang-kami" exact onClick={() => isOpen && setOpen(false)}>
              Tentang Kami
            </NavLink>
          </Stack>

          <VStack
            spacing="1"
            display={{ base: 'block', md: 'none' }}
            className={`${isOpen ? 'toggle' : ''}`}
            onClick={toggleNav}
            pos="relative"
            zIndex="20"
            cursor="pointer"
          >
            <Box w="8" h="1.5" rounded="full" bg="#c28e35" className="nav-line line-1"></Box>
            <Box w="8" h="1.5" rounded="full" bg="#c28e35" className="nav-line line-2"></Box>
            <Box w="8" h="1.5" rounded="full" bg="#c28e35" className="nav-line line-3"></Box>
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
}
