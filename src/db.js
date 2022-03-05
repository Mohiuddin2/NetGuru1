const mongoose = require("mongoose")


const url = process.env.URL;

const connectDB = async () => {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
     console.log(`MongoDb Connected: ${conn.connection.host}`);
    };
  

module.exports = connectDB;