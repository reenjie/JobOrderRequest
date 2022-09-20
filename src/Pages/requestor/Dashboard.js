import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";

function RenderPage() {
  return <></>;
}

function R_Dashboard() {
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

export default R_Dashboard;
