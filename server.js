const express = require("express")
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// router
const ticketRouter = require('./routers/ticketRouter')
const commentRouter = require('./routers/commentRouter')

const app = express()
app.use(morgan('dev'))

// it use for production
app.use(cors())

//boyd parser when submited
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/ticket', ticketRouter)
app.use('/api/comment', commentRouter)

app.get('/', (req, res) => {
    res.json({
        message: 'welcomwe to our new server application'
    })
})
  
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
    mongoose.connect('mongodb://localhost:27017/ticketing', {useNewUrlParser:true,useUnifiedTopology:true}, () => {
        console.log('database connected')
    })
})


