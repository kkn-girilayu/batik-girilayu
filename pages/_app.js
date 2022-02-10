import { ChakraProvider } from '@chakra-ui/react';
import { Footer } from '../components/Footer';
import Nav from '../components/Nav';
import '../styles/global.css';
import 'react-image-gallery/styles/css/image-gallery.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Nav />
      <Component {...pageProps} />
      <Footer></Footer>
    </ChakraProvider>
  );
}

export default MyApp;
