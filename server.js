const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./DATABASE/database')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

dotenv.config()

connectDb()

app.get('/', (req,res) => res.json('Still Alive!'))

// bring in routes 
const auth = require('./ROUTER/UserRouter')
const payment = require('./ROUTER/PaymentRouter')

// mount routes 
app.use('/api/auth', auth)
app.use('/api/admin', payment)


const port = process.env.PORT || 8080 
app.listen(port, () => {
    console.log(`port started on http:localhost:${port}`)
})