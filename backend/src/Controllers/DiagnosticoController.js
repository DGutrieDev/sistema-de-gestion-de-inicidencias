const sequelize = require('../../sequelize_config');
const Diagnostico = require('../models/Diagnosticos');

async function crearDiagnostico(req, res) {
    try {
        const { cod_incidencia } = req.params;
        const { usuario, observaciones, estimacion, diagnostico, requiere_compra } = req.body;
        const val = await Diagnostico.count();
        if (!usuario || !observaciones || !estimacion || !diagnostico) {
            return res.status(400).json({ Mensaje: 'Faltan campos requeridos' });
        }
        if (cod_incidencia) {
            const cod_diagnostico = codDiagnostico(cod_incidencia, val + 1);
            const diagnosticoNuevo = await Diagnostico.create({
                CT_cod_diagnostico: cod_diagnostico,
                CT_observaciones: observaciones,
                CT_tiempo_estimado: estimacion,
                CT_diagnostico: diagnostico || null,
                CT_Requiere_compra: requiere_compra || null,
            });
            sequelize.query("CALL registrar_diagnostico(:cod_incidencia, :id_usuario, :cod_diagnostico , :cod_Imagen)", {
                replacements: {
                    cod_incidencia: cod_incidencia,
                    id_usuario: usuario,
                    cod_diagnostico: cod_diagnostico,
                    cod_Imagen: null
                }
            });
            res.status(201).json({ Mensaje: "Diagnostico Creado", diagnosticoNuevo });
        } else {
            res.status(400).json({ Mensaje: 'Incidencia no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ Mensaje: 'Error al crear el diagnostico', error: err });
    }
}

function codDiagnostico(num_incidencia, n) {
    const cons = n.toString().padStart(2, '0');
    const cod = `DG-${cons}-${num_incidencia}`;
    return cod;
}

function imagen(imagen) {
    const blob = new Blob([imagen], { type: 'image/*' });
    return blob;
}

module.exports = { crearDiagnostico };