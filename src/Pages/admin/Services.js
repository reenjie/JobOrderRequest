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
import { Link } from "react-router-dom";
function RenderPage() {
  const [services, setServices] = useState([]);
  const [servicesoffer, setServicesoffer] = useState([]);
  const [alerts, setAlerts] = useState();
  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getservices.php").then(
      (req) => {
        setServices(req.data);
      }
    );

    Axios.post(
      "http://localhost/JOBREQUEST/api/admin/getservicesoffer.php"
    ).then((req) => {
      setServicesoffer(req.data);
    });
  }, []);

  const tableheader = {
    thead: [{ th: "Name" }, { th: "Created" }, { th: "Action" }],
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
          setServices(req.data);
        });
        document.getElementById("modalClose").click();
        setAlerts("Saved Successfully.");
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
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Container maxW={"xs"}>
                  <UnorderedList fontWeight={"normal"}>
                    {servicesoffer.map((offers) => {
                      if (offers.FK_serviceID == row.PK_servicesID) {
                        return <ListItem>{offers.name}</ListItem>;
                      }
                    })}
                  </UnorderedList>
                  <Link to="/Servicesoffer?Data=trialonly">
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
        <Td>{row.created_at}</Td>
        <Td>
          <Button variant={"ghost"} size="sm" color="green.400">
            <EditIcon />
          </Button>
          <Delete_Modal
            confirm={
              <Confirm_Delete item_id={row.PK_servicesID} table="services" />
            }
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
