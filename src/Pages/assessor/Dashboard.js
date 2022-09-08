import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import Headings from "../../components/layouts/heading";
function RenderPage() {
  return (
    <>
      <Headings title="DASHBOARD" />
    </>
  );
}

function A_Dashboard() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
      />
    </>
  );
}

export default A_Dashboard;
