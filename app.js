require('dotenv').config();
const express = require('express');
const { connect } = require('mongoose');
const { PORT } = require('./config')
const rootRoute = require('./routes/index.route');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api/v2', rootRoute)




connect(process.env.URI)
    .then(() => console.log('Database connected sucessfully'))
    .catch(error => console.error(`Something went wrong while connecting to database: ${error.message}`))


app.listen(PORT, function () {
    // connect to database 
    console.log(`Server running `)
})

