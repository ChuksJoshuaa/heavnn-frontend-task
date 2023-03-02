import { InfoProps, PostDataProps, PostProps } from "@/utils/interface";
import { BASE_URL } from "@/utils/routes";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup, Text
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { Pagination } from "./";

const Posts = () => {
  const { paginateData, isLoading, saveData } = useAppSelector(
    (state): PostProps => state.post
  );
  const [page, setPage] = useState(0);
  const [value, setValue] = React.useState("");
  const [postData, setPostData] = useState([] as PostDataProps["postData"]);

  const DeletePost = (id: number) => {
    const filteredPost = postData.filter((item) => item.id !== id);
    setPostData(filteredPost);
    axios.delete(`${BASE_URL}/${id}`).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    if (isLoading) return;
    setPostData(paginateData[page] as PostDataProps["setPostData"]);
  }, [page]);

  const handleChange = () => {
    if (!value) {
      setPostData(paginateData[page] as PostDataProps["setPostData"]);
    } else {
      let searchResult = new RegExp(`${value}`, "gi");
      const searchData = saveData.filter((item: InfoProps) =>
        item.title.match(searchResult)
      );

      setPostData(searchData);
    }
  };

  return (
    <Box>
      <Button m={3} colorScheme="teal">
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
                    >
                      <Link href={`/single/${item.id}`}>Read More</Link>
                    </Button>
                  </Text>
                </Box>
              </Flex>
              <Flex justify="space-between" alignItems="center" p="3">
                <Box hidden>yex</Box>
                <Box display="flex">
                  <EditIcon w={6} h={6} color="blue.500" mx={2} />
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
