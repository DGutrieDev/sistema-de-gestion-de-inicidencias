import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react';
import './Home.css';
import Logo from '../assets/Logo UCR.png';


const Home: React.FC = () => {
    const [user, setUser] = useState<User | string | null>(null);
    const Host = import.meta.env.VITE_BASE_URL;
    async function getUser() {
        const response = await axios.get(`${Host}/usuarios/informacionUsuario/702730905`);
        setUser(response.data.data);
    }

    useEffect(() => {
        getUser();
    }, []);

    interface User {
        nombre: string;
        correo: string;
        apellidoUno: string;
        apellidoDos: string;
        roles: String[];
    }

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
                    <img src={Logo}></img>
                    <div className="home_info">
                        <h1>Bienvenido !</h1>
                        {user && typeof user !== 'string' ? (
                            <div>
                                <p>{user.nombre} {user.apellidoUno} {user.apellidoDos}</p>
                            </div>
                        ) : (
                            <p>Cargando ...</p>
                        )}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Home;
