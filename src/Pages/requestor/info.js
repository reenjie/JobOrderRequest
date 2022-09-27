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
  Avatar,
  Image,
} from "@chakra-ui/react";
import moment from "moment";
import logo from "../../images/zcmc_logo.png";
function Info(props) {
  return props.myrequest.map((row) => (
    <>
      {row.PK_requestID == props.myID ? (
        <div>
          <Box p={3}>
            <Container maxW={"container.xl"}>
              <Stack direction={"row"}>
                <Text color="blackAlpha.700" fontSize={15}>
                  <span style={{ color: "#4dadd3" }}>
                    <Box p={4}>
                      <Flex>
                        <Image
                          boxSize="60px"
                          h={"auto"}
                          src={logo}
                          alt="zcmc_logo"
                        />
                        <Box
                          ml={2}
                          color={"blackAlpha.600"}
                          fontSize={17}
                          fontWeight="bold"
                          mt={5}
                        >
                          JOB ORDER REQUEST
                        </Box>
                      </Flex>
                    </Box>
                  </span>
                </Text>
                <Spacer />
                {props.unset && (
                  <Box>
                    <Text color="blackAlpha.700" float={"right"} fontSize={15}>
                      Requested By :{" "}
                      <span style={{ color: "#4dadd3" }}>
                        {props.users.map((e) => {
                          if (e.PK_userID == row.FK_userID) {
                            return (
                              <>
                                <Box p={4}>
                                  <Flex>
                                    <Avatar
                                      name="Dan Abrahmov"
                                      src="https://bit.ly/dan-abramov"
                                      size={"md"}
                                    />
                                    <Box ml={5}>
                                      {e.firstname + " " + e.lastname}
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "12px",
                                        }}
                                      >
                                        {" "}
                                        {e.email}
                                        <br />
                                        {e.contact_no}
                                      </span>
                                    </Box>
                                  </Flex>
                                </Box>
                              </>
                            );
                          }
                        })}
                      </span>
                    </Text>
                  </Box>
                )}
              </Stack>

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
                          <Td>{row.notedby ? row.notedby : "N/A"}</Td>
                          <Td>
                            {row.dtapproved
                              ? moment(row.dtapproved).format("MMM DD,YYYY")
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
                      {row.status == 5 ? (
                        <>
                          {" "}
                          <Text color={"blue.400"}>Remarks :</Text>
                          {row.disapproved_remarks}
                          <Text color={"blue.400"}>Status :</Text>
                          <Badge variant="outline" colorScheme="red">
                            DISAPPROVED
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

                    <Text
                      color={"blackAlpha.700"}
                      fontSize={13}
                      float={["", "", "", "right"]}
                    >
                      Date-Assessed:{" "}
                      {moment(row.dt_assessed).format("@hh:mm a MMM DD,YYYY")}
                    </Text>
                    <Text color="blackAlpha.700" fontSize={15}>
                      Assessed By :{" "}
                      <span style={{ color: "#4dadd3" }}>
                        {props.users.map((e) => {
                          if (e.PK_userID == row.assessedby) {
                            return (
                              <>
                                <Box p={4}>
                                  <Flex>
                                    <Avatar
                                      name="Dan Abrahmov"
                                      src="https://bit.ly/dan-abramov"
                                      size={"md"}
                                    />
                                    <Box ml={5}>
                                      {e.firstname + " " + e.lastname}
                                      <br />
                                      <span
                                        style={{
                                          fontSize: "12px",
                                        }}
                                      >
                                        {" "}
                                        {e.email}
                                        <br />
                                        {e.contact_no}
                                      </span>
                                    </Box>
                                  </Flex>
                                </Box>
                              </>
                            );
                          }
                        })}
                      </span>
                    </Text>
                    <Text color="blackAlpha.700" ml={5} fontSize={15} mb={2}>
                      TIME FRAME: <br />
                      <span style={{ color: "#4dadd3" }}>
                        {row.tf_years == 0 ? (
                          ""
                        ) : (
                          <>
                            {row.tf_years} Year/s
                            <br />
                          </>
                        )}
                        {row.tf_months == 0 ? (
                          ""
                        ) : (
                          <>
                            {row.tf_months} Month/s <br />
                          </>
                        )}
                        {row.tf_weeks == 0 ? (
                          ""
                        ) : (
                          <>
                            {row.tf_weeks} Week/s <br />
                          </>
                        )}
                        {row.tf_days == 0 ? (
                          ""
                        ) : (
                          <>
                            {row.tf_days} Day/s <br />
                          </>
                        )}
                      </span>
                    </Text>

                    <TableContainer>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>Prioritization</Th>
                            <Th>Type of Repair</Th>
                            <Th>Recommendation</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr color={"teal.700"}>
                            <Td color="#4dadd3"> {row.prioritization}</Td>
                            <Td color="#4dadd3">{row.typeofrepair}</Td>
                            <Td color="#4dadd3">{row.recommendation}</Td>
                          </Tr>
                        </Tbody>
                        <Thead>
                          <br />
                        </Thead>
                        {
                          (row.materials_needed,
                          row.estimated_unitcost,
                          row.total_estimated_cost ? (
                            <>
                              <Thead>
                                <Tr>
                                  <Th>Materials Needed</Th>
                                  <Th>Estimated Unit Cost</Th>
                                  <Th>Total Estimated Unit Cost</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                <Tr color={"teal.700"}>
                                  <Td color="#4dadd3">
                                    {" "}
                                    {row.materials_needed}
                                  </Td>
                                  <Td color="#4dadd3">
                                    {" "}
                                    {row.estimated_unitcost}
                                  </Td>
                                  <Td color="#4dadd3">
                                    {" "}
                                    {row.total_estimated_cost}
                                  </Td>
                                </Tr>
                              </Tbody>
                            </>
                          ) : (
                            ""
                          ))
                        }
                      </Table>
                    </TableContainer>
                    <Stack>
                      {row.verifiedby && (
                        <Text color="blackAlpha.700" fontSize={15}>
                          Verified By:{" "}
                          <span style={{ color: "#4dadd3" }}>
                            {row.verifiedby}
                          </span>
                        </Text>
                      )}

                      {row.remarks && (
                        <Text color="blackAlpha.700" mt={4} fontSize={15}>
                          Remarks :{" "}
                          <span style={{ color: "#4dadd3" }}>
                            {row.remarks}
                          </span>
                        </Text>
                      )}
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
                            <Th> Date and Time Started</Th>
                            <Th>Date and Time Finished</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr color={"teal.700"}>
                            <Td>
                              {" "}
                              {moment(row.dtstart).format(
                                "@hh:mm a MMM DD,YYYY"
                              )}
                            </Td>
                            <Td>
                              {moment(row.dtend).format("@hh:mm a MMM DD,YYYY")}
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>

                    <Text color="blackAlpha.700" fontSize={15}>
                      Repaired By:
                      <span style={{ color: "#4dadd3", marginLeft: "5px" }}>
                        {row.repairedby}
                      </span>
                    </Text>
                    <Text color="blackAlpha.700" fontSize={15}>
                      Remarks:
                      <span style={{ color: "#4dadd3", marginLeft: "5px" }}>
                        {row.accomplishment_remarks}
                      </span>
                    </Text>
                  </Box>
                ) : (
                  ""
                )}

                {props.load ? (
                  ""
                ) : props.unset ? (
                  ""
                ) : (
                  <Box p={5} mt={10}>
                    <Button
                      variant={"outline"}
                      colorScheme="facebook"
                      size="sm"
                    >
                      Print
                      <i
                        className="fas fa-file-pdf"
                        style={{ marginLeft: "5px" }}
                      ></i>
                    </Button>
                  </Box>
                )}
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
