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
  const [services, setServices] = useState([]);
  const [servicesoffer, setServicesoffer] = useState([]);
  const [alerts, setAlerts] = useState();
  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getservices.php").then(
      (req) => {
        if (req.data.length >= 1) {
          setServices(req.data);
        } else {
          setServices([]);
        }
      }
    );

    Axios.post(
      "http://localhost/JOBREQUEST/api/admin/getservicesoffer.php"
    ).then((req) => {
      setServicesoffer(req.data);
    });
  }, []);

  // Add
  function handleSubmit(e) {
    e.preventDefault();

    const service = e.target.services.value;
    Axios.post(" http://localhost/JOBREQUEST/api/admin/saveservices.php", {
      services: service,
    }).then((req) => {
      if (req.data.status == 1) {
        Axios.post(
          "http://localhost/JOBREQUEST/api/admin/getservices.php"
        ).then((req) => {
          if (req.data.length >= 1) {
            setServices(req.data);
          } else {
            setServices([]);
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

    const service = e.target.services.value;
    const id = e.target.id.value;
    Axios.post(" http://localhost/JOBREQUEST/api/admin/update_services.php", {
      service: service,
      id: id,
    }).then((req) => {
      //setDepartments(req.data);
      if (req.data.status == 1) {
        Axios.post(
          "http://localhost/JOBREQUEST/api/admin/getservices.php"
        ).then((req) => {
          if (req.data.length >= 1) {
            setServices(req.data);
          } else {
            setServices([]);
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
                <Text>Services :</Text>
                <Input
                  placeholder=""
                  size="sm"
                  autoFocus
                  name="services"
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
                  name="services"
                  required
                  defaultValue={props.service}
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
            "http://localhost/JOBREQUEST/api/admin/getservices.php"
          ).then((req) => {
            setServices(req.data);
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

  const handleChangeStatus = (e) => {
    //console.log(e.target.checked);
    const s_status = e.target.checked == false ? 0 : 1;
    const id = e.target.value;

    Axios.post("http://localhost/JOBREQUEST/api/admin/changeStatus.php", {
      id: id,
      s_status: s_status,
    }).then((req) => {
      if (req.data.status == 1) {
        Axios.post(
          "http://localhost/JOBREQUEST/api/admin/getservices.php"
        ).then((req) => {
          setServices(req.data);
        });
      }
    });
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
            {row.name}
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      fontSize={13}
                      textAlign="left"
                      color={"teal.500"}
                    >
                      Services Offers
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <Container maxW={"container.xxl"}>
                    <UnorderedList fontWeight={"normal"} listStyleType="circle">
                      {servicesoffer.map((offers) => {
                        if (offers.FK_serviceID == row.PK_servicesID) {
                          return <ListItem>{offers.name}</ListItem>;
                        }
                      })}
                    </UnorderedList>
                    <Link
                      to={
                        "/Admin/Services/Servicesoffer/" +
                        row.PK_servicesID +
                        "/Manage-ServicesOffers/" +
                        row.name
                      }
                    >
                      <Button
                        mt="2"
                        variant="ghost"
                        size="sm"
                        colorScheme={"teal"}
                      >
                        Manage
                      </Button>
                    </Link>
                  </Container>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
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
      name: (
        <>
          <Popover placement="top">
            <PopoverTrigger>
              <span>
                Detailed{" "}
                <i
                  style={{ marginLeft: "5px" }}
                  className="fas fa-info-circle"
                ></i>
              </span>
            </PopoverTrigger>
            <PopoverContent p={5}>
              <PopoverArrow />
              <PopoverCloseButton />

              <PopoverBody color={"red.400"}>
                This Setting is to include the Serial Number and Model Number
                When making a Job Request.
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </>
      ),
      selector: (row) => (
        <>
          {row.isSM == 1 ? (
            <Switch
              onChange={handleChangeStatus}
              value={row.PK_servicesID}
              colorScheme="red"
              isChecked
            />
          ) : (
            <Switch
              onChange={handleChangeStatus}
              value={row.PK_servicesID}
              colorScheme="red"
            />
          )}
        </>
      ),
    },

    {
      name: "Action",
      selector: (row) => (
        <>
          <Edit_Modal
            btnTitle="UPDATE"
            title="Edit Service "
            mbody={
              <Edit_Modal_Body service={row.name} id={row.PK_servicesID} />
            }
          />
          <Delete_Modal
            note="All Services Offer will be Deleted. Do you still wish to proceed?"
            confirm={
              <Confirm_Delete item_id={row.PK_servicesID} table="services" />
            }
            modalid={row.PK_servicesID}
          />
        </>
      ),
    },
  ];

  //Filtering
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = services.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
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
        <Box p="10" bg={"cyan.50"} borderRadius="6">
          {alerts && (
            <Alert status="success" id="" variant="left-accent">
              <AlertIcon />
              <Text color={"blackAlpha.600"}>{alerts}</Text>
            </Alert>
          )}

          <Add_Modal
            btnTitle="ADD"
            title="Add Services  "
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
        {/*  */}
      </Container>
    </>
  );
}

function Services() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
        Page_title="SERVICES"
      />
    </>
  );
}

export default Services;
