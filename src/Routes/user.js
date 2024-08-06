import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage";
import Tripspage from "../pages/tripspage";
import Tripdetail from "../pages/tripdetail";
import Signup from "../pages/signup";
import Otp from "../pages/otp";
import Signin from "../pages/signin";
import Tripbooking from "../pages/tripbooking";
import Trippayment from "../pages/trippayment";
import ProtectedRoute from "./protected";
import Success from "../pages/success";
import Failed from "../pages/failed";

const UserRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/otp/verify" element={<Otp/>}/>
            <Route path="/trips" element={<Tripspage/>}/>
            <Route path="/tripdetail/:id" element={<Tripdetail/>}/>
            <Route element={<ProtectedRoute/>}>
            <Route path="/trip-booking" element={<Tripbooking/>}/>
            <Route path="/trip-payment" element={<Trippayment/>}/>
            <Route path="/checkout-success" element={<Success/>}/>
            <Route path="/checkout-failed" element={<Failed/>} />
            </Route>
        </Routes>
    )
}

export default UserRoutes