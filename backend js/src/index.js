import connectDB from "./db/dbconfig.js";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({
  path: "./env",
});
const PORT = process.env.PORT || 4000;

connectDB();
try {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.log("mongoDB connection failed", err);
}

app.on("error", (error) => {
  console.log("error", error);
  throw error;
});
