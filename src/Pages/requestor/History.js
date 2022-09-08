import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import Headings from "../../components/layouts/heading";
function RenderPage() {
  return (
    <>
      <Headings title="HISTORY" />
    </>
  );
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
