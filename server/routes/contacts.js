/*FileName: app.js
Author: Arshad Khan
Student#: 301180776
Date: October 22*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let contactsController = require('../controllers/contacts');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for Contacts list page - Read operation*/
router.get('/', contactsController.displayContactsListView);

/* GET Route for displaying the Add page - Create operation*/
router.get('/add', requireAuth, contactsController.displayAddView);

/* POST Route for processing the Add page - Read operation*/
router.post('/add', requireAuth, contactsController.processAddView);

/* GET Route for displaying the Update page - Update operation*/
router.get('/update/:id', requireAuth, contactsController.displayUpdateView);

/* POST Route for processing the Update page - Update operation*/
router.post('/update/:id', requireAuth, contactsController.processUpdateView);

/* GET to perform deletion - Delete operation*/
router.get('/delete/:id', requireAuth, contactsController.DeleteData);


module.exports = router;