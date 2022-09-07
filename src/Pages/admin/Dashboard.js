import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import { Heading, Container } from "@chakra-ui/react";
import Headings from "../../components/layouts/heading";
function RenderPage() {
  return (
    <div>
      <Headings title="DASHBOARD" />
      <Container mt={10} maxW="2xxl"></Container>
    </div>
  );
}

function Dashboard(props) {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar selected={props.selected} />}
        Page_Contents={<RenderPage />}
      />
    </>
  );
}

export default Dashboard;
