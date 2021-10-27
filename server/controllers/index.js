/*FileName: app.js
Author: Arshad Khan
Student#: 301180776
Date: October 22*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//define the user model instance
let userModel = require('../models/user');
let User = userModel.User; 

//displays home page
module.exports.displayHomeView = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

//displays about page
module.exports.displayAboutView = (req, res, next) => {
    res.render('about', { title: 'About', displayName: req.user ? req.user.displayName : ''});
}

//displays projects page
module.exports.displayProjectsView = (req, res, next) => {
    res.render('projects', { title: 'Projects', displayName: req.user ? req.user.displayName : ''});
}

//displays services page
module.exports.displayServicesView = (req, res, next) => {
    res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

//displays contact page
module.exports.displayContactView = (req, res, next) => {
    res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}

//displays login page
module.exports.displayLoginView = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

//processes login 
module.exports.processLoginView = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        if(err)
        {
            return next(err);
        }
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contacts-list');
        });
    })(req, res, next);
}

//logs out the user
module.exports.LogoutUser = (req, res, next) => {
    req.logout();
    res.redirect('/');
}