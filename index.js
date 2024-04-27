const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connection");
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.use("/books", bookRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
