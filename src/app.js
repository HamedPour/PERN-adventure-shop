// packages
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

//  my config imports
const config = require("./config/config");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  // serve static content
  console.log("PRODUCTION HERE ... ");
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// routes import
require("./routes")(app);

app.listen(config.port, () => {
  console.log("=======================================================");
  console.log("Sever started at port " + config.port);
});
