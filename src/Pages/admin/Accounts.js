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
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Headings from "../../components/layouts/heading";
import Table_striped from "../../components/layouts/table_striped";
import Add_Modal from "../../components/layouts/add_modal";
import Delete_Modal from "../../components/layouts/delete_modal";
import Edit_Modal from "../../components/layouts/edit_modal";
import PopoverComponent from "../../components/layouts/Popover";
import { Link } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
function RenderPage() {
  const [users, setUsers] = useState([]);
  const [department, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [alerts, setAlerts] = useState();

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
        }, 2000);
      }
    });
  }

  const tableBody = () => {
    if (users.length >= 1) {
      return users.map((row) => (
        <Tr color={"blackAlpha.700"}>
          <Td userSelect="text" fontWeight={"bold"} color="blackAlpha.700">
            {row.email}
          </Td>
          <Td userSelect="text">{row.firstname}</Td>
          <Td userSelect="text">{row.lastname}</Td>
          <Td>
            <Stack>
              <Box userSelect="text">{row.address}</Box>
              <Box userSelect="text">#{row.contact_no}</Box>
            </Stack>
          </Td>
          <Td>
            <Text textTransform={"uppercase"}>{row.user_type}</Text>
          </Td>
          <Td userSelect="text">
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
          </Td>
          <Td userSelect="text">
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
          </Td>
          <Td>
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
          </Td>
          <Td>
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
          </Td>
        </Tr>
      ));
    } else {
      return (
        <Tr>
          <Td colSpan={9} textAlign="center">
            No data Found
          </Td>
        </Tr>
      );
    }
  };

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
            <Button variant={"outline"} size="sm" colorScheme={"teal"} mb={5}>
              {" "}
              ADD{" "}
              <i
                style={{ marginLeft: "5px" }}
                className="fas fa-plus-circle"
              ></i>{" "}
            </Button>
          </Link>

          <Table_striped table_header={tableheader} table_body={tableBody} />
        </Box>
        {/*  */}
      </Container>
    </>
  );
}

function Accounts() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
        Page_title="ACCOUNTS"
      />
    </>
  );
}

export default Accounts;
