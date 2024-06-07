import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonInput, IonTextarea, IonButton, IonMenuButton, IonButtons, IonGrid, IonRow } from '@ionic/react';
import axios from 'axios';
import Logo from '../assets/Logo UCR.png';
import '../styles/registro_incidencias.css';

const RegistroIncidencias: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [lugar, setLugar] = useState('');
    const [imagenes, setImagenes] = useState('');

    const handleRegistro = () => {
        axios.post('http://localhost:3000/api/incidencias/crear', {
            usuario : localStorage.getItem('usuario'),
            titulo: titulo,
            descrip: descripcion,
            lugar: lugar,
            imagenes: imagenes
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    };

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
            <IonContent>
                <IonGrid className='inci_form'>
                    <IonRow>
                        <div className="nom_seccion">
                            <h1>Registro de Incidencias</h1>
                        </div>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default RegistroIncidencias;