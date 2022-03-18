import * as Bootstrap from "react-bootstrap"
import { Link } from "react-router-dom"
import "./StyleDash/style.css"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from 'sweetalert2'


function Registerpage(){
    const [Firstname,setFirstname] = useState([])
    const [Lastname,setLastname] = useState([])
    const [Phone,setPhone] = useState([])
    const [Email,setEmail] = useState([])
    const [Password,setPassword] = useState([])
    const [ConfirmPass,setConfirmPass] = useState([])
    // Validation
    const [MatchPass,setMatchPass] = useState([])
    const [CheckPhone,setCheckPhone] = useState([])
    const [UniqueEmail,setUniqueEmail] = useState([])
    // get Email api
    const [DataEmail,setDataEmail] = useState([])

    useEffect(()=>{
        fetchEmail()
    },[])

    const fetchEmail = async()=>{
        await axios.get("http://localhost:5000/unique").then((res)=>{
            setDataEmail(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const Validation = () =>{
        var IsVal = true
        if(Password !== ConfirmPass){
            setMatchPass("รหัสผ่านไม่ตรงกัน!! โปรดระบุใหม่")
            IsVal = false
        }
        if(!MapEmail()){
            setUniqueEmail("มีข้อมูล Email นี้อยู่แล้ว โปรดระบุ Email ใหม่")
            IsVal = false
        }
        if(!Phone.match(/^[0-9]+$/)){
            setCheckPhone("กรุณาระบุเบอร์โทรศัพท์ให้ถูกต้อง")
            IsVal = false
        }
        return IsVal
    }

    const MapEmail = () =>{
        var EmailStatus = true
        DataEmail.forEach((e)=>{
            const email = e.email
            if(email === Email){
                EmailStatus = false
            }
        })
        return EmailStatus
    }

    const SubmitForm=(e)=>{
        e.preventDefault()
        if(Validation()){
            axios.post("http://localhost:5000/register",{
                firstname:Firstname,
                lastname:Lastname,
                phone:Phone,
                email:Email,
                password:Password,
                c_password:ConfirmPass
            }).then((res)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                }).then(()=>{
                    window.location="/login"
                })
            }).catch((err)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.err,
                })
            })
        }
    }
    return(
        <>
            <Bootstrap.Container className="d-flex justify-content-center py-5">
                <Bootstrap.Card className="col-8">
                    <Bootstrap.Card.Body className="m-5">
                        <form method="post" onSubmit={SubmitForm}>
                            <div className="text-center">
                                <h2><b>สมัครสมาชิก</b></h2>
                                <p>หากเป็นสมาชิกแล้ว <Link to="/login"><b><u>เข้าสู่ระบบ</u></b></Link></p>
                            </div>
                            <div className="form-group my-3">
                                <label>ชื่อ <span className="text-danger">*</span></label>
                                <input type="text" name="firstname" className="form-control" placeholder="กรุณากรอกชื่อ" 
                                onChange={(e)=>{
                                        setFirstname(e.target.value)
                                }} required/>
                            </div>
                            <div className="form-group my-3">
                                <label>นามสกุล <span className="text-danger">*</span></label>
                                <input type="text" name="lastname" className="form-control" placeholder="กรุณากรอกนามสกุล" 
                                onChange={(e)=>{
                                        setLastname(e.target.value)
                                }} required/>
                            </div>
                            <div className="form-group my-3">
                                <label>โทรศัพท์ <span className="text-danger">*</span></label>
                                <input type="text" name="phone" maxLength={10} className="form-control" placeholder="กรุณากรอกเบอร์โทรศัพท์" 
                                onChange={(e)=>{
                                        setPhone(e.target.value)
                                        setCheckPhone("")
                                }} required/>
                                <span className="text-danger text-xs">{CheckPhone}</span>
                            </div>
                            <div className="form-group my-3">
                                <label>Email <span className="text-danger">*</span></label>
                                <input type="email" name="email" className="form-control" placeholder="กรุณากรอก Email" 
                                onChange={(e)=>{
                                        setEmail(e.target.value)
                                        setUniqueEmail("")
                                        fetchEmail()
                                }} required/>
                                <span className="text-danger text-xs">{UniqueEmail}</span>
                            </div>
                            <div className="form-group my-3">
                                <label>Password <span className="text-danger">*</span></label>
                                <input type="password" name="password" className="form-control" placeholder="กรุณากรอกรหัสผ่าน" onChange={(e)=>{
                                        setPassword(e.target.value)
                                        setMatchPass("")
                                }}  required/>
                                <span className="text-danger text-xs">{MatchPass}</span>
                            </div>
                            <div className="form-group my-3">
                                <label>ยืนยัน Password <span className="text-danger">*</span></label>
                                <input type="password" name="c_password" className="form-control" placeholder="กรุณากรอกยืนยันรหัสผ่าน" 
                                onChange={(e)=>{
                                        setConfirmPass(e.target.value)
                                        setMatchPass("")
                                }} required/>
                                <span className="text-danger text-xs">{MatchPass}</span>
                            </div>
                            <div className="text-center mt-3">
                                <Bootstrap.Button type="submit" className="btn btn-dark">สมัครสมาชิก</Bootstrap.Button>
                            </div>
                        </form>
                    </Bootstrap.Card.Body>
                </Bootstrap.Card>
            </Bootstrap.Container>
        </>
    )
}
export default Registerpage