import {
  Stack,
  Flex,
  Center,
  Text,
  Square,
  Image,
  Divider,
  Spacer,
  Avatar,
  Box,
  Badge,
  Container,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import "../../css/App.css";
import { Link } from "react-router-dom";
import Zcmc_info from "../../components/layouts/info";
function Sidebar() {
  return (
    <div className="sidebar-links" id="sblink">
      {/* zcmc_logo */}
      <Zcmc_info usertype="requestor" />

      <Divider />

      <Stack direction="row" mb="1">
        <ul>
          <Text ml={10} color="teal" as={"em"} fontSize="xs">
            REPORTS
          </Text>
          <Link to="../Dashboard">
            <li>
              <Container>
                {" "}
                <span>
                  {" "}
                  <i className="fas fa-dashboard"></i> Dashboard
                </span>
              </Container>
            </li>{" "}
          </Link>

          <Text ml={10} color="teal" as={"em"} fontSize="xs">
            MANAGE
          </Text>

          <Link to="../Request">
            {" "}
            <li>
              <Container>
                <span>
                  {" "}
                  <i className="fas fa-share"></i> Request
                  <Badge ml="1" colorScheme="green">
                    Alert
                  </Badge>
                </span>
              </Container>
            </li>{" "}
          </Link>

          <Link to="../Accomplished">
            {" "}
            <li>
              <Container>
                <span>
                  <i className="fas fa-check-circle"></i> Accomplished
                  <Badge ml="1" colorScheme="green">
                    New
                  </Badge>{" "}
                </span>
              </Container>
            </li>{" "}
          </Link>

          <Link to="../History">
            {" "}
            <li>
              <Container>
                <span>
                  <i className="fas fa-clock"></i> History{" "}
                </span>
              </Container>
            </li>{" "}
          </Link>
        </ul>
      </Stack>
    </div>
  );
}
export default Sidebar;
