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
import Axios from "axios";
import React, { useEffect, useState } from "react";

function Sidebar(props) {
  const [alerto, setAlerto] = useState();
  useEffect(() => {
    Axios.post("http://localhost/JOBREQUEST/api/admin/getNewUsers.php").then(
      (req) => {
        setAlerto(req.data.length);
      }
    );
  }, []);
  return (
    <div className="sidebar-links" id="sblink">
      <Zcmc_info usertype="admin" />
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
                  {props.alerto >= 1 && (
                    <Badge ml="1" colorScheme="green">
                      New
                    </Badge>
                  )}
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
