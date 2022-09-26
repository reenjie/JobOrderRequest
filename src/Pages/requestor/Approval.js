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
  Image,
  Center,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Axios from "axios";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import url from "../../config";
import swal from "sweetalert";
function Approval(props) {
  return (
    <div>
      <Box p={[4, 8, 10]}>
        <Box bg={"gray.100"} p={10}>
          TO DO
        </Box>
      </Box>
    </div>
  );
}

export default Approval;
