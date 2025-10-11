import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Views/Login/Login.jsx";
import MainPages from "../Views/MainPages/MainPages.jsx";
import Layout from "../Layouts/Layout.jsx";
import Setting from "../Views/MainPages/Settings/Setting.jsx";
import Accounts from "../Views/MainPages/Accounts/accounts.jsx";
import Forgot_Password from "../Views/Login/Forgot_password.jsx";
import DeviceManager from "../Views/MainPages/DeviceManager/DeviceManager.jsx";
import UserRegistration from "../Views/MainPages/Registration_Approve/UserRegistration.jsx";
import History_active from "../Views/MainPages/History_Active/History_active_page.jsx"
import Reports from "../Views/MainPages/Report/Report_page.jsx"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element ={<Login/>}/>
            <Route path="/forgot_password" element ={<Forgot_Password/>}/>

            <Route path="/" element ={<Layout/>}>
                <Route path="/homepage" element ={<MainPages/>}/>
                <Route path="/accounts" element ={<Accounts/>}/>

                
                <Route path="/deviceManager" element ={<DeviceManager/>}/>
                <Route path="/userRegistration" element ={<UserRegistration/>}/>
                <Route path="/history" element ={<History_active/>}/>
                <Route path="/reports" element ={<Reports/>}/>
                <Route path="/settings" element ={<Setting/>}/>
            </Route>
        </Routes>
    );
}

export default AppRouter;