const jwt = require("jsonwebtoken");
const { Usuarios } = require("../models/global_models");
const { Op } = require("sequelize");

async function LogIn(req, res) {
  try {
    const { usuario, contraseña } = req.body;
    if (!usuario || !contraseña) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    const user = await Usuarios.findOne({
      where: {
        [Op.or]: [
          { CT_cedula: usuario },
          { CT_usuario_institucional: usuario },
        ],
        CT_contraseña: contraseña,
      },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }
    const sesionExistente = await Usuarios.count({
      where: {
        CT_Token: {
          [Op.ne]: null,
        },
        [Op.or]: [
          { CT_cedula: usuario },
          { CT_usuario_institucional: usuario },
        ],
      },
    });
    if (sesionExistente > 0) {
      return res.status(400).json({ message: "Ya existe una sesión activa" });
    }
    const token = jwt.sign(
      {
        usuario: user.CT_usuario_institucional,
        cedula: user.CT_cedula,
      },
      process.env.TOKEN_SECRET
    );
    await Usuarios.update(
     {
        CT_Token: token,
      },
      {
        where: {
          [Op.or]: [
            { CT_cedula: usuario },
            { CT_usuario_institucional: usuario },
          ],
        },
      }
    );
    res.status(200).json({
      message: "Sesión iniciada exitosamente",
      data: { id_usuario: user.CT_cedula, token: token },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function LogOut(req, res) {
  try {
    const { usuario } = req.body;
    const user = await Usuarios.findOne({
      where: {
        CT_cedula: usuario,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    Usuarios.update(
      {
        CT_Token: null,
      },
      {
        where: {
          CT_cedula: usuario,
        },
      }
    );
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  LogIn,
  LogOut,
};
