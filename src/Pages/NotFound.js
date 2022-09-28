import React from "react";
import {
  Image,
  Center,
  Box,
  Text,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import "../css/App.css";
import { Link } from "react-router-dom";
function NotFound(props) {
  return (
    <div>
      {" "}
      <Center>
        <Stack>
          <Box boxSize="md" mt={["90px", "120px", "150px"]}>
            <Heading
              textAlign={"center"}
              fontSize={[100, 150, 200]}
              id="fourofour"
            >
              404{" "}
            </Heading>
            <Text
              mt="4"
              fontWeight={"bold"}
              color="teal.700"
              fontSize={[20, 35, 40]}
              id="pagenotfound"
              textAlign="center"
            >
              OOOPS! <br /> PAGE NOT FOUND
            </Text>
            <br />
            <Link to="../">
              <Button
                variant={"outline"}
                w={"100%"}
                p={10}
                colorScheme={"twitter"}
              >
                Back to Home
              </Button>
            </Link>
          </Box>
        </Stack>
      </Center>
    </div>
  );
}

export default NotFound;
