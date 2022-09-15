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
  Input,
  Alert,
  AlertIcon,
  FormControl,
  Spacer,
  InputGroup,
  InputLeftElement,
  Switch,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import Delete_Modal from "../../components/layouts/delete_modal";
import Table_striped from "../../components/layouts/table_striped";
import Add_Modal from "../../components/layouts/add_modal";
import Edit_Modal from "../../components/layouts/edit_modal";
import DataTable, { createTheme } from "react-data-table-component";
import moment from "moment";
import { Link } from "react-router-dom";

function RenderPage() {
  const [worktypes, setWorktypes] = useState([]);
  const [alerts, setAlerts] = useState();
  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getWorktype.php").then(
      (req) => {
        if (req.data.length >= 1) {
          setWorktypes(req.data);
        } else {
          setWorktypes([]);
        }
      }
    );
  }, []);

  // Add
  function handleSubmit(e) {
    e.preventDefault();

    const wt = e.target.wt.value;
    Axios.post(" http://localhost/JOBREQUEST/api/admin/saveWorktype.php", {
      wt: wt,
    }).then((req) => {
      if (req.data.status == 1) {
        Axios.post(
          "http://localhost/JOBREQUEST/api/admin/getWorktype.php"
        ).then((req) => {
          if (req.data.length >= 1) {
            setWorktypes(req.data);
          } else {
            setWorktypes([]);
          }
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

    const wt = e.target.worktype.value;
    const id = e.target.id.value;
    Axios.post(" http://localhost/JOBREQUEST/api/admin/update_worktype.php", {
      wt: wt,
      id: id,
    }).then((req) => {
      //setDepartments(req.data);
      if (req.data.status == 1) {
        Axios.post(
          "http://localhost/JOBREQUEST/api/admin/getWorktype.php"
        ).then((req) => {
          if (req.data.length >= 1) {
            setWorktypes(req.data);
          } else {
            setWorktypes([]);
          }
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
                <Text>WorkType :</Text>
                <Input
                  placeholder=""
                  size="sm"
                  autoFocus
                  name="wt"
                  required
                  fontSize={14}
                  borderRadius={4}
                />
                <Spacer />
                <Button
                  type="submit"
                  variant="solid"
                  w={140}
                  float="right"
                  colorScheme="teal"
                >
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
                <Text>Services :</Text>
                <Input
                  placeholder=""
                  size="sm"
                  name="worktype"
                  required
                  defaultValue={props.worktype}
                  autoFocus
                  fontSize={14}
                  borderRadius={4}
                />
                <Spacer />
                <Input name="id" value={props.id} type="hidden" />
                <Button
                  type="submit"
                  variant="solid"
                  w={140}
                  float="right"
                  colorScheme="teal"
                >
                  Update
                </Button>
              </Stack>
            </form>
          </FormControl>
        </Container>
      </>
    );
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
            "http://localhost/JOBREQUEST/api/admin/getWorktype.php"
          ).then((req) => {
            if (req.data.length >= 1) {
              setWorktypes(req.data);
            } else {
              setWorktypes([]);
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

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <>
          <Text fontWeight={"bold"} fontSize="14">
            {row.label}
          </Text>
        </>
      ),
    },
    {
      name: "Created",
      selector: (row) => (
        <>{moment(row.created_at).format("@hh:mm a MMMM DD,YYYY")}</>
      ),
    },
    {
      name: "Modified",
      selector: (row) => (
        <>{moment(row.updated_at).format("@hh:mm a MMMM DD,YYYY")}</>
      ),
    },

    {
      name: "Action",
      selector: (row) => (
        <>
          <Edit_Modal
            btnTitle="UPDATE"
            title="Edit WorkTypes "
            mbody={
              <Edit_Modal_Body worktype={row.label} id={row.PK_workTypeID} />
            }
          />
          <Delete_Modal
            note="All Services Offer will be Deleted. Do you still wish to proceed?"
            confirm={
              <Confirm_Delete item_id={row.PK_workTypeID} table="worktype" />
            }
            modalid={row.PK_workTypeID}
          />
        </>
      ),
    },
  ];

  //Filtering
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = worktypes.filter((item) =>
    item.label.toLowerCase().includes(filterText.toLowerCase())
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
              placeholder="Filter By Worktypes"
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
        <Box p="10" bg={"cyan.50"} borderRadius="6">
          {alerts && (
            <Alert status="success" id="" variant="left-accent">
              <AlertIcon />
              <Text color={"blackAlpha.600"}>{alerts}</Text>
            </Alert>
          )}

          <Add_Modal
            btnTitle="ADD"
            title="Add WorkTypes  "
            mbody={<Add_Modal_Body />}
          />

          <Link to="/Admin/Services">
            {" "}
            <Button variant={"ghost"} size="sm" colorScheme={"cyan"}>
              Services
              <i style={{ marginLeft: "5px" }} className="fas fa-cogs"></i>
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

function Worktype() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
        Page_title="WORKTYPE"
      />
    </>
  );
}

export default Worktype;
