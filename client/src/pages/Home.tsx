import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon } from '@ionic/react';
import './Home.css';
import Logo from '../assets/Logo UCR.png';
import { addCircleOutline } from 'ionicons/icons';

const Home: React.FC = () => {
    const [user, setUser] = useState<User | string | null>(null);

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

    useEffect(() => {
        if (user) {
            console.log(user);
        }
    }, [user]);

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
                        <div className='role_options' key={index}>
                            {role.CT_desc_rol === "Usuario" && (
                                <>
                                    <h1>{role.CT_desc_rol}</h1>
                                    <div className="opciones">
                                        <a href="/registro-incidencias">
                                            <p>Registrar Incidencias</p>
                                            <span>Reporta las incidencias para que sean atendidas</span>
                                        </a>
                                    </div>
                                    <div className="opciones">
                                        <a href="/home">
                                            <p>Listar Incidencias</p>
                                            <span>Visualiza las incidencias que has creado</span>
                                        </a>
                                    </div>
                                </>
                            )}{role.CT_desc_rol === "Encargado" && (
                                <>
                                    <h1>{role.CT_desc_rol}</h1>
                                    <div className="opciones">
                                        <a href="/home">
                                            <p>Asignar Incidencias</p>
                                            <span>Asigna una Incidencia a los tecnicos</span>
                                        </a>
                                    </div>
                                </>
                            )}{role.CT_desc_rol === "Tecnico" && (
                                <>
                                    <h1>{role.CT_desc_rol}</h1>
                                    <div className="opciones">
                                        <a href="/home">
                                            <p>Listar Incidencias</p>
                                            <span>Visualiza las incidencias que tienes asignadas</span>
                                        </a>
                                    </div>
                                    <div className="opciones">
                                        <a href="/home">
                                            <p>Registrar Diagnostico</p>
                                            <span>Crea un diagnostico sobre una incidencia asignada</span>
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Home;
