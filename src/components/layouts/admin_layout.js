import "../../css/App.css";
import {
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function handleClick() {
  const sb = document.getElementById("sideBar");
  const sblink = document.getElementById("sblink");
  const mainwrap = document.getElementById("wrap");
  const togglebtn = document.getElementById("btnopen_close");

  const wsize = sb.offsetWidth;
  if (wsize == 280) {
    sb.style.width = "0";
    sblink.style.display = "none";
    mainwrap.style.marginLeft = "20px";
    togglebtn.style.marginLeft = "20px";
  } else {
    sb.style.width = "280px";
    sblink.style.display = "block";
    mainwrap.style.marginLeft = "300px";
    togglebtn.style.marginLeft = "280px";
  }
}
function AdminLayout(props) {
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
      </div>
      <div className="Wrap" id="wrap">
        <div id="mainPage">{props.Page_Contents}</div>
      </div>
    </>
  );
}

export default AdminLayout;
