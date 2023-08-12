import * as dotenv from "dotenv";
import * as cors from "cors";
import * as express from "express";
import propertiesRoute from "./routes/propertiesRoute";
import usersRoute from "./routes/usersRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.use("/api/properties", propertiesRoute);
app.use("/api/users", usersRoute);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
