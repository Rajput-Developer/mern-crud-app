import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL)
  } catch (err) {
    process.exit(1); //process exit 1 means exit with failur and 0 means the process exit with sucess
  }
}