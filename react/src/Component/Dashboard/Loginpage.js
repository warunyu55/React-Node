import * as Bootstrap from "react-bootstrap"
import { Link } from "react-router-dom"
import "./StyleDash/style.css"
import { useState } from 'react'
import Axios from 'axios'
import Swal from "sweetalert2"


function Loginpage(){
    const [Email,setEmail] = useState([])
    const [Password,setPassword] = useState([])

    const LoginForm = (e)=>{
        e.preventDefault()
        Axios.post("http://localhost:5000/login",{
            email:Email,
            password:Password
        }).then((res)=>{
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("email",res.data.email)
            localStorage.setItem("id",res.data.id)
            Swal.fire({
                icon: 'success',
                title: res.data.message,
            }).then(()=>{
                window.location="/"
            })
        }).catch((err)=>{
              Swal.fire({
                icon: 'error',
                title: err.response.data.err,
            })
        })   
    }
    return(
        <>
            <Bootstrap.Container className="d-flex justify-content-center py-5">
                <Bootstrap.Card className="col-8">
                    <Bootstrap.Card.Body className="m-5">
                        <form onSubmit={LoginForm}>
                            <div className="text-center">
                                <h2><b>เข้าสู่ระบบ</b></h2>
                                <p>ยังไม่ได้เป็นสมาชิก ? <Link to="/register"><b><u>สมัครสมาชิก</u></b></Link></p>
                            </div>
                            <div className="form-group my-3">
                                <label>Email <span className="text-danger">*</span></label>
                                <input type="text" name="email" className="form-control" placeholder="กรุณากรอก Email" onChange={(e)=>{
                                    setEmail(e.target.value)
                                }}/>
                            </div>
                            <div className="form-group my-3">
                                <label>Password <span className="text-danger">*</span></label>
                                <input type="password" name="password" className="form-control" placeholder="กรุณากรอกรหัสผ่าน" onChange={(e)=>{
                                    setPassword(e.target.value)
                                }} />
                            </div>
                            <div className="text-center mt-3">
                                <Bootstrap.Button className="btn btn-dark" type="submit">เข้าสู่ระบบ</Bootstrap.Button>
                            </div>
                        </form>
                    </Bootstrap.Card.Body>
                </Bootstrap.Card>
            </Bootstrap.Container>
        </>
    )
}
export default Loginpage
