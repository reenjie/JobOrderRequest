import { Heading } from "@chakra-ui/react";
export default function Headings(props) {
  return (
    <Heading
      size="lg"
      className="title"
      fontSize="18px"
      color={"blackAlpha.700"}
    >
      {props.title}
    </Heading>
  );
}
