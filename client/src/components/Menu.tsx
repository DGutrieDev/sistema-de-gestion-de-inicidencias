import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRow,
  IonText,
} from '@ionic/react';

import { exitOutline, addCircleOutline, listCircleOutline } from 'ionicons/icons';
import { IonFooter } from '@ionic/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../styles/Menu.css';
import { useHistory } from 'react-router';
import { useAuth } from '../Auth/authContext';
interface User {
  nombre: string;
  correo: string;
  apellidoUno: string;
  apellidoDos: string;
  puesto: string;
  roles: Roles[];
}

interface Roles {
  CT_id_Rol: string;
  CT_desc_rol: string;
}

const Menu: React.FC = () => {
  const [user, setUser] = useState<User | string | null>(null);
  const Host = import.meta.env.VITE_BASE_URL;
  const { Logout, isAuthenticated, usuario } = useAuth();
  const history = useHistory();

  async function getUser() {
    const response = await axios.get(`${Host}/usuarios/informacionUsuario/${usuario}`);
    setUser(response.data.data);
  }

  useEffect(() => {
    if (isAuthenticated && usuario) {
      getUser();
    }
  }, [isAuthenticated, usuario]);

  const handleLogout = () => {
    Logout();
    history.push('/login');
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <IonMenu contentId="main" type="reveal">
      <IonContent>
        <IonList id="inbox-list">
          {user && typeof user !== 'string' ? (
            <>
              <IonListHeader>{user.nombre} {user.apellidoUno} {user.apellidoDos}</IonListHeader>
              <br />
              <IonNote>{user.puesto}</IonNote>
            </>
          ) : (
            <>
              <IonListHeader>Denny Gutrie Arguedas</IonListHeader>
              <br />
              <IonNote>Desarrollador</IonNote>
            </>
          )}
          <IonNote>UCR</IonNote>
        </IonList>
        {user && typeof user !== 'string' ? (
          <IonList id="labels-list">
            <IonNote>Roles</IonNote>
            {user.roles.map((rol, index) => (
              <IonItem key={index} lines='none'>
                {rol.CT_id_Rol === '1' ? (
                  <>
                    {/* Add your code here */}
                  </>
                ) : null}
                {rol.CT_id_Rol === '2' ? (
                  <>
                    <IonMenuToggle autoHide={false}>
                      <br />
                      <IonNote>
                        {rol.CT_desc_rol}
                      </IonNote>
                      <IonItem
                        routerLink="/registrarIncidencias"
                        routerDirection="none"
                        detail={true}
                        lines='none'
                      >
                        Nueva Incidencias
                      </IonItem>
                      <IonItem
                        routerLink="/registrarIncidencias"
                        routerDirection="none"
                        detail={true}
                        lines='none'
                      >
                        Listar Incidencias
                      </IonItem>
                    </IonMenuToggle>
                  </>
                ) : null}
                {rol.CT_id_Rol === '3' ? (
                  <>
                    <IonMenuToggle autoHide={false}>
                      <br />
                      <IonNote>
                        {rol.CT_desc_rol}
                      </IonNote>
                      <IonItem
                        routerLink="/asignarIncidencias"
                        routerDirection="none"
                        detail={true}
                        lines='none'
                      >
                        Asignar Incidencias
                      </IonItem>
                      <IonItem
                        routerLink="/registrarIncidencias"
                        routerDirection="none"
                        detail={true}
                        lines='none'
                      >
                        Listar Incidencias Registradas
                      </IonItem>
                    </IonMenuToggle>
                  </>
                ) : null}
                {rol.CT_id_Rol === '4' ? (
                  <>
                    <IonMenuToggle autoHide={false}>
                      <br />
                      <IonNote>
                        {rol.CT_desc_rol}
                      </IonNote>
                      <IonItem
                        routerLink="/registrarDiagnosticos"
                        routerDirection="none"
                        detail={true}
                        lines='none'
                      >
                        Registrar Diagnosticos
                      </IonItem>
                      <IonItem
                        routerLink="/registrarIncidencias"
                        routerDirection="none"
                        detail={true}
                        lines='none'
                      >
                        Listar Incidencias Asignadas
                      </IonItem>
                    </IonMenuToggle>
                  </>
                ) : null}
                {rol.CT_id_Rol === '5' ? (
                  <>
                    {/* Add your code here */}
                  </>
                ) : null}
              </IonItem>
            ))}
          </IonList>
        ) :
          <IonList id="labels-list">
            <IonNote>Roles de Usuario</IonNote>
            <IonItem lines='none'>
              <IonMenuToggle autoHide={false}>
                <br />
                <IonNote>
                  Prueba
                </IonNote>
                <IonItem
                  routerLink="/registrarDiagnosticos"
                  routerDirection="none"
                  detail={true}
                  lines='none'
                >
                  Registrar Diagnosticos
                </IonItem>
                <IonItem
                  routerLink="/registrarIncidencias"
                  routerDirection="none"
                  detail={true}
                  lines='none'
                >
                  Listar Incidencias Asignadas
                </IonItem>
              </IonMenuToggle>
            </IonItem>
          </IonList>}
      </IonContent>
      <IonFooter className="footer-toolbar">
        <IonButton color={'danger'} className='exit_button' onClick={handleLogout}>
          <IonIcon slot="start" icon={exitOutline} />
          Cerrar Sesión
        </IonButton>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
