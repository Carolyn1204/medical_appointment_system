
const express = require('express')
const app = express()
const config = require('./config')
const expressJWT = require('express-jwt')
console.log(expressJWT); 
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json());




// midware for cc function
app.use(function (req, res, next) {

    res.cc = function (err, status = 1) {
        res.send({        
            status,           
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// midware for decode jwt


app.use(expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [{ url: '/login'},
    { url: '/register'}] }))




//router
const patientRouter = require('./router/patient')
app.use(patientRouter)

const appointmentRouter = require('./router/appointment')
app.use(appointmentRouter)


//midware for err
app.use(function (err, req, res, next) {
    
    if (err.name === 'UnauthorizedError') return res.cc('Authentication failed!')
   
    })

app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007')
})
