import mongoose from "mongoose";

const connectToDataBase = async () => {
  const DB = process.env.DATABASE;
  try {
    await mongoose.connect(DB);
    console.log(`Connected to the Database Successfully!`);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export default connectToDataBase;
