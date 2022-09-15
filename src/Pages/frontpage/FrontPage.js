import React, { Component, useState, useEffect, Fragment } from "react";
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
  Textarea,
  Heading,
  Checkbox,
  Stack,
  Select,
  Button,
  Spacer,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tr,
  Input,
  Th,
  Td,
  TableCaption,
  Container,
  Image,
  Icon,
  FormControl,
  FormLabel,
  Text,
  FormErrorMessage,
  FormHelperText,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Edit_Modal from "../../components/layouts/edit_modal";

const FrontPage = () => {
  ////Fetch Data save to this local var
  const [typeofJob, setTypeofJob] = useState([]); /// List of Job Type eg. Repaire or Installation
  const [optionService, setOptionService] = useState([]); ///ex. List of Department
  const [optionOffer, setOptionOffer] = useState([]); //ex. List of offer based on selected Department

  const [defRequestData, setDefRequestData] = useState([]); ///Local Variable for default table ROW for NON OTHERS or NON SERIAL
  const [isOthersRequestData, setOthersRequestData] = useState([]); //Local Variable for Others request
  const [hasNumRequestData, sethasNumRequestData] = useState([]); //Local Variable for Request has Serial and Model Number

  const [selectedTOJ, setselectedTOJ] = useState(); ///Selected Type of job, eg. Repaire
  const [selectedDepartment, setselectedDepartment] = useState(); ///Selected Department eg. Civil
  const [selectedSOffer, setselectedSOffer] = useState(); /// Selected offer

  const [isShown, setShow] = useState(false); //if checkBox selected || for TextBox view
  const [isEleMech, setEleMech] = useState(); ////
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState([]);
  const [checkedBox, setCheckedBox] = React.useState(false); //// CheckBOx
  const [tableData, setTableData] = useState([]); /// For table,
  const [addWork, setWork] = useState("");

  // const TypeOfWork = ["New Installation/Fabrication", "Repair/Renovation"];

  const TableComposition = (props) => {};

  const Tablef = (props) => {
    return props.data == "" ? (
      "Choose Type of work"
    ) : (
      <Tbody>
        <Tr>
          <Td>
            <Box>{props.data.jobType}</Box>
            {/* <Box>
              <Edit_Modal
                btnTitle="ADD"
                title="Add Services  "
                mbody={Tex}
              />
              <Box as="span" color="gray.600" fontSize="sm">
                Details
              </Box>
            </Box> */}
          </Td>
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

  class DefRequestModel {
    constructor(jobType, serviceDepartment, serviceType) {
      this.jobType = jobType;
      this.serviceDepartment = serviceDepartment;
      this.serviceType = serviceType;
    }
  }

  console.log(new DefRequestModel());
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

  ////CheckBox
  function CheckBoxHundler() {
    return (
      <Checkbox
        isChecked={checkedBox}
        onChange={(e) => {
          setCheckedBox(e.target.checked);
        }}
      >
        Others
      </Checkbox>
    );
  }

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
      setDefRequestData((oldArray) => [
        ...oldArray,
        new DefRequestModel(
          typeofJob.filter((e) => e.PK_workTypeID == selectedTOJ)[0].label,
          //selectedTOJ,
          optionService.filter(
            (e) => e.PK_servicesID == selectedDepartment
          )[0].name,
          optionOffer.filter((e) => e.PK_soID == selectedSOffer)[0].name
        ),
      ]);
    }
  };

  //hundle text area.. OTHERS
  function TextBox() {
    let [value, setValue] = React.useState("");

    let handleInputChange = (e) => {
      let inputValue = e.target.value;
      setValue(inputValue);
    };
    return (
      <>
        {/* <Text mb="8px">Value: {value}</Text> */}
        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder="Complaints/Observations/Descriptions: (Kindly specify in details if possible)"
          size="sm"
          maxHeight={"200"}
        />
      </>
    );
  }
  const SelectedDepartment = () => {
    return optionOffer.length <= 0 ? null : (
      <Select
        isDisabled={checkedBox}
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

  ////Image Upload
  const UploadAndDisplayImage = () => {
    return (
      <Flex flexDirection={"row"}>
        {selectedImage && (
          <div>
            <img
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <br />
        <br />
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </Flex>
    );
  };

  const FormDetails = (props) => {
    return (
      <FormControl isDisabled={!isEleMech}>
        <FormLabel>{props.name}</FormLabel>
        <Input placeholder={props.placeholder} />
      </FormControl>
    );
  };

  const deleteHundler = (requestModel) => {
    const result = defRequestData.filter((e) => requestModel != e);
    setDefRequestData(result);
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
    <React.Fragment>
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
          <Flex direction={"row"} gap={6}>
            <Box w="100%">
              {/* <Select
                variant="filled"
                placeholder="Select type of service"
                value={selectedTOJ}
                onChange={(e) => {
                  {
                    setselectedTOJ(e.target.value);
                  }
                }}
              >
                {TypeOfWork.map((e, index) => {
                  return (
                    <option value={e} key={index}>
                      {e}
                    </option>
                  );
                })}
              </Select> */}
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
            </Box>
            <Box w="100%">
              <Select
                isDisabled={checkedBox}
                variant="filled"
                placeholder="Select option"
                value={selectedDepartment}
                onChange={(e) => {
                  selectServiceHundlerTB(e.target.value);
                  console.log("The selected is ", e.target.value);
                  setselectedDepartment(e.target.value);
                  setEleMech(e.target.value == 2 || e.target.value == 3);
                  setselectedSOffer("");
                  console.log(
                    "On changed Data  ",
                    selectedTOJ,
                    selectedDepartment,
                    selectedSOffer
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
              <Center>
                <CheckBoxHundler />
              </Center>
            </Box>
            <Box w="100%">
              <SelectedDepartment />
            </Box>
          </Flex>

          {/* text input */}
          {checkedBox === false ? null : <TextBox />}
          <Divider borderColor={"red"} w="80vh" p={2} />
          <Stack direction={"row"} pt={2}>
            <FormDetails placeholder={"123456"} name={"Serial No"} />
            <FormDetails placeholder={"abc123"} name={"Model No"} />
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
          <UploadAndDisplayImage />
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
            <Table size="sm" variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Job to be done</Th>
                  <Th>Type of service</Th>
                  <Th>Works</Th>
                </Tr>
              </Thead>
              {defRequestData.map((e, index) => {
                //Render Datas to be submit
                return (
                  <Tablef data={e} key={index} deleteHundler={deleteHundler} />
                );
              })}
            </Table>
          </TableContainer>
          <Container maxWidth={"container.xxl"}>
            {defRequestData.length > 0 ? (
              <Link to="../Admin/Dashboard">
                <Button colorScheme={"teal"} float={"right"}>
                  Send Request
                </Button>
              </Link>
            ) : null}
          </Container>
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

export default FrontPage;
