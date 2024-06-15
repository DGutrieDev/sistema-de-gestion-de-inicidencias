import React, { useEffect, useState } from 'react';
import { IonContent, IonInput, IonTextarea, IonButton, IonToast, IonPage, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import axios from 'axios';

import '../styles/formularios.css';

interface FormDiagnosticoProps {
    closeForm: () => void;
}

const FormDiagnostico: React.FC<FormDiagnosticoProps> = ({ closeForm }) => {
    const [incidencias, setIncidencias] = useState([]);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastStateColor, setToastStateColor] = useState<string>('');

    async function cargarIncidencias() {
        try {
            const usuario = localStorage.getItem('usuario');
            const response = await axios.get(`http://localhost:3000/api/incidencias/reparacion/${usuario}`);
            setIncidencias(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        cargarIncidencias();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const diagnostico = (document.querySelector('[name=diagnostico]') as HTMLInputElement).value;
            const estimacion = (document.querySelector('[name=estimacion]') as HTMLInputElement).value;
            const observaciones = (document.querySelector('[name=observaciones]') as HTMLInputElement).value;
            const compra = (document.querySelector('[name=compra]') as HTMLInputElement).value;
            const id_incidencia = (document.querySelector('[name=incidencia]') as HTMLInputElement).value;
            if (!diagnostico || !estimacion || !observaciones || !compra) {
                setToastStateColor('danger');
                setToastMessage('Todos los campos son requeridos');
                setShowToast(true);
            } else {
                const response = await axios.post(`http://localhost:3000/api/diagnostico/crear/${id_incidencia}`, {
                    usuario: localStorage.getItem('usuario'),
                    diagnostico,
                    estimacion,
                    observaciones,
                    requiere_compra: compra
                });
                if (response.status === 201) {
                    setToastStateColor('success');
                    setToastMessage('Diagnostico registrado exitosamente');
                    setShowToast(true);
                    setTimeout(() => {
                        setShowToast(false);
                        closeForm();
                    }, 1000);
                } else {
                    setToastStateColor('danger');
                    setToastMessage('Error al registrar el diagnostico');
                    setShowToast(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonRow>
                    <IonCol size='12' sizeMd='6'>
                        <form className='form_diagnostico' onSubmit={handleSubmit}>
                            <IonSelect
                                name='incidencia'
                                className='input-fields'
                                interface='popover'
                                label='Incidencia'
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
                            ></IonInput>
                            <IonInput
                                name='estimacion'
                                className='input-fields'
                                placeholder='Tiempo Estimado (en horas)'
                            ></IonInput>
                            <IonTextarea
                                name='observaciones'
                                className='text-area-field'
                                placeholder='Observaciones del diagnostico'
                            ></IonTextarea>
                            <IonInput
                                name='compra'
                                className='input-fields'
                                placeholder='Requiere compra? (Si / No)'
                            ></IonInput>
                            <IonButton className='button' shape='round' type='submit'>Registrar</IonButton>
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