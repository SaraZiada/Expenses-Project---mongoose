const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    item: String,
    amount: String,
    date: Date,
    group: String
})

const expense = mongoose.model("expenses", expenseSchema)

module.exports = expense