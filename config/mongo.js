const mongoose = require('mongoose');

// Connect Database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

// Close the Mongoose connection on process termination
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('MongoDB disconnected on app termination');
  process.exit(0);
});

module.exports = connectDB;
