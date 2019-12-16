const express  = require('express')
const server = express()
const cors = require('cors')
const mongoose = require("mongoose");

require('dotenv/config')

const PORT = 5000 || process.env.PORT

// Mongoose Connection 
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
mongoose.set('useCreateIndex', true)
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log(`connect tho mongoDB`);
    }
  );
//middlewares
server.use(cors())
server.use('/users',require('./route /user.route'))


  server.listen(PORT, () => {
    console.log(`running on ${PORT}`);
    
});