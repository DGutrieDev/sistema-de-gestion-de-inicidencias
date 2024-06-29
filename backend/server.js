require("dotenv").config();
const express = require("express");
const sequelize = require("./sequelize_config");
const app = express();
const PORT = process.env.PORT;
const CORS = require("cors");

app.use(CORS());
app.use(express.json());

const { SessionRoutes, UsuariosRoutes,EncargadoRoutes,TecnicoRoutes,AdministradoresRoutes } = require("./src/Routes/global_routes");

app.use("/api", SessionRoutes);
app.use("/api/usuarios", UsuariosRoutes);
app.use("/api/encargados", EncargadoRoutes);
app.use("/api/tecnicos", TecnicoRoutes);
app.use("/api/admin", AdministradoresRoutes);

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
