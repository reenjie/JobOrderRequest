import React from "react";
import { ThreeCircles } from "react-loader-spinner";

import {
  Center,
  Heading,
  Image,
  Stack,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";
import logo from "../images/zcmc_logo.png";
import "../css/App.css";
function Loading(props) {
  return (
    <div id="loader">
      <div id="loaderlogo">
        <Stack>
          {/*  <Center>
            <Image
              boxSize="100px"
              height={"auto"}
              src={logo}
              alt="Dan Abramov"
            />
          </Center> */}

          <Center>
            <ThreeCircles
              height="100"
              width="100"
              color="rgba(116, 139, 168, 0.86)"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </Center>

          <Text fontWeight={"bold"} textAlign={"center"}>
            JOB ORDER REQUEST
          </Text>
        </Stack>
      </div>
      {/*   <LoadingScreen
        loading={true}
        bgColor="rgba(91, 106, 107, 0.22)"
        spinnerColor="#008080"
        textColor="rgba(0, 52, 134, 0.86)"
        logoSrc=""
        text=""
      >
        {" "}
      </LoadingScreen> */}
    </div>
  );
}

export default Loading;
