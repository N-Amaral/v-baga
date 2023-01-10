import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

//Route import
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// Configuration

//Dotenv
dotenv.config();
//Express
const app = express();
app.use(express.json());
//Helmet CORS config
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//Morgan
app.use(morgan("common"));
//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//CORS
app.use(cors());

//ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

//Mongoose Setup

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
  })
  .catch((error) => console.log(`Error: ${error} . Did not connect`));
