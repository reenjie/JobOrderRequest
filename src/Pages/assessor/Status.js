import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";

function RenderPage() {
  return <div>Job Status Assessor</div>;
}

function A_Status() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
      />
    </>
  );
}

export default A_Status;
