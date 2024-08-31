require('dotenv').config(
    {path: "./.env"}
)
const express = require('express')
const app = express()
const port = process.env.PORT;
const db = require('./config/db');
db();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/vendors', require('./routes/index.js'))
app.use('/purchase-orders', require('./routes/purchase.order.router.js'))

app.listen(port, () => console.log(`server is running on port ${port}`))