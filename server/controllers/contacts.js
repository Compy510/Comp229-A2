let express = require('express');
let router  = express.Router();
let mongoose = require('mongoose');

//create a reference to the model

let Contacts = require('../models/contacts');

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

module.exports.displayAddPage = (req, res, next) => {
    res.render('contacts/add', {title: 'Add Contact',
    displayName: req.user ? req.user.displayName : ''})
}

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