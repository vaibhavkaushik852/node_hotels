const mongoose = require('mongoose');
const menuitemSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    taste : {
        type : String,
        enum : ['sweet','spicy','sour'],
        required : true
    },
     is_drink : {
        type : Boolean,
        default : false   //client ne koi data bheja hi nhi

    },
    ingridents : {
        type : [String],
        default : []
    },
    num_sales : {
        type : Number,
        default : 0
    }


})

const Menuitem = mongoose.model('menu',menuitemSchema);
module.exports = Menuitem;