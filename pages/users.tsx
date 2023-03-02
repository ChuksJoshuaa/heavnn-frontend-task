import { getUsersFromLocalStorage } from "@/utils/getLocalStorage";
import { UserProps } from "@/utils/interface";
import {
    Box, Center,
    Container,
    Divider,
    Flex,
    Heading,
    Input,
    InputGroup, Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const users = () => {
  const [userData, setUserData] = useState([]);
  const [value, setValue] = useState("");
  let data = getUsersFromLocalStorage().data;

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, []);

  const handleChange = () => {
    if (!value) {
      setUserData(data);
    } else {
      let searchResult = new RegExp(`${value}`, "gi");
      const searchData = data.filter(
        (item: UserProps) =>
          item.username.match(searchResult) || item.name.match(searchResult)
      );

      setUserData(searchData);
    }
  };

  return (
    <Container maxW="1500px" p="4">
      <InputGroup size="md" style={{ width: "500px", margin: "2em auto" }}>
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Search Title"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleChange}
        />
      </InputGroup>
      {userData.length === 0 ? (
        <>
          <Center alignItems="center" color="red.800" fontSize={20}>
            No user available or matched the search input
          </Center>
        </>
      ) : (
        <div className="post-container">
          {userData?.map((item: UserProps) => (
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
                  {item.name}
                </Heading>
                <Box>
                  <Text mt={1}>Username: {item.username}</Text>
                </Box>
                <Divider />
                <Box>
                  <Text mt={1}>Email: {item.email}</Text>
                </Box>
                <Box>
                  <Text mt={1}>Phone: {item.phone}</Text>
                </Box>
                <Box>
                  <Text mt={1}>
                    Address: {item.address.street} {item.address.city}
                  </Text>
                </Box>
                <Box display="flex">
                  <Text mt={1}>{item.website}</Text>
                </Box>
              </Flex>
              <Flex justify="space-between" alignItems="center" p="3"></Flex>
            </Box>
          ))}
        </div>
      )}
    </Container>
  );
};

export default users;
