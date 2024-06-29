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
    Imagenes: string;
}

const Listado_IncidenciasUsuarios: React.FC = () => {
    const [incidencias, setIncidencias] = useState<incidencia[]>([]);
    const { isAuthenticated, usuario } = useAuth();
    const Host = import.meta.env.VITE_BASE_URL;

    const getIncidencias = async () => {
        const response = await axios.get(
            `${Host}/usuarios/obtenerIncidenciasUsuario/${usuario}`
        );
        setIncidencias(response.data.data);
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
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Incidencias Registradas</IonCardTitle>
                    </IonCardHeader>
                </IonCard>
                {incidencias.length > 0 ? (
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
                            </IonCardContent>
                            {incidencia.CT_Estado === "Cerrada" && (
                                <IonButton color="warning" className="btn_incd">Reabrir</IonButton>
                            )}
                        </IonCard>
                    ))
                ) : (
                    <div className="informacion">
                        <IonIcon icon={closeOutline} className="icono" />
                        <h3>No tienes incidencias registradas</h3>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Listado_IncidenciasUsuarios;
