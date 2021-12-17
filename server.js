// Server setup
const express = require('express')
const app = express()
const api = require('./server/routes/api')
const init = require('./server/dbBoot')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)

const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})