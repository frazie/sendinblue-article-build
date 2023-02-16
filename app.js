const express = require('express')
const app = express()
const logger = require('morgan')
const dotenv = require('dotenv')
const mainRoutes = require('./routes/main')
const PORT = 3131


require('dotenv').config({path: '.env'})
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(logger('dev'))

app.use('/', mainRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}, you better catch it!`)
}) 