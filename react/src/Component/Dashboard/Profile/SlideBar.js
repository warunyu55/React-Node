// import { useEffect, useState } from "react";
import * as Bootstrap from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

function SlideBar(){

    const location = useLocation().pathname;

    return(
        <>
            <Bootstrap.Col md={2}>
                <Bootstrap.Navbar>                    
                <Bootstrap.Nav className="flex-column slide-bg">
                        <Link to="/profile/" 
                        className={"nav-link text-center " + (location === '/profile/' ?'slide-active':'' )} >จัดการบัญชี</Link>
                        <Link to="/profile/address" 
                        className={"nav-link text-center " + (location === '/profile/address' ?'slide-active':'' )} 
                        >จัดการที่อยู่</Link>
                        <Link to="/profile/password" 
                        className={"nav-link text-center " + (location === '/profile/password' ?'slide-active':'' )} 
                        >เปลี่ยนแปลงรหัสผ่าน</Link>
                        <Link to="/profile/order" 
                        className={"nav-link text-center " + (location === '/profile/order' ?'slide-active':'' )} 
                        >ประวัติการสั่งซื้อ</Link>
                        <Link to="/profile/payment" 
                        className={"nav-link text-center " + (location === '/profile/payment' ?'slide-active':'' )} 
                        >แจ้งการชำระเงิน</Link>
                    </Bootstrap.Nav>
                </Bootstrap.Navbar>
            </Bootstrap.Col>
        </>
    )

}
export default SlideBar