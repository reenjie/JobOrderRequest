import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import { Heading, Container } from "@chakra-ui/react";
function RenderPage() {
  return (
    <div>
      <Heading
        size="lg"
        className="title"
        fontSize="20px"
        color={"blackAlpha.700"}
      >
        DASHBOARD
      </Heading>

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
