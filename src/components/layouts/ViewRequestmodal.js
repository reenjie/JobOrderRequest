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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
function ViewRequestmodal(props) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        <i className="fa fa-ellipsis-v"></i>
      </Button>

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent backgroundColor={"transparent"} shadow="none">
          <ModalCloseButton color={"white"} fontSize="25px" />
          <ModalBody>{props.Data}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ViewRequestmodal;
