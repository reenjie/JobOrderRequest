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
import "../App.css";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="sidebar-links" id="sblink">
      <Stack mb={3}>
        <Center mt={50}>
          <Avatar
            size="xl"
            name="Christian Nwamba"
            src="https://bit.ly/code-beast"
          />
          <Flex mb={5}>
            <Box ml="3">
              <Text fontWeight="bold" id="username">
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
          <Link to="../Admin/Schools">
            {" "}
            <li>
              <Container>
                <span>
                  {" "}
                  <i className="fas fa-school"></i> Schools
                </span>
              </Container>
            </li>{" "}
          </Link>
          <Link to="../Admin/Pending">
            {" "}
            <li>
              <Container>
                <span>
                  <i className="fas fa-clock"></i> Pending{" "}
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
