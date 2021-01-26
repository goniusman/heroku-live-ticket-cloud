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

app.get('/', (req, res) => {
    res.json({
        message: 'welcomwe to our new server application'
    })
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) =>  {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}







const PORT = process.env.PORT || 4000


app.listen(PORT, () => {    
       mongoose.connect(`mongodb+srv://44447770:44447770@cluster0.ops0t.mongodb.net/cloud-ticket`, {useNewUrlParser:true, useUnifiedTopology:true}, () => {
          console.log('database connected')
       })
})


