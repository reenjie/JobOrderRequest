import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import { Heading, Container } from "@chakra-ui/react";
import Headings from "../../components/layouts/heading";
function RenderPage() {
  return (
    <div>
      {" "}
      <Headings title="ACCOUNT" />
      <Container mt={10} maxW="2xxl"></Container>
    </div>
  );
}

function Accounts() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
      />
    </>
  );
}

export default Accounts;
