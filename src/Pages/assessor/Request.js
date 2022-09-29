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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "../../css/App.css";
import PopoverComponent from "../../components/layouts/Popover";
import DataTable, { createTheme } from "react-data-table-component";
import moment from "moment";
import Axios from "axios";
import ViewRequestmodal from "../../components/layouts/ViewRequestmodal";
function RenderPage() {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  const [alerts, setAlerts] = useState();
  const [request, setRequest] = useState();
  const [servicesoffer, setServicesoffer] = useState([]);
  const [users, setUsers] = useState([]);
  const [worktypes, setWorktypes] = useState([]);

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));

    Axios.post("http://localhost/JOBREQUEST/api/assessor/getrequests.php", {
      serviceID: "3",
    }).then((req) => {
      if (req.data.length >= 1) {
        setRequest(req.data);
      } else {
        setRequest([]);
      }
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
      "http://localhost/JOBREQUEST/api/admin/getservicesoffer.php"
    ).then((req) => {
      setServicesoffer(req.data);
    });
  }, []);

  const HandleConfirm = (e) => {
    console.log(e.target.dataset.id);
  };

  const handleRowClick = (e) => {
    console.log(e);
  };

  const ViewRequest = (props) => {
    return (
      <Box h={40} p={matches == true ? 10 : 0}>
        <Box mb={2}>
          <Box bg="blackAlpha.200" p={10}>
            <Center>
              <Avatar
                size="xl"
                name="Christian Nwamba"
                src="https://bit.ly/code-beast"
                mb={2}
              />

              <Box ml="3" userSelect={"text"}>
                <Text fontWeight="bold" color={"blackAlpha.700"}>
                  Caimor Reenjay
                  <br />
                  <span style={{ fontSize: "13px", fontWeight: "normal" }}>
                    reenjie17@gmail.com
                    {props.passId}
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "normal",
                      userSelect: "",
                    }}
                  >
                    09557653775
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "normal",
                      userSelect: "",
                    }}
                  >
                    LEAD DEVELOPER
                  </span>
                  <Text
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                    color={"teal.500"}
                  >
                    MMS
                  </Text>
                </Text>
              </Box>
            </Center>
          </Box>

          <Box flex="1" bg="teal.50" color={"blackAlpha.600"} p={5}>
            <Stack
              spacing={0}
              fontSize={13}
              color={"blackAlpha.600"}
              float="right"
            >
              <Text fontWeight="normal">Date-Created</Text>
              <Text fontWeight="normal">September 15 2022</Text>
              <Text fontWeight="normal">@11:30 am</Text>
              <br />
              <Text fontWeight="normal">Date-Received</Text>
              <Text fontWeight="normal">September 15 2022</Text>
              <Text fontWeight="normal">@11:30 am</Text>
              <span>
                <Badge variant="outline" colorScheme="green">
                  PENDING REQUEST
                </Badge>
              </span>
            </Stack>
            <Text color={"teal.400"} fontWeight="bold">
              Job Description
            </Text>

            <Stack spacing={0} fontSize={15}>
              <Text fontWeight="bold">New Installation/Fabrication</Text>
              <Text fontWeight="normal">Air Condition Unit</Text>
            </Stack>

            <Stack mt={2} direction={["column", "row"]} ml={10} spacing="24px">
              <Box>
                <Text fontWeight="normal">Serial No.</Text>
                <Text fontWeight="normal">465469835</Text>
              </Box>
              <Box>
                <Text fontWeight="normal">Model No.</Text>
                <Text fontWeight="normal">1064648556</Text>
              </Box>
            </Stack>

            <Stack mt={5} spacing="24px" ml={10}>
              <Box>
                <Text>Prioritization</Text>
                <RadioGroup defaultValue="0">
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="red" value="1">
                      Urgent
                    </Radio>
                    <Radio colorScheme="green" value="2">
                      Not Urgent
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>

              <Box>
                <Text>Type of Repair</Text>
                <RadioGroup defaultValue="0">
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="twitter" value="1">
                      Major Repair
                    </Radio>
                    <Radio colorScheme="yellow" value="2">
                      Minor Repair
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>

              <Box>
                <Text>Recommendation</Text>
                <RadioGroup defaultValue="0">
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="teal" value="1">
                      In-House
                    </Radio>
                    <Radio colorScheme="orange" value="2">
                      OutSource
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Stack>

            <Container mt={4} textAlign={"right"} maxW={"container.xxl"}>
              <PopoverComponent
                btntitle="Approve"
                message="Are you Sure?"
                Confirm={HandleConfirm}
                PassId={"5"}
                BtnColor={"cyan"}
              />
            </Container>
          </Box>
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
          <Badge variant="outline" colorScheme="red">
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
          <ViewRequestmodal Data={<ViewRequest passId={row.PK_requestID} />} />
        </>
      ),
    },
  ];

  return (
    <>
      <Box p={5}>
        <Box p="5" bg={"cyan.50"} borderRadius="6" transition={"all ease 2s"}>
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
