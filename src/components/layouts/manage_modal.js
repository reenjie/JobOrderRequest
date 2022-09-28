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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
function ManageModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closemodal = () => {
    onClose();
    props.closing();
  };
  return (
    <>
      <Button
        size={"sm"}
        padding={1}
        colorScheme="facebook"
        color="gray.500"
        variant="outline"
        onClick={() => {
          onOpen();
        }}
      >
        Manage{" "}
        <i className="fas fa-list-check" style={{ marginLeft: "2px" }}></i>
      </Button>

      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"gray.100"}>
          <ModalCloseButton onClick={props.closing} />
          <ModalBody>
            <Container maxW={"container.lg"}>{props.info}</Container>
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

export default ManageModal;
