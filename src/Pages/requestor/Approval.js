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
  Tooltip,
  Textarea,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Axios from "axios";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import url from "../../config";
import ViewInfo from "../../components/layouts/viewInfo";
import Info from "./info";
import svg from "../../images/serv.svg";
import Gmodal from "../../components/layouts/gmodal";

import swal from "sweetalert";
function Approval(props) {
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

    Axios.post(url + "/api/requestor/getForapproval_request.php", {
      department: 67,
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

  const handleSubmitapproval = (e) => {
    e.preventDefault();
    const notedby = e.target.notedby.value;
    const reqid = e.target.requestid.value;

    Axios.post(url + "/api/requestor/ApprovedRequest.php", {
      notedby: notedby,
      requestid: reqid,
    }).then((req) => {
      if (req.data.status == 1) {
        Axios.post(url + "/api/requestor/getForapproval_request.php", {
          department: 67,
        }).then((req) => {
          if (req.data.length >= 1) {
            setMyrequest(req.data);
          } else {
            setMyrequest([]);
          }
        });
        document.getElementById("modalapproved").click();
        toast({
          title: `Request Approved Successfully!`,
          status: "success",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
        });
      }
    });
  };

  const handleSubmitdisapproval = (e) => {
    e.preventDefault();
    const notedby = e.target.notedby.value;
    const reqid = e.target.requestid.value;
    const eremarks = e.target.d_remarks.value;

    Axios.post(url + "/api/requestor/DisapprovedRequest.php", {
      notedby: notedby,
      requestid: reqid,
      dremarks: eremarks,
    }).then((req) => {
      if (req.data.status == 1) {
        Axios.post(url + "/api/requestor/getForapproval_request.php", {
          department: 67,
        }).then((req) => {
          if (req.data.length >= 1) {
            setMyrequest(req.data);
          } else {
            setMyrequest([]);
          }
        });
        document.getElementById("modalapproved").click();
        toast({
          title: `Request Approved Successfully!`,
          status: "success",
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
        });
      }
    });
  };

  const ApproveContent = (e) => {
    return (
      <>
        <Box>
          <form method="post" onSubmit={handleSubmitapproval}>
            <Center>
              <Stack>
                <Text color={"blackAlpha.700"} fontWeight="bold" fontSize={18}>
                  Confirm Approval?
                </Text>
                <Text color={"blackAlpha.600"}>
                  Once approved. this will redirect to the receiving assessors.
                </Text>
                <Spacer />
                <Text color={"blackAlpha.600"}>Noted By :</Text>
                <Input
                  size={"md"}
                  required
                  autoFocus
                  defaultValue={"Reenjay Caimor"}
                  name="notedby"
                  fontSize={14}
                />
                <Input type={"hidden"} name="requestid" value={e.requestid} />
                <Spacer />
                <Box>
                  <Button
                    variant={"solid"}
                    float={"right"}
                    colorScheme={"green"}
                    size="md"
                    type="submit"
                  >
                    Approve{" "}
                    <i
                      className="fas fa-check-circle"
                      style={{ marginLeft: "5px" }}
                    ></i>
                  </Button>
                </Box>
              </Stack>
            </Center>
            .
          </form>
        </Box>
      </>
    );
  };

  const DisApproveContent = (e) => {
    return (
      <>
        <Box>
          <form method="post" onSubmit={handleSubmitdisapproval}>
            <Center>
              <Stack>
                <Text color={"blackAlpha.700"} fontWeight="bold" fontSize={18}>
                  Confirm Disapproval?
                </Text>
                <Text color={"blackAlpha.600"}>
                  Once disapproved. it cannot be undone.
                </Text>
                <Spacer />
                <Text color={"blackAlpha.600"}>Noted By :</Text>
                <Input
                  size={"md"}
                  required
                  autoFocus
                  defaultValue={"Reenjay Caimor"}
                  name="notedby"
                  fontSize={14}
                />
                <Text color={"blackAlpha.600"}>Remarks :</Text>
                <Textarea
                  fontSize={14}
                  placeholder="Let the user know why disapprove"
                  name="d_remarks"
                />
                <Input type={"hidden"} name="requestid" value={e.requestid} />
                <Spacer />
                <Box>
                  <Button
                    variant={"solid"}
                    float={"right"}
                    colorScheme={"red"}
                    size="md"
                    type="submit"
                  >
                    Disapprove{" "}
                    <i className="fas fa-ban" style={{ marginLeft: "5px" }}></i>
                  </Button>
                </Box>
              </Stack>
            </Center>
          </form>
        </Box>
      </>
    );
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
          <GridItem w="100%" colSpan={[12, 12, 10]}>
            {myPendingrequest.length >= 1 ? (
              <Box
                bg={"gray.100"}
                p={10}
                display={"block"}
                borderRight="4px solid #bc7d52"
              ></Box>
            ) : (
              ""
            )}

            <Box bg={"gray.100"} p={10} mt={2}>
              <Box>
                <Text color={"blackAlpha.600"} fontWeight="bold"></Text>

                <Badge mb={2} colorScheme={"linkedin"}>
                  {" "}
                  <i className="fas fa-list"></i> Job Orders
                </Badge>

                <Tabs>
                  <TabList>
                    <Tab fontSize={14} color="blackAlpha.600">
                      Request
                      <i
                        className="fas fa-sync"
                        style={{ marginLeft: "5px" }}
                      ></i>
                    </Tab>
                    <Tab fontSize={14} color="blackAlpha.600">
                      Approved{" "}
                      <i
                        className="fas fa-check-circle"
                        style={{ marginLeft: "5px" }}
                      ></i>
                    </Tab>

                    <Tab fontSize={14} color="blackAlpha.600">
                      Disapproved{" "}
                      <i
                        className="fas fa-ban"
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
                              <Th>Requestor</Th>
                              <Th>Type of Work</Th>
                              <Th>Work</Th>
                              <Th>TimeFrame</Th>
                              <Th>Status</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>

                          <Tbody>
                            {myrequest.map((row) => {
                              if (row.status == 0) {
                                return (
                                  <>
                                    <Tr color={"blackAlpha.700"}>
                                      <Td>
                                        <Text
                                          color={"blackAlpha.700"}
                                          textTransform={"uppercase"}
                                          fontWeight={"bold"}
                                        >
                                          {row.firstname + " " + row.lastname}
                                          <br />
                                          <span
                                            style={{
                                              fontSize: "13px",
                                              textTransform: "lowercase",
                                              fontWeight: "normal",
                                            }}
                                          >
                                            {row.email}
                                          </span>
                                          <br />
                                          <span
                                            style={{
                                              fontSize: "13px",
                                              textTransform: "lowercase",
                                              fontWeight: "normal",
                                            }}
                                          >
                                            {row.contact_no}
                                          </span>
                                        </Text>
                                      </Td>
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
                                                  unset={"unset"}
                                                  messages={messages}
                                                />
                                              }
                                            />
                                            {row.status == 0 ? (
                                              <>
                                                <Gmodal
                                                  btn={
                                                    <>
                                                      <Tooltip
                                                        label="Approve Request"
                                                        aria-label="A tooltip"
                                                        bg={"gray.100"}
                                                        placement="top-end"
                                                      >
                                                        <Button
                                                          size={"sm"}
                                                          colorScheme={"green"}
                                                          variant={"ghost"}
                                                          fontWeight="normal"
                                                          data-id={
                                                            row.PK_requestID
                                                          }
                                                        >
                                                          <i className="fas fa-check-circle"></i>
                                                        </Button>
                                                      </Tooltip>
                                                    </>
                                                  }
                                                  content={
                                                    <ApproveContent
                                                      requestid={
                                                        row.PK_requestID
                                                      }
                                                    />
                                                  }
                                                />

                                                <Gmodal
                                                  btn={
                                                    <>
                                                      <Tooltip
                                                        label="Disapprove Request"
                                                        aria-label="A tooltip"
                                                        bg={"gray.100"}
                                                        placement="top-end"
                                                      >
                                                        <Button
                                                          size={"sm"}
                                                          colorScheme={"red"}
                                                          variant={"ghost"}
                                                          fontWeight="normal"
                                                          data-id={
                                                            row.PK_requestID
                                                          }
                                                        >
                                                          <i className="fas fa-ban"></i>
                                                        </Button>
                                                      </Tooltip>
                                                    </>
                                                  }
                                                  content={
                                                    <DisApproveContent
                                                      requestid={
                                                        row.PK_requestID
                                                      }
                                                    />
                                                  }
                                                />
                                              </>
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
                              <Th>Requestor</Th>
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
                                row.status == 3 ||
                                row.status == 2 ||
                                row.status == 1 ||
                                row.status == 4
                              ) {
                                return (
                                  <>
                                    <Tr color={"blackAlpha.700"}>
                                      <Td>
                                        <Text
                                          color={"blackAlpha.700"}
                                          textTransform={"uppercase"}
                                          fontWeight={"bold"}
                                        >
                                          {row.firstname + " " + row.lastname}
                                          <br />
                                          <span
                                            style={{
                                              fontSize: "13px",
                                              textTransform: "lowercase",
                                              fontWeight: "normal",
                                            }}
                                          >
                                            {row.email}
                                          </span>
                                          <br />
                                          <span
                                            style={{
                                              fontSize: "13px",
                                              textTransform: "lowercase",
                                              fontWeight: "normal",
                                            }}
                                          >
                                            {row.contact_no}
                                          </span>
                                        </Text>
                                      </Td>
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
                                        ) : row.request_status == null ? (
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
                                          {row.request_status == null
                                            ? "PENDING"
                                            : row.request_status}
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
                                              unset={"unset"}
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
                    <TabPanel>
                      <TableContainer mt={4}>
                        <Table size="sm" variant="striped" colorScheme="gray">
                          <Thead>
                            <Tr>
                              <Th>Requestor</Th>
                              <Th>Type of Work</Th>
                              <Th>Work</Th>
                              <Th>Status</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>

                          <Tbody>
                            {myrequest.map((row) => {
                              if (row.status == 5) {
                                return (
                                  <>
                                    <Tr color={"blackAlpha.700"}>
                                      <Td>
                                        <Text
                                          color={"blackAlpha.700"}
                                          textTransform={"uppercase"}
                                          fontWeight={"bold"}
                                        >
                                          {row.firstname + " " + row.lastname}
                                          <br />
                                          <span
                                            style={{
                                              fontSize: "13px",
                                              textTransform: "lowercase",
                                              fontWeight: "normal",
                                            }}
                                          >
                                            {row.email}
                                          </span>
                                          <br />
                                          <span
                                            style={{
                                              fontSize: "13px",
                                              textTransform: "lowercase",
                                              fontWeight: "normal",
                                            }}
                                          >
                                            {row.contact_no}
                                          </span>
                                        </Text>
                                      </Td>
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
                                        <Badge
                                          variant="subtle"
                                          colorScheme="red"
                                        >
                                          {row.request_status == null
                                            ? "PENDING"
                                            : row.request_status}
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
                                              unset={"unset"}
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
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default Approval;
