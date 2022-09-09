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
import Add_Modal from "../../components/layouts/add_modal";
import { useNavigate } from "react-router-dom";
import Delete_Modal from "../../components/layouts/delete_modal";
import Edit_Modal from "../../components/layouts/edit_modal";
function RenderPage() {
  const [department, setDepartments] = useState([]);
  const [alerts, setAlerts] = useState();
  const [deptval, setDeptval] = useState();
  const [wsuval, setWsuval] = useState();

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

  //Delete Functions
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

  // Add
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

  function handleUpdate(e) {
    e.preventDefault();

    const deptname = e.target.department.value;
    const wsu = e.target.wsu.value;
    const id = e.target.id.value;
    document
      .getElementById(id)
      .setAttribute("style", "background-color:#eda2a7");
    Axios.post(" http://localhost/JOBREQUEST/api/admin/update_department.php", {
      dname: deptname,
      wsu: wsu,
      id: id,
    }).then((req) => {
      //setDepartments(req.data);
      if (req.data.status == 1) {
        Axios.post(
          "http://localhost/JOBREQUEST/api/admin/getdepartment.php"
        ).then((req) => {
          setDepartments(req.data);
        });

        document.getElementById("modalClose").click();
        setAlerts("Updated Successfully.");

        setTimeout(() => {
          setAlerts("");
        }, 2000);
      } else if (req.data.status == 2) {
        setAlerts("No Changes Made.");
        setTimeout(() => {
          setAlerts("");
        }, 2000);
      }
    });
  }

  const Add_Modal_Body = () => {
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

  const Edit_Modal_Body = (props) => {
    return (
      <>
        <Container maxW="container.xl">
          <FormControl>
            <form method="post" onSubmit={handleUpdate}>
              <Stack spacing={3}>
                <Text>Department :</Text>
                <Input
                  placeholder=""
                  size="md"
                  name="department"
                  defaultValue={props.department}
                  required
                />
                <Text>Ward / Section / Unit :</Text>
                <Input
                  placeholder=""
                  size="md"
                  name="wsu"
                  required
                  defaultValue={props.wsu}
                />
                <Input name="id" value={props.dp_id} type="hidden" />
                <Button type="submit" variant="solid" colorScheme="blue">
                  Update
                </Button>
              </Stack>
            </form>
          </FormControl>
        </Container>
      </>
    );
  };

  const tableBody = () => {
    return department.map((row) => (
      <Tr id={row.PK_departmentID}>
        <Td fontWeight={"bold"} color="blackAlpha.700">
          {row.dept_name}
        </Td>
        <Td color="blackAlpha.700">{row.ward_sec_unit}</Td>
        <Td>
          <Edit_Modal
            btnTitle="UPDATE"
            title="Edit Department "
            mbody={
              <Edit_Modal_Body
                department={row.dept_name}
                wsu={row.ward_sec_unit}
                dp_id={row.PK_departmentID}
              />
            }
          />
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
          <Add_Modal
            btnTitle="ADD"
            title="Add Department  "
            mbody={<Add_Modal_Body />}
          />

          {alerts && (
            <Alert status="success" id="" variant="left-accent">
              <AlertIcon />
              <Text color={"blackAlpha.600"}>{alerts}</Text>
            </Alert>
          )}

          <Table_striped table_header={tableheader} table_body={tableBody} />
        </Box>
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
