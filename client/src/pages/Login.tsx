import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonPage, IonRow, IonToast } from "@ionic/react";
import { personOutline, lockClosedOutline, time } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from 'axios';
import './Login.css';
import logo from '../assets/Logo UCR.png';

const Login: React.FunctionComponent<{}> = () => {
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastStateColor, setToastStateColor] = useState<string>('');
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const usuario = (document.querySelector('input[name="nombre_usuario"]') as HTMLInputElement).value
            const password = (document.querySelector('input[name="contrasena_usuario"]') as HTMLInputElement).value

            if (!usuario || !password) {
                setToastStateColor('danger');
                setToastMessage('Todos los campos son requeridos.');
                setShowToast(true);
                throw new Error('Por favor, complete todos los campos.');
            }

            const response = await axios.post('http://localhost:3000/api/login', {
                usuario,
                password
            });
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('usuario', response.data.data.id_usuario);
            if (response.status === 200) {
                setToastStateColor('success');
                setToastMessage('Inicio de sesion exitoso.');
                setShowToast(true);
                setTimeout(() => {
                    history.push('/home');
                }, 2000);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        };
    };
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonGrid className="Form_container">
                    <IonRow>
                        <div className="nom_sistema">
                            <img src={logo} alt="" className="logoUCR" />
                            <h1>Sistema Gestion de Incidencias</h1>
                        </div>
                        <IonCol size="12" sizeMd="6">
                            <form className="login-form">
                                <IonInput
                                    name="nombre_usuario"
                                    className="input_fields" placeholder="Correo o Identificacion" required>
                                    <div slot="label">
                                        <IonIcon icon={personOutline} className="icon"></IonIcon>
                                    </div>
                                </IonInput>
                                <IonInput
                                    name="contrasena_usuario"
                                    type="password"
                                    className="input_fields" placeholder="Contraseña" required>
                                    <div slot="label">
                                        <IonIcon icon={lockClosedOutline} className="icon"></IonIcon>
                                    </div>
                                </IonInput>
                                <IonButton shape="round" className="button" onClick={handleSubmit}>Iniciar Sesion</IonButton>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <div className="circle1"></div>
                <div className="circle2"></div>
                <span className="dot"></span>
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
export default Login;
