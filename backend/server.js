require('dotenv').config();

const express = require('express');
const BodyParser = require('Body-Parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const conn = require('./database/database');

app.use(cors())
app.use((BodyParser.urlencoded({extended:true})));
app.use(BodyParser.json());


app.get('/',(req,res)=>{
    res.send("Server Running");
})

app.post('/register',(req,res)=>{
    try{
        const {firstname,lastname,phone,password,email,c_password} = req.body
        if(password !== c_password) return res.status(400).send('Password Not match');
        const hash = bcrypt.hashSync(password,10);
        conn.query("INSERT into users(firstname,lastname,phone,email,password)VALUES( ?, ?, ?, ?, ?)",[firstname,lastname,phone,email,hash],
        (err,result)=>{
            if(err){
                return res.status(400).send({err:"เกิดข้อผิดพลาด"});
            }
            return res.status(201).send({message:"สมัครสมาชิกเรียบร้อยแล้ว"})
        })
    }catch(err){
        return res.status(500).send({err:"เกิดข้อผิดพลาด"});
    }
})

app.post('/authen',(req,res,next)=>{
    try{
        const token =  req.body.header.authorization
        jwt.verify(token,process.env.Token_key,(err,decoded)=>{
            if(err) return res.status(401).send({err:"กรุณาเข้าสู่ระบบ"})
            return res.status(202).send({message:"เข้าสู่ระบบสำเร็จ"})
        })
    }catch(err){
        return res.status(500).send({err:"เกิดข้อผิดพลาด"});
    }
})

app.post('/login',(req,res)=>{
    try{
        const {email,password} = req.body
        conn.query("SELECT * FROM users WHERE email = ?",[email],
        (err,result)=>{
            if(err) return res.status(400).send({err:"เกิดข้อผิดพลาด"});
            if(result.length == 0) return res.status(400).send({err:"ไม่พบ Email ของคุณ"})
            const h_password = bcrypt.compareSync(password,result[0].password);
            if(h_password){
                const id = result[0].id
                const token = jwt.sign({email},process.env.Token_key,{expiresIn:'1h'});
                return res.status(200).send({token,message:"เข้าสู่ระบบเรียบร้อยแล้ว",email,id})
            }else{
                return res.status(400).send({err:"รหัสผ่านไม่ถูกต้อง"});
            }
        })
    }catch(err){
        return res.status(500).send({err:"เกิดข้อผิดพลาด"});
    }
})

app.get('/unique',(req,res)=>{
    try{
        conn.query("SELECT email FROM users ",(err,result)=>{
            if(err){
                return res.status(400).send({message:"Error"});
            }
            return res.status(200).send(result)
        })
    }catch(err){
        return res.status(500).send({err:"เกิดข้อผิดพลาด"});
    }
})

app.post('/profile',(req,res)=>{
    try{
        const {email} = req.body
        conn.query("SELECT * FROM users WHERE email = ?",[email],(err,result)=>{
            if(err){
                return res.status(400).send({message:"Error"});
            }
            return res.status(200).send(result)
        })
    }catch(err){
        return res.status(500).send({err:"เกิดข้อผิดพลาด"});
    }
})

app.post('/profile/unique',(req,res)=>{
    try{
        const {email} = req.body
        conn.query("SELECT email FROM users WHERE email NOT IN (?)",[email],(err,result)=>{
            if(err){
                console.log("Error SELECT",err);
                return res.status(400).send({message:"Error"});
            }
            return res.status(200).send(result)
        })
    }catch(err){
        return res.status(500).send({err:"เกิดข้อผิดพลาด"});
    }
})

app.patch('/profile/update/:id',(req,res)=>{
    try{
        const id = req.params.id
        const {firstname,lastname,phone,email} = req.body
        conn.query("UPDATE users SET firstname = ?,lastname = ?,phone = ?,email = ? WHERE id = ?",[firstname,lastname,phone,email,id],(err,result)=>{
            if(err){
                return res.status(400).send({err:"เกิดข้อผิดพลาด"});
            }
            return res.status(201).send({message:"อัปเดตข้อมูลผู้ใช้งานเรียบร้อยแล้ว"})
        })
    }catch(err){
        return res.status(500).send({err:"เกิดข้อผิดพลาด"});
    }
})

app.patch('/profile/password/:id',(req,res)=>{
    try{
        const id = req.params.id
        const {oldpassword,password} = req.body
        conn.query("SELECT * FROM users WHERE id = ?",[id],(err,result)=>{
            if(err) return res.status(400).send({err:"เกิดข้อผิดพลาด"})
            const Check = bcrypt.compareSync(oldpassword,result[0].password)
            if(!Check) return res.status(400).send({err:"รหัสผ่านเดิมไม่ถูกต้อง"})
        })
        const hash = bcrypt.hashSync(password,10)
        console.log(hash)
        // conn.query("UPDATE users SET password = ? WHERE id = ?",[hash,id],(err,result)=>{
        //     if(err) return res.status(400).send({err:"เกิดข้อผิดพลาด"});
        //     return res.status(201).send({message:"อัปเดตข้อมูลผู้ใช้งานเรียบร้อยแล้ว"})
        // })
    }catch(err){
        console.log(err)
        return res.status(500).send({err:"เกิดข้อผิดพลาด"});
    }
})


app.listen(5000,(err)=>{
    if(!err){
        console.log("Server Start");
    }else{
        console.log("Error",err);
    }
})
