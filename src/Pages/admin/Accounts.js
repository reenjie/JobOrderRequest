import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import { Heading, Container } from "@chakra-ui/react";
function RenderPage() {
  return (
    <div>
      {" "}
      <Heading
        size="lg"
        className="title"
        fontSize="20px"
        color={"blackAlpha.700"}
      >
        ACCOUNTS
      </Heading>
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
