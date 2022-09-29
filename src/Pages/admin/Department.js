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
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Add_Modal from "../../components/layouts/add_modal";
import Delete_Modal from "../../components/layouts/delete_modal";
import Edit_Modal from "../../components/layouts/edit_modal";
import DataTable, { createTheme } from "react-data-table-component";
import url from "../../config";
function RenderPage() {
  const [department, setDepartments] = useState([]);
  const [alerts, setAlerts] = useState();
  const [deptval, setDeptval] = useState();
  const [wsuval, setWsuval] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getdepartment.php").then(
      (req) => {
        if (req.data.length >= 1) {
          setDepartments(req.data);
        } else {
          setDepartments([]);
        }
      }
    );
  }, []);

  //Delete Functions
  const handleKeyup = (e) => {
    const value = e.target.value;
    const id = e.currentTarget.dataset.itemid;
    const table = e.currentTarget.dataset.table;

    if (value == "delete" || value == "DELETE") {
      // document.getElementById("btnmodalClose").click();
      Axios.post(url + "/api/admin/delete_data.php", {
        delete: 1,
        id: id,
        table: table,
      }).then((req) => {
        if (req.data.status == 1) {
          Axios.post(
            "http://localhost/JOBREQUEST/api/admin/getdepartment.php"
          ).then((req) => {
            if (req.data.length >= 1) {
              setDepartments(req.data);
            } else {
              setDepartments([]);
            }
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
    Axios.post(url + " /api/admin/savedepartment.php", {
      dname: deptname,
      wsu: wsu,
    }).then((req) => {
      //setDepartments(req.data);
      if (req.data.status == 1) {
        Axios.post(url + "/api/admin/getdepartment.php").then((req) => {
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

    Axios.post(" http://localhost/JOBREQUEST/api/admin/update_department.php", {
      dname: deptname,
      wsu: wsu,
      id: id,
    }).then((req) => {
      //setDepartments(req.data);
      if (req.data.status == 1) {
        Axios.post(url + "/api/admin/getdepartment.php").then((req) => {
          setDepartments(req.data);
        });

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
      document.getElementById("modalClose").click();
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
                  size="sm"
                  autoFocus
                  name="department"
                  required
                  fontSize={14}
                  borderRadius={4}
                />
                <Text>Ward / Section / Unit :</Text>
                <Input
                  placeholder=""
                  size="sm"
                  name="wsu"
                  required
                  fontSize={14}
                  borderRadius={4}
                />
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
                  size="sm"
                  name="department"
                  defaultValue={props.department}
                  required
                />
                <Text>Ward / Section / Unit :</Text>
                <Input
                  placeholder=""
                  size="sm"
                  name="wsu"
                  required
                  defaultValue={props.wsu}
                  fontSize={14}
                  borderRadius={4}
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
      name: "Department",
      selector: (row) => (
        <>
          <Text fontWeight={"bold"} fontSize="14">
            {row.dept_name}
          </Text>
        </>
      ),
    },
    {
      name: "Ward/Section/Unit",
      selector: (row) => row.ward_sec_unit,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Edit_Modal
            btnTitle="UPDATE"
            title="Edit Department "
            size="sm"
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
            size="sm"
            note="All data connected to it will be deleted as well."
          />
        </>
      ),
    },
  ];

  //Filtering
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = department.filter((item) =>
    item.dept_name.toLowerCase().includes(filterText.toLowerCase())
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
        <Box p="10" bg={"cyan.50"} borderRadius="6" transition={"all ease 2s"}>
          {alerts && (
            <Alert status="success" id="" variant="left-accent">
              <AlertIcon />
              <Text color={"blackAlpha.600"}>{alerts}</Text>
            </Alert>
          )}
          <Add_Modal
            btnTitle="ADD"
            title="Add Department  "
            mbody={<Add_Modal_Body />}
          />
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
        Page_title="DEPARTMENT"
      />
    </>
  );
}

export default Department;
