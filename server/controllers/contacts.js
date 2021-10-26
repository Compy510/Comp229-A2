/*FileName: app.js
Author: Arshad Khan
Student#: 301180776
Date: October 22*/

let express = require('express');
let router  = express.Router();
let mongoose = require('mongoose');

//create a reference to the model
let Contacts = require('../models/contacts');

//displays contacts list page
module.exports.displayContactsList = (req, res, next) => {
    Contacts.find((err, contactsList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            res.render('contacts/list', {title: 'Business Contacts', 
            ContactsList: contactsList, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

//displays add contact page
module.exports.displayAddPage = (req, res, next) => {
    res.render('contacts/add', {title: 'Add Contact',
    displayName: req.user ? req.user.displayName : ''})
}

//processes add contact page after new entry/submit
module.exports.processAddPage =  (req, res, next) => {
    let newContacts = Contacts({
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email
    });

    Contacts.create(newContacts, (err, Contacts) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the Contacts list
            res.redirect('/contacts-list');
        }
    });
}

//displays update page 
module.exports.displayUpdatePage = (req, res, next) => {
    let id = req.params.id;

    Contacts.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('contacts/update', {title: 'Edit Contact', contacts: contactToEdit,
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

//processes update page after data is edited/submitted
module.exports.processUpdatePage = (req, res, next) => {
    let id = req.params.id;

    let updatedContacts = Contacts({
        "_id": id, 
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email
    });

    Contacts.updateOne({_id: id}, updatedContacts, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/contacts-list');
        }
    });
}

//deletes data from database
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err); 
        }
        else
        {
            //refresh the book list
            res.redirect('/contacts-list');
        }
    })
}