'use strict';

var User = require('../model/user-model.js');

exports.list_alluser = function(req, res){
    User.getAllUser(function(err, task){
        if(err){
            res.send(err);
        } else {
            console.log('res', task);
            res.json({ success:'Ok', clientResponse: task});
        }

    });

} 

exports.creat_user = function(req, res){
    var new_user = new User(req.body);
    console.log(new_user)
    //handel error
    if( !new_user.email || !new_user.password ){
        res.send({ error:true, message: 'Please provide username/password' });
    } else {
    User.createUser(new_user, function(err, task){
        if(err){
            res.send(err);
        } else {
            console.log('res', task);
            res.json({ success:'Ok', message: 'Successfully Registred',userid: task});
        }

    });
 }
} 

exports.read_user = function(req, res){
    console.log('3');
    console.log(req.params);
    User.getbyUserId(req.params.userId, function(err, user){
        if(err){
            res.send(err);
        } else {
            console.log('res', user);
            res.json({ success:'Ok', clientResponse: user});
        }

    });

}

exports.update_user = function(req, res){
    User.UpdatebyId(req.params.userId, new User(req.body), function(err, response){
        if(err){
            res.send(err);
        } else {
            console.log('res', response);
            res.json(response);
        }

    });

}

exports.delete_user = function(req, res){
    console.log('5')
    console.log(req.params);
    User.Remove(req.params.userId, function(err, response){
        if(err){
            //res.send(err);
            res.json({ status:'error', message: 'User Not successfully deleted' });
        } else {
            res.json({ status:'Ok', message: 'User successfully deleted' });
        }

    });
}
    
    exports.validateuser = function(req, res){
        User.getbyUserCredential(req.body.username,req.body.password, function(err, task){
            if(err){
                res.send(err);
            } else {
                console.log('res', task);
                res.json(task);
            }
    
        });
    }
   