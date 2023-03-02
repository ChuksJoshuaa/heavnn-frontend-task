import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Box mt={8} mx="auto" maxW="500px" w="100%" textAlign="center">
      <Spinner size="xl" textAlign="center" />
    </Box>
  );
};

export default Loader;
