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
import logo from "../../images/zcmc_logo.png";

function Sidebar(props) {
  return (
    <div className="sidebar-links" id="sblink">
      <Stack mb={3}>
        {/* zcmc_logo */}
        <Center>
          {" "}
          <Stack>
            <Center>
              <Image boxSize="50px" mt={5} src={logo} alt="ZCMC LOGO" />
            </Center>
            <Text fontSize="sm" ml={2} mt={2} color={"teal.700"}>
              Zamboanga City Medical Center
            </Text>
          </Stack>
        </Center>

        <Center bg={"blackAlpha.300"}>
          <Avatar
            size="xl"
            name="Christian Nwamba"
            src="https://bit.ly/code-beast"
            mt={2}
            mb={2}
          />
          <Flex mb={5} mt={2}>
            <Box ml="3">
              <Text fontWeight="bold" color={"blackAlpha.700"}>
                Caimor Reenjay
              </Text>
              <Text fontSize="xs" id="usertype">
                Administrator
              </Text>
            </Box>
          </Flex>
        </Center>

        <Menu>
          <MenuButton
            textAlign={"right"}
            fontSize={13}
            variant="link"
            as={Button}
            paddingRight="15px"
          >
            PROFILE
          </MenuButton>
          <MenuList
            bg={"gray.300"}
            color="grey"
            fontSize={14}
            letterSpacing="10px"
            id="menulist"
          >
            <MenuItem>
              <i className="fas fa-user-circle"></i>
              <Text fontSize="sm" ml={2}>
                Manage Account
              </Text>
            </MenuItem>
            <MenuItem>
              <i className="fas fa-lock"></i>
              <Text fontSize="sm" ml={2}>
                Change Password
              </Text>
            </MenuItem>
            <MenuItem>
              <i className="fas fa-door-open"></i>
              <Text fontSize="sm" ml={2}>
                Logout
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>

      <Divider />

      <Stack direction="row" mb="1">
        <ul>
          <Text ml={10} color="teal" as={"em"} fontSize="xs">
            REPORTS
          </Text>
          <Link to="../Admin/Dashboard">
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

          <Link to="../Admin/Department">
            {" "}
            <li>
              <Container>
                <span>
                  {" "}
                  <i className="fas fa-building"></i> Department
                </span>
              </Container>
            </li>{" "}
          </Link>

          <Link to="../Admin/Services">
            {" "}
            <li>
              <Container>
                <span>
                  <i className="fas fa-cogs"></i> Services{" "}
                </span>
              </Container>
            </li>{" "}
          </Link>

          <Link to="../Admin/Accounts">
            {" "}
            <li>
              <Container>
                <span>
                  <i className="fas fa-users"></i> Accounts{" "}
                  <Badge ml="1" colorScheme="green">
                    New
                  </Badge>{" "}
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
