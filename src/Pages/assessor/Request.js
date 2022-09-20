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
  Select,
  Input,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "../../css/App.css";
import PopoverComponent from "../../components/layouts/Popover";
import DataTable, { createTheme } from "react-data-table-component";
import moment from "moment";
import Axios from "axios";
import ViewRequestmodal from "../../components/layouts/ViewRequestmodal";
import url from "../../config";
function RenderPage() {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  const [alerts, setAlerts] = useState();
  const [request, setRequest] = useState();
  const [servicesoffer, setServicesoffer] = useState([]);
  const [users, setUsers] = useState([]);
  const [worktypes, setWorktypes] = useState([]);
  const [department, setDepartments] = useState([]);
  const [viewStatus, setViewStatus] = useState([]);
  const [validate, setValidate] = useState();

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

    Axios.post(url + "/api/assessor/getrequests.php", {
      serviceID: "3",
    }).then((req) => {
      if (req.data.length >= 1) {
        setRequest(req.data);
      } else {
        setRequest([]);
      }
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

    Axios.post(url + "/api/admin/getservicesoffer.php").then((req) => {
      setServicesoffer(req.data);
    });
  }, []);

  const HandleConfirm = (e) => {
    const id = e.target.dataset.id;
    const prioritization = e.target.dataset.prioritization;
    const typeofrepair = e.target.dataset.typeofrepair;
    const recommendation = e.target.dataset.recommendation;
    const years = e.target.dataset.years;
    const months = e.target.dataset.months;
    const weeks = e.target.dataset.weeks;
    const days = e.target.dataset.days;

    if (years == "" && months == "" && weeks == "" && days == "") {
      setValidate("Please set Time Frame");
    } else if (years != "" || months != "" || weeks != "" || days != "") {
      Axios.post(url + "/api/assessor/ApprovedRequest.php", {
        id: id,
        prioritization: prioritization,
        typeofrepair: typeofrepair,
        recommendation: recommendation,
        years: years,
        months: months,
        weeks: weeks,
        days: days,
      }).then((req) => {
        Axios.post(url + "/api/assessor/getrequests.php", {
          serviceID: "3",
        }).then((req) => {
          if (req.data.length >= 1) {
            setRequest(req.data);
          } else {
            setRequest([]);
          }
        });

        setAlerts("Approved Successfully.");
        setTimeout(() => {
          setAlerts("");
          window.location.reload();
        }, 2000);

        document.getElementById("btnmodalCloseview").click();
      });
    }
  };

  const ViewRequest = (props) => {
    const [prioritization, setPrioritization] = useState("Urgent");
    const [typeofrepair, setTypeofrepair] = useState("Major Repair");
    const [recommendation, setRecommendation] = useState("In-House");
    const [remarks, setRemarks] = useState();
    const [assessedby, setAssessedby] = useState();
    const [years, SetYears] = useState("");
    const [months, SetMonths] = useState("");
    const [weeks, SetWeeks] = useState("");
    const [days, SetDays] = useState("");

    return (
      <Box h={40} p={matches == true ? 10 : 0}>
        <Box mb={2}>
          <Container maxW={"container.lg"}>
            {users.map((row) => {
              if (row.PK_userID == props.userID) {
                return (
                  <>
                    <Box bg="blackAlpha.200" p={10}>
                      <Center>
                        <Avatar
                          size="xl"
                          name={row.firstname + " " + row.lastname}
                          src={row.photo}
                          mb={2}
                        />

                        <Box ml="3" userSelect={"text"}>
                          <Text
                            fontWeight="bold"
                            textTransform={"uppercase"}
                            color={"blackAlpha.700"}
                          >
                            {row.firstname} {row.lastname}
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
                              {row.contact_no}
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
                              style={{ fontSize: "15px", fontWeight: "bold" }}
                              color={"teal.500"}
                            >
                              {department.map((dep) => {
                                if (
                                  dep.PK_departmentID == row.FK_departmentID
                                ) {
                                  return <>{dep.dept_name}</>;
                                }
                              })}
                            </Text>
                          </Text>
                        </Box>
                      </Center>
                    </Box>
                  </>
                );
              }
            })}

            <Box flex="1" bg="teal.50" color={"blackAlpha.600"} p={5}>
              <Stack
                spacing={0}
                fontSize={13}
                color={"blackAlpha.600"}
                float={["none", "right"]}
                mb={[2, 0, 0]}
              >
                <Text fontWeight="normal">Date-Created</Text>
                <Text fontWeight="normal">
                  {moment(props.created).format("MMMM DD,YYYY")}
                </Text>
                <Text fontWeight="normal">
                  {" "}
                  {moment(props.created).format("@hh:mm a")}
                </Text>
                <br />
                <Text fontWeight="normal">Date-Received</Text>
                <Text fontWeight="normal">
                  {" "}
                  {moment(props.received).format("MMMM DD,YYYY")}
                </Text>
                <Text fontWeight="normal">
                  {moment(props.received).format("@hh:mm a")}
                </Text>
                <span>
                  {props.status == 1 ? (
                    <Badge variant="outline" colorScheme="green">
                      PENDING REQUEST
                    </Badge>
                  ) : props.status == 0 ? (
                    ""
                  ) : (
                    ""
                  )}
                </span>
              </Stack>

              <Text color={"teal.400"} ml={[0, 0, 10]} fontWeight="bold">
                Job Description
              </Text>

              <Stack spacing={0} fontSize={15} ml={[0, 0, 10]}>
                <Text fontWeight="bold">
                  {worktypes.map((row) => {
                    if (row.PK_workTypeID == props.workID) {
                      return <>{row.label}</>;
                    }
                  })}
                </Text>
                <Text fontWeight="normal">
                  {servicesoffer.map((row) => {
                    if (row.PK_soID == props.serviceOfferID) {
                      return <>{row.name}</>;
                    }
                  })}

                  <span style={{ padding: "5px" }}>{props.others}</span>
                </Text>
              </Stack>

              {props.serialno == "" ||
              (props.serialno == null && props.modelno == "") ||
              props.modelno == null ? (
                ""
              ) : (
                <Stack
                  mt={2}
                  direction={["column", "row"]}
                  ml={10}
                  spacing="24px"
                >
                  <Box>
                    <Text fontWeight="normal">Serial No.</Text>
                    <Text fontWeight="normal">{props.serialno}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="normal">Model No.</Text>
                    <Text fontWeight="normal">{props.modelno}</Text>
                  </Box>
                </Stack>
              )}

              <Stack mt={5} spacing="24px" ml={10}>
                <Box>
                  <Text>Prioritization</Text>
                  <RadioGroup defaultValue="Urgent">
                    <Stack
                      spacing={5}
                      direction="row"
                      checked={prioritization === "male"}
                      onChange={(e) => {
                        setPrioritization(e.target.value);
                      }}
                    >
                      <Radio colorScheme="red" value="Urgent">
                        Urgent
                      </Radio>
                      <Radio
                        colorScheme="green"
                        value="Not Urgent"
                        name="prioritization"
                      >
                        Not Urgent
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>

                <Box>
                  <Text>Type of Repair</Text>
                  <RadioGroup defaultValue="Major Repair">
                    <Stack
                      spacing={5}
                      direction="row"
                      onChange={(e) => {
                        setTypeofrepair(e.target.value);
                      }}
                    >
                      <Radio
                        colorScheme="twitter"
                        value="Major Repair"
                        name="typeofrepair"
                        required
                      >
                        Major Repair
                      </Radio>
                      <Radio
                        colorScheme="yellow"
                        value="Minor Repair"
                        name="typeofrepair"
                        required
                      >
                        Minor Repair
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>

                <Box>
                  <Text>Recommendation</Text>
                  <RadioGroup defaultValue="In-House">
                    <Stack
                      spacing={5}
                      direction="row"
                      onChange={(e) => {
                        setRecommendation(e.target.value);
                      }}
                    >
                      <Radio
                        colorScheme="teal"
                        value="In-House"
                        name="recommendation"
                        required
                      >
                        In-House
                      </Radio>
                      <Radio
                        colorScheme="orange"
                        value="Outsource"
                        name="recommendation"
                        required
                      >
                        OutSource
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>

                {validate ? (
                  <Alert status="error">
                    <AlertIcon />
                    {validate}
                  </Alert>
                ) : (
                  ""
                )}

                <Box>
                  <Text>Time Frame</Text>
                  <Grid
                    templateColumns={[
                      "repeat(1, 1fr)",
                      "repeat(2, 1fr)",
                      "repeat(6, 1fr)",
                    ]}
                    gap={1}
                  >
                    <GridItem w="100%" h="10">
                      <Text fontSize={14}>Year</Text>
                      <Input
                        size="sm"
                        type={"number"}
                        placeholder=""
                        autoFocus={validate && "true"}
                        onChange={(e) => {
                          SetYears(e.target.value);
                        }}
                      />
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text fontSize={14}>Months</Text>
                      <Input
                        size="sm"
                        type={"number"}
                        placeholder=""
                        onChange={(e) => {
                          SetMonths(e.target.value);
                        }}
                      />
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text fontSize={14}>Weeks</Text>
                      <Input
                        size="sm"
                        type={"number"}
                        placeholder=""
                        onChange={(e) => {
                          SetWeeks(e.target.value);
                        }}
                      />
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text fontSize={14}>Days</Text>
                      <Input
                        size="sm"
                        type={"number"}
                        placeholder=""
                        onChange={(e) => {
                          SetDays(e.target.value);
                        }}
                      />
                    </GridItem>
                  </Grid>
                  <Stack spacing={5} direction="row"></Stack>
                </Box>
              </Stack>

              <Container mt={4} textAlign={"right"} maxW={"container.xxl"}>
                <PopoverComponent
                  btntitle="Approve"
                  message="Are you Sure?"
                  Confirm={HandleConfirm}
                  PassId={props.requestId}
                  prioritization={prioritization}
                  typeofrepair={typeofrepair}
                  recommendation={recommendation}
                  years={years}
                  months={months}
                  weeks={weeks}
                  days={days}
                  BtnColor={"cyan"}
                />
              </Container>
            </Box>
          </Container>
          {/*  */}
        </Box>
      </Box>
    );
  };

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
          <Badge variant="outline" colorScheme={"red"}>
            PENDING
          </Badge>
        </>
      ),
    },
    {
      name: "Received",
      selector: (row) => (
        <>{moment(row.updated_at).format("@hh:mm a MMMM DD,YYYY")}</>
      ),
    },

    {
      name: "Action",
      selector: (row) => (
        <>
          <ViewRequestmodal
            Data={
              <ViewRequest
                requestId={row.PK_requestID}
                userID={row.FK_userID}
                workID={row.FK_workID}
                serviceOfferID={row.FK_serviceOfferID}
                others={row.others}
                serialno={row.serialno}
                modelno={row.modelno}
                photo={row.photo}
                status={row.status}
                created={row.created_at}
                received={row.updated_at}
              />
            }
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Box p={[2, 5, 10]}>
        <Box
          p={[0, 5, 8]}
          bg={"gray.50"}
          borderRadius="6"
          transition={"all ease 2s"}
        >
          {alerts && (
            <Alert status="success" id="" variant="left-accent">
              <AlertIcon />
              <Text color={"blackAlpha.600"}>{alerts}</Text>
            </Alert>
          )}

          <DataTable
            columns={columns}
            data={request}
            // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            persistTableHead
            theme="Jobrequest"
            customStyles={customStyles}
            pagination
            //   onRowClicked={handleRowClick}
          />
        </Box>
      </Box>
    </>
  );
}

function A_Request() {
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

export default A_Request;
