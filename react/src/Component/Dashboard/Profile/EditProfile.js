import axios from "axios";
import { useEffect ,useState } from "react";
import * as Bootstrap from "react-bootstrap"
import Swal from "sweetalert2";


function EditProfile(){
    // Form
    const [Firstname,setFirstname] = useState([]);
    const [Lastname,setLastname] = useState([]);
    const [Phone,setPhone] = useState([]);
    const [Email,setEmail] = useState([]);
    // GET API UNIQUE
    const [CheckDataEmail,setCheckDataEmail] = useState([])
    // Alert Validation
    const [ErrorEmail,setErrorEmail] = useState([])
    const [ErrorPhone,setErrorPhone] = useState([])

    var localEmail = localStorage.getItem('email');
    const fetchProfile = async()=>{
        await axios.post("http://localhost:5000/profile",{
            email:localEmail
        }).then((res)=>{
            setFirstname(res.data[0].firstname)
            setLastname(res.data[0].lastname)
            setPhone(res.data[0].phone)
            setEmail(res.data[0].email)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const fetchEmailUnique = async()=>{
        await axios.post("http://localhost:5000/profile/unique",{
            email:localEmail
        }).then((res)=>{
            if(res.data[0] !== undefined){
                setCheckDataEmail(res.data)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    

    useEffect(()=>{
        fetchProfile()
        fetchEmailUnique()
    },[]);
    
    const Validation = () =>{
        var IsVal = true
        if(!MapEmail()){
            setErrorEmail("มีข้อมูล Email นี้อยู่แล้ว โปรดระบุ Email ใหม่")
            IsVal = false
        }
        if(!Phone.match(/^[0-9]+$/)){
            setErrorPhone("กรุณาระบุเบอร์โทรศัพท์ให้ถูกต้อง")
            IsVal = false
        }
        return IsVal
    }

    const MapEmail = () =>{
        var EmailStatus = true
        CheckDataEmail.forEach((e)=>{
            const email = e.email
            console.log(email)
            if(email === Email){
                EmailStatus = false
            }
        })
        return EmailStatus
    }

    const SubmitForm = (e)=>{
        const id = localStorage.getItem('id')
        e.preventDefault()
        if(Validation()){
            axios.patch(`http://localhost:5000/profile/update/${id}`,{
                firstname:Firstname,
                lastname:Lastname,
                phone:Phone,
                email:Email
            }).then((res)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.data.message,
                }).then(()=>{
                    window.location="/profile"
                })
            }).catch((err)=>{
                Swal.fire({
                    icon: 'success',
                    title: err.response.data.err,
                })
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
                <Bootstrap.Row>
                    <Bootstrap.Col md={6}>
                        <div className="form-group my-2">
                            <label>ชื่อ <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" onChange={(e)=>{
                                setFirstname(e.target.value)
                            }} value={Firstname} required placeholder="กรุณาระบุชื่อของคุณ"/>
                        </div>
                        <div className="form-group my-2">
                            <label>โทรศัพท์ <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" onChange={(e)=>{
                                setPhone(e.target.value)
                            }} value={Phone} required placeholder="กรุณาเบอร์โทรศัพท์ของคุณ"/>
                            <span className="text-danger text-xs">{ErrorPhone}</span>
                        </div>
                    </Bootstrap.Col>
                    <Bootstrap.Col md={6}>
                        <div className="form-group my-2">
                            <label>นามสกุล <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" onChange={(e)=>{
                                setLastname(e.target.value)
                            }} value={Lastname} required placeholder="กรุณาระบุนามสกุลของคุณ"/>
                        </div>
                        <div className="form-group my-2">
                            <label>Email <span className="text-danger">*</span></label>
                            <input type="email" className="form-control" onChange={(e)=>{
                                setEmail(e.target.value)
                                fetchEmailUnique()
                            }} value={Email} required placeholder="กรุณาระบุ Email ของคุณ"/>
                            <span className="text-danger text-xs">{ErrorEmail}</span>
                        </div>
                    </Bootstrap.Col>
                </Bootstrap.Row>
                <Bootstrap.Button type="submit" className="col-md-4 col-12 btn-dark my-3">ตกลง</Bootstrap.Button>
                </form>
            </Bootstrap.Card.Body>
        </Bootstrap.Card>
    </Bootstrap.Col>
</>
)

}
export default EditProfile