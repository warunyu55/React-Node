import axios from "axios";
import { useEffect ,useState } from "react";
import * as Bootstrap from "react-bootstrap"
import Swal from "sweetalert2";

function EditPassword(){
    // Form
    const [OldPass,setOldPass] = useState([]);
    const [NewPass,setNewPass] = useState([]);
    const [ConfirmPass,setConfirmPass] = useState([]);
    // Alert Validation
    const [ErrorOldPass,setErrorOldPass] = useState([])
    const [ErrorMatchPass,setErrorMatchPass] = useState([])


    const Validation=()=>{
        var IsVali = true
        if(NewPass !== ConfirmPass){
            setErrorMatchPass("กรุณาระบุรหัสผ่านใหม่ให้ตรงกัน")
            IsVali = false
        }
        return IsVali
    }

    const SubmitForm=(e)=>{
        const id = localStorage.getItem('id')
        e.preventDefault()
        if(Validation()){
            axios.patch(`http://localhost:5000/profile/password/${id}`,{
                oldpassword:OldPass
            }).then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err.response.data.err)
            })
        }
    }

return(
    <>
        <Bootstrap.Col md={10}>
        <Bootstrap.Card>
            <Bootstrap.Card.Header><h4 className="text-center">ข้อมูลบัญชีผู้ใช้</h4></Bootstrap.Card.Header>
            <Bootstrap.Card.Body>
                <form onSubmit={SubmitForm}>
                    <div className="form-group my-2">
                        <label>รหัสผ่านเดิม <span className="text-danger">*</span></label>
                        <input type="password" className="form-control" onChange={(e)=>{
                            setOldPass(e.target.value)
                        }} required placeholder="กรุณายืนยันรหัสผ่าน"/>
                        <span className="text-danger text-xs">{ErrorOldPass}</span>
                    </div>
                    <div className="form-group my-2">
                        <label>รหัสผ่านใหม่ <span className="text-danger">*</span></label>
                        <input type="password" className="form-control" onChange={(e)=>{
                            setNewPass(e.target.value)
                        }} required placeholder="กรุณายืนยันรหัสผ่าน"/>
                        <span className="text-danger text-xs">{ErrorMatchPass}</span>
                    </div>
                    <div className="form-group my-2">
                        <label>ยืนยันรหัสผ่าน <span className="text-danger">*</span></label>
                        <input type="password" className="form-control" onChange={(e)=>{
                            setConfirmPass(e.target.value)
                        }} required placeholder="กรุณายืนยันรหัสผ่าน"/>
                        <span className="text-danger text-xs">{ErrorMatchPass}</span>
                    </div>
                <Bootstrap.Button type="submit" className="col-md-4 col-12 btn-dark my-3">ตกลง</Bootstrap.Button>
                </form>
            </Bootstrap.Card.Body>
        </Bootstrap.Card>
    </Bootstrap.Col>
    </>
)
}
export default EditPassword