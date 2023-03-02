import { Box } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box
      className="footer mt={5}"
      fontSize="1.1em"
      bg="gray.50"
      style={{ fontFamily: '"Rajdhani", sans-serif' }}
    >
      <Box as="h5">
        &copy; {new Date().getFullYear()}
        <span>Heavnn.</span>
      </Box>
      <h5>All rights reserved</h5>
    </Box>
  );
};

export default Footer;
