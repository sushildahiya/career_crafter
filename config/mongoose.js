/**
 * IMporting the mongoose library
 */
const mongoose = require('mongoose')

/**
 * Defining the database collection for mongoose to connect
 */
mongoose.connect('mongodb://0.0.0.0/career_crafter',{  useNewUrlParser: true,
useUnifiedTopology: true })

//Opening a connection to database
const db = mongoose.connection;

//If any error occurs while connecting to db, then console it.
db.on('error',function(err) { console.log(err.message); })

//If DB connects successfully, then consoling it.
db.once('open',function(err) { console.log('DB Connection established'); })