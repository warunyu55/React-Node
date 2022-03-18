import { useState,useEffect } from "react"
import * as Bootstrap from "react-bootstrap"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

function Footer(){
    useEffect(()=>{
        CheckAuthen()
    },[])
    const CheckAuthen = ()=>{
        const token = localStorage.getItem('token')
        if(token){
            setIsLogin(true)
            setDefault(false)
        }
    }
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
        <div className="mt-auto">
        <hr/>
            <Bootstrap.Container>
                <Bootstrap.Row className="d-flex flex-wrap justify-content-between mx-3">
                    <Bootstrap.Col md={4} className="mt-3">
                            <h4 className="text-muted">
                                Contact Us
                            </h4>
                            <label className="text-muted">
                                Address : <br/>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit
                            </label>
                            <label className="text-muted">Contact phone : xxx-xxx-xxxx</label>
                    </Bootstrap.Col>
                    <Bootstrap.Col md={2} className="mt-3">
                        <Bootstrap.Navbar className="Nav-footer">
                            <Bootstrap.Nav className="justify-content-end flex-column">
                                <Link to="/" className="nav-link">หน้าหลัก</Link>
                                <Bootstrap.NavDropdown title="หมวดหมู่สินค้า" drop={'start'}>
                                    <Bootstrap.NavDropdown.Item>
                                        <Link to="/" className="dropdown-item">หน้าหลัก</Link>
                                    </Bootstrap.NavDropdown.Item>
                                </Bootstrap.NavDropdown>
                                <Link to="#" className="nav-link">ร้านค้า</Link>
                                {Default && (<Link to="/register" className="nav-link">สมัครสมาชิก</Link>)}
                                {Default && (<Link to="/login" className="nav-link">เข้าสู่ระบบ</Link>)}
                                {IsLogin && (<Link to="/profile/" className="nav-link">บัญชีผู้ใช้งาน</Link>)}
                                {IsLogin && (<Link to="#" onClick={Logout} className="nav-link">ออกจากระบบ</Link>)}
                            </Bootstrap.Nav>
                        </Bootstrap.Navbar>
                    </Bootstrap.Col>
                </Bootstrap.Row>
            </Bootstrap.Container>
            <footer className="text-center mt-3 bg-dark p-2">
                <p className="mb-0 text-muted">&copy; 2022 OnlineShop - React</p>
            </footer>
        </div>
    )
}
export default Footer