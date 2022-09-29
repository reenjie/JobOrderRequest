import "../../css/App.css";
import {
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  useDisclosure,
  Button,
  Box,
  Center,
  Stack,
  Image,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Avatar,
  Text,
  Flex,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import Loading from "../loading";
import { style } from "@mui/system";
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
function AdminLayout(props) {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 50);
  });
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
        </span>

        <div id="leftprofile">
          <Menu>
            <MenuButton
              backgroundColor={"transparent"}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
              as={Button}
              rightIcon={
                <i
                  className="fas fa-chevron-right"
                  style={{
                    backgroundColor: "rgba(221, 131, 142, 0.72)",
                    color: "white",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(226, 90, 107, 0.72)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor =
                      "rgba(221, 131, 142, 0.72)";
                  }}
                ></i>
              }
            >
              <Box>
                <Flex>
                  <Avatar
                    size="sm"
                    name="Christian Nwamba"
                    src="https://bit.ly/code-beast"
                    mt={2}
                    width={10}
                    height={10}
                    mb={2}
                    border={"1px"}
                    borderColor={"teal.700"}
                  />
                  <Box color={"teal.700"} fontSize={13} ml={1} mt={5}>
                    Reenjay Caimor
                  </Box>
                </Flex>{" "}
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <i
                  className="fas fa-user-cog"
                  style={{ color: "gray", marginRight: "5px" }}
                ></i>{" "}
                Account
              </MenuItem>
              <MenuItem>
                {" "}
                <i
                  className="fas fa-user-lock"
                  style={{ color: "gray", marginRight: "5px" }}
                ></i>{" "}
                Change Password
              </MenuItem>
              <MenuItem>
                {" "}
                <i
                  className="fas fa-right-from-bracket"
                  style={{ color: "gray", marginRight: "5px" }}
                ></i>{" "}
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <div className="Wrap" id="wrap">
        <div id="mainPage">
          {isLoading ? <Loading /> : <>{props.Page_Contents}</>}
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
