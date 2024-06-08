const mailer = require('nodemailer');

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

function emailRegistro(nombre_usuario, correo_usuario, contraseña_usuario) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: correo_usuario,
        subject: 'Registro de Sistema de Incidencias UCR',
        html: `
        <p>Estimado/a <strong>${nombre_usuario}</strong>,</p>
        <p>Ha sido registrado en el sistema de incidencias de la UCR.</p>
        <p>Sus credenciales de acceso son:</p>
        <p>Correo: <strong>${correo_usuario}</strong></p>
        <p>Contraseña: <strong>${contraseña_usuario}</strong></p>
        <p>Si desea cambiar su contaseña, contacte con un administrados.</p>
        <p>Saludos cordiales,</p>
        <p>Equipo de soporte</p>
      `
    };
    transporter.sendMail(mailOptions);
}

function EmailAsignacion(usuario_destino, nombre_usuario, nombre_incidencia) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: usuario_destino,
        subject: 'Incidencia Asignada',
        html: `
        <p>Estimado/a <strong>${nombre_usuario}</strong>,</p>
        <p>La incidencia <strong>${nombre_incidencia}</strong> ha sido asignada a usted.</p>
        <p>Saludos cordiales,</p>
        <p>Equipo de soporte</p>
      `
    };

    transporter.sendMail(mailOptions);
}

function IncidenciaRegistrada(usuario_destino, cod_incidencia, nombre_usuario, nombre_incidencia) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: usuario_destino,
        subject: 'Incidencia Registrada',
        html: `
        <p>Estimado/a <strong>${nombre_usuario}</strong>,</p>
        <p>La incidencia <strong>${cod_incidencia} ${nombre_incidencia}</strong> ha sido registrada correctamente</p>
        <p>Saludos cordiales,</p>
        <p>Equipo de soporte</p>
      `
    };

    transporter.sendMail(mailOptions);
}

module.exports = { emailRegistro, EmailAsignacion, IncidenciaRegistrada }