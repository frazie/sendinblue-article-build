const express = require('express')
const app = express()
const logger = require('morgan')
const mainRoutes = require('./routes/main')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

const PORT = 3131

app.use('/', mainRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}, you better catch it!`)
}) 