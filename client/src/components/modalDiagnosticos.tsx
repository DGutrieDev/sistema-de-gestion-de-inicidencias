import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import "../styles/modals.css";
import { closeOutline } from "ionicons/icons";


interface ModalProps {
    open: boolean;
    onClose: () => void;
    id: string;
}

interface Diagnostico {
    CT_creador: string;
    CT_diagnostico: string;
    CT_observaciones: string;
    CT_cod_diagnostico: string;
    CT_tiempo_estimado: string;
}

const ModalDiagnosticos: React.FC<ModalProps> = ({ open, onClose, id }) => {
    const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([]);
    const Host = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (open) {
            const fetchData = async () => {
                try {
                    const res = await axios.get(`${Host}/tecnicos/diagnostico/${id}`);
                    setDiagnosticos(res.data.data);
                } catch (error) {
                    console.error("Error al obtener los diagnósticos:", error);
                    setDiagnosticos([]);
                }
            };
            fetchData();
        }
    }, [open, id, Host]);

    return (
        <IonModal isOpen={open} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar class="modal_toolbar">
                    <IonButton onClick={onClose} color={"danger"} className="close_btn">
                        Cerrar
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {diagnosticos.length > 0 ? (
                    diagnosticos.map((diagnostico, index) => (
                        <IonCard key={index}>
                            <IonCardHeader>
                                <IonCardTitle>{diagnostico.CT_cod_diagnostico}</IonCardTitle>
                                <IonCardSubtitle>Creador: {diagnostico.CT_creador}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>Diagnóstico: {diagnostico.CT_diagnostico}</p>
                                <p>Observaciones: {diagnostico.CT_observaciones}</p>
                                <p>Tiempo estimado: {diagnostico.CT_tiempo_estimado}</p>
                            </IonCardContent>
                        </IonCard>
                    ))
                ) : (
                    <div className="informacion">
                        <IonIcon icon={closeOutline} className="icono" />
                        <h2>No tienes incidencias asignadas</h2>
                    </div>
                )}
            </IonContent>
        </IonModal>
    );
};

export default ModalDiagnosticos;
