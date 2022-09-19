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
  Badge,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  SimpleGrid,
  Textarea,
  Select,
  Checkbox,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Headings from "../../components/layouts/heading";
import Table_striped from "../../components/layouts/table_striped";
import Add_Modal from "../../components/layouts/add_modal";
import Delete_Modal from "../../components/layouts/delete_modal";
import Edit_Modal from "../../components/layouts/edit_modal";
import { Link, useNavigate } from "react-router-dom";
function RenderPage() {
  const [alerts, setAlerts] = useState();
  const [usertype, setUsertype] = useState();
  const [services, setServices] = useState([]);
  const [department, setDepartments] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getservices.php").then(
      (req) => {
        setServices(req.data);
      }
    );

    Axios.post("http://localhost/JOBREQUEST/api/admin/getdepartment.php").then(
      (req) => {
        setDepartments(req.data);
      }
    );
  }, []);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    document.getElementById("btnsave").innerHTML = "Saving..";

    const usertype = e.target.usertype.value;
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const contactno = e.target.contactno.value;
    const address = e.target.address.value;
    const department = e.target.department.value;
    const specialty = e.target.specialty.value;
    const position = e.target.position.value;
    const services = e.target.services.value;
    const option = e.target.option.checked;

    Axios.post("http://localhost/JOBREQUEST/api/admin/saveUser.php", {
      usertype: usertype,
      firstname: firstname,
      lastname: lastname,
      email: email,
      contactno: contactno,
      address: address,
      department: department,
      specialty: specialty,
      position: position,
      services: services,
    }).then((req) => {
      if (req.data.status == 1) {
        setAlerts("User Added Successfully.");
        setTimeout(() => {
          setAlerts("");
          if (option == false) {
            navigate("/Admin/Accounts");
          }
        }, 2000);
        document.getElementById("unset_usertype").value = "";
        document.getElementById("unset_fname").value = "";
        document.getElementById("unset_lname").value = "";
        document.getElementById("unset_email").value = "";
        document.getElementById("unset_contactno").value = "";
        document.getElementById("unset_address").value = "";
        document.getElementById("unset_department").value = "";
        document.getElementById("unset_specialty").value = "";
        document.getElementById("unset_position").value = "";
        document.getElementById("btnsave").innerHTML = "Save";
        setUsertype("");
      }
    });
  };
  return (
    <>
      {" "}
      <Container mt={10} maxW="container.xl" float={"left"}>
        <form method="post" onSubmit={handleSubmit}>
          <Box
            borderWidth={1}
            p="5"
            bg={"cyan.50"}
            borderRadius="6"
            boxShadow="md"
          >
            <Link to="/Admin/Accounts">
              {" "}
              <Button variant={"outline"} size="sm" colorScheme={"teal"}>
                Back
              </Button>
            </Link>

            {alerts && (
              <Alert mt={3} status="success" id="" variant="left-accent">
                <AlertIcon />
                <Text color={"blackAlpha.600"}>{alerts}</Text>
              </Alert>
            )}
            <Box mt={4}>
              <Container maxW={"container.xxl"}>
                <SimpleGrid minChildWidth="300px" spacing="10px">
                  <Box p={10}>
                    <Text color={"teal.700"} mb={5}>
                      Personal Information
                    </Text>
                    <FormControl isRequired mb={5} color="blackAlpha.700">
                      <FormLabel fontSize={14}>User Type</FormLabel>
                      <Select
                        placeholder="Select Type"
                        size={"sm"}
                        borderColor={"blackAlpha.400"}
                        borderRadius={4}
                        autoFocus
                        required
                        name="usertype"
                        onChange={(e) => {
                          setUsertype(e.target.value);
                        }}
                        id="unset_usertype"
                      >
                        <option value="admin">Admin</option>
                        <option value="assessor">Assessor</option>
                        <option value="requestor">Requestor</option>
                      </Select>
                    </FormControl>

                    <FormControl isRequired mb={2} color="blackAlpha.700">
                      <FormLabel fontSize={14}>First name</FormLabel>
                      <Input
                        placeholder=""
                        size={"sm"}
                        borderColor={"blackAlpha.400"}
                        borderRadius={4}
                        required
                        name="firstname"
                        id="unset_fname"
                      />
                    </FormControl>

                    <FormControl isRequired mb={2} color="blackAlpha.700">
                      <FormLabel fontSize={14}>Last name</FormLabel>
                      <Input
                        placeholder=""
                        size={"sm"}
                        borderColor={"blackAlpha.400"}
                        borderRadius={4}
                        required
                        name="lastname"
                        id="unset_lname"
                      />
                    </FormControl>

                    <FormControl isRequired mb={2} color="blackAlpha.700">
                      <FormLabel fontSize={14}>Email</FormLabel>
                      <Input
                        placeholder=""
                        size={"sm"}
                        borderColor={"blackAlpha.400"}
                        borderRadius={4}
                        required
                        name="email"
                        type={"email"}
                        id="unset_email"
                      />
                    </FormControl>

                    <FormControl isRequired mb={2} color="blackAlpha.700">
                      <FormLabel fontSize={14}>Contact No</FormLabel>
                      <Input
                        placeholder=""
                        size={"sm"}
                        borderColor={"blackAlpha.400"}
                        borderRadius={4}
                        required
                        name="contactno"
                        id="unset_contactno"
                      />
                    </FormControl>

                    <FormControl isRequired mb={2} color="blackAlpha.700">
                      <FormLabel fontSize={14}>Address</FormLabel>
                      <Textarea
                        fontSize={14}
                        placeholder=""
                        borderColor={"blackAlpha.400"}
                        borderRadius={4}
                        required
                        name="address"
                        id="unset_address"
                      />
                    </FormControl>
                  </Box>
                  <Box p={10}>
                    <Text color={"teal.700"} mb={5}>
                      Others
                    </Text>

                    <FormControl isRequired mb={5} color="blackAlpha.700">
                      <FormLabel fontSize={14}>Department</FormLabel>
                      <Select
                        placeholder="Select Department"
                        size={"sm"}
                        borderColor={"blackAlpha.400"}
                        borderRadius={4}
                        name="department"
                        required
                        id="unset_department"
                      >
                        {department.map((offers) => {
                          return (
                            <option value={offers.PK_departmentID}>
                              {offers.dept_name}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>

                    <FormControl mb={2} color="blackAlpha.700">
                      <FormLabel fontSize={14}>Specialty</FormLabel>
                      <Input
                        placeholder=""
                        size={"sm"}
                        borderColor={"blackAlpha.400"}
                        borderRadius={4}
                        name="specialty"
                        id="unset_specialty"
                      />
                    </FormControl>

                    <FormControl mb={2} color="blackAlpha.700">
                      <FormLabel fontSize={14}>Position</FormLabel>
                      <Input
                        placeholder=""
                        size={"sm"}
                        borderColor={"blackAlpha.400"}
                        borderRadius={4}
                        name="position"
                        id="unset_position"
                      />
                    </FormControl>
                    {usertype == "assessor" ? (
                      <FormControl
                        mt={5}
                        bg={"blackAlpha.200"}
                        p={5}
                        borderRadius={5}
                        color="blackAlpha.700"
                      >
                        <FormLabel fontSize={14}>Services</FormLabel>
                        <Select
                          placeholder="Select Services"
                          size={"sm"}
                          borderColor={"blackAlpha.400"}
                          borderRadius={4}
                          name="services"
                          id="unset_services"
                          required
                        >
                          {services.map((offers) => {
                            return (
                              <option value={offers.PK_servicesID}>
                                {offers.name}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>
                    ) : (
                      <Input type={"hidden"} name="services" value="0" />
                    )}

                    <Box
                      mt={5}
                      p={10}
                      borderWidth={1}
                      borderRadius={5}
                      borderColor={"blackAlpha.400"}
                    >
                      <Stack>
                        <Checkbox
                          fontSize={14}
                          defaultChecked
                          color={"blackAlpha.700"}
                          mb={2}
                          name="option"
                        >
                          Stay after Saving..
                        </Checkbox>
                        <Button
                          variant={"solid"}
                          p={5}
                          colorScheme="blue"
                          size={"sm"}
                          type="submit"
                          id="btnsave"
                        >
                          {" "}
                          Save
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </SimpleGrid>
              </Container>
            </Box>
          </Box>
        </form>
      </Container>
    </>
  );
}

function Add_User(props) {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
        Page_title="ACCOUNTS"
      />
    </>
  );
}

export default Add_User;
