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
  Tooltip,
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
      <Tooltip
        label="View Info"
        aria-label="A tooltip"
        bg={"gray.100"}
        placement="top-end"
      >
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
      </Tooltip>

      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"gray.100"} />
        <ModalContent bg={"gray.100"} shadow="none">
          <ModalCloseButton onClick={props.closing} />
          <ModalBody>
            <Container maxW={["container.xl", "container.xxl", "container.xl"]}>
              {props.info}
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

export default ViewInfo;
