import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";

function RenderPage() {
  return <div>Accounts Assessor</div>;
}

function A_Accounts() {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar />}
        Page_Contents={<RenderPage />}
      />
    </>
  );
}

export default A_Accounts;
