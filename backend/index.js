import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import moviesRoutes from "./routes/movie.routes.js";

const app = express();

dotenv.config();
// Konfigurasikan CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Load YAML file
const swaggerDocs = YAML.load("./swagger.yaml");

// Setup Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json({ limit: "5mb" })); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

// Routes to API
app.use("/api/auth", authRoutes); // route untuk user option
app.use("/api/movies", moviesRoutes); // route untuk movies

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectMongoDB(); // Connect to mongoDb
});

export default app;
