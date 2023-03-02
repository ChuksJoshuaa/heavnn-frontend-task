import { Footer, Navbar } from "@/components";
import "@/styles/globals.css";
import "@/styles/singleComponent.css";
import theme from "../theme";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Flex className="container-height">
          <Box>
            <Navbar />
          </Box>
          <Box height="100%">
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Flex>
      </ChakraProvider>
    </Provider>
  );
}
