import axios from "axios";
import { useEffect , useState } from "react";
import * as Bootstrap from "react-bootstrap"
import { Link } from "react-router-dom"
import Swal from "sweetalert2";



function LayoutNav(){
    var token = localStorage.getItem('token')
    useEffect(()=>{
        if(token !== null){
            const Authen=()=>{
                axios.post('http://localhost:5000/authen',{
                    header:{
                        'authorization':token
                    }
                }).then((res)=>{
                }).catch((err)=>{
                    localStorage.removeItem('token')
                    localStorage.removeItem('email')
                    localStorage.removeItem('id')
                    CheckAuthen()
                })
            }
            Authen()
        }
        const CheckAuthen = ()=>{
            if(token){
                setIsLogin(true)
                setDefault(false)
            }
        }
        CheckAuthen()
    },[token])

    const [IsLogin,setIsLogin] = useState(false)
    const [Default,setDefault] = useState(true)

    const Logout =()=>{
        localStorage.clear()
        Swal.fire({
            icon: 'success',
            title: "ออกจากระบบเรียบร้อยแล้ว",
        }).then(()=>{
            window.location="/"
        })
    }

    return(
        <Bootstrap.Navbar bg="light" expand="lg">
        <Bootstrap.Container>
            <Bootstrap.Navbar.Brand href="/"><img className="image-logo" src={window.location.origin + '/Image/Logo/Logo.png'} alt="logo"/></Bootstrap.Navbar.Brand>
            <Bootstrap.Navbar.Toggle aria-controls="NavCollapse" />
            <Bootstrap.Navbar.Collapse id="NavCollapse">
                <Bootstrap.Nav className="mx-auto">
                    <Link to="/" className="nav-link">หน้าหลัก</Link>
                    <Bootstrap.NavDropdown title="หมวดหมู่สินค้า" id="DropDown">
                        <Bootstrap.NavDropdown.Item>
                            <Link to="/" className="dropdown-item">หน้าหลัก</Link>
                        </Bootstrap.NavDropdown.Item>
                    </Bootstrap.NavDropdown>
                    <Link to="#" className="nav-link">ร้านค้า</Link>
                </Bootstrap.Nav>
                <Bootstrap.Nav className="mr-auto">
                    {Default && (<Link to="/register" className="nav-link">สมัครสมาชิก</Link>)}
                    {Default && (<Link to="/login" className="nav-link">เข้าสู่ระบบ</Link>)}
                    {IsLogin && (<Link to="/profile/" className="nav-link">บัญชีผู้ใช้งาน</Link>)}
                    {IsLogin && (<Link to="#" onClick={Logout} className="nav-link">ออกจากระบบ</Link>)}
                </Bootstrap.Nav>
            </Bootstrap.Navbar.Collapse>
        </Bootstrap.Container>
        </Bootstrap.Navbar>
    )
}
export default LayoutNav