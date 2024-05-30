import mongoose from "mongoose";


const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB Already connected 🤡🤡🤡");
      return;
    }

    const connect = await mongoose.connect(
      process.env.MONGO_URI
    );


    console.log("MongoDB is connected Succesfully ❗❗❗");
  } catch (error) {
    console.log("MongoDB connection Error 🥵🥵🥵", error);
    process.exit(1);
  }
};

export default connectDB;
