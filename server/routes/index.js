/*FileName: index.js
Author: Arshad Khan
Student#: 301180776
Date: September 27*/
let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomeView);

/* GET home page. */
router.get('/home', indexController.displayHomeView);

/* GET About Us page. */
router.get('/about', indexController.displayAboutView);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsView);

/* GET Services page. */
router.get('/services', indexController.displayServicesView);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactView);

/* GET Route for displaying the login page */
router.get('/login', indexController.displayLoginView);

/* POST Route for processing the login page */
router.post('/login', indexController.processLoginView);

/* GET to perform user logout */
router.get('/logout', indexController.LogoutUser);

module.exports = router;
