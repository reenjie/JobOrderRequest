import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import Headings from "../../components/layouts/heading";
import "../../css/App.css";
function RenderPage() {
  return <></>;
}

function A_Dashboard() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
        Page_title="DASHBOARD"
      />
    </>
  );
}

export default A_Dashboard;
