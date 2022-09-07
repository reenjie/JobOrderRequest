import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import { Heading, Container } from "@chakra-ui/react";
import Headings from "../../components/layouts/heading";
function RenderPage() {
  return (
    <div>
      {" "}
      <Headings title="SERVICES" />
      <Container mt={10} maxW="2xxl"></Container>
    </div>
  );
}

function Services() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
      />
    </>
  );
}

export default Services;
