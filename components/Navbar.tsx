import Image from "next/image";
import { imageLogo } from "@/utils/imageLogo";
import { useAppDispatch } from "@/redux/hooks";
import { setLoader } from "@/redux/features/posts/postSlice";
import { Box, Container, Link } from "@chakra-ui/react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  return (
    <Box bg="gray.50">
      <Container maxW="1500px" p="4">
        <Link
          href="/"
          style={{ fontFamily: "Lobster Two", position: "relative" }}
          // onClick={() => dispatch(setLoader(true))}
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
