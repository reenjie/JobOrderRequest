import React from "react";
import LoadingScreen from "react-loading-screen";
import { Center, Heading, Image, Stack } from "@chakra-ui/react";
import logo from "../images/zcmc_logo.png";
function Loading(props) {
  return (
    <Center w={"100vw"} h={"100vh"} flexDirection={"column"}>
      <Image src={logo} height="auto" width={"120px"} alt="ZCMC logo"></Image>
      <LoadingScreen
        loading={true}
        bgColor="rgba(255,255,255,0.8)"
        spinnerColor="#008080"
        textColor="#676767"
        logoSrc=""
        text=""
      >
        {" "}
      </LoadingScreen>

      <Heading fontSize={20}>JOB ORDER REQUEST</Heading>
    </Center>
  );
}

export default Loading;
