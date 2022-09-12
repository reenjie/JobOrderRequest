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
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Headings from "../../components/layouts/heading";
import Table_striped from "../../components/layouts/table_striped";

function RenderPage() {
  const [users, setUsers] = useState([]);
  const [department, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getUsers.php").then(
      (req) => {
        setUsers(req.data);
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
      { th: "Department | Services" },
      { th: "Specialty | Position" },
      { th: "Status" },
      { th: "Action" },
    ],
  };

  const tableBody = () => {
    return users.map((row) => (
      <Tr color={"blackAlpha.700"}>
        <Td fontWeight={"bold"} color="blackAlpha.700">
          {row.email}
        </Td>
        <Td>{row.firstname}</Td>
        <Td>{row.lastname}</Td>
        <Td>
          <Stack>
            <Box>{row.address}</Box>
            <Box>#{row.contact_no}</Box>
          </Stack>
        </Td>
        <Td>
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
        <Td>
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
          <Button variant={"ghost"} size="sm" color="green.400">
            <EditIcon />
          </Button>
        </Td>
      </Tr>
    ));
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
