const express = require("express");
const next = require("next");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const cors = require("cors");

const apiLimiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 100, // limit each IP to 5 requests per windowMs
});

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  const connection = mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

  server.use("/api/v1", apiLimiter);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${PORT}`);
  });
});
