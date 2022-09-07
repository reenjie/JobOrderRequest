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
  AvatarBadge,
} from "@chakra-ui/react";
import "../../css/App.css";
import { Link } from "react-router-dom";
import Zcmc_info from "../../components/layouts/info";
function Sidebar() {
  return (
    <div className="sidebar-links" id="sblink">
      <Zcmc_info usertype="assessor" />
      <Divider />
      <Stack direction="row" mb="1">
        <ul>
          <Text ml={10} color="teal" as={"em"} fontSize="xs">
            REPORTS
          </Text>
          <Link to="../Assessor/Dashboard">
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

          <Link to="../Assessor/Request">
            {" "}
            <li>
              <Container>
                <span>
                  {" "}
                  <i className="fas fa-share"></i> Request
                  <Badge ml="1" colorScheme="green">
                    New
                  </Badge>
                </span>
              </Container>
            </li>{" "}
          </Link>

          <Text ml={10} color="teal" as={"em"} fontSize="xs">
            MANAGE
          </Text>

          <Link to="../Assessor/Status">
            {" "}
            <li>
              <Container>
                <span>
                  <i className="fas fa-tools"></i> Job-Status{" "}
                </span>
              </Container>
            </li>{" "}
          </Link>

          <Link to="../Assessor/Requesters">
            {" "}
            <li>
              <Container>
                <span>
                  <i className="fas fa-list"></i> Requesters{" "}
                </span>
              </Container>
            </li>{" "}
          </Link>

          <Link to="../Assessor/Accounts">
            {" "}
            <li>
              <Container>
                <span>
                  <i className="fas fa-users"></i> Accounts{" "}
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
