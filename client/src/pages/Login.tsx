import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonPage, IonRow, IonToast } from "@ionic/react";
import { personOutline, lockClosedOutline } from "ionicons/icons";
import { useState } from "react";
import { useAuth } from "../Auth/authContext";
import { useHistory } from "react-router";
import axios from 'axios';
import logo from '../assets/Logo UCR.png';
import '../styles/Login.css';

const Login: React.FunctionComponent<{}> = () => {
    const [usuario, setUsuario] = useState<string>();
    const [contraseña, setContraseña] = useState<string>();
    const { Login } = useAuth();
    const history = useHistory();
    const Host = import.meta.env.VITE_BASE_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${Host}/Login`, {
                usuario: usuario,
                contraseña: contraseña
            });
           if(res.status === 200){
               setTimeout(() => {
                    Login(res.data.data.token, res.data.data.id_usuario);
                    history.push('/Home');
                }, 1000);
           }
        }catch(e){
            console.log(e);
        }
    };
    return (
        <IonPage>
            <IonContent>
                <div className="background">
                    <IonGrid className="Form_container">
                        <IonRow>
                            <div className="nom_sistema">
                                <img src={logo} alt="" className="logoUCR" />
                                <h1>Sistema Gestion de Incidencias</h1>
                            </div>
                            <IonCol size="12" sizeMd="6">
                                <form className="login-form" onSubmit={handleSubmit}>
                                    <IonInput
                                        name="nombre_usuario"
                                        className="login_fields" placeholder="Correo o Identificacion"
                                        onIonChange={(e) => setUsuario(e.detail.value!)}>
                                        <div slot="label">
                                            <IonIcon icon={personOutline} className="icon"></IonIcon>
                                        </div>
                                    </IonInput>
                                    <IonInput
                                        name="contrasena_usuario"
                                        type="password"
                                        className="login_fields" placeholder="Contraseña"
                                        onIonChange={(e) => setContraseña(e.detail.value!)}>
                                        <div slot="label">
                                            <IonIcon icon={lockClosedOutline} className="icon"></IonIcon>
                                        </div>
                                    </IonInput>
                                    <IonButton shape="round" className="button" type="submit">Iniciar Sesion</IonButton>
                                </form>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};
export default Login;
