import React, { Component, useState, useEffect, Fragment, Lorem } from "react";
import * as _ from "@chakra-ui/react";
import logo from "../../images/zcmc_logo.png";
import Axios from "axios";
import { DeleteIcon, ListIcon, AttachmentIcon } from "@chakra-ui/icons";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid,
  GridItem,
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Textarea,
  Heading,
  Checkbox,
  Stack,
  Select,
  Badge,
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormHelperText,
  Center,
  UnorderedList,
  ListItem,
  Wrap,
  others,
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
  const [selectedFile, setSelectedFile] = useState();

  const [serialNumber, setSerialNumber] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [data, setData] = useState([]); //datas

  const [checkedBox, setCheckedBox] = useState(false); //// CheckBOx
  const [tableData, setTableData] = useState([]); /// For table,
  const [selIsSM, setSelIsSM] = useState();

  let [values, setValues] = React.useState("");

  //const { isOpen, onOpen, onClose } = useDisclosure();

  ////OBSERVE
  const [others, setOthers] = useState(isShown);

  // const TypeOfWork = ["New Installation/Fabrication", "Repair/Renovation"];

  const TableComposition = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // 1 if dfault
    //2 if has serial number
    //3 data is other
    /////////////////////diferent table components
    //if other
    //if data has serial
    //if data is Def
    if (props.data.type == 1) {
      return <IsDefaultTableRow data={props} />;
    } else if (props.data.type == 3) {
      return <IsOthersRow data={props} />;
    } else if (props.data.type == 2) {
      return <HasSerMoTableRow data={props} />;
      //console.log("the datas are: ", props.data);
    }
  };

  const DetailModal = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Button onClick={onOpen}>Description</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Lorem count={2} /> */}
              {/* {props.body} */}
              <Box padding={"10"}>
                <Text>{props.desciption}</Text>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              {/* <Button variant="ghost">Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  ////TABLE ROW FOR ISOTHERS
  const IsOthersRow = (props) => {
    return (
      <Tr>
        <Td>
          <Heading as={"sm"} size="sm">
            {props.data.data.jobTypeName}
            {props.data.data.File.length <= 0 ? null : (
              <Badge bg="teal.100" ml="2" color={"blackAlpha"} p={1}>
                <Icon as={AttachmentIcon} mr="1" />
                {props.data.data.File.length}
              </Badge>
            )}
          </Heading>
          <Accordion allowToggle colSpan={3}>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                  <Box flex="1" textAlign="left">
                    Details
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <UnorderedList>
                  <ListItem
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    <Badge borderRadius="full" px="1" colorScheme="teal">
                      Serial Number
                    </Badge>
                    {props.data.data.serialNumber} &bull;{" "}
                    <Badge borderRadius="full" px="1" colorScheme="teal">
                      Model Number
                    </Badge>
                    {props.data.data.modelNumber}
                  </ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Td>
        <Td textAlign={"Center"} noOfLines={1} colSpan={"2"}>
          <DetailModal
            title={"Description"}
            desciption={props.data.data.desciption}
          />
          {/* <Popover>
            <PopoverTrigger>
              <Button>OTHERS</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Details:</PopoverHeader>
              <PopoverBody bg={"teal.700"} color={"white"} fontSize={"xs"}>
                {props.data.data.desciption}
              </PopoverBody>
            </PopoverContent>
          </Popover> */}
          {/* // <DetailModal title={"Details"} body={props.data.data.desciption} /> */}
        </Td>
        <Td></Td>
        <Td>
          <Button
            colorScheme="red"
            variant="ghost"
            size={"sm"}
            onClick={() => {
              deleteHundler(props.data);
            }}
          >
            <DeleteIcon />
          </Button>
        </Td>
      </Tr>
    );
  };
  const IsDefaultTableRow = (props) => {
    return (
      <Tr>
        <Td>
          {
            <Heading as={"sm"} size="sm">
              {
                typeofJob.filter(
                  (e) => e.PK_workTypeID == props.data.data.jobType
                )[0].label
              }
              {props.data.data.File.length <= 0 ? null : (
                <Badge bg="teal.100" ml="2" color={"blackAlpha"} p={1}>
                  <Icon as={AttachmentIcon} mr="1" />
                  {props.data.data.File.length}
                </Badge>
              )}
            </Heading>
          }
        </Td>
        <Td>
          {
            optionService.filter(
              (e) => e.PK_servicesID == props.data.data.serviceDepartment
            )[0].name
          }
        </Td>
        <Td>{props.data.data.serviceTypeName}</Td>
        <Td>
          <Button
            colorScheme="red"
            variant="ghost"
            size={"sm"}
            onClick={() => {
              deleteHundler(props.data);
              console.log("to delete :", data);
            }}
          >
            <DeleteIcon />
          </Button>
        </Td>
      </Tr>
    );
  };
  const HasSerMoTableRow = (props) => {
    return (
      <Tr>
        <Td>
          <Heading as={"sm"} size="sm">
            {
              typeofJob.filter(
                (e) => e.PK_workTypeID == props.data.data.jobType
              )[0].label
            }
            {props.data.data.File.length <= 0 ? null : (
              <Badge bg="teal.100" ml="2" color={"blackAlpha"} p={1}>
                <Icon as={AttachmentIcon} mr="1" />
                {props.data.data.File.length}
              </Badge>
            )}
          </Heading>
          <Accordion allowToggle colSpan={3}>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                  <Box flex="1" textAlign="left">
                    Details
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <UnorderedList>
                  <ListItem
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {props.data.data.serialNumber}
                  </ListItem>
                  <ListItem
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {props.data.data.modelNumber}
                  </ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Td>
        <Td>{props.data.data.serviceDepartmentName}</Td>
        <Td>{props.data.data.serviceTypeName}</Td>
        <Td>
          <Button
            colorScheme="red"
            variant="ghost"
            size={"sm"}
            onClick={() => {
              deleteHundler(props.data);
            }}
          >
            <DeleteIcon />
          </Button>
        </Td>
      </Tr>
    );
  };
  const Tablef = (props) => {
    return props.data == "" ? (
      "Choose Type of work"
    ) : (
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
    );
  };

  class OthersModel {
    constructor(jobType, serialNumber, modelNumber, desciption, File) {
      this.type = 3;
      this.jobType = jobType;
      this.jobTypeName = typeofJob.filter(
        (e) => e.PK_workTypeID == jobType
      )[0].label;
      this.serialNumber = serialNumber || undefined;
      this.modelNumber = modelNumber || undefined;
      this.desciption = desciption;
      this.File = File || "";
    }
  }

  class DefRequestModel {
    constructor(jobType, serviceDepartment, serviceType, File) {
      this.type = 1;
      this.jobType = jobType;
      this.serviceDepartment = serviceDepartment;
      this.serviceTypeName = optionOffer.filter(
        (e) => e.PK_soID == serviceType
      )[0].name;
      this.serviceType = serviceType;
      this.File = File || "";
    }
  }

  class hasNumberModel {
    constructor(
      jobType,
      serviceDepartment,
      serviceType,
      serialNumber,
      modelNumber,
      File
    ) {
      this.type = 2;
      this.jobType = jobType;
      this.serviceDepartment = serviceDepartment;
      this.serviceType = serviceType;

      this.serviceDepartmentName = optionService.filter(
        (e) => e.PK_servicesID == serviceDepartment
      )[0].name;

      this.serialNumber = serialNumber;
      this.modelNumber = modelNumber;
      this.serviceTypeName = optionOffer.filter(
        (e) => e.PK_soID == this.serviceType
      )[0].name;
      this.File = File || "";
    }
  }

  //console.log(new DefRequestModel());
  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/request/getservices.php").then(
      (req) => {
        setOptionService(req.data);
        console.log(req.data);
      }
    );
  }, []);
  useEffect(() => {
    Axios.get("http://localhost/JOBREQUEST/api/request/servicetype.php").then(
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
  const CheckBoxHundler = () => {
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
  };
  ///////////////////////temppppppppplate!
  const updateTable = (props) => {
    console.log("toinks", selectedDepartment);
    //if one the selection is empty
    console.log("some of the selection is null");

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
  };

  //hundle text area.. OTHERS
  const TextBox = () => {
    let handleInputChange = (e) => {
      let inputValue = e.target.value;
      setValues(inputValue);
    };
    return (
      <>
        <Text mb="8px">Value: {values}</Text>
        <Textarea
          value={values}
          onChange={(e) => {
            let inputValue = e.target.value;
            setValues(inputValue);
          }}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
      </>
    );
  };
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
          className="form-control"
          multiple
          name="file"
          onChange={
            (event) => {
              console.log(event.target.files);
              setSelectedFile(event.target.files);
            }
            // this.handleInputChange
          }
        />
      </Flex>
    );
  };

  const FormDetails = (props) => {
    return (
      <FormControl isDisabled={isEleMech || checkedBox ? false : true}>
        <FormLabel>{props.name}</FormLabel>
        <Input
          value={props.value}
          onChange={(e) => {
            props.theNumber(e.target.value);
          }}
          placeholder={props.placeholder}
        />
      </FormControl>
    );
  };

  const deleteHundler = (toDelete) => {
    console.log("deleted :", toDelete.data);
    const result = data.filter((e) => toDelete.data != e);
    setData(result);
  };

  const checkIfSelectedisSM = (arg) => {
    // console.log(
    //   "LOGGGGG",
    //   optionService.filter((e) => e.PK_servicesID == arg)[0].name,
    //   ":  ",
    //   optionService.filter((e) => e.PK_servicesID == arg)[0].isSM
    // );
    setSelIsSM(optionService.filter((e) => e.PK_servicesID == arg)[0].isSM);
  };

  const selectServiceHundlerTB = (arg) => {
    if (arg.length > 0) {
      try {
        Axios.get(
          "http://localhost/JOBREQUEST/api/request/getserviceoffer.php",
          {
            params: { depid: arg },
          }
        ).then((req) => {
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

  const fetchService = (arg) => {
    ////fetch data for filling the column table

    try {
      Axios.get("http://localhost/JOBREQUEST/api/request/getserviceoffer.php", {
        params: { depid: arg },
      }).then((req) => {
        console.log("this data ", req.data);
        //setOptionOffer(req.data);
      });
    } catch {
      console.log("somthings happen when selecting the Department");
    }
  };
  const ShowAlert = () => {
    return isShown == false ? null : {};
  };

  const TextBoxHundler = () => {
    return (
      <>
        <Text mb="8px">Value: {values}</Text>
        <Textarea
          value={values}
          onChange={(e) => {
            let inputValue = e.target.value;
            setValues(inputValue);
          }}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
      </>
    );
  };
  return (
    <React.Fragment>
      <Stack
        justifyContent="center"
        alignItems="center"
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
          width="95vw"
          maxW={"900"}
        >
          <Heading as="h1" size="sm">
            Select Type of Work{" "}
          </Heading>
          <ShowAlert />
          <Flex direction={["column", "row"]} gap={6}>
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
                  //console.log("The selected is ", e.target.value);
                  setselectedDepartment(e.target.value);
                  //setEleMech(e.target.value == 2 || e.target.value == 3);
                  // setEleMech(()=>{
                  checkIfSelectedisSM(e.target.value);
                  // });
                  setEleMech(
                    optionService.find((ex) => {
                      return ex.PK_servicesID == e.target.value;
                    }).isSM == 1
                  );
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
          {checkedBox === false ? null : (
            <>
              <Textarea
                value={values}
                onChange={(e) => {
                  let inputValue = e.target.value;
                  setValues(inputValue);
                }}
                placeholder="Here is a sample placeholder"
                size="sm"
              />
            </>
          )}

          <Divider borderColor={"red"} w="60vw" p={2} maxW={"700"} />
          <Stack direction={["column", "row"]} pt={2}>
            <FormControl isDisabled={isEleMech || checkedBox ? false : true}>
              <FormLabel>Serial number</FormLabel>
              <Input
                value={serialNumber}
                onChange={(e) => {
                  setSerialNumber(e.target.value);
                }}
                placeholder="Model No here"
              />
            </FormControl>
            <FormControl isDisabled={isEleMech || checkedBox ? false : true}>
              <FormLabel>Model number</FormLabel>
              <Input
                value={modelNumber}
                onChange={(e) => {
                  setModelNumber(e.target.value);
                }}
                placeholder="Model No here"
              />
            </FormControl>
          </Stack>
          <Container maxWidth={"container.xxl"}>
            {" "}
            {(selectedDepartment && selectedSOffer && selectedTOJ) ||
            checkedBox ? (
              <Button
                float={"right"}
                colorScheme="teal"
                variant="solid"
                onClick={() => {
                  ///find out what type of selection does the user selected
                  if (checkedBox) {
                    //saving data for details(if any) and description |new instalation ^|  Descriptions  |

                    setData((oldArray) => [
                      ...oldArray,
                      new OthersModel(
                        selectedTOJ,
                        serialNumber,
                        modelNumber,
                        values || "",
                        selectedFile
                      ),
                    ]);
                    //console.log("DEBUG FOR SAVE: ISOTHERS ", resultTemp);
                    console.log(
                      "the datas inside the data variable is : ",
                      data
                    );
                  } else if (selIsSM == 1 && !checkedBox) {
                    //// If selection should have serial and model   |  sample ^      | sample | sample |
                    setData((oldArray) => [
                      ...oldArray,
                      new hasNumberModel(
                        selectedTOJ,
                        selectedDepartment,
                        selectedSOffer,
                        serialNumber,
                        modelNumber,
                        selectedFile
                      ),
                    ]);
                    console.log("DEBUG FOR SAVE: IS NORMAL");
                    console.log(
                      "the datas inside the data variable is : ",
                      data
                    );
                    console.log("DEBUG FOR SAVE: HAS NUMBER");
                  } else if (selIsSM == 0) {
                    //Default table
                    setData((oldArray) => [
                      ...oldArray,
                      new DefRequestModel(
                        selectedTOJ,
                        selectedDepartment,
                        selectedSOffer,
                        selectedFile
                      ),
                    ]);
                    console.log("DEBUG FOR SAVE: IS NORMAL");
                    console.log(
                      "the datas inside the data variable is : ",
                      data
                    );
                  } else {
                    console.log("duhhhhhhh");
                  }
                  setSelectedFile("");
                  ////fill the classmodel based on the type of data and save at the local variable
                  ///update the table and render it later
                  //updateTable();
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
                  console.log("PLease select");
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
          width={"95vw"}
          maxW={"900"}
        >
          <TableContainer width={"100vh"} maxH="40vh" overflowY={"scroll"}>
            <Table size="md" variant="simple" colorScheme="teal">
              <TableCaption>Request Table</TableCaption>
              <Thead>
                <Tr>
                  <Th>
                    <Heading fontSize={"14"}>Type of Work</Heading>
                  </Th>
                  <Th>
                    <Heading fontSize={"14"}>Department</Heading>
                  </Th>
                  <Th>
                    <Heading fontSize={"14"}>Type of Work</Heading>
                  </Th>
                  <Th>
                    <Heading fontSize={"14"}>Action</Heading>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* {defRequestData.map((e, index) => {
                  //Render Datas to be submit
                  TableComposition(e);
                  return (
                    <TableComposition
                      data={e}
                      key={index}
                      deleteHundler={deleteHundler}
                    />
                  );
                })} */}
                {data.map((e) => {
                  return <TableComposition data={e} />;
                })}
                {/* //<TableComposition title="sample2" desciption={"aaaaaaaasample"} /> */}
                {/* <IsOthersRow />
                <IsDefaultTableRow />
                <HasSerMoTableRow /> */}
              </Tbody>
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
