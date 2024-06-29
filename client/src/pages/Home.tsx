import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react';
import { useAuth } from '../Auth/authContext';
import '../styles/Home.css';
import Logo from '../assets/UCR.png';

interface User {
    nombre: string;
    correo: string;
    apellidoUno: string;
    apellidoDos: string;
    roles: String[];
}


const Home: React.FC = () => {
    const { isAuthenticated, usuario } = useAuth();
    const [user, setUser] = useState<User | string | null>(null);
    const Host = import.meta.env.VITE_BASE_URL;
    async function getUser() {
        const response = await axios.get(`${Host}/usuarios/informacionUsuario/${usuario}`);
        setUser(response.data.data);
    }

    useEffect(() => {
        if (isAuthenticated && usuario) {
            getUser();
        }
    }, [isAuthenticated, usuario]);

    return (
        <IonPage>
            <IonHeader className='custom-header'>
                <IonToolbar className='custom-toolbar'>
                    <IonButtons slot="start" className='btns'>
                        <IonMenuButton className='btn_menu' />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="home_content">
                    <img src={Logo} className='Logo'></img>
                    <div className="home_info">
                        <h1>Bienvenido(a)</h1>
                        <br />
                        {user && typeof user !== 'string' ? (
                            <div>
                                <h2>{user.nombre} {user.apellidoUno} {user.apellidoDos}</h2>
                                <p>Sistema de Gestion de Incidencias</p>
                            </div>
                        ) : (
                            <>
                                <p>
                                    Cargando información del usuario...
                                </p>
                                <p>
                                    Por favor espere...
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Home;
