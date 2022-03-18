import Homepage from "./Homepage";
import Footer from "./Layout/Footer";
import LayoutNav from "./Layout/LayoutNav";
import "./StyleDash/style.css"
import {Routes,Route} from "react-router-dom"
import Registerpage from "./Registerpage";
import Loginpage from "./Loginpage";
import Profilepage from "./Profilepage";
import PageNotFound from "../PageNotFound";


function Defaultpage(){
    return(
        <>
            <div className="pages">
                <LayoutNav/>
                <Routes>
                    <Route path="/" exact element={<Homepage/>}/>
                    <Route path="/login" element={<Loginpage/>}/>
                    <Route path="/register" element={<Registerpage/>}/>
                    <Route path="/profile/*" element={<Profilepage/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    )
}
export default Defaultpage