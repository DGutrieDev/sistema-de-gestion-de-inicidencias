import React from "react";
import axios from "axios";

const Host = import.meta.env.VITE_BASE_URL;

const getIncidencias = async () => {
    const response = await axios.get(`${Host}/encargados/incidencias`);
    return response.data;
}

const getTecnicos = async () => {
    const response = await axios.get(`${Host}/encargados/tecnicos`);
    return response.data;
}

const getPrioridad = async () => {
    const response = await axios.get(`${Host}/encargados/prioridades`);
    return response.data;
}

const getCategoria = async () => {
    const response = await axios.get(`${Host}/encargados/categorias`);
    return response.data;
}


const getAfectacion = async () => {
    const response = await axios.get(`${Host}/encargados/afectaciones`);
    return response.data;
}

const getRiesgo = async () => {
    const response = await axios.get(`${Host}/encargados/riesgos`);
    return response.data;
}

const getEstado = async () => {
    const response = await axios.get(`${Host}/encargados/estado`);
    return response.data;
}

export { getIncidencias, getTecnicos, getPrioridad, getCategoria, getAfectacion, getRiesgo };