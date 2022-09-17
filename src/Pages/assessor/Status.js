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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import DataTable, { createTheme } from "react-data-table-component";
import moment from "moment";
import ManageModal from "../../components/layouts/manage_modal";
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
  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));

    Axios.post("http://localhost/JOBREQUEST/api/admin/getdepartment.php").then(
      (req) => {
        if (req.data.length >= 1) {
          setDepartments(req.data);
        } else {
          setDepartments([]);
        }
      }
    );

    Axios.post(
      "http://localhost/JOBREQUEST/api/admin/getservicesoffer.php"
    ).then((req) => {
      setServicesoffer(req.data);
    });

    Axios.post("http://localhost/JOBREQUEST/api/admin/getWorktype.php").then(
      (req) => {
        if (req.data.length >= 1) {
          setWorktypes(req.data);
        } else {
          setWorktypes([]);
        }
      }
    );
    Axios.post("http://localhost/JOBREQUEST/api/admin/getUsers.php").then(
      (req) => {
        if (req.data.length >= 1) {
          setUsers(req.data);
        } else {
          setUsers([]);
        }
      }
    );

    Axios.post(
      "http://localhost/JOBREQUEST/api/assessor/getApprovedrequests.php",
      {
        serviceID: "3",
      }
    ).then((req) => {
      if (req.data.length >= 1) {
        setRequest(req.data);
      } else {
        setRequest([]);
      }
    });

    Axios.post(
      "http://localhost/JOBREQUEST/api/assessor/getApprovedrequesters.php",
      {
        serviceID: "3",
      }
    ).then((req) => {
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
        {/* AD: {dtassess}
        <br />
        ED : {EndDate}
        <br />
        Diff : {differeddate}
        ||{totald} */}

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
                  <Select
                    placeholder="Change Status"
                    size={"sm"}
                    color="blackAlpha.700"
                    autoFocus
                  >
                    <option value="option2">Work On Going</option>
                    <option value="option1">On Queue</option>
                    <option value="option3">Accomplished</option>
                  </Select>
                </Box>
                <Box ml={4}>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Status Message:
                  </Text>
                  <Textarea defaultValue={""} color={"teal.500"} />
                </Box>
                <Box>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Findings:
                  </Text>
                  <Textarea />
                </Box>
                <Box>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Materials Needed:
                  </Text>
                  <Textarea />
                </Box>
                <Box>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Estimated Unit Cost
                  </Text>
                  <Textarea />
                </Box>

                <Box>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Total Estimated Unit Cost
                  </Text>
                  <Textarea />
                </Box>

                <Box>
                  <Text color={"blackAlpha.700"} fontSize={15}>
                    Remarks
                  </Text>
                  <Textarea />
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
            Work On Going
          </Badge>
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
            Work On Going
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
                Do your job asshole
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
          <ManageModal info={<Manage requestID={row.PK_requestID} />} />
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

                  <DataTable
                    columns={defaultcolumns}
                    data={request}
                    // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1

                    // subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                    theme="Jobrequest"
                    customStyles={customStyles}
                    pagination
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
