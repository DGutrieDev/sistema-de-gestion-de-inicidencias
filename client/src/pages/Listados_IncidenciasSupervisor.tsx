import React, { useState, useEffect } from "react";
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
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonToolbar,
    useIonViewWillEnter,
} from "@ionic/react";
import { homeOutline, closeOutline } from "ionicons/icons";
import alt_image from "../assets/UCR.png";
import { useAuth } from "../Auth/authContext";
import "../styles/Listados.css";

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

const Listados_IncidenciasSupervisor: React.FC = () => {
    const [incidenciasT, setIncidenciasT] = useState<incidencia[]>([]);
    const { isAuthenticated, usuario } = useAuth();
    const Host = import.meta.env.VITE_BASE_URL;

    const getIncidencias = async () => {
        const response = await axios.get(
            `${Host}/supervisor/obtenerIncidenciasTerminadas`
        );
        setIncidenciasT(response.data.data);
    };
    
    useIonViewWillEnter(() => {
        if (isAuthenticated && usuario) {
            getIncidencias();
        }
    });

    useEffect(() => {
        if(incidenciasT.length > 0){
            console.log(incidenciasT);
        }else{
            console.log("No hay incidencias", incidenciasT);
        }
    }, []);

    const modificarEstado = async (id: string, nuevo_estado: string) => {
        try {
            const res = await axios.put(`${Host}/supervisor/modificarEstadoIncidencia/${id}`, {
                estado: nuevo_estado
            });
            console.log(res.data);
            if (res.status === 200) {
                getIncidencias();
            }
        } catch (error) {
            console.error(error);
        }
    };

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
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Incidencias Terminadas</IonCardTitle>
                    </IonCardHeader>
                </IonCard>
                {incidenciasT && incidenciasT.length > 0 ? (
                    incidenciasT.map((incidencia, index) => (
                        <IonCard key={index}>
                            <IonCardHeader>
                                <IonCardSubtitle>{incidencia.CT_cod_incidencia}</IonCardSubtitle>
                                <IonCardTitle>{incidencia.CT_titulo}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>{incidencia.CT_descripcion}</p>
                                <p>{incidencia.CT_lugar}</p>
                                <p>{incidencia.CF_Fecha_Hora}</p>
                                <p>{incidencia.CT_Estado}</p>
                                <p>{incidencia.CT_riesgo}</p>
                                <p>{incidencia.CT_prioridad}</p>
                                <p>{incidencia.CT_categoria}</p>
                                <p>{incidencia.CT_afectacion}</p>
                                <IonButton onClick={() => modificarEstado(incidencia.CT_cod_incidencia, "9")} className="btn_incd" color={"success"}>Aprobar</IonButton>
                                <br />
                                <IonButton onClick={() => modificarEstado(incidencia.CT_cod_incidencia, "1")} className="btn_incd" color={"warning"}>Rechazar</IonButton>
                            </IonCardContent>
                        </IonCard>
                    ))
                ) : (
                    <div className="informacion">
                        <IonIcon icon={closeOutline} className="icono" />
                        <h2>No hay Incidencias</h2>
                    </div>
                )}

            </IonContent>
        </IonPage>
    );
}

export default Listados_IncidenciasSupervisor;