const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'rn_shopping'
})
conn.connect((err)=>{
    if(err){
        console.log("Error Connect",err);
        return;
    }
})

module.exports = conn;