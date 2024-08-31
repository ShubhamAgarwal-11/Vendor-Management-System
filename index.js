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
app.use('/api/vendor', require('./routes/index.js'))

app.listen(port, () => console.log(`server is running on port ${port}`))