import React, { useState } from 'react';
import { IonContent, IonInput, IonTextarea, IonButton, IonToast, IonPage, IonRow, IonCol } from '@ionic/react';
import axios from 'axios';
import '../styles/formularios.css';

interface FormIncidenciasProps {
    closeForm: () => void;
}

const FormIncidencias: React.FC<FormIncidenciasProps> = ({ closeForm }) => {
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastStateColor, setToastStateColor] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const titulo = (document.querySelector('input[name="titulo"]') as HTMLInputElement).value;
            const descrip = (document.querySelector('textarea[name="descripcion"]') as HTMLTextAreaElement).value;
            const lugar = (document.querySelector('input[name="lugar"]') as HTMLInputElement).value;

            if (!titulo || !descrip || !lugar) {
                setToastStateColor('danger');
                setToastMessage('Todos los campos son requeridos.');
                setShowToast(true);
                return;
            }

            const response = await axios.post('http://localhost:3000/api/incidencias/crear', {
                usuario: localStorage.getItem('usuario'),
                titulo: titulo,
                descrip: descrip,
                lugar: lugar,
            });

            if (response.status === 201) {
                setToastStateColor('success');
                setToastMessage('Incidencia registrada exitosamente.');
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                    closeForm();
                }, 1000);
            } else {
                setToastStateColor('danger');
                setToastMessage('Error al registrar la incidencia.');
                setShowToast(true);
            }
        } catch (error) {
            setToastStateColor('danger');
            setToastMessage('Error al registrar la incidencia.');
            setShowToast(true);
            console.log(error);
        }
    };

    return (
        <IonPage>
            <IonContent>
                <IonRow>
                    <IonCol size='12' sizeMd='6'>
                        <form className='form_incidencias' onSubmit={handleSubmit}>
                            <IonInput
                                name='titulo'
                                className='input-fields'
                                placeholder='Titulo de Incidencia'
                            />
                            <IonTextarea
                                name='descripcion'
                                className='text-area-field'
                                placeholder='Descripcion de Incidencia'
                            />
                            <IonInput
                                name='lugar'
                                className='input-fields'
                                placeholder='Lugar de Incidencia'
                            />
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
};

export default FormIncidencias;
