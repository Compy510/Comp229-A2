let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to put Book Model
let Book = require('../models/book');

/* GET Route for Book list page - Read operation*/
router.get('/', (req, res, next) => {
    Book.find((err, bookList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(bookList);

            res.render('book', {title: 'Book List', BookList: bookList})
        }
    });
});

module.exports = router;