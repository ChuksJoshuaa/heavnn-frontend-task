import { Loader } from "@/components";
import { saveAllData, setLoader } from "@/redux/features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getDataFromLocalStorage } from "@/utils/getLocalStorage";
import { InfoProps, SinglePageProps } from "@/utils/interface";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Divider, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SinglePage = () => {
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const [singlePost, setSinglePost] = useState(
    {} as SinglePageProps["singlePost"]
  );
  let getData: InfoProps[] = getDataFromLocalStorage().data;
  const newId = Number(router.query.id);

  const findData = () => {
    const findIt = getData.find((item) => item.id === newId);

    setSinglePost(findIt as SinglePageProps["setSinglePost"]);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoader(false));
    }, 900);
  });

  useEffect(() => {
    findData();
  }, [newId]);

  const DeletePost = (id: number) => {
    const filteredValue = getDataFromLocalStorage().data.filter(
      (item: InfoProps) => item.id !== id
    );
    dispatch(saveAllData(filteredValue));

    router.back();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxW="700px" mt="8">
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
          <Button m={3} colorScheme="teal" onClick={() => router.back()}>
            Go Back
          </Button>

          <Box display="flex" mt="5">
            <Link
              href={`/update/${singlePost?.id}`}
              onClick={() => dispatch(setLoader(true))}
            >
              <EditIcon w={6} h={6} color="blue.500" mx={2} />
            </Link>
            <DeleteIcon
              w={6}
              h={6}
              color="red.500"
              onClick={() => DeletePost(singlePost?.id)}
            />
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default SinglePage;
