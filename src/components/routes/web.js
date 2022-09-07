import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../../Pages/App";
import Login from "../../Pages/auth/Login";
import Register from "../../Pages/auth/Register";
import Dashboard from "../../Pages/admin/Dashboard";
import Department from "../../Pages/admin/Department";
import Services from "../../Pages/admin/Services";
import Accounts from "../../Pages/admin/Accounts";
import A_Dashboard from "../../Pages/assessor/Dashboard";
import A_Request from "../../Pages/assessor/Request";
import A_Requesters from "../../Pages/assessor/Requesters";
import A_Accounts from "../../Pages/assessor/Accounts";
import A_Status from "../../Pages/assessor/Status";
import R_Dashboard from "../../Pages/requestor/Dashboard";
import R_Request from "../../Pages/requestor/Request";
import R_Accomplished from "../../Pages/requestor/Accomplished";
import R_History from "../../Pages/requestor/History";

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/*  ADMINISTRATOR   */}
        <Route path="Admin/Dashboard" element={<Dashboard />} />
        <Route path="Admin/Department" element={<Department />} />
        <Route path="Admin/Services" element={<Services />} />
        <Route path="Admin/Accounts" element={<Accounts />} />

        {/*  ASSESSOR  */}
        <Route path="Assessor/Dashboard" element={<A_Dashboard />} />
        <Route path="Assessor/Request" element={<A_Request />} />
        <Route path="Assessor/Status" element={<A_Status />} />
        <Route path="Assessor/Requesters" element={<A_Requesters />} />
        <Route path="Assessor/Accounts" element={<A_Accounts />} />

        {/*  REQUESTOR  */}

        <Route path="Dashboard" element={<R_Dashboard />} />
        <Route path="Request" element={<R_Request />} />
        <Route path="Accomplished" element={<R_Accomplished />} />
        <Route path="History" element={<R_History />} />
      </Routes>
    </BrowserRouter>
  );
}
