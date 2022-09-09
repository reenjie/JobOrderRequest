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
  ModalOverlay,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import Headings from "../../components/layouts/heading";
import Table_striped from "../../components/layouts/table_striped";
import OpenModal from "../../components/layouts/modal";
import { useNavigate } from "react-router-dom";
import Delete_Modal from "../../components/layouts/delete_modal";
function RenderPage() {
  const [department, setDepartments] = useState([]);
  const [alerts, setAlerts] = useState();

  const navigate = useNavigate();
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

  const handleKeyup = (e) => {
    const value = e.target.value;
    const id = e.currentTarget.dataset.itemid;
    const table = e.currentTarget.dataset.table;

    if (value == "delete" || value == "DELETE") {
      // document.getElementById("btnmodalClose").click();
      Axios.post("http://localhost/JOBREQUEST/api/admin/delete_data.php", {
        delete: 1,
        id: id,
        table: table,
      }).then((req) => {
        if (req.data.status == 1) {
          Axios.post(
            "http://localhost/JOBREQUEST/api/admin/getdepartment.php"
          ).then((req) => {
            setDepartments(req.data);
            document.getElementById("btnmodalClose").click();

            setAlerts("Deleted Successfully.");
            setTimeout(() => {
              setAlerts("");
            }, 2000);
          });
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

        document.getElementById("modalClose").click();
        setAlerts("Saved Successfully.");
        setTimeout(() => {
          setAlerts("");
        }, 2000);
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
          <Delete_Modal
            confirm={
              <Confirm_Delete
                item_id={row.PK_departmentID}
                table="department"
              />
            }
            note="All data connected to it will be deleted as well."
          />
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

          {alerts && (
            <Alert status="success" id="" variant="left-accent">
              <AlertIcon />
              <Text color={"blackAlpha.600"}>{alerts}</Text>
            </Alert>
          )}

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
