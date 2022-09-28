import "../../css/App.css";
import {
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  useDisclosure,
  Button,
  Box,
  Flex,
  Avatar,
  Stack,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import "../../css/App.css";
import { useState, useEffect } from "react";
function AdminLayout(props) {
  const [open, setOpen] = useState("open");

  function handleClick() {
    const sb = document.getElementById("sideBar");
    const sblink = document.getElementById("sblink");
    const mainwrap = document.getElementById("wrap");
    const togglebtn = document.getElementById("btnopen_close");

    const wsize = sb.offsetWidth;

    if (wsize == 240) {
      sb.style.width = "0";
      sblink.style.display = "none";
      mainwrap.style.marginLeft = "0px";
      togglebtn.style.marginLeft = "0px";
    } else {
      sb.style.width = "240px";
      sblink.style.display = "block";
      mainwrap.style.marginLeft = "240px";
      togglebtn.style.marginLeft = "240px";
    }
  }
  return (
    <>
      <div id="sideBar">{props.Sidebar_elements}</div>
      <div className="topbar">
        <button
          id="btnopen_close"
          colorScheme="teal"
          variant="outline"
          value="changeicon"
          zIndex="100"
          onClick={handleClick}
        >
          <HamburgerIcon id="humicon" />
        </button>
        <span className="title" style={{ fontWeight: "bold", color: "gray" }}>
          {props.Page_title}

          <span
            id="profile"
            style={{
              position: "relative",
              float: "right",
              marginRight: "15px",
            }}
          >
            {/*  <Stack>
              <Spacer />
              
            </Stack> */}

            <Menu shadow="xl">
              <MenuButton
              //as={Button}
              >
                <Flex>
                  <Avatar
                    mt={1}
                    size="sm"
                    name="Christian Nwamba"
                    src="https://bit.ly/code-beast"
                    borderColor={"whiteAlpha.600"}
                    borderWidth={2}
                    width={10}
                    height={10}
                  />
                  <span
                    style={{
                      position: "relative",
                      top: "15px",
                      marginLeft: "2px",
                      fontWeight: "normal",
                      fontSize: "14px",
                      color: "#434b46",
                    }}
                  >
                    {" "}
                    Caimor Reenjay{" "}
                    <ChevronDownIcon
                      color="whiteAlpha.800"
                      backgroundColor={"blue.300"}
                      width={5}
                      height={5}
                      borderRadius={5}
                      id="btndropdown"
                    />
                  </span>
                </Flex>
              </MenuButton>

              <MenuList>
                <MenuItem>
                  {" "}
                  <i className="fas fa-user-circle"></i>
                  <Text fontSize="sm" ml={1}>
                    Manage Account
                  </Text>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <i className="fas fa-lock"></i>
                  <Text fontSize="sm" ml={1}>
                    Change Password
                  </Text>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <i className="fas fa-power-off"></i>
                  <Text fontSize="sm" ml={1}>
                    Logout
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </span>
        </span>
      </div>
      <div className="Wrap" id="wrap">
        <div id="mainPage">{props.Page_Contents}</div>
      </div>
    </>
  );
}

export default AdminLayout;
