'use strict';
var sql = require('../config/db.js');
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';
const jwtExpirySeconds = 300;
var User = function( user ){
    this.first_name = user.firstname;
    this.last_name = user.lastname;
    this.email = user.username;
    this.password = user.password;
    this.phone_no = user.phone;
    this.created_at = new Date();
    this.updated_at = "";
}

User.createUser = function( newuser, result ){
     sql.query("INSERT INTO users set ?", newuser, function(err, res) {
         if(err) {
             console.log('error: ', err);
             result(err, null);
         } else{
             console.log(res.insertId);
             result(null, res.insertId);    
         }
     });
}

User.getbyUserId = function(userId, result) {
    sql.query(" select * from users where user_id = ?", userId, function(err, res){
        if(err) {
            console.log('error: ', err);
            result(err, null);
        } else{
            console.log(res);
            result(null, res);    
        }
    });
}

User.getAllUser = function(result) {
    sql.query(" select * from users ", function(err, res){
        if(err) {
            console.log('error: ', err);
            result(null, err);
        } else{
            console.log(res);
            result(null, res);    
        }
    });
}

User.UpdatebyId = function(userId, user, result) {
    let sqldata = sql.query(" UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, phone_no = ?, updated_at = ? where user_id = ? ",
       [user.first_name,user.last_name,user.email,user.password,user.phone_no,new Date(),userId], function(err, res){
        if(err) {
            console.log('error: ', err);
            result(null, { status:'error'});
        } else{
            console.log(res);
            result(null, { status:'Ok' });    
        }
    });
    console.log(sqldata.sql);
}

User.Remove = function(userId, result) {
    sql.query(" delete from users where user_id = ?", [userId], function(err, res){
        if(err) {
            console.log('error: ', err);
            result(err, null);
        } else{
            console.log(res);
            result(null, res);    
        }
    });
}

User.getbyUserCredential = function(username, password, result) {
    sql.query(" select * from users where email = ? and password = ?", [username, password], function(err, res){
        if(err) {
            console.log('error: ', err);
            result(err, null);
        } else{
            if (res.length > 0){
                const token = jwt.sign({ username }, jwtKey, {
                    algorithm: 'HS256',
                    expiresIn: jwtExpirySeconds
                })
                console.log(res.length);
                let response = {"accesstoke":token, "userDetails": res,"success":'Ok'}
                result(null, response); 
         } else {
               let response = {success:'error', message: 'No User found'}
               result(null, response); 
         }
        }
    });
}

module.exports = User;