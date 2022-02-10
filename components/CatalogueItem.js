import { Stack, Text } from '@chakra-ui/react';
import { Badge, Box, Heading, VStack } from '@chakra-ui/layout';
import Link from 'next/link';
import { formatCurrency } from '../lib/helpers';

export default function CatalogueItem(props) {
  const calculateDiscountPercentage = () => {
    let discountPercentage = 0;
    if (props.fullPrice) {
      discountPercentage = Math.round((props.price / props.fullPrice) * 100);
    }

    return discountPercentage;
  };

  return (
    <Link href={`/katalog/${props.path}`} passHref>
      <Stack
        as="a"
        w="full"
        direction="row"
        bg="white"
        spacing="4"
        mb="4"
        p="4"
        rounded="xl"
        shadow="xl"
        borderWidth="1px"
      >
        <Box
          bg="gray.300"
          w="100px"
          h="100px"
          flexShrink="0"
          rounded="lg"
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundImage={`url('${props.thumbnail}')`}
        ></Box>
        <VStack justifyContent="space-between" alignItems="start">
          <Box>
            <Heading as="h2" fontSize={{ base: 'lg', lg: 'xl' }} color="#c28e35">
              {props.title}
            </Heading>
            <Text>{props.children}</Text>
          </Box>

          <Box>
            {props.fullPrice ? (
              <Text textDecor="line-through" fontSize="xs">
                {formatCurrency(props.fullPrice)}
              </Text>
            ) : null}
            <Text fontWeight="bold">
              {formatCurrency(props.price)}{' '}
              {props.fullPrice ? <Badge colorScheme="green">Diskon {calculateDiscountPercentage()}%</Badge> : null}
            </Text>
          </Box>
        </VStack>
      </Stack>
    </Link>
  );
}
