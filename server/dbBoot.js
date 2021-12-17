// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expenseDB', { useNewUrlParser: true })
const Expense = require('../models/Expense')
const json = require('../expenses.json')

const initialize = function(req,res){
    Expense.find({}, function (err, expenses) {
        if(expenses.length === 0){
            for( var i = 0; i < json.length; i++ ) {
                new Expense( json[ i ] ).save();
            }
        }
        console.log(expenses.length);
    })

    
}

exports.initialize = initialize

