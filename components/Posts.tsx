import {
  saveAllData,
  savePaginateData,
  setLoader,
} from "@/redux/features/posts/postSlice";
import { getDataFromLocalStorage } from "@/utils/getLocalStorage";
import {
  InfoProps,
  PostDataProps,
  PostProps,
  SearchDataProps,
} from "@/utils/interface";
import { paginate } from "@/utils/pagination";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Pagination } from "./";

const Posts = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [value, setValue] = React.useState("");
  const [postData, setPostData] = useState([] as PostDataProps["postData"]);
  const [searchData, setSearchData] = useState([]);

  const DeletePost = (id: number) => {
    const filteredPost = postData.filter((item) => item.id !== id);
    setPostData(filteredPost);

    const filteredValue = getDataFromLocalStorage().data.filter(
      (item: InfoProps) => item.id !== id
    );
    dispatch(saveAllData(filteredValue));
  };

  const paginateAllData = () => {
    let data = getDataFromLocalStorage().data;
    if (data) {
      const newData = paginate(data);
      dispatch(savePaginateData(newData));
      setPostData(newData[page] as PostDataProps["setPostData"]);
      setSearchData(newData[page] as SearchDataProps["setSearchData"]);
    }
  };

  useEffect(() => {
    paginateAllData();
  }, [page]);

  const handleChange = () => {
    if (!value) {
      setPostData(searchData);
    } else {
      let searchResult = new RegExp(`${value}`, "gi");
      const newSearchData = searchData.filter((item: InfoProps) =>
        item.title.match(searchResult)
      );

      setPostData(newSearchData);
    }
  };

  return (
    <Box>
      <Button
        m={3}
        colorScheme="teal"
        onClick={() => dispatch(setLoader(true))}
      >
        <Link href={`/users`}>View All Users</Link>
      </Button>
      <InputGroup size="md" style={{ width: "500px", margin: "2em auto" }}>
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Search Title"
          value={value}
          onKeyUp={handleChange}
          onChange={(e) => setValue(e.target.value)}
        />
      </InputGroup>
      {postData.length === 0 ? (
        <>
          <Center alignItems="center" color="red.800" fontSize={20}>
            No post available or matched the search input
          </Center>
        </>
      ) : (
        <div className="post-container">
          {postData?.map((item: InfoProps) => (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              key={item.id}
            >
              <Flex
                direction="column"
                justify="space-between"
                alignItems="center"
                mb={1}
                p="3"
              >
                <Heading
                  fontSize="xl"
                  textTransform="capitalize"
                  style={{ fontFamily: '"Rajdhani", sans-serif' }}
                >
                  {item.title}
                </Heading>
                <Box>
                  <Text mt={1}>
                    {item.body.slice(0, 100)}...
                    <Button
                      colorScheme="gray"
                      fontSize="xs"
                      size="xs"
                      variant="solid"
                      onClick={() => dispatch(setLoader(true))}
                    >
                      <Link href={`/single/${item.id}`}>Read More</Link>
                    </Button>
                  </Text>
                </Box>
              </Flex>
              <Flex
                direction="row-reverse"
                justify="space-between"
                alignItems="center"
                p="3"
              >
                <Box hidden>yex</Box>
                <Box display="flex">
                  <Link
                    href={`/update/${item.id}`}
                    onClick={() => dispatch(setLoader(true))}
                  >
                    <EditIcon w={6} h={6} color="blue.500" mx={2} />
                  </Link>
                  <DeleteIcon
                    w={6}
                    h={6}
                    color="red.500"
                    onClick={() => DeletePost(item?.id)}
                  />
                </Box>
              </Flex>
            </Box>
          ))}
        </div>
      )}
      <Pagination page={page} setPage={setPage} />
    </Box>
  );
};

export default Posts;
