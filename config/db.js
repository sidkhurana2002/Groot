// // config/db.js
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     // Connect to MongoDB using the connection string
//     await mongoose.connect("mongodb://127.0.0.1:27017/Mbackend", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       //   useCreateIndex: true,
//       //   useFindAndModify: false,
//     });

//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://sidakhurana23:sid@cluster0.o94ildg.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      // This is to avoid warnings in the console
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
