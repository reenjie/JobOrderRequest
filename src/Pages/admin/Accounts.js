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
  Badge,
  Input,
  Alert,
  AlertIcon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import Headings from "../../components/layouts/heading";
import Table_striped from "../../components/layouts/table_striped";
import Add_Modal from "../../components/layouts/add_modal";
import Delete_Modal from "../../components/layouts/delete_modal";
import Edit_Modal from "../../components/layouts/edit_modal";
import PopoverComponent from "../../components/layouts/Popover";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import DataTable, { createTheme } from "react-data-table-component";
function RenderPage() {
  const [users, setUsers] = useState([]);
  const [department, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [alerts, setAlerts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getUsers.php").then(
      (req) => {
        if (req.data.length >= 1) {
          setUsers(req.data);
        } else {
          setUsers([]);
        }
      }
    );

    Axios.post("http://localhost/JOBREQUEST/api/admin/getdepartment.php").then(
      (req) => {
        setDepartments(req.data);
      }
    );

    Axios.post("http://localhost/JOBREQUEST/api/admin/getservices.php").then(
      (req) => {
        setServices(req.data);
      }
    );
  }, []);

  const tableheader = {
    thead: [
      { th: "Email" },
      { th: "FirstName" },
      { th: "LastName" },
      { th: "Address&Contact" },
      { th: "User Type" },
      { th: "Department | Services" },
      { th: "Specialty | Position" },
      { th: "Status" },
      { th: "Action" },
    ],
  };

  //Delete Functions
  const handleKeyup = (e) => {
    const value = e.target.value;
    const id = e.currentTarget.dataset.itemid;
    const table = e.currentTarget.dataset.table;

    if (value == "delete" || value == "DELETE") {
      document.getElementById("btnmodalClose").click();
      Axios.post("http://localhost/JOBREQUEST/api/admin/delete_data.php", {
        delete: 1,
        id: id,
        table: table,
      }).then((req) => {
        if (req.data.status == 1) {
          Axios.post("http://localhost/JOBREQUEST/api/admin/getUsers.php").then(
            (req) => {
              if (req.data.length >= 1) {
                setUsers(req.data);
              } else {
                setUsers([]);
              }
            }
          );

          document.getElementById("btnmodalClose").click();

          setAlerts("Deleted Successfully.");
          setTimeout(() => {
            setAlerts("");
          }, 2000);
        }
      });
    }
  };

  function Confirm_Delete(props) {
    return (
      <>
        <Input
          placeholder=""
          textTransform={"uppercase"}
          size="md"
          autoFocus
          onKeyUp={handleKeyup}
          data-itemid={props.item_id}
          data-table={props.table}
        />
      </>
    );
  }

  function HandleConfirm(e) {
    const id = e.target.dataset.id;
    Axios.post("http://localhost/JOBREQUEST/api/admin/verifyUser.php", {
      id: id,
    }).then((req) => {
      if (req.data.status == 1) {
        Axios.post("http://localhost/JOBREQUEST/api/admin/getUsers.php").then(
          (req) => {
            if (req.data.length >= 1) {
              setUsers(req.data);
            } else {
              setUsers([]);
            }
          }
        );

        document.getElementById("closePopover").click();

        setAlerts("Verified Successfully.");
        setTimeout(() => {
          setAlerts("");
          window.location.reload();
        }, 2000);
      }
    });
  }

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

  const tableBody = () => {
    if (users.length >= 1) {
      return users.map((row) => (
        <Tr color={"blackAlpha.700"}>
          <Td userSelect="text" fontWeight={"bold"} color="blackAlpha.700"></Td>
          <Td userSelect="text"></Td>
          <Td userSelect="text"></Td>
          <Td></Td>
          <Td>
            <Text textTransform={"uppercase"}></Text>
          </Td>
          <Td userSelect="text"></Td>
          <Td userSelect="text"></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      ));
    }
  };
  const columns = [
    {
      name: "Email",
      selector: (row) => <>{row.email}</>,
    },
    {
      name: "Firstname",
      selector: (row) => <>{row.firstname}</>,
    },
    {
      name: "Lastname",
      selector: (row) => <>{row.lastname}</>,
    },
    {
      name: "Address|Contact",
      selector: (row) => (
        <>
          <Stack>
            <Box userSelect="text">{row.address}</Box>
            <Box userSelect="text">#{row.contact_no}</Box>
          </Stack>
        </>
      ),
    },
    {
      name: "Usertype",
      selector: (row) => <>{row.user_type}</>,
    },
    {
      name: "Department|Services",
      selector: (row) => (
        <>
          <Stack spacing={5}>
            <Box fontSize={13}>
              Department:
              {department.map((serv) => {
                if (serv.PK_departmentID == row.FK_departmentID) {
                  return (
                    <Text color={"teal.600"} fontSize={16}>
                      {serv.dept_name}
                    </Text>
                  );
                }
              })}
            </Box>

            <Box fontSize={13}>
              Services:
              {services.map((serv) => {
                if (serv.PK_servicesID == row.FK_servicesID) {
                  return (
                    <Text color={"teal.600"} fontSize={16}>
                      {serv.name}
                    </Text>
                  );
                }
              })}
            </Box>
          </Stack>
        </>
      ),
    },
    {
      name: "Specialty|Position",
      selector: (row) => (
        <>
          <Stack fontSize={14} flexDirection="column" spacing={5}>
            <Box>
              {" "}
              Specialty :{" "}
              <Text color={"teal.600"} textTransform="uppercase">
                {row.specialty}
              </Text>{" "}
            </Box>
            <Box>
              Position :
              <Text color={"teal.700"} textTransform="uppercase">
                {row.position}
              </Text>
            </Box>
          </Stack>
        </>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          {(() => {
            if (row.isverified == 0) {
              return (
                <Badge variant="outline" colorScheme="red">
                  Not Verified
                </Badge>
              );
            } else {
              return (
                <Badge variant="outline" colorScheme="green">
                  Verified
                </Badge>
              );
            }
          })()}
        </>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          {(() => {
            if (row.isverified == 0) {
              return (
                <>
                  <PopoverComponent
                    btntitle="VERIFY"
                    message="Are you Sure?"
                    Confirm={HandleConfirm}
                    PassId={row.PK_userID}
                  />
                </>
              );
            }
          })()}

          <Link to={"/Admin/Accounts/Update/" + row.PK_userID + "/User"}>
            <Button variant={"ghost"} size="sm" color="green.400">
              <EditIcon />
            </Button>
          </Link>

          <Delete_Modal
            confirm={<Confirm_Delete item_id={row.PK_userID} table="users" />}
            note="All data connected to it will be deleted as well."
          />
        </>
      ),
    },
  ];

  //Filtering
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = users.filter((item) =>
    item.firstname.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <Container maxW={"container.xxl"}>
          <InputGroup float={"right"}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.500" />}
            />
            <Input
              placeholder="Filter By Department"
              onChange={(e) => {
                setFilterText(e.target.value);
              }}
              defaultValue={filterText}
              fontSize={14}
              width={350}
              variant="flushed"
            />
          </InputGroup>
        </Container>
      </>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      {" "}
      <Container mt={10} maxW="container.xxl">
        <Box
          borderWidth={1}
          p="10"
          bg={"cyan.50"}
          borderRadius="6"
          boxShadow="md"
        >
          {alerts && (
            <Alert mt={3} mb={3} status="success" id="" variant="left-accent">
              <AlertIcon />
              <Text color={"blackAlpha.600"}>{alerts}</Text>
            </Alert>
          )}
          <Link to="/Admin/Accounts/Add/New/User">
            <Button variant={"outline"} size="sm" colorScheme="cyan" mb={5}>
              {" "}
              ADD{" "}
              <i
                style={{ marginLeft: "5px" }}
                className="fas fa-plus-circle"
              ></i>{" "}
            </Button>
          </Link>

          <DataTable
            columns={columns}
            data={filteredItems}
            // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
            theme="Jobrequest"
            customStyles={customStyles}
            pagination
          />
        </Box>
        {/*  */}
      </Container>
    </>
  );
}

function Accounts() {
  const [alerto, setAlerto] = useState();
  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getNewUsers.php").then(
      (req) => {
        setAlerto(req.data.length);
      }
    );
  }, []);
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar alerto={alerto} />}
        Page_Contents={<RenderPage />}
        Page_title="ACCOUNTS"
      />
    </>
  );
}

export default Accounts;
