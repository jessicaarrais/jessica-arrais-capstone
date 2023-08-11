require("dotenv").config();
import cors = require("cors");
import propertiesRoute = require("./routes/propertiesRoute");
import usersRoute = require("./routes/usersRoute");
import express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.use("/api/properties", propertiesRoute);
app.use("/api/users", usersRoute);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
