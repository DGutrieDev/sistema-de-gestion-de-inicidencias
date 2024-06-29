import React, { useState } from "react";
import axios from "axios";

import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonToolbar,
    useIonViewWillEnter,
} from "@ionic/react";

import { homeOutline, closeOutline } from "ionicons/icons";
import alt_image from "../assets/UCR.png";
import ModalDiagnosticos from "../components/modalDiagnosticos";
import "../styles/Listados.css";
import { useAuth } from "../Auth/authContext";

interface incidencia {
    CT_cod_incidencia: string;
    CT_titulo: string;
    CT_descripcion: string;
    CT_lugar: string;
    CF_Fecha_Hora: string;
    CT_Estado: string;
    CT_riesgo: string;
    CT_prioridad: string;
    CT_categoria: string;
    CT_afectacion: string;
    Imagenes: string;
}


const Listado_IncidenciasAsignadas: React.FC = () => {
    const [incidencias, setIncidencias] = useState<incidencia[]>([]);
    const [selectedIncidenciaId, setSelectedIncidenciaId] = useState<string | null>(null);
    const { isAuthenticated, usuario } = useAuth();
    const Host = import.meta.env.VITE_BASE_URL;

    const getIncidencias = async () => {
        const response = await axios.get(
            `${Host}/tecnicos/incidencias/${usuario}`
        );
        setIncidencias(response.data.data);
    };

    const modificarEstado = async (id: string, nuevo_estado: string) => {
        try {
            const res = await axios.put(`${Host}/tecnicos/incidencias/${id}`, {
                estado: nuevo_estado
            });
            console.log(res.data);
            if (res.status === 200) {
                getIncidencias();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useIonViewWillEnter(() => {
       if (isAuthenticated && usuario) {
            getIncidencias();
        }
    });


    if (!isAuthenticated) {
        return null;
    }

    return (
        <IonPage>
            <IonHeader className="custom-header">
                <IonToolbar className="custom-toolbar">
                    <IonButtons slot="start" className="btns">
                        <IonMenuButton className="btn_menu" />
                    </IonButtons>
                    <IonButtons slot="end" className="btns">
                        <IonButton routerLink="/Home">
                            <IonIcon icon={homeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {incidencias && incidencias.length > 0 ? (
                    incidencias.map((incidencia, index) => (
                        <IonCard key={index}>
                            <img
                                alt=""
                                src={incidencia.Imagenes || alt_image}
                                className="imagen_incd"
                            />
                            <IonCardHeader>
                                <IonCardTitle>{incidencia.CT_titulo}</IonCardTitle>
                                <IonCardSubtitle>{incidencia.CT_Estado}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>Descripcion: {incidencia.CT_descripcion}</p>
                                <p>Lugar: {incidencia.CT_lugar}</p>
                                <p>Fecha Registro: {incidencia.CF_Fecha_Hora}</p>
                                <p>Riesgo: {incidencia.CT_riesgo}</p>
                                <p>Prioridad: {incidencia.CT_prioridad}</p>
                                <p>Categoria: {incidencia.CT_categoria}</p>
                                <p>Afectacion: {incidencia.CT_afectacion}</p>
                            </IonCardContent>
                            {incidencia.CT_Estado === "Asignada" && (
                                <IonButton color="success" className="btn_incd" onClick={() => modificarEstado(incidencia.CT_cod_incidencia, "4")}>Iniciar</IonButton>
                            )}
                            {incidencia.CT_Estado === "En revisión" && (
                                <IonButton color="medium" className="btn_incd" onClick={() => modificarEstado(incidencia.CT_cod_incidencia, "5")}>Reparacion</IonButton>
                            )}
                            {incidencia.CT_Estado === "En reparación" && (
                                <IonButton color="warning" className="btn_incd" onClick={() => modificarEstado(incidencia.CT_cod_incidencia, "6")}>Finalizar</IonButton>
                            )}
                            <br />
                            <IonButton color="primary" className="btn_incd"
                                onClick={() => setSelectedIncidenciaId(incidencia.CT_cod_incidencia)}
                            >Mostrar Diagnostico</IonButton>
                        </IonCard>
                    ))
                ) : (
                    <div className="informacion">
                        <IonIcon icon={closeOutline} className="icono" />
                        <h2>No tienes incidencias asignadas</h2>
                    </div>
                )}
                <ModalDiagnosticos open={selectedIncidenciaId !== null} onClose={() => setSelectedIncidenciaId(null)} id={selectedIncidenciaId || ""} />
            </IonContent>
        </IonPage>
    );
};

export default Listado_IncidenciasAsignadas;