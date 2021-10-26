let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let contactsController = require('../controllers/contacts');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for Contacts list page - Read operation*/
router.get('/', contactsController.displayContactsList);

/* GET Route for displaying the Add page - Create operation*/
router.get('/add', requireAuth, contactsController.displayAddPage);

/* POST Route for processing the Add page - Read operation*/
router.post('/add', requireAuth, contactsController.processAddPage);

/* GET Route for displaying the Update page - Update operation*/
router.get('/update/:id', requireAuth, contactsController.displayUpdatePage);

/* POST Route for processing the Update page - Update operation*/
router.post('/update/:id', requireAuth, contactsController.processUpdatePage);

/* GET to perform deletion - Delete operation*/
router.get('/delete/:id', requireAuth, contactsController.performDelete);


module.exports = router;