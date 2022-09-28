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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ButtonGroup,
  Image,
  Center,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Axios from "axios";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import url from "../../config";
import swal from "sweetalert";
import ViewInfo from "../../components/layouts/viewInfo";
import Info from "./info";
import svg from "../../images/serv.svg";
import empty from "../../images/empty.svg";
import Approval from "./Approval";

function RenderPage() {
  const [open, setOpen] = useState();
  const [services, setServices] = useState([]);
  const [servicesOffer, setServicesOffer] = useState([]);
  const [worktype, setWorktype] = useState([]);
  const [myrequest, setMyrequest] = useState([]);
  const [myPendingrequest, setMyPendingrequest] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedservices, setSelectectServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [uncheckall, setUncheckall] = useState();
  const toast = useToast();
  const ref = useRef();

  useEffect(() => {
    Axios.post(url + "/api/requestor/getservices.php").then((req) => {
      if (req.data.length >= 1) {
        setServices(req.data);
      } else {
        setServices([]);
      }
    });

    Axios.post(url + "/api/admin/getservicesoffer.php").then((req) => {
      if (req.data.length >= 1) {
        setServicesOffer(req.data);
      } else {
        setServicesOffer([]);
      }
    });

    Axios.post(url + "/api/admin/getWorktype.php").then((req) => {
      if (req.data.length >= 1) {
        setWorktype(req.data);
      } else {
        setWorktype([]);
      }
    });

    Axios.post(url + "/api/requestor/getMyrequest.php", {
      userID: 30,
    }).then((req) => {
      if (req.data.length >= 1) {
        setMyrequest(req.data);
      } else {
        setMyrequest([]);
      }
    });

    Axios.post(url + "/api/requestor/getPendingRequest.php", {
      userID: 30,
    }).then((req) => {
      if (req.data.length >= 1) {
        setMyPendingrequest(req.data);
      } else {
        setMyPendingrequest([]);
      }
    });

    Axios.post(url + "/api/admin/getUsers.php").then((req) => {
      if (req.data.length >= 1) {
        setUsers(req.data);
      } else {
        setUsers([]);
      }
    });
    Axios.post(url + "/api/assessor/getstatusMessages.php").then((req) => {
      if (req.data.length >= 1) {
        setMessages(req.data);
      } else {
        setMessages([]);
      }
    });
  }, []);

  function addUp(SelectedServices) {
    setSelected((prev) => {
      return prev.concat(SelectedServices);
    });
  }

  const remove = (id) => {
    setSelected(selected.filter((item) => item !== id));
  };

  function progress(c, totald) {
    const dtassess = moment(c).format("YYYY-MM-DD");
    const totaldays = totald > 0 ? totald : 0;
    const EndDate = moment(dtassess)
      .add(totaldays, "days")
      .format("YYYY-MM-DD");
    const differeddate = moment(EndDate).diff(moment(), "days");
    const fp = (differeddate / totald) * 100;
    const pp = 100 - fp;
    const percentage =
      pp >= 100 ? 100 : differeddate == 0 ? 100 : Math.round(pp);

    return (
      <>
        <Flex>
          <Progress
            backgroundColor={"green.100"}
            value={percentage}
            hasStripe
            colorScheme={"teal"}
            style={{ width: "100px", height: "15px" }}
          ></Progress>
          <Text ml={2} color={"blackAlpha.600"}>
            {percentage}%
          </Text>
        </Flex>
      </>
    );
  }

  const handleSelected = (e) => {
    const id = e.target.value;

    if (e.target.checked) {
      addUp(id);
    } else {
      remove(id);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    ref.current.checked = "false";

    const typeofwork = e.target.typeofwork.value;

    if (selected.length >= 1) {
      Axios.post(url + "/api/requestor/SaveRequest.php", {
        userID: 30,
        typeofWork: typeofwork,
        selected: selected,
      }).then((req) => {
        if (req.data.status == 1) {
          Axios.post(url + "/api/requestor/getPendingRequest.php", {
            userID: 30,
          }).then((req) => {
            if (req.data.length >= 1) {
              setMyPendingrequest(req.data);
            } else {
              setMyPendingrequest([]);
            }
          });
          setUncheckall("uncheck");
          swal("Saved!", "Selection Saved Successfully!", "success").then(
            (value) => {
              setOpen("");
            }
          );
        } else if (req.data.status == 2) {
          swal(
            "Selection Already Exist",
            "One or More of your selection already exist.",
            "error"
          );
        }
      });

      //
    } else {
      swal("No Selection", "Please select one or more services!", "error");
    }
  };

  const handleRemove = (e) => {
    const id = e.currentTarget.dataset.requestid;
    Axios.post(url + "/api/requestor/deletePendingrequest.php", {
      id: id,
    }).then((req) => {
      if ((req.data.status = 1)) {
        Axios.post(url + "/api/requestor/getPendingRequest.php", {
          userID: 30,
        }).then((req) => {
          if (req.data.length >= 1) {
            setMyPendingrequest(req.data);
          } else {
            setMyPendingrequest([]);
          }
        });

        toast({
          title: `Request Removed Successfully!`,
          status: "success",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
        });
      }
    });
  };

  const handleSubmitRequest = (e) => {
    swal({
      title: "Are you sure?",
      text: "if request is submitted.it cannot be modified.",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then((Save) => {
      if (Save) {
        Axios.post(url + "/api/requestor/submitRequest.php", {
          userID: 30,
        }).then((req) => {
          setMyPendingrequest([]);
          toast({
            title: `Request Submitted Successfully!`,
            status: "success",
            position: "top-right",
            variant: "left-accent",
            isClosable: true,
          });
          Axios.post(url + "/api/requestor/getMyrequest.php", {
            userID: 30,
          }).then((req) => {
            if (req.data.length >= 1) {
              setMyrequest(req.data);
            } else {
              setMyrequest([]);
            }
          });
          //
        });
      }
    });
  };

  const handleDeleteList = (e) => {
    const id = e.currentTarget.dataset.id;

    swal({
      title: "Are you sure?",
      text: "you wont be able to revert this",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((Delete) => {
      if (Delete) {
        Axios.post(url + "/api/requestor/deleteRequest.php", {
          id: id,
        }).then((req) => {
          if (req.data.status == 1) {
            toast({
              title: `Request Deleted Successfully!`,
              status: "success",
              position: "top-right",
              variant: "left-accent",
              isClosable: true,
            });
            Axios.post(url + "/api/requestor/getMyrequest.php", {
              userID: 30,
            }).then((req) => {
              if (req.data.length >= 1) {
                setMyrequest(req.data);
              } else {
                setMyrequest([]);
              }
            });
          }
        });
      }
    });
  };

  const handleAddinfo = (e) => {
    const id = e.currentTarget.dataset.id;
    const type = e.currentTarget.dataset.type;
    const value = e.target.value;
    Axios.post(url + "/api/requestor/updateRequestInfo.php", {
      id: id,
      type: type,
      value: value,
    });
  };
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
          <GridItem w="100%" colSpan={[12, 12, 7]}>
            <Box bg={"gray.100"} p={10} color={"blackAlpha.600"}>
              {/* request */}
              <Box display={"block"}>
                <Text fontWeight={"bold"} fontSize={16} color={"blue.500"}>
                  <Badge variant="outline" colorScheme="green">
                    Warehouse
                  </Badge>
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
                {/*  */}
                <form method="post" onSubmit={handleSubmit}>
                  <Box
                    display={open ? "block" : "none"}
                    transition={"all ease 1s"}
                  >
                    <Stack mb={3}>
                      <Box mt={5} fontSize={15}>
                        <Text>Job Needed:</Text>
                        <FormControl isRequired>
                          <RadioGroup>
                            <Stack
                              direction={["column", "column", "row"]}
                              spacing={10}
                              required
                            >
                              {worktype.map((row) => {
                                return (
                                  <>
                                    <Radio
                                      value={row.PK_workTypeID}
                                      name="typeofwork"
                                    >
                                      {row.label}
                                    </Radio>
                                  </>
                                );
                              })}
                            </Stack>
                          </RadioGroup>
                        </FormControl>
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
                          {services.map((row) => {
                            return (
                              <>
                                <GridItem w={"100%"}>
                                  <Box>
                                    <Text
                                      fontSize={14}
                                      color={"blue.700"}
                                      fontWeight={"bold"}
                                    >
                                      {row.name}
                                    </Text>
                                    <Box>
                                      <Stack>
                                        {servicesOffer.map((s) => {
                                          if (
                                            s.FK_serviceID == row.PK_servicesID
                                          ) {
                                            return (
                                              <>
                                                <Checkbox
                                                  size={"sm"}
                                                  colorScheme="cyan"
                                                  value={s.PK_soID}
                                                  onChange={handleSelected}
                                                  name="servicesoffer"
                                                  id={s.PK_soID}
                                                  ref={ref}
                                                >
                                                  {s.name}
                                                </Checkbox>
                                              </>
                                            );
                                          }
                                        })}
                                      </Stack>
                                    </Box>
                                  </Box>
                                </GridItem>
                              </>
                            );
                          })}

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
                            type={"submit"}
                          >
                            Save
                          </Button>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </form>
                {/*  */}
              </Box>
              {/* end Request */}
            </Box>
            <Box bg={"gray.100"} p={10} mt={2}>
              <Box>
                <Text color={"blackAlpha.600"} fontWeight="bold">
                  MY REQUEST
                </Text>

                <Badge mb={2} colorScheme={"linkedin"}>
                  {" "}
                  <i className="fas fa-list"></i> My Job Orders
                </Badge>

                <Tabs>
                  <TabList>
                    <Tab fontSize={14} color="blackAlpha.600">
                      On Going{" "}
                      <i
                        className="fas fa-sync"
                        style={{ marginLeft: "5px" }}
                      ></i>
                    </Tab>
                    <Tab fontSize={14} color="blackAlpha.600">
                      Accomplished{" "}
                      <i
                        className="fas fa-check-circle"
                        style={{ marginLeft: "5px" }}
                      ></i>
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <TableContainer mt={4}>
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
                            {myrequest.map((row) => {
                              if (
                                row.status == 0 ||
                                row.status == 1 ||
                                row.status == 2 ||
                                row.status == 4
                              ) {
                                return (
                                  <>
                                    <Tr color={"blackAlpha.700"}>
                                      <Td>
                                        <Stack>
                                          <Text mb={2} color={"blue.400"}>
                                            {" "}
                                            <i className="fas fa-cogs"></i>
                                            {worktype.map((w) => {
                                              if (
                                                w.PK_workTypeID == row.FK_workID
                                              ) {
                                                return w.label;
                                              }
                                            })}
                                          </Text>
                                          <Box>
                                            {services.map((s) => {
                                              if (
                                                s.PK_servicesID ==
                                                row.FK_serviceID
                                              ) {
                                                return s.name;
                                              }
                                            })}
                                          </Box>
                                        </Stack>
                                      </Td>
                                      <Td>
                                        {servicesOffer.map((so) => {
                                          if (
                                            so.PK_soID == row.FK_serviceOfferID
                                          ) {
                                            return so.name;
                                          }
                                        })}
                                      </Td>
                                      <Td>
                                        {row.request_status ==
                                        "ACCOMPLISHED" ? (
                                          <Flex>
                                            <Progress
                                              backgroundColor={"green.100"}
                                              value={100}
                                              hasStripe
                                              colorScheme={"teal"}
                                              style={{
                                                width: "100px",
                                                height: "15px",
                                              }}
                                            ></Progress>
                                            <Text
                                              ml={2}
                                              color={"blackAlpha.600"}
                                            >
                                              100%
                                            </Text>
                                          </Flex>
                                        ) : row.totaldays ? (
                                          progress(
                                            row.dt_assessed,
                                            row.totaldays
                                          )
                                        ) : (
                                          <Flex>
                                            <Progress
                                              backgroundColor={"green.100"}
                                              value={0}
                                              hasStripe
                                              colorScheme={"teal"}
                                              style={{
                                                width: "100px",
                                                height: "15px",
                                              }}
                                            ></Progress>
                                            <Text
                                              ml={2}
                                              color={"blackAlpha.600"}
                                            >
                                              0%
                                            </Text>
                                          </Flex>
                                        )}
                                      </Td>
                                      <Td>
                                        {row.request_status ? (
                                          <Badge
                                            variant="subtle"
                                            colorScheme="green"
                                          >
                                            {row.request_status}
                                          </Badge>
                                        ) : row.status == 0 ? (
                                          <Badge
                                            variant="subtle"
                                            colorScheme="orange"
                                          >
                                            For Approval
                                          </Badge>
                                        ) : (
                                          <Badge
                                            variant="subtle"
                                            colorScheme="red"
                                          >
                                            PENDING
                                          </Badge>
                                        )}
                                      </Td>
                                      <Td>
                                        <Stack direction={"row"}>
                                          <ButtonGroup
                                            size="sm"
                                            isAttached
                                            variant="outline"
                                          >
                                            {/*  */}
                                            <ViewInfo
                                              info={
                                                <Info
                                                  myrequest={myrequest}
                                                  myID={row.PK_requestID}
                                                  services={services}
                                                  servicesOffer={servicesOffer}
                                                  users={users}
                                                  load="ongoing"
                                                  messages={messages}
                                                />
                                              }
                                            />
                                            {row.status == 0 ? (
                                              <Button
                                                size={"sm"}
                                                colorScheme={"red"}
                                                variant={"ghost"}
                                                fontWeight="normal"
                                                onClick={handleDeleteList}
                                                data-id={row.PK_requestID}
                                              >
                                                <i className="fas fa-trash-can"></i>
                                              </Button>
                                            ) : (
                                              ""
                                            )}
                                          </ButtonGroup>
                                        </Stack>
                                      </Td>
                                    </Tr>
                                  </>
                                );
                              }
                            })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel>
                      <TableContainer mt={4}>
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
                            {myrequest.map((row) => {
                              if (row.status == 3) {
                                return (
                                  <>
                                    <Tr color={"blackAlpha.700"}>
                                      <Td>
                                        {services.map((s) => {
                                          if (
                                            s.PK_servicesID == row.FK_serviceID
                                          ) {
                                            return s.name;
                                          }
                                        })}
                                      </Td>
                                      <Td>
                                        {servicesOffer.map((so) => {
                                          if (
                                            so.PK_soID == row.FK_serviceOfferID
                                          ) {
                                            return so.name;
                                          }
                                        })}
                                      </Td>
                                      <Td>
                                        {row.request_status ==
                                        "ACCOMPLISHED" ? (
                                          <Flex>
                                            <Progress
                                              backgroundColor={"green.100"}
                                              value={100}
                                              hasStripe
                                              colorScheme={"teal"}
                                              style={{
                                                width: "100px",
                                                height: "15px",
                                              }}
                                            ></Progress>
                                            <Text
                                              ml={2}
                                              color={"blackAlpha.600"}
                                            >
                                              100%
                                            </Text>
                                          </Flex>
                                        ) : (
                                          progress(
                                            row.dt_assessed,
                                            row.totaldays
                                          )
                                        )}
                                      </Td>
                                      <Td>
                                        <Badge
                                          variant="subtle"
                                          colorScheme="green"
                                        >
                                          {row.request_status}
                                        </Badge>
                                      </Td>
                                      <Td>
                                        <ViewInfo
                                          info={
                                            <Info
                                              myrequest={myrequest}
                                              myID={row.PK_requestID}
                                              services={services}
                                              servicesOffer={servicesOffer}
                                              users={users}
                                              messages={messages}
                                            />
                                          }
                                        />
                                      </Td>
                                    </Tr>
                                  </>
                                );
                              }
                            })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
            {/*     <Box bg={"teal.50"} p="10" mt={2} borderLeft={"4px solid #2596be"}>
              <Text
                fontWeight={"bold"}
                fontSize={16}
                color={"blackAlpha.700"}
                textAlign="center"
              >
                JOB ORDER REQUEST
              </Text>{" "}
              <Center mt={10}>
                <Image
                  //   borderRadius="full"
                  userSelect={"none"}
                  width={"70%"}
                  src={svg}
                  alt="Dan Abramov"
                />
              </Center>
            
            </Box> */}
          </GridItem>
          <GridItem w="100%" colSpan={[12, 12, 5]}>
            <Box
              bg={"gray.100"}
              p={10}
              display={"block"}
              borderRight="4px solid #bc7d52"
            >
              {/* finalize request */}
              <Box>
                {myPendingrequest.length >= 1 ? (
                  <>
                    <Alert
                      status="error"
                      borderLeft={"4px solid #d7883b"}
                      bg={"#f5daa5"}
                    >
                      <AlertIcon color={"#d7883b"} />
                      <Text color={"orange.500"} fontSize={14}>
                        FINALIZE REQUEST
                      </Text>
                    </Alert>

                    <Stack>
                      {myPendingrequest.map((row) => {
                        return (
                          <>
                            <Box bg={"gray.100"} p={5} shadow="md">
                              <Badge
                                variant="outline"
                                mb={2}
                                colorScheme="green"
                              >
                                saved
                              </Badge>
                              <Stack direction={"row"}>
                                <Text fontSize={12} mb={2} color={"blue.400"}>
                                  {" "}
                                  <i className="fas fa-cogs"></i>
                                  {worktype.map((w) => {
                                    if (w.PK_workTypeID == row.FK_workID) {
                                      return w.label;
                                    }
                                  })}
                                </Text>
                                <Box>|</Box>
                                <Box fontSize={12} color={"blue.700"}>
                                  {services.map((s) => {
                                    if (s.PK_servicesID == row.FK_serviceID) {
                                      return s.name;
                                    }
                                  })}
                                </Box>
                              </Stack>
                              <Stack>
                                <Box>
                                  <Text
                                    fontSize={14}
                                    fontWeight="bold"
                                    color={"gray.500"}
                                  >
                                    {servicesOffer.map((so) => {
                                      if (so.PK_soID == row.FK_serviceOfferID) {
                                        return so.name;
                                      }
                                    })}
                                  </Text>
                                </Box>
                                <Box fontSize={14}>
                                  {services.map((s) => {
                                    if (s.PK_servicesID == row.FK_serviceID) {
                                      if (s.isSM == 1) {
                                        return (
                                          <>
                                            <Stack
                                              bg={"gray.200"}
                                              padding={5}
                                              borderColor={"blackAlpha.200"}
                                              borderWidth={1}
                                              borderRadius={4}
                                            >
                                              <Box>
                                                <Text fontSize={12}>
                                                  If applicable:
                                                </Text>
                                                <Text>Serial No:</Text>
                                                <Input
                                                  placeholder=""
                                                  size="sm"
                                                  backgroundColor={
                                                    "whiteAlpha.600"
                                                  }
                                                  onChange={handleAddinfo}
                                                  data-type="serialno"
                                                  data-id={row.PK_requestID}
                                                />
                                              </Box>
                                              <Box>
                                                <Text>Model No:</Text>
                                                <Input
                                                  placeholder=""
                                                  size="sm"
                                                  backgroundColor={
                                                    "whiteAlpha.600"
                                                  }
                                                  onChange={handleAddinfo}
                                                  data-type="modelno"
                                                  data-id={row.PK_requestID}
                                                />
                                              </Box>
                                            </Stack>
                                          </>
                                        );
                                      }
                                    }
                                  })}
                                </Box>
                              </Stack>
                              <Button
                                variant="ghost"
                                color={"red.400"}
                                size="md"
                                onClick={handleRemove}
                                data-requestid={row.PK_requestID}
                                fontSize={12}
                              >
                                Remove{" "}
                                <i
                                  style={{ marginLeft: "5px" }}
                                  className="fas fa-times-circle"
                                ></i>
                              </Button>
                            </Box>
                          </>
                        );
                      })}
                    </Stack>
                    <Button
                      mt={3}
                      size={"sm"}
                      variant={"outline"}
                      colorScheme="facebook"
                      onClick={handleSubmitRequest}
                    >
                      Submit Request{" "}
                      <i
                        className="fas fa-paper-plane"
                        style={{ marginLeft: "4px" }}
                      ></i>
                    </Button>
                  </>
                ) : (
                  <>
                    <Stack bg={"gray.200"} p={5}>
                      <Box>
                        <Center>
                          <Image src={empty} width={"40%"} />
                        </Center>
                      </Box>
                      <Box>
                        <Text
                          textAlign={"center"}
                          color={"blackAlpha.700"}
                          mt={4}
                          fontWeight="bold"
                        >
                          No Saved Request Found
                        </Text>
                      </Box>
                    </Stack>
                  </>
                )}
              </Box>

              {/* End finalize Request */}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

function R_Request() {
  const isSecretary = 0;
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={isSecretary == 1 ? <Approval /> : <RenderPage />}
        Page_title="REQUEST"
      />
    </>
  );
}

export default R_Request;
