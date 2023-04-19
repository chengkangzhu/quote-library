const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
// Log any MongoDB connection errors , log when successfully connected
db.once("open", function () {
	console.log("mongodb database connection established succesffully");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));



const quoteRouter = require("./routes/quote");
const userouter = require("./routes/user");
app.use("/api/quote", quoteRouter);
app.use("/api/user", userouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`server running on port ${port}`);
}); 
