import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";

import connection from "./db/config.js";

/* CONFIG */
const app = express();

// ---- DB Connection ----
connection.connect((err) => {
  if (err) console.log("Can't connect to MySQL:", err);
  else console.log("MySQL Connection Successful");
});

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
