import { SinglePageProps } from "@/utils/interface";
import { BASE_URL } from "@/utils/routes";
import { Box, Button, Container, Divider, Flex } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";

const SinglePage = ({ singlePost }: SinglePageProps) => {
  return (
    <Container maxW="700px">
      <Box
        mx={2}
        mb={2}
        shadow="md"
        borderWidth="1px"
        style={{ fontFamily: '"Rajdhani", sans-serif' }}
      >
        <Box
          p={2}
          pb={0}
          fontWeight="semibold"
          textTransform="capitalize"
          textAlign="center"
          fontSize="2xl"
        >
          {singlePost?.title}
        </Box>
        <Divider />
        <Box p={2}>{singlePost?.body}</Box>

        <Flex justify="space-between" pr={3}>
          <Button m={3} colorScheme="teal">
            <Link href={`/`}>Go Back</Link>
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);

  return {
    props: { singlePost: data },
  };
};

export default SinglePage;
