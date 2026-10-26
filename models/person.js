const mongoose = require('mongoose');

//DEFINE THE PERSON SCHEMA
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    work : {
        type : String,
        enum : ['chef','waiter','manager'],
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    mobile : {
        type : Number,
        required : true
    },
     address : {
        type : String,
        required : true
     },
     salary : {
        type : Number,
        required : true 
     }

    });


    //CREATE PERSON MODEL

    const Person =mongoose.model('person',personSchema);
    module.exports = Person;