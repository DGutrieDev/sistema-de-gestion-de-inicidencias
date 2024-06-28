import React, { useEffect, useState } from 'react';
import { IonContent, IonInput, IonTextarea, IonButton, IonToast, IonPage, IonRow, IonCol, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonMenuButton, IonButtons, IonNote } from '@ionic/react';
import { useHistory } from 'react-router';
import { useAuth } from '../Auth/authContext';
import axios from 'axios';

import '../styles/formularios.css';


const FormDiagnostico: React.FC = () => {
    const [incidencias, setIncidencias] = useState([]);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastStateColor, setToastStateColor] = useState<string>('');
    const [incidencia, setIncidencia] = useState<string>('');
    const [diagnostico, setDiagnostico] = useState<string>('');
    const [estimacion, setEstimacion] = useState<string>('');
    const [observaciones, setObservaciones] = useState<string>('');
    const [compra, setCompra] = useState<string>('');
    const Host = import.meta.env.VITE_BASE_URL;
    const history = useHistory();
    const { isAuthenticated, usuario } = useAuth();

    
    async function cargarIncidencias() {
        try {
            const response = await axios.get(`${Host}/tecnicos/incidencias/${usuario}`);
            setIncidencias(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        if(isAuthenticated && usuario) cargarIncidencias();
    }, [isAuthenticated, usuario]);
    
    if (!isAuthenticated) {
        history.push('/Login');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${Host}/tecnicos/diagnostico/${incidencia}`, {
                usuario: usuario,
                diagnostico: diagnostico,
                estimacion: estimacion,
                observaciones: observaciones,
                requiere_compra: compra
            });
            if (res.status === 200) {
                setToastStateColor('success');
                setToastMessage('Diagnostico registrado exitosamente.');
                setShowToast(true);
                setTimeout(() => {
                    history.push('/Home');
                }, 1000);
            }
        } catch (error: any) {
            const message = error.response.data.message;
            setToastStateColor('danger');
            setToastMessage('Error al registrar el diagnostico.');
            setShowToast(true);
        }
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
            <IonContent>
                <IonRow>
                    <IonCol size='12' sizeMd='6'>
                        <br />
                        <IonNote className='note'>Diagnostico de Incidencias</IonNote>
                        <br />
                        <form className='form_diagnostico' onSubmit={handleSubmit}>
                            <IonSelect
                                name='incidencia'
                                className='input-fields'
                                interface='popover'
                                label='Incidencia'
                                onIonChange={(e) => setIncidencia(e.detail.value)}
                            >
                                {incidencias.map((incidencia: any) => (
                                    <IonSelectOption
                                        key={incidencia.CT_cod_incidencia}
                                        value={incidencia.CT_cod_incidencia}
                                    >{incidencia.CT_cod_incidencia} - {incidencia.CT_titulo}</IonSelectOption>
                                ))}
                            </IonSelect>
                            <IonInput
                                name='diagnostico'
                                className='input-fields'
                                placeholder='Diagnostico de la Incidencia'
                                onIonChange={(e) => setDiagnostico(e.detail.value!)}
                            ></IonInput>
                            <IonInput
                                name='estimacion'
                                className='input-fields'
                                placeholder='Tiempo Estimado (en horas)'
                                onIonChange={(e) => setEstimacion(e.detail.value!)}
                            ></IonInput>
                            <IonTextarea
                                name='observaciones'
                                className='text-area-field'
                                placeholder='Observaciones del diagnostico'
                                onIonChange={(e) => setObservaciones(e.detail.value!)}
                            ></IonTextarea>
                            <IonInput
                                name='compra'
                                className='input-fields'
                                placeholder='Requiere compra? (Si / No)'
                                onIonChange={(e) => setCompra(e.detail.value!)}
                            ></IonInput>
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                multiple
                                className='input-fields'
                                onChange={(e) => { console.log(e.target.files) }}
                            />
                            <IonButton className='button_form' shape='round' type='submit'>Registrar</IonButton>
                            <IonButton className='button_form' shape='round' type='button' onClick={() => { history.push('/Home') }} color={'danger'}>Cancelar</IonButton>
                        </form>
                    </IonCol>
                </IonRow>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={1000}
                    position="top"
                    color={toastStateColor}
                />
            </IonContent>
        </IonPage>
    );
}

export default FormDiagnostico;