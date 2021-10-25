let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let bookController = require('../controllers/contacts');

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

/* GET Route for Book list page - Read operation*/
router.get('/', bookController.displayBookList);

/* GET Route for displaying the Add page - Create operation*/
router.get('/add', requireAuth, bookController.displayAddPage);

/* POST Route for processing the Add page - Read operation*/
router.post('/add', requireAuth, bookController.processAddPage);

/* GET Route for displaying the Edit page - Update operation*/
router.get('/update/:id', requireAuth, bookController.displayEditPage);

/* POST Route for processing the Edit page - Update operation*/
router.post('/update/:id', requireAuth, bookController.processEditPage);

/* GET to perform deletion - Delete operation*/
router.get('/delete/:id', requireAuth, bookController.performDelete);


module.exports = router;