import { imageLogo } from "@/utils/imageLogo";
import { Box, Container, Link } from "@chakra-ui/react";
import Image from "next/image";

const Navbar = () => {
  return (
    <Box bg="gray.50">
      <Container maxW="1500px" p="4">
        <Link
          href="/"
          style={{ fontFamily: "Lobster Two", position: "relative" }}
        >
          <Image
            src={imageLogo}
            alt="logo"
            priority
            height={250}
            width={250}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
      </Container>
    </Box>
  );
};

export default Navbar;
