import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import {
  Heading,
  Container,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Headings from "../../components/layouts/heading";
function RenderPage() {
  const [department, setDepartments] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getdepartment.php").then(
      (req) => {
        setDepartments(req.data);
      }
    );
  }, []);

  return (
    <>
      {" "}
      <Headings title="DEPARTMENT" />
      <Container mt={10} maxW="container.xl">
        <Box
          borderWidth={1}
          p="10"
          bg={"cyan.50"}
          borderRadius="6"
          boxShadow="md"
        >
          <TableContainer>
            <Table variant="striped" colorScheme="facebook" size={"md"}>
              <Thead>
                <Tr>
                  <Th>Department</Th>
                  <Th>Ward/Section/Unit</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody fontSize={14}>
                {department.map((row) => {
                  {
                    return (
                      <Tr>
                        <Td fontWeight={"bold"} color="blackAlpha.700">
                          {row.dept_name}
                        </Td>
                        <Td>{row.ward_sec_unit}</Td>
                        <Td>
                          <Button variant={"ghost"} size="sm" color="green.400">
                            <EditIcon />
                          </Button>
                          <Button
                            ml={2}
                            variant={"ghost"}
                            size="sm"
                            color="red.400"
                          >
                            <DeleteIcon />
                          </Button>
                        </Td>
                      </Tr>
                    );
                  }
                })}
              </Tbody>
              <Tfoot></Tfoot>
            </Table>
          </TableContainer>
        </Box>
        {/*  */}
      </Container>
    </>
  );
}

function Department() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
      />
    </>
  );
}

export default Department;
