const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("DB ready to use");
  })
  .catch((err) => {
    console.log(err);
  });
