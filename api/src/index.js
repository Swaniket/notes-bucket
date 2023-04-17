import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";

import { userRouter } from "./routes/userRoutes.js";
import { noteRouter } from "./routes/noteRoutes.js";
import { tagRouter } from "./routes/tagRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import connection from "./db/config.js";

const PORT = process.env.PORT || 9000;
const app = express();

/* DB CONNECTION */
connection.connect((err) => {
  if (err) console.log("Can't connect to MySQL:", err);
  else console.log("MySQL Connection Successful");
});

/* CONFIG */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);
app.use("/api/tags", tagRouter);

/* Error Handler */
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
