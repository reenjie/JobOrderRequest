import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Center,
  Container,
  Badge,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Avatar,
  Box,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import moment from "moment";
function HistoryModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closemodal = () => {
    onClose();
  };

  createTheme(
    "Jobrequest",
    {
      text: {
        primary: "#565c5f",
        secondary: "#2aa198",
      },
      background: {
        default: "transparent",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#c0e1ed",
      },
      action: {
        button: "red",
        hover: "rgba(0,0,0,.08)",
        disabled: "red",
      },
    },
    "dark"
  );

  const customStyles = {
    rows: {
      style: {
        minHeight: "20px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "5px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "15px",
        color: "#53737f",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        height: "50px",
      },
    },
    pagination: {
      style: {
        color: "#3686a3",
      },
      pageButtonsStyle: {
        borderRadius: "50%",
        height: "40px",
        width: "40px",
        padding: "8px",
        margin: "px",
        cursor: "pointer",
        transition: "0.4s",

        backgroundColor: "#78b6cc",

        "&:hover:not(:disabled)": {
          backgroundColor: "#88c1d6",
        },
        "&:focus": {
          outline: "none",
          backgroundColor: "yellow",
          color: "red",
        },
      },
    },
  };

  const defaultcolumns = props.usertype
    ? [
        {
          name: "Type of Work",
          selector: (row) => (
            <>
              <Text
                color={"teal.600"}
                fontSize={14}
                textTransform="uppercase"
                userSelect={"text"}
              >
                {row.label}
              </Text>
            </>
          ),
        },
        {
          name: "Work",
          selector: (row) => (
            <>
              {props.typeofwork.map((so) => {
                if (so.PK_soID == row.FK_serviceOfferID) {
                  return (
                    <Text
                      color={"teal.600"}
                      fontSize={14}
                      textTransform="uppercase"
                      userSelect={"text"}
                    >
                      {so.name}
                    </Text>
                  );
                }
              })}
              {row.others}
            </>
          ),
        },

        {
          name: "Date Accomplished",
          selector: (row) => (
            <>{moment(row.dt_accomplished).format("@hh:mm a MMMM DD,YYYY")}</>
          ),
        },

        {
          name: "Status",
          selector: (row) => (
            <>
              <Badge colorScheme="green">Accomplished</Badge>
            </>
          ),
        },
      ]
    : [
        {
          name: "Request",
          selector: (row) => (
            <>
              <Text
                color={"teal.600"}
                fontSize={14}
                textTransform="uppercase"
                userSelect={"text"}
              >
                {row.firstname} {row.lastname}
                <br />
                <span style={{ fontSize: "12px", textTransform: "lowercase" }}>
                  {row.email} #{row.contact_no}
                </span>
              </Text>
            </>
          ),
        },
        {
          name: "Type of Work",
          selector: (row) => (
            <>
              <Text
                color={"teal.600"}
                fontSize={14}
                textTransform="uppercase"
                userSelect={"text"}
              >
                {row.label}
              </Text>
            </>
          ),
        },
        {
          name: "Work",
          selector: (row) => (
            <>
              {props.typeofwork.map((so) => {
                if (so.PK_soID == row.FK_serviceOfferID) {
                  return (
                    <Text
                      color={"teal.600"}
                      fontSize={14}
                      textTransform="uppercase"
                      userSelect={"text"}
                    >
                      {so.name}
                    </Text>
                  );
                }
              })}
              {row.others}
            </>
          ),
        },

        {
          name: "Date Accomplished",
          selector: (row) => (
            <>{moment(row.dt_accomplished).format("@hh:mm a MMMM DD,YYYY")}</>
          ),
        },

        {
          name: "Status",
          selector: (row) => (
            <>
              <Badge colorScheme="green">Accomplished</Badge>
            </>
          ),
        },
      ];

  const [filterText, setFilterText] = useState("");
  const filteredItems = props.requestsaccomplished.filter(
    (item) =>
      item.lastname.toLowerCase().includes(filterText.toLowerCase()) ||
      item.firstname.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email.toLowerCase().includes(filterText.toLowerCase())
  );
  /*  */
  return (
    <>
      <Button
        size={"sm"}
        padding={1}
        color="blackAlpha.600"
        variant="outline"
        onClick={() => {
          onOpen();
        }}
      >
        {props.BtnName}
      </Button>

      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"gray.100"}>
          <ModalCloseButton />
          <ModalBody>
            <Container maxW={"container.lg"} p={10} mt={10}>
              <Heading mb={2} fontSize={25}>
                Accomplished Job Orders
              </Heading>

              {props.usertype ? (
                props.users.map((row) => {
                  if (row.PK_userID == props.usertype) {
                    return (
                      <>
                        <Flex p={10}>
                          <Avatar
                            size="xl"
                            name={row.firstname + " " + row.lastname}
                            src={""}
                            mb={2}
                          />

                          <Box ml="10" userSelect={"text"}>
                            <Text
                              fontWeight="bold"
                              textTransform={"uppercase"}
                              color={"blackAlpha.700"}
                            >
                              {row.firstname + " " + row.lastname}
                              <br />
                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "normal",
                                  textTransform: "lowercase",
                                }}
                              >
                                {row.email}
                              </span>
                              <br />
                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "normal",
                                  userSelect: "",
                                }}
                              >
                                #{row.contact_no}
                              </span>
                              <br />
                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "normal",
                                  userSelect: "",
                                }}
                              >
                                {row.specialty}
                                <br />
                                {row.position}
                              </span>
                              <Text
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "bold",
                                }}
                                color={"teal.500"}
                              >
                                {/*     {department.map((dep) => {
                                    if (
                                      dep.PK_departmentID == row.FK_departmentID
                                    ) {
                                      return <>{dep.dept_name}</>;
                                    }
                                  })} */}
                              </Text>
                            </Text>
                          </Box>
                        </Flex>
                      </>
                    );
                  }
                })
              ) : (
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.500" />}
                  />

                  <Input
                    placeholder="Filter By Name , Email"
                    defaultValue={filterText}
                    fontSize={14}
                    width={350}
                    variant="filled"
                    autoFocus
                    onChange={(e) => {
                      setFilterText(e.target.value);
                    }}
                  />
                </InputGroup>
              )}
              <DataTable
                columns={defaultcolumns}
                data={filteredItems}
                // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1

                // subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                theme="Jobrequest"
                customStyles={customStyles}
                pagination
              />
            </Container>
            <Button
              id="btnManageModalClose"
              display={"none"}
              colorScheme="blue"
              mr={3}
              onClick={closemodal}
            >
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default HistoryModal;
