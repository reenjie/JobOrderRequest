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
function ViewInfo(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closemodal = () => {
    onClose();
    props.closing();
  };
  return (
    <>
      <Button
        onClick={() => {
          onOpen();
        }}
        size={"sm"}
        colorScheme={"cyan"}
        variant={"ghost"}
        fontWeight="normal"
      >
        <i className="fa fa-circle-info"></i>
      </Button>

      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"gray.100"}>
          <ModalCloseButton onClick={props.closing} />
          <ModalBody>
            <Container maxW={"container.xl"}>{props.info}</Container>

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

export default ViewInfo;
