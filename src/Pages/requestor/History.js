import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";

function RenderPage() {
  return <div>Requestor history</div>;
}

function R_History() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
      />
    </>
  );
}

export default R_History;
