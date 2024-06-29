import React from "react";
import axios from "axios";

interface incidencia {
    CT_titulo: string;
    CT_descripcion: string;
    CT_lugar: string;
    CF_Fecha_Hora: string;
    CT_Estado: string;
    Imagenes: string;
}

const Listado_IncidenciasUsuarios: React.FC = () => {
    const [incidencias, setIncidencias] = React.useState<incidencia[]>([]);
    const Host = import.meta.env.VITE_BASE_URL;

    React.useEffect(() => {
        axios.get(`${Host}/usuarios/incidencias`)
            .then((response) => {
                setIncidencias(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <></>
    );
};

export default Listado_IncidenciasUsuarios;
