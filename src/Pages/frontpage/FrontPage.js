import React, { Component, useState, useEffect } from "react";
import * as _ from "@chakra-ui/react";
import logo from "../../images/zcmc_logo.png";
import Axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid,
  GridItem,
  Box,
  Flex,
  Heading,
  Checkbox,
  Stack,
  Select,
  Button,
  Spacer,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Container,
  Image,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Tablef = (props) => {
  return props.data == "" ? (
    "Choose Type of work"
  ) : (
    <Tbody>
      <Tr>
        <Td>{props.data.jobType}</Td>
        <Td>{props.data.serviceDepartment}</Td>
        <Td>{props.data.serviceType}</Td>
        <Td>
          <Button
            colorScheme="red"
            variant="ghost"
            size={"sm"}
            onClick={() => {
              props.deleteHundler(props.data);
            }}
          >
            <DeleteIcon />
          </Button>
        </Td>
      </Tr>
    </Tbody>
  );
};

class RequestModel {
  constructor(jobType, serviceDepartment, serviceType) {
    this.jobType = jobType;
    this.serviceDepartment = serviceDepartment;
    this.serviceType = serviceType;
  }
}

const FrontPage = () => {
  const [typeofJob, setTypeofJob] = useState([]); /// List of Job Type eg. Repaire or Installation
  const [optionService, setOptionService] = useState([]); ///ex. List of Department
  const [optionOffer, setOptionOffer] = useState([]); //ex. List of offer based on selected Department
  const [tableData, setTableData] = useState([]); /// For table,
  const [addWork, setWork] = useState("");
  const [addRequest, setRequest] = useState([]);
  const [selectedTOJ, setselectedTOJ] = useState(); ///Selected Type of job, eg. Repaire
  const [selectedDepartment, setselectedDepartment] = useState(); ///Selected Department eg. Civil
  const [selectedSOffer, setselectedSOffer] = useState(); /// Selected offer
  const [isShown, setShow] = useState(false);

  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getservices.php").then(
      (req) => {
        setOptionService(req.data);
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("http://localhost/JOBREQUEST/api/admin/servicetype.php").then(
      (req) => {
        setTypeofJob(req.data);
      }
    );
  }, []);

  const idtoLabel = () => {
    return optionOffer.filter((e) => e.PK_soID == selectedSOffer);
  };
  const TuggleButton = () => {
    return (
      <Button
        colorScheme="blue"
        variant="solid"
        onClick={() => {
          setShow(!isShown);
          console.log(
            selectedDepartment === undefined || selectedDepartment === ""
          );

          console.log(selectedDepartment);
        }}
      >
        Add
      </Button>
    );
  };
  const updateTable = () => {
    console.log("toinks", selectedDepartment);
    if (
      selectedDepartment === undefined ||
      selectedDepartment === "" ||
      selectedTOJ === "" ||
      selectedTOJ === undefined ||
      selectedSOffer === "" ||
      selectedSOffer === undefined
    ) {
      //if one the selection is empty
      console.log("some of the selection is null");
    } else {
      setRequest((oldArray) => [
        ...oldArray,
        new RequestModel(
          typeofJob.filter((e) => e.PK_workTypeID == selectedTOJ)[0].label,
          optionService.filter(
            (e) => e.PK_servicesID == selectedDepartment
          )[0].name,
          optionOffer.filter((e) => e.PK_soID == selectedSOffer)[0].name
        ),
      ]);
    }
  };

  const Test = () => {
    return optionOffer.length <= 0 ? null : (
      <Select
        variant="filled"
        placeholder="Select type of service"
        value={selectedSOffer}
        onChange={(e) => {
          {
            setselectedSOffer(e.target.value);
          }
        }}
      >
        {optionOffer.map((e, index) => (
          <option value={e.PK_soID} key={index}>
            {e.name}
          </option>
        ))}
      </Select>
    );
  };

  const deleteHundler = (requestModel) => {
    const result = addRequest.filter((e) => requestModel != e);
    setRequest(result);
  };

  const selectServiceHundlerTB = (arg) => {
    if (arg.length > 0) {
      try {
        Axios.get("http://localhost/JOBREQUEST/api/admin/getserviceoffer.php", {
          params: { depid: arg },
        }).then((req) => {
          console.log("this data ", req.data);
          setOptionOffer(req.data);
        });
      } catch {
        console.log("somthings happen when selecting the Department");
      }
    } else {
      setOptionOffer([]);
    }
  };
  const ShowAlert = () => {
    return isShown == false ? null : {};
  };
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100wh"
      height="100vh"
      backgroundColor={"rgb(221, 222, 223)"}
      flexDirection={"column"}
      gap="5"
    >
      <Image boxSize={150} src={logo} alt="Dan Abramov" />
      <Heading>Job Request Form</Heading>
      <Stack
        justifyContent={"center"}
        alignItems="center"
        flexDirection={"column"}
        p="5"
        bg="white"
        borderRadius="10"
        boxShadow="2xl"
        width={"100vh"}
      >
        <Heading as="h1" size="sm">
          Select Type of Work{" "}
        </Heading>
        <ShowAlert />
        <Stack direction={"row"}>
          <Select
            variant="filled"
            placeholder="Select type of service"
            value={selectedTOJ}
            onChange={(e) => {
              {
                setselectedTOJ(e.target.value);
              }
            }}
          >
            {typeofJob.map((e, index) => {
              return (
                <option value={e.PK_workTypeID} key={index}>
                  {e.label}
                </option>
              );
            })}
          </Select>
          <Select
            variant="filled"
            placeholder="Select option"
            value={selectedDepartment}
            onChange={(e) => {
              selectServiceHundlerTB(e.target.value);
              console.log("The selected is ", e.target.value);
              setselectedDepartment(e.target.value);
              console.log(
                "value :",
                e.target.value == "" ? "nothing" : e.target.value
              );
            }}
          >
            {optionService.map((e, index) => {
              return (
                <option value={e.PK_servicesID} key={e.PK_servicesID}>
                  {e.name}
                </option>
              );
            })}
            {/*  */}
          </Select>
          <Test />
        </Stack>
        <Container maxWidth={"container.xxl"}>
          {" "}
          {selectedDepartment && selectedSOffer && selectedTOJ ? (
            <Button
              float={"right"}
              colorScheme="teal"
              variant="solid"
              onClick={() => {
                updateTable();
                console.log(
                  "Table: ",
                  selectedTOJ,
                  selectedDepartment,
                  selectedSOffer
                );
              }}
            >
              Add
            </Button>
          ) : (
            <Button
              disabled
              colorScheme="teal"
              variant="solid"
              float={"right"}
              onClick={() => {
                updateTable();
                console.log(
                  "Table: ",
                  selectedTOJ,
                  selectedDepartment,
                  selectedSOffer
                );
              }}
            >
              Add
            </Button>
          )}
        </Container>
      </Stack>
      <Stack
        justifyContent={"center"}
        alignItems="center"
        flexDirection={"column"}
        p="5"
        bg="white"
        borderRadius="10"
        boxShadow="2xl"
        width={"100vh"}
      >
        <TableContainer width={"100vh"} maxH="40vh" overflowY="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Job to be done</Th>
                <Th>Type of service</Th>
                <Th>Works</Th>
              </Tr>
            </Thead>
            {addRequest.map((e, index) => {
              return (
                <Tablef data={e} key={index} deleteHundler={deleteHundler} />
              );
            })}
          </Table>
        </TableContainer>
        <Container maxWidth={"container.xxl"}>
          {addRequest.length > 0 ? (
            <Link to="../Admin/Dashboard">
              <Button colorScheme={"teal"} float={"right"}>
                Send Request
              </Button>
            </Link>
          ) : null}
        </Container>
      </Stack>
    </Stack>
  );
};

export default FrontPage;
