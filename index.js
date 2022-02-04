require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser());
const mongoose = require('mongoose')
const route = require('./router/index')
const http = require('http');
const cors = require('cors');
// const socketIO = require('socket.io');
const server = http.createServer(app)
//sockect cors

const { MONGO_URI, API_PORT } =  process.env
const port = process.env.PORT || API_PORT;


//conneting data base
mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>{
    server.listen(port,()=>{
        console.log("database is connected"+" " +port)
    })
})

//for cors origin
app.use(cors({origin:'*'}))

app.use(express.urlencoded({extended:false}))
app.use(express.json());

// initiallizing the app ......
app.use('/api', route)
app.get('/home', (req,res)=>{
    res.send("joshua is good boy to heroku")
})


