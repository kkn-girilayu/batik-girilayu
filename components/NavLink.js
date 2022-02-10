import { useRouter } from 'next/router';
import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/layout';
import PropTypes from 'prop-types';

export { NavLink };

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

function NavLink({ href, exact, children, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += ' active';
  }

  return (
    <Link href={href} passHref>
      <ChakraLink fontWeight={isActive ? 'bold' : 'normal'} px="2" py="0.5" rounded="full" {...props}>
        {children}
      </ChakraLink>
    </Link>
  );
}
