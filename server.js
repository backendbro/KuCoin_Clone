const express = require('express')
const app = express()

const port = process.env.PORT || 8080 
app.listen(port, () => {
    console.log(`PORT STARTED ON http:localhost:${port}`)
})