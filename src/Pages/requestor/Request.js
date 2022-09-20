import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import {
  Container,
  Button,
  Tr,
  Td,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  ListItem,
  UnorderedList,
  Text,
  Input,
  Alert,
  AlertIcon,
  FormControl,
  Spacer,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  InputGroup,
  InputLeftElement,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Th,
  TableCaption,
  TableContainer,
  Badge,
  Progress,
  Flex,
} from "@chakra-ui/react";
import Axios from "axios";
import moment from "moment";
import React, { useState } from "react";
function RenderPage() {
  const [open, setOpen] = useState();

  return (
    <>
      <Box p={[4, 8, 10]}>
        {/* */}

        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(12, 1fr)",
          ]}
          gap={2}
        >
          <GridItem w="100%" colSpan={[12, 12, 6]}>
            <Box bg={"gray.100"} p={10} color={"blackAlpha.600"}>
              {/* request */}
              <Box display={"block"}>
                <Text fontWeight={"bold"} fontSize={16}>
                  Job Request{" "}
                  <i
                    className="fas fa-digging"
                    style={{ fontSize: "17px", marginLeft: "5px" }}
                  ></i>
                  <Button
                    float={"right"}
                    onClick={() => {
                      if (open) {
                        setOpen("");
                      } else {
                        setOpen("open");
                      }
                    }}
                  >
                    {open ? (
                      <i
                        className="fas fa-minus-square"
                        style={{ color: "#ab7474", fontSize: "14px" }}
                      ></i>
                    ) : (
                      <>
                        <Text fontSize={14}>
                          Make a Request
                          <i
                            className="fas fa-plus-square"
                            style={{ color: "#74aa7e", marginLeft: "5px" }}
                          ></i>{" "}
                        </Text>
                      </>
                    )}
                  </Button>
                </Text>

                <Box
                  display={open ? "block" : "none"}
                  transition={"all ease 1s"}
                >
                  <Stack mb={3}>
                    <Box mt={5} fontSize={15}>
                      <Text>Job Needed:</Text>
                      <RadioGroup defaultValue="1">
                        <Stack direction={"row"} spacing={10}>
                          <Radio value="1" name="typeofwork">
                            New Installation
                          </Radio>
                          <Radio value="2" name="typeofwork">
                            Repair/Renovation
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </Box>
                  </Stack>

                  <Text color={"blackAlpha.500"} fontSize="14px">
                    Select and Check the following to create a Job Request{" "}
                    <i
                      className="fas fa-info-circle"
                      style={{ marginLeft: "5px" }}
                    ></i>
                    <br />
                    Example:{" "}
                    <i
                      style={{ marginLeft: "10px" }}
                      className="fas fa-check-square"
                    ></i>{" "}
                    Masonry Works
                  </Text>

                  <Stack mb={3}>
                    <Box mt={5} fontSize={15}>
                      <Grid
                        templateColumns={[
                          "repeat(1, 1fr)",
                          "repeat(1, 1fr)",
                          "repeat(2, 1fr)",
                          "repeat(3, 1fr)",
                        ]}
                        gap={2}
                      >
                        {/* Format */}
                        <GridItem w={"100%"}>
                          <Box>
                            <Text fontSize={14} fontWeight={"bold"}>
                              Civil Works
                            </Text>
                            <Box>
                              <Stack>
                                <Checkbox colorScheme="cyan">
                                  Carpentry
                                </Checkbox>
                                <Checkbox colorScheme="cyan">
                                  Painting works
                                </Checkbox>
                                <Checkbox colorScheme="cyan">
                                  Welding works
                                </Checkbox>
                                <Checkbox colorScheme="cyan">Masonry</Checkbox>
                              </Stack>
                            </Box>
                          </Box>
                        </GridItem>

                        {/* Format */}
                      </Grid>

                      <Box mt={5}>
                        <Checkbox colorScheme="facebook">Others</Checkbox>

                        <Input variant="flushed" placeholder="" disabled />
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          colorScheme={"messenger"}
                          float={"right"}
                          mt={2}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Box>
              {/* end Request */}
            </Box>
            <Box bg={"gray.100"} p="10" mt={2}>
              <Text color={"blackAlpha.600"}>Types of Services</Text>

              <Grid
                templateColumns={[
                  "repeat(3, 1fr)",
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                ]}
                gap={1}
              >
                <GridItem w="100%">
                  <Text color="teal.700" fontSize={14} mt={2}>
                    Civil Works
                  </Text>
                  <UnorderedList mt={2} color="blackAlpha.600" fontSize={14}>
                    <ListItem>Lorem ipsum dolor sit amet</ListItem>
                    <ListItem>Consectetur adipiscing elit</ListItem>
                    <ListItem>Integer molestie lorem at massa</ListItem>
                    <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                  </UnorderedList>
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
          <GridItem w="100%" colSpan={[12, 12, 6]}>
            <Box bg={"gray.100"} p={10} display={"block"}>
              {/* finalize request */}
              <Box>
                <Text color={"red.400"} fontWeight="bold">
                  FINALIZE REQUEST
                </Text>
                <TableContainer mt={4}>
                  <Badge mb={2} colorScheme={"blue"}>
                    {" "}
                    <i className="fas fa-cogs"></i> New Installation
                  </Badge>
                  <Table size="sm" variant="striped" colorScheme="gray">
                    <Thead>
                      <Tr>
                        <Th>Type of Work</Th>
                        <Th>Work</Th>
                        <Th>Additional Info</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>Civil Works</Td>
                        <Td>Carpentry Works</Td>
                        <Td>
                          <Stack>
                            <Box>
                              <Text fontSize={12}>If applicable:</Text>
                              <Text>Serial No:</Text>
                              <Input placeholder="" size="sm" />
                            </Box>
                            <Box>
                              <Text>Model No:</Text>
                              <Input placeholder="" size="sm" />
                            </Box>
                          </Stack>
                        </Td>
                        <Td>
                          <Button variant="ghost" color={"red.400"} size="md">
                            <i className="fas fa-times"></i>
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>

                <Button size={"sm"} variant={"outline"} colorScheme="green">
                  Submit Request
                </Button>
              </Box>
              {/* End finalize Request */}
            </Box>

            <Box bg={"gray.100"} p={10} mt={2}>
              <Box>
                <Text color={"blackAlpha.600"} fontWeight="bold">
                  MY REQUEST
                </Text>
                <TableContainer mt={4}>
                  <Badge mb={2} colorScheme={"linkedin"}>
                    {" "}
                    <i className="fas fa-list"></i> My Job Orders
                  </Badge>
                  <Table size="sm" variant="striped" colorScheme="gray">
                    <Thead>
                      <Tr>
                        <Th>Type of Work</Th>
                        <Th>Work</Th>
                        <Th>TimeFrame</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr color={"blackAlpha.700"}>
                        <Td>Civil Works</Td>
                        <Td>Carpentry Works</Td>
                        <Td>
                          <Flex>
                            <Progress
                              hasStripe
                              value={64}
                              backgroundColor={"green.100"}
                              width="100px"
                              colorScheme={"green"}
                              height={4}
                            />
                            <Text ml={2} color="blackAlpha.600">
                              64%
                            </Text>
                          </Flex>
                        </Td>
                        <Td>
                          <Badge variant="subtle" colorScheme="green">
                            WORK ON GOING
                          </Badge>
                        </Td>
                        <Td>
                          <Button
                            size={"sm"}
                            colorScheme={"cyan"}
                            variant={"ghost"}
                            fontWeight="normal"
                          >
                            View{" "}
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

function R_Request() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
        Page_title="REQUEST"
      />
    </>
  );
}

export default R_Request;
