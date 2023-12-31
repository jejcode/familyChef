import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    // await mongoose.connect(process.env.DB_URL, {
    await mongoose.connect('mongodb://127.0.0.1:27017/familyChef', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Established a connection to the database");

    mongoose.connection.on("error", () => {
      throw new Error("Could not connect to DB.");
    });
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
