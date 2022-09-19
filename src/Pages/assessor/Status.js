import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import Headings from "../../components/layouts/heading";
import {
  Grid,
  GridItem,
  Box,
  Container,
  Flex,
  Text,
  Center,
  Square,
  Avatar,
  Stack,
  Button,
  RadioGroup,
  Radio,
  Badge,
  Alert,
  AlertIcon,
  SimpleGrid,
  Wrap,
  WrapItem,
  InputLeftElement,
  InputGroup,
  Input,
  UnorderedList,
  ListItem,
  Textarea,
  Select,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import DataTable, { createTheme } from "react-data-table-component";
import moment from "moment";
import ManageModal from "../../components/layouts/manage_modal";
import HistoryModal from "../../components/layouts/historyModal";
import url from "../../config";
import swal from "sweetalert";

import {
  Progress,
  ProgressLabel,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/progress";

import Axios from "axios";

import "../../css/App.css";
function RenderPage() {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  const [request, setRequest] = useState([]);
  const [requesters, setRequesters] = useState([]);
  const [department, setDepartments] = useState([]);
  const [userselect, setUserselect] = useState();
  const [users, setUsers] = useState([]);
  const [worktypes, setWorktypes] = useState([]);
  const [servicesoffer, setServicesoffer] = useState([]);
  const [alerts, setAlerts] = useState();
  const [AccomplishRequest, setAccomplishRequest] = useState([]);

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));

    Axios.post(url + "/api/admin/getdepartment.php").then((req) => {
      if (req.data.length >= 1) {
        setDepartments(req.data);
      } else {
        setDepartments([]);
      }
    });

    Axios.post(url + "/api/admin/getservicesoffer.php").then((req) => {
      setServicesoffer(req.data);
    });

    Axios.post(url + "/api/admin/getWorktype.php").then((req) => {
      if (req.data.length >= 1) {
        setWorktypes(req.data);
      } else {
        setWorktypes([]);
      }
    });
    Axios.post(url + "/api/admin/getUsers.php").then((req) => {
      if (req.data.length >= 1) {
        setUsers(req.data);
      } else {
        setUsers([]);
      }
    });

    Axios.post(url + "/api/assessor/getApprovedrequests.php", {
      serviceID: "3",
    }).then((req) => {
      if (req.data.length >= 1) {
        setRequest(req.data);
      } else {
        setRequest([]);
      }
    });

    Axios.post(url + "/api/assessor/getAccomplishedrequests.php", {
      serviceID: "3",
    }).then((req) => {
      if (req.data.length >= 1) {
        setAccomplishRequest(req.data);
      } else {
        setAccomplishRequest([]);
      }
    });

    Axios.post(url + "/api/assessor/getApprovedrequesters.php", {
      serviceID: "3",
    }).then((req) => {
      if (req.data.length >= 1) {
        setRequesters(req.data);
      } else {
        setRequesters([]);
      }

      //console.log(req.data);
    });
  }, []);
  createTheme(
    "Jobrequest",
    {
      text: {
        primary: "#565c5f",
        secondary: "#2aa198",
      },
      background: {
        default: "transparent",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#c0e1ed",
      },
      action: {
        button: "red",
        hover: "rgba(0,0,0,.08)",
        disabled: "red",
      },
    },
    "dark"
  );

  const customStyles = {
    rows: {
      style: {
        minHeight: "20px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "5px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "15px",
        color: "#53737f",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        height: "50px",
      },
    },
    pagination: {
      style: {
        color: "#3686a3",
      },
      pageButtonsStyle: {
        borderRadius: "50%",
        height: "40px",
        width: "40px",
        padding: "8px",
        margin: "px",
        cursor: "pointer",
        transition: "0.4s",

        backgroundColor: "#78b6cc",

        "&:hover:not(:disabled)": {
          backgroundColor: "#88c1d6",
        },
        "&:focus": {
          outline: "none",
          backgroundColor: "yellow",
          color: "red",
        },
      },
    },
  };

  function differrence(c, y, m, w, d) {
    const totald = m * 31 + y * 365 + w * 7 + d;
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

  const handlechange = (e) => {
    const td_name = e.target.dataset.name;
    const request_id = e.target.dataset.requestid;
    const value = e.target.value;
    const findings = document.getElementById("findings").value;
    const materialsneeded = document.getElementById("materialsneeded").value;
    const estimatedcost = document.getElementById("estimatedcost").value;
    const totalestimatedcost =
      document.getElementById("totalestimatedcost").value;
    document.getElementById("findings").setAttribute("style", "");
    document.getElementById("materialsneeded").setAttribute("style", "");
    document.getElementById("estimatedcost").setAttribute("style", "");
    document.getElementById("totalestimatedcost").setAttribute("style", "");
    if (td_name == "request_status") {
      if (value == "ACCOMPLISHED") {
        if (
          findings == "" &&
          materialsneeded == "" &&
          estimatedcost == "" &&
          totalestimatedcost == ""
        ) {
          swal(
            "Incomplete Requirements",
            "Please fill the following fields : Findings, Materials Needed, Estimated Unit Cost and Total Estimated Unit Cost. To accomplished Job Request.",
            "error"
          );
          document.getElementById("request_status").value = "ON QUEUE";
          document
            .getElementById("findings")
            .setAttribute("style", "border:1px solid #9a4d54");
          document
            .getElementById("materialsneeded")
            .setAttribute("style", "border:1px solid #9a4d54");
          document
            .getElementById("estimatedcost")
            .setAttribute("style", "border:1px solid #9a4d54");
          document
            .getElementById("totalestimatedcost")
            .setAttribute("style", "border:1px solid #9a4d54");
        } else if (findings == "") {
          swal(
            "Incomplete Requirements",
            "Please fill Findings field.",
            "error"
          );
          document.getElementById("request_status").value = "ON QUEUE";
          document
            .getElementById("findings")
            .setAttribute("style", "border:1px solid #9a4d54");
        } else if (materialsneeded == "") {
          swal(
            "Incomplete Requirements",
            "Please fill Materials Needed field.",
            "error"
          );
          document.getElementById("request_status").value = "ON QUEUE";
          document
            .getElementById("materialsneeded")
            .setAttribute("style", "border:1px solid #9a4d54");
        } else if (estimatedcost == "") {
          swal(
            "Incomplete Requirements",
            "Please fill Estimated Cost field.",
            "error"
          );
          document.getElementById("request_status").value = "ON QUEUE";
          document
            .getElementById("estimatedcost")
            .setAttribute("style", "border:1px solid #9a4d54");
        } else if (totalestimatedcost == "") {
          swal(
            "Incomplete Requirements",
            "Please fill Total Estimated Cost field.",
            "error"
          );
          document.getElementById("request_status").value = "ON QUEUE";
          document
            .getElementById("totalestimatedcost")
            .setAttribute("style", "border:1px solid #9a4d54");
        } else {
          swal({
            title: "Are you sure?",
            text: "Please make sure that the job is fully accomplished.",
            icon: "warning",
            buttons: true,
            dangerMode: false,
          }).then((JobisDone) => {
            if (JobisDone) {
              Axios.post(url + "/api/assessor/accomplishedRequest.php", {
                id: request_id,
              }).then((req) => {
                setAlerts("Marked Accomplished Successfully");
                document.getElementById("btnManageModalClose").click();
              });
            } else {
              document.getElementById("request_status").value = "ON QUEUE";
            }
          });
        }
      } else {
        Axios.post(url + "/api/assessor/changeRequestStatus.php", {
          id: request_id,
          tdname: td_name,
          value: value,
        }).then((req) => {});
      }
    } else {
      Axios.post(url + "/api/assessor/changeRequestStatus.php", {
        id: request_id,
        tdname: td_name,
        value: value,
      }).then((req) => {});
    }
  };

  const Fetch = () => {
    Axios.post(url + "/api/assessor/getApprovedrequests.php", {
      serviceID: "3",
    }).then((req) => {
      if (req.data.length >= 1) {
        setRequest(req.data);
      } else {
        setRequest([]);
      }
    });
  };

  const Manage = (props) => {
    const id = props.requestID;

    return request.map((row) => {
      if (row.PK_requestID == id) {
        return (
          <>
            <Box p={4}>
              <Text fontWeight={"bold"} color={"blackAlpha.600"}>
                Job Description
              </Text>
              <Text color={"blackAlpha.700"}>
                {worktypes.map((wt) => {
                  if (wt.PK_workTypeID == row.FK_workID) {
                    return (
                      <Text
                        color={"teal.600"}
                        fontSize={14}
                        textTransform="uppercase"
                        userSelect={"text"}
                      >
                        {wt.label}
                      </Text>
                    );
                  }
                })}
                <br />
                {servicesoffer.map((so) => {
                  if (so.PK_soID == row.FK_serviceOfferID) {
                    return (
                      <Text
                        color={"teal.800"}
                        fontSize={14}
                        textTransform="uppercase"
                        userSelect={"text"}
                      >
                        {so.name}
                      </Text>
                    );
                  }
                })}
                {row.others}
                <br />
                <br />
              </Text>
              <Text fontWeight={"bold"} color={"blackAlpha.600"}>
                Requested By:
              </Text>
              {users.map((user) => {
                if (user.PK_userID == row.FK_userID) {
                  return (
                    <Flex p={5}>
                      <Avatar
                        size="md"
                        name={user.firstname + " " + user.lastname}
                        src={user.photo}
                        mb={2}
                      />
                      <Text
                        ml={4}
                        color={"blackAlpha.700"}
                        textTransform="uppercase"
                      >
                        {user.firstname + " " + user.lastname}
                        <br />
                        <span
                          style={{
                            fontSize: "12px",
                            textTransform: "lowercase",
                          }}
                        >
                          {user.email}
                        </span>
                        <br />
                        <span
                          style={{
                            fontSize: "12px",
                            textTransform: "lowercase",
                          }}
                        >
                          {user.contact_no}
                        </span>
                      </Text>
                    </Flex>
                  );
                }
              })}

              <Stack>
                <Box>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Current Status:
                  </Text>
                  <Select
                    placeholder="Change Status"
                    size={"sm"}
                    color="blackAlpha.700"
                    autoFocus
                    defaultValue={row.request_status}
                    data-requestid={row.PK_requestID}
                    data-name={"request_status"}
                    onChange={handlechange}
                    id="request_status"
                  >
                    <option value="WORK ON GOING">Work On Going</option>
                    <option value="ON QUEUE">On Queue</option>
                    <option value="ACCOMPLISHED">Accomplished</option>
                  </Select>
                </Box>
                <Box ml={4}>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Status Message:
                  </Text>
                  <Textarea
                    defaultValue={row.status_message}
                    color={"teal.500"}
                    fontSize={14}
                    data-requestid={row.PK_requestID}
                    data-name={"status_message"}
                    onChange={handlechange}
                  />
                </Box>
                <Box>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Findings:
                  </Text>
                  <Textarea
                    fontSize={14}
                    data-requestid={row.PK_requestID}
                    data-name={"findings"}
                    defaultValue={row.findings}
                    onChange={handlechange}
                    id="findings"
                  />
                </Box>
                <Box>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Materials Needed:
                  </Text>
                  <Textarea
                    fontSize={14}
                    data-requestid={row.PK_requestID}
                    data-name={"materials_needed"}
                    defaultValue={row.materials_needed}
                    onChange={handlechange}
                    id="materialsneeded"
                  />
                </Box>
                <Box>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Estimated Unit Cost
                  </Text>
                  <Textarea
                    fontSize={14}
                    data-requestid={row.PK_requestID}
                    data-name={"estimated_unitcost"}
                    defaultValue={row.estimated_unitcost}
                    onChange={handlechange}
                    id="estimatedcost"
                  />
                </Box>

                <Box>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Total Estimated Unit Cost
                  </Text>
                  <Textarea
                    fontSize={14}
                    data-requestid={row.PK_requestID}
                    data-name={"total_estimated_cost"}
                    defaultValue={row.total_estimated_cost}
                    onChange={handlechange}
                    id="totalestimatedcost"
                  />
                </Box>

                <Box>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Remarks
                  </Text>
                  <Textarea
                    fontSize={14}
                    data-requestid={row.PK_requestID}
                    data-name={"remarks"}
                    defaultValue={row.remarks}
                    onChange={handlechange}
                  />
                </Box>
              </Stack>
            </Box>
          </>
        );
      }
    });
  };

  const columns = [
    {
      name: "Type of Work",
      selector: (row) => (
        <>
          {worktypes.map((wt) => {
            if (wt.PK_workTypeID == row.FK_workID) {
              return (
                <Text
                  color={"teal.600"}
                  fontSize={14}
                  textTransform="uppercase"
                  userSelect={"text"}
                >
                  {wt.label}
                </Text>
              );
            }
          })}
        </>
      ),
    },
    {
      name: "Work",
      selector: (row) => (
        <>
          {servicesoffer.map((so) => {
            if (so.PK_soID == row.FK_serviceOfferID) {
              return (
                <Text
                  color={"teal.600"}
                  fontSize={14}
                  textTransform="uppercase"
                  userSelect={"text"}
                >
                  {so.name}
                </Text>
              );
            }
          })}
          {row.others}
        </>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <Badge variant="outline" colorScheme="green">
            {row.request_status}
          </Badge>

          <Popover>
            <PopoverTrigger>
              <i
                className="fas fa-info-circle"
                style={{ marginLeft: "5px", color: "grey", cursor: "pointer" }}
              ></i>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Status Information:</PopoverHeader>
              <PopoverBody p={5} color={"blue.600"}>
                {row.status_message}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </>
      ),
    },

    {
      name: "Time Frame Progress",

      selector: (row) => (
        <>
          <Box>
            {differrence(
              row.dt_assessed,
              row.tf_years,
              row.tf_months,
              row.tf_weeks,
              row.tf_days
            )}
          </Box>
        </>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <ManageModal
            closing={Fetch}
            info={<Manage requestID={row.PK_requestID} />}
          />
        </>
      ),
    },
  ];

  const defaultcolumns = [
    {
      name: "Request",
      selector: (row) => (
        <>
          {users.map((user) => {
            if (user.PK_userID == row.FK_userID) {
              return (
                <Text
                  color={"teal.600"}
                  fontSize={14}
                  textTransform="uppercase"
                  userSelect={"text"}
                >
                  {user.firstname} {user.lastname}
                  <br />
                  <span
                    style={{ fontSize: "12px", textTransform: "lowercase" }}
                  >
                    {user.email} #{user.contact_no}
                  </span>
                </Text>
              );
            }
          })}
        </>
      ),
    },
    {
      name: "Type of Work",
      selector: (row) => (
        <>
          {worktypes.map((wt) => {
            if (wt.PK_workTypeID == row.FK_workID) {
              return (
                <Text
                  color={"teal.600"}
                  fontSize={14}
                  textTransform="uppercase"
                  userSelect={"text"}
                >
                  {wt.label}
                </Text>
              );
            }
          })}
        </>
      ),
    },
    {
      name: "Work",
      selector: (row) => (
        <>
          {servicesoffer.map((so) => {
            if (so.PK_soID == row.FK_serviceOfferID) {
              return (
                <Text
                  color={"teal.600"}
                  fontSize={14}
                  textTransform="uppercase"
                  userSelect={"text"}
                >
                  {so.name}
                </Text>
              );
            }
          })}
          {row.others}
        </>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <Badge variant="outline" colorScheme="green">
            {row.request_status}
          </Badge>

          <Popover>
            <PopoverTrigger>
              <i
                className="fas fa-info-circle"
                style={{ marginLeft: "5px", color: "grey", cursor: "pointer" }}
              ></i>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Status Information:</PopoverHeader>
              <PopoverBody p={5} color={"blue.600"}>
                {row.status_message}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </>
      ),
    },

    {
      name: "Time Frame Progress",

      selector: (row) => (
        <>
          <Box>
            {differrence(
              row.dt_assessed,
              row.tf_years,
              row.tf_months,
              row.tf_weeks,
              row.tf_days
            )}
          </Box>
        </>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <ManageModal
            closing={Fetch}
            info={<Manage requestID={row.PK_requestID} />}
          />
        </>
      ),
    },
  ];

  const [filterText, setFilterText] = useState("");
  const filteredItems = requesters.filter(
    (item) =>
      item.lastname.toLowerCase().includes(filterText.toLowerCase()) ||
      item.firstname.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email.toLowerCase().includes(filterText.toLowerCase())
  );

  const closealert = () => {
    setAlerts("");
  };

  return (
    <>
      <Box p={[0, 1, 2, 3, 10]}>
        <Grid templateColumns="repeat(12, 1fr)" gap={2}>
          <GridItem w="100%" colSpan={[12, 12, 12, 4]}>
            <Box p={2} bg={"gray.100"}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.500" />}
                />
                <Input
                  placeholder="Filter By Name , Email"
                  defaultValue={filterText}
                  fontSize={14}
                  width={350}
                  variant="flushed"
                  onChange={(e) => {
                    setFilterText(e.target.value);
                  }}
                />
              </InputGroup>

              <UnorderedList
                //  p={10}
                className="ul"
                listStyleType={"none"}
                //  height={"80vh"}
                // overflowY={"scroll"}
              >
                <ListItem
                  cursor={"pointer"}
                  className="li"
                  p={3}
                  onClick={() => {
                    setUserselect("");
                  }}
                >
                  <Text color={"blue.700"} fontWeight={"bold"}>
                    All Job Orders{" "}
                    <i
                      style={{ marginLeft: "5px" }}
                      className="fas fa-arrow-up-right-from-square"
                    ></i>
                  </Text>
                </ListItem>
                {filteredItems.map((row) => {
                  return (
                    <>
                      <ListItem
                        cursor={"pointer"}
                        className="li"
                        onClick={() => {
                          setUserselect(row.PK_userID);
                        }}
                      >
                        <Text color={"blue.700"} fontWeight={"bold"}>
                          {row.firstname} {row.lastname}
                          <i
                            style={{ marginLeft: "5px" }}
                            className="fas fa-arrow-up-right-from-square"
                          ></i>
                          <span
                            style={{
                              float: "right",
                              fontWeight: "normal",
                              fontSize: "14px",
                            }}
                          >
                            <Badge
                              marginRight={1}
                              variant="solid"
                              colorScheme="green"
                            >
                              {
                                request.filter(
                                  (x) => x.FK_userID == row.PK_userID
                                ).length
                              }
                            </Badge>
                            Job Orders
                          </span>
                          <br />
                          <Text
                            color={"blackAlpha.600"}
                            fontSize={14}
                            fontWeight={"normal"}
                          >
                            {row.email}
                          </Text>
                        </Text>
                      </ListItem>
                    </>
                  );
                })}
              </UnorderedList>
            </Box>
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 8]} w="100%">
            <Box bg={"gray.100"} p={5}>
              {alerts && (
                <Alert
                  status="success"
                  variant="left-accent"
                  fontSize={14}
                  color="blackAlpha.700"
                  mb={2}
                >
                  <AlertIcon />
                  {alerts}
                  <CloseButton
                    //  alignSelf="flex-start"
                    float={"right"}
                    position="absolute"
                    right={"10px"}
                    onClick={closealert}
                  />
                </Alert>
              )}

              {userselect ? (
                users.map((row) => {
                  if (row.PK_userID == userselect) {
                    return (
                      <>
                        <Box p={5} bg="blackAlpha.200">
                          <Center>
                            <Flex>
                              <Avatar
                                size="xl"
                                name={row.firstname + " " + row.lastname}
                                src={""}
                                mb={2}
                              />

                              <Box ml="10" userSelect={"text"}>
                                <Text
                                  fontWeight="bold"
                                  textTransform={"uppercase"}
                                  color={"blackAlpha.700"}
                                >
                                  {row.firstname + " " + row.lastname}
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      fontWeight: "normal",
                                      textTransform: "lowercase",
                                    }}
                                  >
                                    {row.email}
                                  </span>
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      fontWeight: "normal",
                                      userSelect: "",
                                    }}
                                  >
                                    {row.email}
                                  </span>
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      fontWeight: "normal",
                                      userSelect: "",
                                    }}
                                  >
                                    {row.specialty}
                                    <br />
                                    {row.position}
                                  </span>
                                  <Text
                                    style={{
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                    }}
                                    color={"teal.500"}
                                  >
                                    {department.map((dep) => {
                                      if (
                                        dep.PK_departmentID ==
                                        row.FK_departmentID
                                      ) {
                                        return <>{dep.dept_name}</>;
                                      }
                                    })}
                                  </Text>
                                </Text>
                              </Box>
                            </Flex>
                          </Center>
                          {/*  <HistoryModal BtnName="History" /> */}
                        </Box>
                        <Box float={"right"} marginRight={5}>
                          <HistoryModal
                            BtnName={
                              <>
                                Recent Request
                                <i
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "16px",
                                  }}
                                  className="fas fa-list"
                                ></i>
                              </>
                            }
                            users={users}
                            requestsaccomplished={AccomplishRequest.filter(
                              (x) => x.FK_userID == userselect
                            )}
                            typeofwork={servicesoffer}
                            work={worktypes}
                            usertype={userselect}
                          />
                        </Box>
                        <DataTable
                          columns={columns}
                          data={request.filter(
                            (x) => x.FK_userID == userselect
                          )}
                          // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1

                          // subHeaderComponent={subHeaderComponentMemo}
                          persistTableHead
                          theme="Jobrequest"
                          customStyles={customStyles}
                          pagination
                        />
                      </>
                    );
                  }
                })
              ) : (
                <>
                  <Box bg={"gray.300"} p={10}>
                    <Text
                      fontWeight={"bold"}
                      textAlign="center"
                      color={"blackAlpha.700"}
                    >
                      Job Orders
                      {/*   <br/>
                      <span style={{fontSize:'13px'}}></span> */}
                    </Text>
                  </Box>
                  <Box float={"right"} marginRight={5}>
                    <HistoryModal
                      BtnName={
                        <>
                          Recent Request
                          <i
                            style={{ marginLeft: "5px", fontSize: "16px" }}
                            className="fas fa-list"
                          ></i>
                        </>
                      }
                      users={users}
                      requestsaccomplished={AccomplishRequest}
                      typeofwork={servicesoffer}
                      work={worktypes}
                    />
                  </Box>
                  <DataTable
                    columns={defaultcolumns}
                    data={request}
                    // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1

                    // subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                    theme="Jobrequest"
                    customStyles={customStyles}
                    pagination
                    defaultSortAsc
                    sortIcon
                  />
                </>
              )}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

function A_Status() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
        Page_title="JOB-STATUS"
      />
    </>
  );
}

export default A_Status;
