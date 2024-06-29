import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { IonContent, IonInput, IonTextarea, IonButton, IonToast, IonPage, IonRow, IonCol, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonNote, useIonViewWillEnter } from '@ionic/react';
import { useAuth } from '../Auth/authContext';
import ImageUploader from "../components/ImageUploader";
import axios from 'axios';
import '../styles/formularios.css';


const FormIncidencias: React.FC = () => {
    // State hooks
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastStateColor, setToastStateColor] = useState<string>('');
    const [base64, setBase64] = useState<string | null>(null)
    const [titulo, setTitulo] = useState<string>('');
    const [descrip, setDescrip] = useState<string>('');
    const [lugar, setLugar] = useState<string>('');

    // History hook
    const history = useHistory();
    const Host = import.meta.env.VITE_BASE_URL;

    // Auth hook
    const { isAuthenticated,usuario } = useAuth();

    useIonViewWillEnter(() => {
        setBase64(null);
        setDescrip('');
        setLugar('');
        setTitulo('');
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try{
            if(!titulo || !descrip || !lugar){
                setToastStateColor('danger');
                setToastMessage('Por favor llene todos los campos');
                setShowToast(true);
                return;
            }
            const res = await axios.post(`${Host}/usuarios/crearIncidencias`, {
                usuario: usuario,
                titulo: titulo,
                descripcion: descrip,
                lugar: lugar,
                imagen: base64 ? base64 : null
            });
            if(res.status === 201){
                setToastStateColor('success');
                setToastMessage('Incidencia registrada con exito');
                setShowToast(true);
                setTitulo('');
                setDescrip('');
                setLugar('');
                setBase64(null);
                setTimeout(() => {
                    history.push('/listadoIncidenciasUsuarios');
                }, 1000);
            }
        }catch(error){
            console.log(error);
        }
    };

    if (!isAuthenticated) {
        return null;
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
                        <IonNote className='note'>Registrar Incidencias</IonNote>
                        <br />
                        <form className='form_incidencias' onSubmit={handleSubmit}>
                            <IonInput
                                name='titulo'
                                className='input-fields'
                                placeholder='Titulo de Incidencia'
                                value={titulo}
                                onIonChange={(e: any) => setTitulo(e.detail.value)}
                            />
                            <IonTextarea
                                name='descripcion'
                                className='text-area-field'
                                placeholder='Descripcion de Incidencia'
                                value={descrip}
                                onIonChange={(e: any) => setDescrip(e.detail.value)}
                            />
                            <IonInput
                                name='lugar'
                                className='input-fields'
                                placeholder='Lugar de Incidencia'
                                value={lugar}
                                onIonChange={(e: any) => setLugar(e.detail.value)}
                            />
                            <ImageUploader onImageUpload={setBase64}  onError={(error)=>console.log(error)}/>
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
};

export default FormIncidencias;
