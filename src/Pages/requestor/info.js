import React from "react";
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
  InputGroup,
  InputLeftElement,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Th,
  TableCaption,
  TableContainer,
  Badge,
  Progress,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ButtonGroup,
} from "@chakra-ui/react";
import moment from "moment";
function Info(props) {
  return props.myrequest.map((row) => (
    <>
      {row.PK_requestID == props.myID ? (
        <div>
          <Box p={3}>
            <Container maxW={"container.xl"}>
              <Stack>
                <Text color={"blue.600"} fontSize={15}>
                  <i className="fas fa-cogs"></i> {row.label}
                </Text>

                <Box p={5}>
                  <Text color={"blue.400"} fontSize={14} fontWeight={"bold"}>
                    {props.services.map((s) => {
                      if (s.PK_servicesID == row.FK_serviceID) {
                        return s.name;
                      }
                    })}
                  </Text>

                  <Text color={"blackAlpha.600"} fontSize={16}>
                    {props.servicesOffer.map((so) => {
                      if (so.PK_soID == row.FK_serviceOfferID) {
                        return so.name;
                      }
                    })}
                  </Text>
                </Box>

                <Box bg={"orange.50"} mt={10} p={15}>
                  <Text
                    color={"blackAlpha.600"}
                    textTransform={"uppercase"}
                    mb={2}
                    fontWeight={"bold"}
                  >
                    For Approval
                  </Text>

                  <TableContainer>
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>Noted By</Th>
                          <Th>Date</Th>
                          <Th>Time</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr color={"teal.700"}>
                          <Td>{row.noteby ? row.noteby : "N/A"}</Td>
                          <Td>
                            {row.dtapproved
                              ? moment(row.dtapproved).format("MMMM DD,YYYY")
                              : "N/A"}
                          </Td>
                          <Td>
                            {row.dtapproved
                              ? moment(row.dtapproved).format("@hh:mm a")
                              : "N/A"}
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                  {row.status == 0 ? (
                    <>
                      <Text color={"blue.400"}>Status :</Text>
                      <Badge variant="outline" colorScheme="orange">
                        FOR APPROVAL
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Text color={"blue.400"}>Status :</Text>
                      <Badge variant="outline" colorScheme="green">
                        APPROVED
                      </Badge>
                    </>
                  )}
                </Box>

                {row.prioritization ? (
                  <Box bg={"orange.50"} mt={10} p={15}>
                    <Text
                      color={"blackAlpha.600"}
                      textTransform={"uppercase"}
                      mb={2}
                      fontWeight={"bold"}
                    >
                      Assesstment
                    </Text>
                    <Stack>
                      <Text color="blackAlpha.700" fontSize={15}>
                        Prioritization :{" "}
                        <span style={{ color: "#4dadd3" }}>
                          {row.prioritization}
                        </span>
                      </Text>
                      <Text color="blackAlpha.700" fontSize={15}>
                        Type of Repair :{" "}
                        <span style={{ color: "#4dadd3" }}>
                          {row.typeofrepair}
                        </span>
                      </Text>
                      <Text color="blackAlpha.700" fontSize={15}>
                        Recommendation :{" "}
                        <span style={{ color: "#4dadd3" }}>
                          {row.recommendation}
                        </span>
                      </Text>
                      <Text color="blackAlpha.700" fontSize={15}>
                        Materials Needed :{" "}
                        <span style={{ color: "#4dadd3" }}>
                          {row.materials_needed}
                        </span>
                      </Text>
                      <Text color="blackAlpha.700" fontSize={15}>
                        Estimated Unit Cost :{" "}
                        <span style={{ color: "#4dadd3" }}>
                          {row.estimated_unitcost}
                        </span>
                      </Text>
                      <Text color="blackAlpha.700" fontSize={15}>
                        Total Estimated Unit Cost :{" "}
                        <span style={{ color: "#4dadd3" }}>
                          {row.total_estimated_cost}
                        </span>
                      </Text>
                      <Text color="blackAlpha.700" fontSize={15}>
                        Assessed By :{" "}
                        <span style={{ color: "#4dadd3" }}>
                          {row.assessedby}
                        </span>
                      </Text>
                      <Text color="blackAlpha.700" fontSize={15}>
                        Verified By:{" "}
                        <span style={{ color: "#4dadd3" }}>
                          {row.verifiedby}
                        </span>
                      </Text>

                      <Text color="blackAlpha.700" fontSize={15}>
                        Remarks :{" "}
                        <span style={{ color: "#4dadd3" }}>{row.remarks}</span>
                      </Text>
                    </Stack>
                  </Box>
                ) : (
                  ""
                )}

                {row.repairedby ? (
                  <Box bg={"orange.50"} mt={10} p={15}>
                    <Text
                      color={"blackAlpha.600"}
                      mb={2}
                      textTransform={"uppercase"}
                      fontWeight={"bold"}
                    >
                      Accomplishment
                    </Text>

                    <TableContainer>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>Date and Time Started</Th>
                            <Th>Date and Time Finished</Th>
                            <Th>Repaired By</Th>
                            <Th>Remarks</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr color={"teal.700"}>
                            <Td>Dennis Falcasantos</Td>
                            <Td>sept 23 2022</Td>
                            <Td>1:27 pm</Td>
                            <Td>Dennis Falcasantos</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                ) : (
                  ""
                )}

                <Box p={5} mt={10}>
                  <Button variant={"outline"} colorScheme="facebook" size="sm">
                    Print
                    <i
                      className="fas fa-file-pdf"
                      style={{ marginLeft: "5px" }}
                    ></i>
                  </Button>
                </Box>
              </Stack>
            </Container>
          </Box>
        </div>
      ) : (
        ""
      )}
    </>
  ));
}

export default Info;
