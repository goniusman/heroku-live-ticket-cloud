const express = require("express")
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
var passport  = require('passport');
const path = require('path')


const app = express()
app.use(morgan('dev'))

// it use for production
app.use(cors())

//boyd parser when submited
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) 


app.use(passport.initialize())
require('./passport')(passport)


app.use(fileUpload());


// router
const ticketRouter = require('./routers/ticketRouter')
const userRouter = require('./routers/userRouter')
const { static } = require("express")

app.use('/api/users', userRouter)
app.use('/api/ticket', ticketRouter)



if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) =>  {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



app.get('/', (req, res) => {
    res.json({
        message: 'welcomwe to our new server application'
    })
})



const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)

    // mongoose.connect('mongodb://localhost:27017/ticketing', {useNewUrlParser:true,useUnifiedTopology:true}, () => {
    // mongoose.connect("mongodb://44447770:44447770@cluster0-shard-00-00.ops0t.mongodb.net:27017,cluster0-shard-00-01.ops0t.mongodb.net:27017,cluster0-shard-00-02.ops0t.mongodb.net:27017/cloud-ticket?ssl=true&retryWrites=true&w=majority&replicaSet=atlas-j60do1-shard-0&authSource=admin", {useNewUrlParser:true, useUnifiedTopology:true}, () => {
       mongoose.connect(`mongodb+srv://44447770:44447770@cluster0.ops0t.mongodb.net/cloud-ticket`, {useNewUrlParser:true, useUnifiedTopology:true}, () => {
          console.log('database connected')
       })


})


