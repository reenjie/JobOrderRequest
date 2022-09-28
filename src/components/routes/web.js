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
import A_Services from "../../Pages/assessor/Services";
import A_Status from "../../Pages/assessor/Status";
import R_Dashboard from "../../Pages/requestor/Dashboard";
import R_Request from "../../Pages/requestor/Request";
import R_Accomplished from "../../Pages/requestor/Accomplished";
import R_History from "../../Pages/requestor/History";
import Servicesoffer from "../../Pages/admin/Servicesoffer";
import Add_User from "../../Pages/admin/Add_User";
import Update_User from "../../Pages/admin/Update_User";
import Worktype from "../../Pages/admin/Worktype";
<<<<<<< HEAD
import FrontPage from "../../Pages/frontpage/FrontPage";
=======
import NotFound from "../../Pages/NotFound";
>>>>>>> c4eeb9c66a5d1ba64304df20b3c04ad7981340ea
export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* Landing Page */}
        <Route exact path="/" element={<FrontPage />} />
=======
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<App />} />
>>>>>>> c4eeb9c66a5d1ba64304df20b3c04ad7981340ea
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/*  ADMINISTRATOR   */}
        <Route path="Admin/Dashboard" element={<Dashboard />} />
        <Route path="Admin/Department" element={<Department />} />
        <Route path="Admin/Services" element={<Services />} />
        <Route path="Admin/Accounts" element={<Accounts />} />
        <Route path="Admin/Accounts/Add/New/User" element={<Add_User />} />
        <Route
          path="Admin/Services/Servicesoffer/:serviceid/Manage-ServicesOffers/:servicename"
          element={<Servicesoffer />}
        />
        <Route
          path="Admin/Accounts/Update/:userid/User"
          element={<Update_User />}
        />

        <Route path="/Admin/Services/WorkTypes" element={<Worktype />} />

        {/*  ASSESSOR  */}
        <Route path="Assessor/Dashboard" element={<A_Dashboard />} />
        <Route path="Assessor/Request" element={<A_Request />} />
        <Route path="Assessor/Status" element={<A_Status />} />
        <Route path="Assessor/Services" element={<A_Services />} />

        {/*  REQUESTOR  */}

        <Route path="Dashboard" element={<R_Dashboard />} />
        <Route path="Request" element={<R_Request />} />
        <Route path="Accomplished" element={<R_Accomplished />} />
        <Route path="History" element={<R_History />} />
      </Routes>
    </BrowserRouter>
  );
}
