const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./database/database')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

dotenv.config()

connectDb()

app.get('/', (req,res) => res.json('Still Alive!'))

// bring in routes 
const auth = require('./router/UserRouter')
const payment = require('./router/UserAdminRouter')
const deposit = require('./router/DepositRouter')
const withdrawal = require('./router/WithDrawalRouter');
const contact = require('./router/ContactRouter')

// mount routes 
app.use('/api/auth', auth)
app.use('/api/user', payment)
app.use('/api/deposit', deposit)
app.use('/api/withdrawal', withdrawal)
app.use('/api/contact', contact)

const port = process.env.PORT || 8080 
app.listen(port, () => {
    console.log(`port started on http:localhost:${port}`)
})