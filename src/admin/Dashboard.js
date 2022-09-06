import AdminLayout from "../layouts/admin_layout";
import Sidebar from "./Sidebar";

function RenderPage() {
  return <div>asdaasdasds</div>;
}

function Dashboard() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
      />
    </>
  );
}

export default Dashboard;
