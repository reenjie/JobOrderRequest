import { Link, useParams, useSearchParams } from "react-router-dom";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Delete_Modal from "../../components/layouts/delete_modal";
import Table_striped from "../../components/layouts/table_striped";
import Add_Modal from "../../components/layouts/add_modal";
import Edit_Modal from "../../components/layouts/edit_modal";
import moment from "moment";

function RenderPage() {
  const [servicesoffer, setServicesoffer] = useState([]);
  const [alerts, setAlerts] = useState();
  const { serviceid, servicename } = useParams();

  useEffect(() => {
    Axios.post(
      "http://localhost/JOBREQUEST/api/admin/getServicesoffer_sorted.php",
      {
        serviceid: serviceid,
      }
    ).then((req) => {
      if (req.data.length >= 1) {
        setServicesoffer(req.data);
      } else {
      }
    });
  }, []);

  const tableheader = {
    thead: [
      { th: "Name" },
      { th: "Created" },
      { th: "Modified" },
      { th: "Action" },
    ],
  };

  // Add
  function handleSubmit(e) {
    e.preventDefault();

    const service = e.target.services.value;
    Axios.post(" http://localhost/JOBREQUEST/api/admin/saveservicesoffer.php", {
      services: service,
      serviceid: serviceid,
    }).then((req) => {
      if (req.data.status == 1) {
        Axios.post(
          "http://localhost/JOBREQUEST/api/admin/getServicesoffer_sorted.php",
          {
            serviceid: serviceid,
          }
        ).then((req) => {
          if (req.data.length >= 1) {
            setServicesoffer(req.data);
          } else {
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
    Axios.post(
      " http://localhost/JOBREQUEST/api/admin/update_servicesOffer.php",
      {
        service: service,
        id: id,
      }
    ).then((req) => {
      //setDepartments(req.data);
      if (req.data.status == 1) {
        Axios.post(
          "http://localhost/JOBREQUEST/api/admin/getServicesoffer_sorted.php",
          {
            serviceid: serviceid,
          }
        ).then((req) => {
          if (req.data.length >= 1) {
            setServicesoffer(req.data);
          } else {
          }
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
                <Text>Services :</Text>
                <Input
                  placeholder=""
                  size="md"
                  autoFocus
                  name="services"
                  required
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
                  size="md"
                  name="services"
                  required
                  defaultValue={props.service}
                  autoFocus
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
            "http://localhost/JOBREQUEST/api/admin/getServicesoffer_sorted.php",
            {
              serviceid: serviceid,
            }
          ).then((req) => {
            if (req.data.length >= 1) {
              setServicesoffer(req.data);
            } else {
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

  const tableBody = () => {
    if (servicesoffer.length >= 1) {
      return servicesoffer.map((row) => (
        <Tr>
          <Td fontWeight={"bold"} color="blackAlpha.700">
            {row.name}
          </Td>
          <Td>{moment(row.created_at).format("@hh:mm a MMMM DD,YYYY")}</Td>
          <Td>{moment(row.updated_at).format("@hh:mm a MMMM DD,YYYY")}</Td>
          <Td>
            <Edit_Modal
              btnTitle="UPDATE"
              title="Edit Service "
              mbody={<Edit_Modal_Body service={row.name} id={row.PK_soID} />}
            />
            <Delete_Modal
              confirm={
                <Confirm_Delete item_id={row.PK_soID} table="services_offer" />
              }
            />
          </Td>
        </Tr>
      ));
    } else {
      return (
        <Tr>
          <Td
            textAlign={"center"}
            fontWeight={"bold"}
            color="blackAlpha.700"
            colSpan={3}
          >
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
        <Breadcrumb fontWeight="medium" mb={1} fontSize="sm" color={"blue.500"}>
          <Stack>
            <Link to="/Admin/Services">
              {" "}
              <Button
                mb={5}
                mr={2}
                variant={"outline"}
                color={"blackAlpha.700"}
                size="sm"
              >
                Back
              </Button>
            </Link>
          </Stack>

          <BreadcrumbItem>
            <Text>Services</Text>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Text>{servicename}</Text>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <Text>ServicesOffer</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box
          borderWidth={1}
          p="10"
          bg={"cyan.50"}
          borderRadius="6"
          boxShadow="md"
        >
          {alerts && (
            <Alert status="success" id="" variant="left-accent">
              <AlertIcon />
              <Text color={"blackAlpha.600"}>{alerts}</Text>
            </Alert>
          )}

          <Add_Modal
            btnTitle="ADD"
            title={"Add Services Offer for " + servicename}
            mbody={<Add_Modal_Body />}
          />

          <Table_striped table_header={tableheader} table_body={tableBody} />
        </Box>
        {/*  */}
      </Container>
    </>
  );
}

function Servicesoffer(props) {
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

export default Servicesoffer;
