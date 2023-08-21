const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Import Routers
const rolesRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const jobsRouter = require("./routes/jobs");

// Routers Middlewares
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
