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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import DataTable, { createTheme } from "react-data-table-component";
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
                      NO SELECTION
                      {/*   <br/>
                      <span style={{fontSize:'13px'}}></span> */}
                    </Text>
                  </Box>
                </>
              )}

              <DataTable
                columns={columns}
                data={request.filter((x) => x.FK_userID == userselect)}
                // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1

                // subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                theme="Jobrequest"
                customStyles={customStyles}
                pagination
              />
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
