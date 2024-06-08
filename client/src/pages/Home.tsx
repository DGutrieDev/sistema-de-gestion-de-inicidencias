import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon, IonButton, IonModal } from '@ionic/react';
import './Home.css';
import Logo from '../assets/Logo UCR.png';

// Componentes de los Modal
import RegistrarIncidencias from '../components/FormIncidencias';
import RegistroDiagnosticos from '../components/FormDiagnostico';
import AsignarIncidencias from '../components/FormAsignar';

const Home: React.FC = () => {
    const [user, setUser] = useState<User | string | null>(null);
    const [showRegistrarModal, setShowRegistrarModal] = useState(false);
    const [showListarModal, setShowListarModal] = useState(false);
    const [showAsignarModal, setShowAsignarModal] = useState(false);
    const [showDiagnosticoModal, setShowDiagnosticoModal] = useState(false);

    async function getUser() {
        const id_usuario = localStorage.getItem("usuario");
        if (id_usuario) {
            const response = await axios.get<User[]>(`http://localhost:3000/api/usuarios/${id_usuario}`);
            if (response.data.length > 0) {
                setUser(response.data[0]);
            } else {
                setUser("Usuario no encontrado");
            }
        } else {
            setUser("Usuario no encontrado");
            console.log("Usuario no encontrado");
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    interface Role {
        CT_desc_rol: string;
    }

    interface User {
        CT_nombre: string;
        CT_usuario_institucional: string;
        roles: Role[];
    }

    return (
        <IonPage>
            <IonHeader className='custom-header'>
                <IonToolbar className='custom-toolbar'>
                    <IonButtons slot="start">
                        <IonMenuButton className='btn_menu' />
                    </IonButtons>
                    <img src={Logo} alt="" className='Logo' />
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="container">
                    {user && typeof user !== 'string' && Array.isArray(user.roles) && user.roles.map((role: Role, index: number) => (
                        <React.Fragment key={index}>
                            {role.CT_desc_rol === 'Usuario' && (
                                <>
                                    <h1>{role.CT_desc_rol}</h1>
                                    <div className="op_container">
                                        <div className="opciones">
                                            <IonButton onClick={() => setShowRegistrarModal(true)} className='btn_modal' fill='clear'>
                                                Registrar Incidencias
                                            </IonButton>
                                        </div>
                                    </div>
                                    <br />
                                </>
                            )}{role.CT_desc_rol === 'Tecnico' && (
                                <>
                                    <h1>{role.CT_desc_rol}</h1>
                                    <div className="op_container">
                                        <div className="opciones">
                                            <IonButton onClick={() => setShowDiagnosticoModal(true)} className='btn_modal' fill='clear'>
                                                Registrar Diagnóstico
                                            </IonButton>
                                        </div>
                                    </div>
                                    <br />
                                </>
                            )}{role.CT_desc_rol === 'Encargado' && (
                                <>
                                    <h1>{role.CT_desc_rol}</h1>
                                    <div className="op_container">
                                        <div className="opciones">
                                            <IonButton onClick={() => setShowAsignarModal(true)} className='btn_modal' fill='clear'>
                                                Asignar Incidencias
                                            </IonButton>
                                        </div>
                                    </div>
                                    <br />
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </IonContent>
            <IonModal isOpen={showRegistrarModal} onDidDismiss={() => setShowRegistrarModal(false)}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Registro de Incidencias</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowRegistrarModal(false)}>Cerrar</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <RegistrarIncidencias closeForm={() => setShowRegistrarModal(false)} />
                </IonContent>
            </IonModal>
            <IonModal isOpen={showListarModal} onDidDismiss={() => setShowListarModal(false)}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Listar Incidencias</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowListarModal(false)}>Cerrar</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {/* Content of Listar Incidencias modal */}
                </IonContent>
            </IonModal>
            <IonModal isOpen={showAsignarModal} onDidDismiss={() => setShowAsignarModal(false)}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Asignar Incidencias</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowAsignarModal(false)}>Cerrar</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <AsignarIncidencias closeForm={() => setShowAsignarModal(false)} />
                </IonContent>
            </IonModal>
            <IonModal isOpen={showDiagnosticoModal} onDidDismiss={() => setShowDiagnosticoModal(false)}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Registrar Diagnostico</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowDiagnosticoModal(false)}>Cerrar</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <RegistroDiagnosticos closeForm={() => setShowDiagnosticoModal(false)} />
                </IonContent>
            </IonModal>
        </IonPage>
    );
}

export default Home;
