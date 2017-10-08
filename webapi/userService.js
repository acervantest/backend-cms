const User = require('../models/user');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

//REGISTER
router.post('/register', (req, res, next) => {
    User.addUser(req.body, (err, user) => {
        console.log(req.body);
        if(err){
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }

        res.status(200).json({
            success: true,
            msg: 'User registered'
        });

    });
});
// AUTHENTICATE
router.post('/authenticate', (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {

        if(err){
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }

        if(!user){
            return res.status(401).json({
                success: false,
                message:'User Not Found'
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {

            if(err){
                return res.status(500).json({
                    title: 'An error ocurred',
                    error: err
                });
            }

            if(isMatch){
                const payload = {id: user._id};
                const token = jwt.sign(payload, config.getSecret(), {
                    expiresIn: 604800//1 week
                 });

              return res.status(200).json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                 });
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'Wrong password'
                });
            }
        });
    });
});
//GET ALL USERS
router.get('/allUsers', (req, res, next) => {
    User.getAllUsers((err, usersList) => {
        if(err){
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        res.status(200).json({
            success: true,
            msg: 'User registered'
        });
        res.status(200).json({
            message: 'Success',
            users: usersList
        });
    });
});
//GET USER BY ID
router.get('/userById/:id', (req, res, next) => {
   User.getUserById(req.params.id , (err, user) => {
       if(err){
           return res.status(500).json({
               title: 'An error ocurred',
               error: err
           });
       }
       res.json(user);
   });
});
//GET USER PROFILE
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({
      user: req.user
    });
});

module.exports = router;
