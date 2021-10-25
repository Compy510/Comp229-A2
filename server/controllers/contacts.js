let express = require('express');
let router  = express.Router();
let mongoose = require('mongoose');

//create a reference to the model

let Book = require('../models/contacts');

module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(bookList);

            res.render('contacts/list', {title: 'Business Contacts', 
            BookList: bookList, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contacts/add', {title: 'Add Contact',
    displayName: req.user ? req.user.displayName : ''})
}

module.exports.processAddPage =  (req, res, next) => {
    let newBook = Book({
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email
    });

    Book.create(newBook, (err, Book) => {
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

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('contacts/update', {title: 'Edit Contact', book: bookToEdit,
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedBook = Book({
        "_id": id, 
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email
    });

    Book.updateOne({_id: id}, updatedBook, (err) => {
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

    Book.remove({_id: id}, (err) => {
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