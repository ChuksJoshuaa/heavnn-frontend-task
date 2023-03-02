import { Loader, Posts } from "@/components";
import {
  saveAllData,
  saveUserData,
  setLoader,
} from "@/redux/features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getDataFromLocalStorage,
  getUsersFromLocalStorage,
} from "@/utils/getLocalStorage";
import { DataProps } from "@/utils/interface";
import { BASE_URL, USER_BASE_URL } from "@/utils/routes";
import { Box, Container } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage<DataProps> = ({ data, userData }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.post);
  const checkAllData = () => {
    let defaultData = getDataFromLocalStorage().data;

    if (defaultData) {
      dispatch(saveAllData(defaultData));
    } else {
      dispatch(saveAllData(data));
    }
  };

  const checkUserData = () => {
    let defaultData = getUsersFromLocalStorage().data;

    if (defaultData) {
      dispatch(saveUserData(defaultData));
    } else {
      dispatch(saveUserData(userData));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoader(false));
    }, 400);
  });

  useEffect(() => {
    checkUserData();
    checkAllData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

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
