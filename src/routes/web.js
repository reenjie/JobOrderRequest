import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from '../App';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from "../admin/Dashboard";

export default function Routing() {
    return (
                <BrowserRouter>
                 <Routes>
                <Route path="/" element={<App />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                {/*  ADMINISTRATOR   */}
                <Route path="Admin/Dashboard" element={<Dashboard />} />


                </Routes>
                </BrowserRouter>

    );

}