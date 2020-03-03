'use strict';   
module.exports = function(app){
    var userlist = require('../controller/user-controller');
    
    //list user and create user
    app.route('/user')
    .get(userlist.list_alluser)
    .post(userlist.creat_user);

    //login
    app.route('/token')
    .post(userlist.validateuser);
    
    //user get/update/delete
    app.route('/user/:userId')
    .get(userlist.read_user)
    .put(userlist.update_user)
    .delete(userlist.delete_user)

};