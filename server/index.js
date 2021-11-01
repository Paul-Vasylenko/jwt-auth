const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require('./router');
const errorMiddleware = require('./middleware/error-middleware');

const app = express();
const PORT = process.env.PORT || 5432;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router)
app.use(errorMiddleware)


const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log("Listening on port " + PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
