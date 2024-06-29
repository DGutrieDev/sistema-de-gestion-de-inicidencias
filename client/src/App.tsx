import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { AuthProvider } from './Auth/authContext';
import Menu from './components/Menu';
import Login from './pages/Login';
import Home from './pages/Home';
import RegistrarIncidencias from './pages/Registro_Incidencias';
import RegistrarDiagnosticos from './pages/Registro_Diagnosticos';
import AsignarIncidencias from './pages/Asignar_Incidencias';
import Listado_IncidenciasUsuarios from './pages/Listado_IncidenciasUsuarios';
import Listado_IncidenciasAsignadas from './pages/Listado_IncidenciasAsignadas';
import Listados_IncidenciasSupervisor from './pages/Listados_IncidenciasSupervisor';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to={{ pathname: "/login" }} />
              </Route>
              <Route path="/login" exact={true} component={Login} />
              <Route path="/home" exact={true}>
                <Home />
              </Route>
              <Route path="/registrarIncidencias" exact={true}>
                <RegistrarIncidencias />
              </Route>
              <Route path="/registrarDiagnosticos" exact={true}>
                <RegistrarDiagnosticos />
              </Route>
              <Route path="/asignarIncidencias" exact={true}>
                <AsignarIncidencias />
              </Route>
              <Route path="/listadoIncidenciasUsuarios" exact={true}>
                <Listado_IncidenciasUsuarios />
              </Route>
              <Route path="/listadoIncidenciasAsignadas" exact={true}>
                <Listado_IncidenciasAsignadas /> 
              </Route>
              <Route path="/listadoIncidenciasSupervisor" exact={true}>
                <Listados_IncidenciasSupervisor />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
