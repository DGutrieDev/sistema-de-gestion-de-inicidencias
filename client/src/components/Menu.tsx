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

import { useLocation } from 'react-router-dom';
import { exitOutline, addCircleOutline, listCircleOutline } from 'ionicons/icons';
import { IonFooter } from '@ionic/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Menu.css';

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
  const location = useLocation();
  const [user, setUser] = useState<User | string | null>(null);
  const Host = import.meta.env.VITE_BASE_URL;

  async function getUser() {
    const response = await axios.get(`${Host}/usuarios/informacionUsuario/702730905`);
    setUser(response.data.data);
  }

  useEffect(() => {
    getUser();
  }, []);

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
            <IonNote>Roles de Usuario</IonNote>
            {user.roles.map((rol, index) => (
              <IonItem key={index}>
                {rol.CT_id_Rol === '1' ? (
                  <>
                    {/* Add your code here */}
                  </>
                ) : null}
                {rol.CT_id_Rol === '2' ? (
                  <>
                    <IonMenuToggle autoHide={false}>
                      <IonNote>Usuario</IonNote>
                      <IonItem
                        routerLink="/registrarIncidencias"
                        routerDirection="none"
                        detail={false}
                      >
                        <IonIcon slot="start" icon={addCircleOutline} />
                        Registrar Incidencias
                      </IonItem>
                      <IonItem
                        routerLink="/registrarIncidencias"
                        routerDirection="none"
                        detail={false}
                      >
                        <IonIcon slot="start" icon={listCircleOutline} />
                        Listar Incidencias
                      </IonItem>
                    </IonMenuToggle>
                  </>
                ) : null}
                {rol.CT_id_Rol === '3' ? (
                  <>
                    {/* Add your code here */}
                  </>
                ) : null}
                {rol.CT_id_Rol === '4' ? (
                  <>
                    {/* Add your code here */}
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
            <IonItem>
              <>
                <IonMenuToggle autoHide={false}>
                  <IonNote>Usuario</IonNote>
                  <IonItem
                    routerLink="/registrarIncidencias"
                    routerDirection="none"
                    detail={false}
                  >
                    <IonIcon slot="start" icon={addCircleOutline} />
                    Registrar Incidencias
                  </IonItem>
                  <IonItem
                    routerLink="/registrarIncidencias"
                    routerDirection="none"
                    detail={false}
                  >
                    <IonIcon slot="start" icon={listCircleOutline} />
                    Listar Incidencias
                  </IonItem>
                </IonMenuToggle>
              </>
            </IonItem>
          </IonList>}
      </IonContent>
      <IonFooter className="footer-toolbar">
        <IonButton color={'danger'} className='exit_button'>
          <IonIcon slot="start" icon={exitOutline} />
          Cerrar Sesión
        </IonButton>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
