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
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Headings from "../../components/layouts/heading";
import Table_striped from "../../components/layouts/table_striped";
import Delete_Modal from "../../components/layouts/delete_modal";

function RenderPage() {
  const [services, setServices] = useState([]);
  const [servicesoffer, setServicesoffer] = useState([]);
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
                  <Button mt="2" variant="ghost" size="sm" colorScheme={"teal"}>
                    {" "}
                    Manage{" "}
                    <Text ml={2} mr={2} color={"blue.400"}>
                      {row.name}
                    </Text>{" "}
                    Services
                  </Button>
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
          <Delete_Modal note="This will delete all data." />
        </Td>
      </Tr>
    ));
  };

  return (
    <>
      {" "}
      <Headings title="SERVICES" />
      <Container mt={10} maxW="container.xl">
        <Box
          borderWidth={1}
          p="10"
          bg={"cyan.50"}
          borderRadius="6"
          boxShadow="md"
        >
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
      />
    </>
  );
}

export default Services;
