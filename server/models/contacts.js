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