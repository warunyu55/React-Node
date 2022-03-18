import SlideBar from "./Profile/SlideBar"
import * as Bootstrap from "react-bootstrap"
import EditProfile from "./Profile/EditProfile"
import {Routes,Route} from 'react-router-dom'
import EditPassword from "./Profile/EditPassword"

function Profilepage(){
    return(
        <>
            <Bootstrap.Container>
                <Bootstrap.Row className="my-2">
                    <SlideBar/>
                    <Routes>
                        <Route exact path="/" element={<EditProfile/>} />
                        <Route path="/password" element={<EditPassword/>} />
                    </Routes>
                </Bootstrap.Row>
            </Bootstrap.Container>
        </>
    )
}
export default Profilepage