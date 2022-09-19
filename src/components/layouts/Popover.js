import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

function PopoverComponent(props) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  if (props.confirm == "ever") {
    console.log("closenow");
  }
  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button
            onClick={onToggle}
            variant={"outline"}
            borderColor={"blackAlpha.400"}
            size="sm"
            colorScheme={props.BtnColor}
          >
            {" "}
            {props.btntitle}
          </Button>
        </PopoverTrigger>
        <PopoverContent textAlign="left">
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>{props.message}</PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline" id="closePopover" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={props.Confirm}
                colorScheme={props.BtnColor}
                size={"sm"}
                variant={"outline"}
                data-id={props.PassId}
              >
                Yes
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default PopoverComponent;
