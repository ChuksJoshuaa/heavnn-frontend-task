import { Box, Button, Container } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { InputField, Loader, TextField } from "@/components";
import { saveAllData, setLoader } from "@/redux/features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getDataFromLocalStorage } from "@/utils/getLocalStorage";
import { InfoProps, SinglePageProps } from "@/utils/interface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditPage = () => {
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxW="700px" mt="5">
      <Formik
        initialValues={{
          title: singlePost?.title,
          body: singlePost?.body,
        }}
        onSubmit={(values) => {
          const findIndexValue = getData.findIndex(
            (item: InfoProps) => item.id === newId
          );

          getData[findIndexValue] = {
            id: newId,
            userId: singlePost?.userId,
            title: values?.title,
            body: values?.body,
          };

          dispatch(saveAllData(getData));
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form
            style={{ fontFamily: '"Rajdhani", sans-serif' }}
            className="form-body"
          >
            <InputField
              name="title"
              placeholder="title"
              label="Title"
              type="text"
            />
            <Box mt={4}>
              <TextField name="body" placeholder="body" label="Body" />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="red"
            >
              Update post
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditPage;
