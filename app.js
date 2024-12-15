import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import studentRouter from "./src/routes/studentRoutes.js";
import registrationRouter from "./src/routes/registrationRoutes.js";
import moduleRouter from "./src/routes/moduleRoutes.js";
import paymentRouter from "./src/routes/paymentRoutes.js";

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middlewares globaux
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(studentRouter);
app.use(registrationRouter);
app.use(moduleRouter);
app.use(paymentRouter);

// Exemple de route de base
app.get("/", (req, res) => {
  res.send("Bienvenue dans mon API Express.js!");
});

app.use((err, _req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur est survenue!" });
  next();
});

// Démarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
