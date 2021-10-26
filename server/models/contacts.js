/*FileName: app.js
Author: Arshad Khan
Student#: 301180776
Date: October 22*/

let mongoose = require('mongoose');

//create a model class
let contactsModel = mongoose.Schema({
    contactName: String,
    contactNumber: String,
    email: String
   
},
{
    collection: "books"
});

module.exports = mongoose.model('Contacts', contactsModel);