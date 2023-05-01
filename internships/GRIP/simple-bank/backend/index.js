const express = require('express')
require("dotenv").config();
const app = express()
const port = process.env.PORT;
const cors = require("cors");
const { userRoutes, transferRoutes } = require("./routes/allroutes");
const initConnection = require("./DB/config");

app.use(cors({}));
app.use(express.json());
app.use(userRoutes, transferRoutes);
initConnection();

app.listen(port, () => console.log(`Example app listening on port ${port}!`))