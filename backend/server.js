require("dotenv").config();
const express = require("express");
const sequelize = require("./sequelize_config");
const app = express();
const PORT = process.env.PORT;
const CORS = require("cors");
const limit = require("express-rate-limit");

const limiter = limit({
  windowMs: 15 * 60 * 1000,
  max: 45,
  message: "Too many requests, please try again later.",
  standardHeaders: false,
	legacyHeaders: false,
});

app.use(limiter);
app.use(CORS());
app.use(express.json());

const { SessionRoutes, UsuariosRoutes,EncargadoRoutes,TecnicoRoutes } = require("./src/Routes/global_routes");

app.use("/api", SessionRoutes);
app.use("/api", UsuariosRoutes);
app.use("/api", EncargadoRoutes);
app.use("/api", TecnicoRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
