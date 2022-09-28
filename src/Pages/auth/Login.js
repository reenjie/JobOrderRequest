import React, { useState } from "react";
import "../../css/App.css";
import logo from "../../images/zcmc_logo.png";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Center,
  Button,
  Heading,
  InputGroup,
  Flex,
  InputRightElement,
  Avatar,
  Stack,
  Text,
  Spacer,
  Image,
  Grid,
  GridItem,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Login(props) {
  const [isLogin, setLogin] = useState(true);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const Login = (props) => {
    return (
      <>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            boxShadow="md"
            type={"text"}
            bg={"#white"}
            color="blackAlpha.700"
            placeholder="Enter Email"
          ></Input>
          <FormLabel pt={2}>password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              boxShadow="md"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Box float={"right"}>
          <Text>forgot password</Text>
        </Box>
      </>
    );
  };

  const Register = (props) => {
    //fname, lname, email, pass, repass,
    return (
      <>
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={[0, 0, 0, 10]}
          rowGap={0}
          width="100%"
        >
          <GridItem colSpan={[2, 2, 1, 1]} rowSpan={[1, 1, 2, 2]}>
            <FormControl pb={"1rem"}>
              <FormLabel>email</FormLabel>
              <Input
                size={"sm"}
                pl={2}
                boxShadow="md"
                type={"text"}
                bg={"#white"}
                color="blackAlpha.700"
                placeholder="Enter Email"
                required
              ></Input>
            </FormControl>
            <FormControl pb={"1rem"}>
              <FormLabel>password</FormLabel>
              <InputGroup size="md">
                <Input
                  size={"sm"}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement height={"2rem"} width="4.5rem">
                  <Button h="1.75rem" size="xs" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl pb={"1rem"}>
              <FormLabel>re-enter password</FormLabel>
              <InputGroup size="md">
                <Input
                  size={"sm"}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement height={"2rem"} width="4.5rem">
                  <Button h="1.75rem" size="xs" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl pb={"1rem"}>
              <FormLabel>first name</FormLabel>
              <Input
                size={"sm"}
                pl={2}
                boxShadow="md"
                type={"text"}
                bg={"#white"}
                color="blackAlpha.700"
                placeholder="ex. Juan"
                required
              ></Input>
            </FormControl>
            <FormControl pb={"1rem"}>
              <FormLabel>last name</FormLabel>
              <Input
                size={"sm"}
                pl={2}
                boxShadow="md"
                type={"text"}
                bg={"#white"}
                color="blackAlpha.700"
                placeholder="ex. Dela Cruz"
                required
              ></Input>
            </FormControl>
          </GridItem>
          {/* //contact, address, usertype, ward unit, specialty, position, */}
          <GridItem colSpan={[2, 2, 1, 1]} rowSpan={[1, 1, 2, 2]}>
            {" "}
            <FormControl pb={"1rem"}>
              <FormLabel>contact no</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+63" />
                <Input type="tel" placeholder="phone number" />
              </InputGroup>
            </FormControl>
            <FormControl pb={"1rem"}>
              <FormLabel>address</FormLabel>
              <Input
                size={"sm"}
                pl={2}
                boxShadow="md"
                type={"text"}
                bg={"#white"}
                color="blackAlpha.700"
                placeholder="address"
                required
              ></Input>
            </FormControl>
            <FormControl pb={"1rem"}>
              <FormLabel>user type</FormLabel>
              <Select placeholder="Select option">
                <option value="option1">Assessor</option>
                <option value="option2">Requestor</option>
              </Select>
            </FormControl>
            <FormControl pb={"1rem"}>
              <FormLabel>Ward Unit</FormLabel>
              <Input
                size={"sm"}
                pl={2}
                boxShadow="md"
                type={"text"}
                bg={"#white"}
                color="blackAlpha.700"
                placeholder="address"
                required
              ></Input>
            </FormControl>
            <FormControl pb={"1rem"}>
              <FormLabel>specialty</FormLabel>
              <Input
                size={"sm"}
                pl={2}
                boxShadow="md"
                type={"text"}
                bg={"#white"}
                color="blackAlpha.700"
                placeholder="address"
                required
              ></Input>
            </FormControl>
            <FormControl pb={"1rem"}>
              <FormLabel>possition</FormLabel>
              <Input
                size={"sm"}
                pl={2}
                boxShadow="md"
                type={"text"}
                bg={"#white"}
                color="blackAlpha.700"
                placeholder="address"
                required
              ></Input>
            </FormControl>
          </GridItem>
        </Grid>
        {/* <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            size={"sm"}
            ml={2}
            boxShadow="md"
            type={"text"}
            bg={"#white"}
            color="blackAlpha.700"
            placeholder="Enter Email"
            required
          ></Input>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              size={"sm"}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement height={"2rem"} width="4.5rem">
              <Button h="1.75rem" size="xs" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl> */}
      </>
    );
  };
  return (
    <Box bg={"#DDDEDF"} w="100vw" h="100vh">
      <Stack
        //justifyContent={"space-between"}
        alignItems={["Center", "Center", "Center", "end-start"]}
        float={["", "", "", "right"]}
        w="100%"
        h="100%"
        direction={["column", "column", "column", "row"]}
      >
        <Center
          w={["50%", "50%", "50%", "100%"]}
          h={["20vh", "20vh", "20vh", "100%"]}
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            direction="column"
          >
            <Image
              src={logo}
              height={"auto"}
              minW={["", "", "", "200px"]}
              width={["100px", "100px", "100px", "25%"]}
              alt="ZCMC logo"
            ></Image>
            <Heading
              fontSize={["15", "20", "30", "33", "40"]}
              padding={["0", "0", "10", "10"]}
            >
              ZCMC JOB REQUEST
            </Heading>
          </Flex>
        </Center>
        <Box
          height={["auto", "auto", "auto", "auto"]}
          minH={["auto", "auto", "auto", "100vh"]}
          width={["90vw", "75vw", "100vw", "150vw"]}
          minW={[, , , "700px"]}
          bg={"white"}
          borderTopLeftRadius={"20"}
          borderBottomLeftRadius={"20"}
          borderTopRightRadius={["20", "20", "20", "0"]}
          borderBottomRightRadius={["20", "20", "20", "0"]}
          boxShadow="2xl"
          color={"blackAlpha.700"}
        >
          {isLogin ? null : (
            <ChevronLeftIcon
              w={8}
              h={8}
              style={{ cursor: "pointer" }}
              mt={8}
              ml={8}
              onClick={() => {
                setLogin(!isLogin);
              }}
            />
          )}
          <Stack
            w={"100%"}
            h={isLogin ? ["auto", "auto", "100vh", "100vh"] : "90%"}
            justifyContent={isLogin ? "center" : "start"}
            alignItems={
              isLogin ? "center" : ["center", "center", "start", "start"]
            }
            p={isLogin ? 30 : ["30", "30", "10"]}
            gap={["0", "0", "10", "10"]}
          >
            <Heading fontSize={isLogin ? 40 : ["30", "30", "30", 40]}>
              {isLogin ? "Login" : "Register"}
            </Heading>
            <Stack
              gap={"10px"}
              w={isLogin ? ["70%", "70%", "50%", "50%"] : "100%"}
              // pr={"20"}
            >
              {/* COMPOSITION */}
              {isLogin ? <Login /> : <Register />}
              <Stack
                direction={isLogin ? ["column", "column", "row", "row"] : "row"}
              >
                {isLogin ? (
                  <Button
                    colorScheme="blue"
                    size="md"
                    w={"100%"}
                    boxShadow="2xl"
                    borderRadius={"50"}
                    onClick={() => {
                      navigate("/Dashboard");
                    }}
                  >
                    Login
                  </Button>
                ) : null}
                <Spacer></Spacer>
                <Button
                  colorScheme="teal"
                  size="md"
                  w={"100%"}
                  boxShadow="2xl"
                  borderRadius={"50"}
                  onClick={() => {
                    setLogin(!isLogin);
                    console.log("click");
                  }}
                >
                  Register
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Login;
