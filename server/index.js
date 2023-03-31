require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const propertiesRoute = require("./routes/propertiesRoute");
const usersRoute = require("./routes/usersRoute");

app.use(cors());
app.use(express.json());

app.use("/api/properties", propertiesRoute);
app.use("/api/users", usersRoute);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
