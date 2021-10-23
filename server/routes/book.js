let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to put Book Model
let Book = require('../models/book');

let bookController = require('../controllers/book');

/* GET Route for Book list page - Read operation*/
router.get('/', bookController.displayBookList);

/* GET Route for displaying the Add page - Create operation*/
router.get('/add', bookController.displayAddPage);

/* POST Route for processing the Add page - Read operation*/
router.post('/add', bookController.processAddPage);

/* GET Route for displaying the Edit page - Update operation*/
router.get('/edit/:id', bookController.displayEditPage);

/* POST Route for processing the Edit page - Update operation*/
router.post('/edit/:id', bookController.processEditPage);

/* GET to perform deletion - Delete operation*/
router.get('/delete/:id', bookController.performDelete);


module.exports = router;