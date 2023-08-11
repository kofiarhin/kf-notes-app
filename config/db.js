const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connect = async () => {
  const dbURl =
    process.env.NODE_ENV === "development"
      ? process.env.MONGO_URI_DEVELOPMENT
      : process.env.MONGO_URI_PRODUCTION;
  try {
    const conn = await mongoose.connect(dbURl);
    console.log(`connected to databe: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
