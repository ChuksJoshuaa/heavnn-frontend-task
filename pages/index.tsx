import { DataProps } from "@/utils/interface";
import { BASE_URL, USER_BASE_URL } from "@/utils/routes";
import axios from "axios";
import { NextPage } from "next";
import { useAppDispatch } from "@/redux/hooks";
import {
  saveAllData,
  savePaginateData,
  saveUserData,
} from "@/redux/features/posts/postSlice";
import { Box, Container } from "@chakra-ui/react";
import { Posts } from "@/components";
import { paginate } from "@/utils/pagination";
import { useEffect } from "react";
import { getUsersFromLocalStorage } from "@/utils/getLocalStorage";

const Home: NextPage<DataProps> = ({ data, userData }) => {
  const dispatch = useAppDispatch();

  const checkData = () => {
    let defaultData = getUsersFromLocalStorage().data;

    if (defaultData) {
      dispatch(saveUserData(defaultData));
    } else {
      dispatch(saveUserData(userData));
    }
  };

  dispatch(saveAllData(data));

  const newData = paginate(data);
  dispatch(savePaginateData(newData));

  useEffect(() => {
    checkData();
  }, []);

  return (
    <Box>
      <Container maxW="1500px" p="4">
        <Posts />
      </Container>
    </Box>
  );
};

export const getServerSideProps = async () => {
  let response = null;
  let userResponse = null;

  response = await axios.get(`${BASE_URL}`);
  userResponse = await axios.get(`${USER_BASE_URL}`);

  if (!response.data) {
    return {
      msg: "Data not fetched",
    };
  }

  if (!userResponse.data) {
    return {
      msg: "Data not fetched",
    };
  }

  return {
    props: {
      data: response.data,
      userData: userResponse.data,
    },
  };
};

export default Home;
