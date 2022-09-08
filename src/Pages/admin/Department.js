import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import {
  Container,
  Button,
  Tr,
  Td,
  Box,
  Text,
  Stack,
  Input,
  FormControl,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import Headings from "../../components/layouts/heading";
import Table_striped from "../../components/layouts/table_striped";
import Delete_Modal from "../../components/layouts/delete_modal";
import OpenModal from "../../components/layouts/modal";
import { useDisclosure } from "@chakra-ui/react";
function RenderPage() {
  const [department, setDepartments] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getdepartment.php").then(
      (req) => {
        setDepartments(req.data);
      }
    );
  }, []);

  const tableheader = {
    thead: [
      { th: "Department" },
      { th: "Ward/Section/Unit" },
      { th: "Action" },
    ],
  };

  function handleSubmit(e) {
    e.preventDefault();

    const deptname = e.target.department.value;
    const wsu = e.target.wsu.value;
    Axios.post(" http://localhost/JOBREQUEST/api/admin/savedepartment.php", {
      dname: deptname,
      wsu: wsu,
    }).then((req) => {
      //setDepartments(req.data);
      if (req.data.status == 1) {
        Axios.post(
          "http://localhost/JOBREQUEST/api/admin/getdepartment.php"
        ).then((req) => {
          setDepartments(req.data);
        });
      }
    });
  }
  const tableBody = () => {
    return department.map((row) => (
      <Tr>
        <Td fontWeight={"bold"} color="blackAlpha.700">
          {row.dept_name}
        </Td>
        <Td>{row.ward_sec_unit}</Td>
        <Td>
          <Button variant={"ghost"} size="sm" color="green.400">
            <EditIcon />
          </Button>
          <Delete_Modal note="This will delete all data." />
        </Td>
      </Tr>
    ));
  };

  const ModalBody = () => {
    return (
      <>
        <Container maxW="container.xl">
          <FormControl>
            <form method="post" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Text>Department :</Text>
                <Input
                  placeholder=""
                  size="md"
                  autoFocus
                  name="department"
                  required
                />
                <Text>Ward / Section / Unit :</Text>
                <Input placeholder="" size="md" name="wsu" required />
                <Button type="submit" variant="solid" colorScheme="teal">
                  Add
                </Button>
              </Stack>
            </form>
          </FormControl>
        </Container>
      </>
    );
  };

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
          <OpenModal
            btnTitle="ADD"
            title="ADD Department"
            mbody={<ModalBody />}
          />
          <Table_striped table_header={tableheader} table_body={tableBody} />
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
