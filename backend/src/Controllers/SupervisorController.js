const { Incidencias, Estados, Riesgos, Afectaciones, Categorias, Prioridades, Incidencia_imagen, Imagenes,Incidencia_Asignada } = require('../models/global_models');
const sequelize = require('../../sequelize_config');

async function obtenerIncidenciasTerminadas(req, res) {
    try {
        const incidencias = await Incidencias.findAll({
            where: { CT_Estado: 6 },
            include: [
                { model: Estados },
                { model: Afectaciones },
                { model: Riesgos },
                { model: Categorias },
                { model: Prioridades },
                { model: Incidencia_imagen, include: [{ model: Imagenes }] }
            ]
        });
        if (incidencias.length === 0) {
            return res.status(200).json({ message: "No se encontraron incidencias asignadas" });
        }
        const data = formatData(incidencias);
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

async function modificarEstadoIncidencia(req, res) {
    try {
        const { incidencia } = req.params;
        const { estado } = req.body;
        if (estado === 1) {
            await Incidencia_Asignada.destroy({ where: { CT_id_incidencia: incidencia } });
        }
        await Incidencias.update({ CT_Estado: estado }, { where: { CT_cod_incidencia: incidencia } });
        if(estado === 1){
            return res.status(200).json({ message: "Incidencia rechazada" });
        }
        return res.status(200).json({ message: "Incidencia Aprobada" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

function formatData(incidencias) {
    return incidencias.map(incidencia => ({
        CT_cod_incidencia: incidencia.CT_cod_incidencia,
        CT_titulo: incidencia.CT_titulo,
        CT_descripcion: incidencia.CT_descripcion,
        CT_lugar: incidencia.CT_lugar,
        CF_Fecha_Hora: incidencia.CF_Fecha_Hora,
        CT_Estado: incidencia.T_Estado.CT_descrip_estado,
        CT_afectacion: incidencia.T_Afectacione.CT_descrip_afec,
        CT_riesgo: incidencia.T_Riesgo.CT_descrip_riesgo,
        CT_categoria: incidencia.T_Categoria.CT_descrip_categ,
        CT_prioridad: incidencia.T_Prioridade.CT_descrip_prioridad,
        Imagenes: incidencia.T_incidencia_imagens.map(imagen => imagen.T_Imagene.CI_imagen),
    }));
}


module.exports = {
    obtenerIncidenciasTerminadas,
    modificarEstadoIncidencia
};