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
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Delete_Modal from "../../components/layouts/delete_modal";
import Table_striped from "../../components/layouts/table_striped";
import Add_Modal from "../../components/layouts/add_modal";
import Edit_Modal from "../../components/layouts/edit_modal";

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

  const tableBody = () => {
    return services.map((row) => (
      <Tr>
        <Td fontWeight={"bold"} color="blackAlpha.700">
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
                    {console.log(servicesoffer)}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Container maxW={"xl"}>
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
        </Td>
        <Td>{moment(row.created_at).format("@hh:mm a MMMM DD,YYYY")}</Td>
        <Td>{moment(row.updated_at).format("@hh:mm a MMMM DD,YYYY")}</Td>
        <Td>
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
          <Input
            placeholder="Search Services .."
            size="sm"
            mb={5}
            width="300px"
          />

          <Table_striped table_header={tableheader} table_body={tableBody} />
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
