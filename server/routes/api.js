const express = require('express')
const router = express.Router()
const moment = require('moment')
const Expense = require(`../../models/Expense`)

router.get('/expenses', function (req, res) {
    let fromDate = req.query.d1;
    let toDate = req.query.d2;

    if(fromDate){
        fromDate = moment(new Date(fromDate)).format('LLLL')
        if(toDate){
            toDate = moment(new Date(toDate)).format('LLLL')
            Expense.find(
                {date:{
                    $gt: fromDate,
                    $lt : toDate
                }
            }, function (err, expenses) {
                    res.send(expenses)
                }).sort({
                    date:-1
                })
        }else{
            Expense.find(
                {date:{
                    $gt: fromDate,
                }
                }, function (err, expenses) {
                    res.send(expenses)
                }).sort({
                    date:-1
                })
        }
    }else{
        Expense.find({}, function (err, expenses) {
            res.send(expenses)
        }).sort({
            date:-1
        })
    }
})

router.post('/expense',function(req,res){
    let newExpense = new Expense()
    
    newExpense.item = req.body.item
    newExpense.amount = req.body.amount    
    newExpense.group = req.body.group
    
    newExpense.date = (req.body.date ? moment(new Date(req.body.date)).format('LLLL') : null)

    newExpense.save()
    .then(function (addedItem) {
        console.log(`You Spent ${addedItem.amount} On ${addedItem.item} `)
    })
    res.send()

})

router.put('/update',function(req, res) {
    let oldGroup = req.body.group1
    let newGroup = req.body.group2
    Expense.findOneAndUpdate({group : oldGroup},{group : newGroup},{new : true}, function(err,expense){
        res.send(`${expense.item} changed its group to ${expense.group}`)
    })
    
})

router.get("/expenses/:group", function (req, res) {
    const group = req.params.group;
    const total = req.query.total;
    if (total == "true") {
        Expense.find({group:group},function(err,groups){
            res.send(groups)
        })

    } else {
      Expense.aggregate(
        [
          {$match: { group: group } },
          {$group: {
              _id: group,
              totalAmount: { $sum: {'$convert': { 'input': '$amount', 'to': 'double' }} },
            }
          },
          { $sort: { totalAmount: -1 } },
        ],function (err, results) {
          res.send(results);
        }
      );
    }
  });
  
module.exports = router