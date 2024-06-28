import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { AuthProvider } from './Auth/authContext';
import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './pages/Login';
import Home from './pages/Home';
import RegistrarIncidencias /* FormIncidencias */ from './components/FormIncidencias';

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
                <Redirect to={{ pathname: "/home" }} />
              </Route>
              <Route path="/folder/Inbox" exact={true}>
                <Page />
              </Route>
              <Route path="/login" exact={true} component={Login} />
              <Route path="/home" exact={true}>
                <Home />
              </Route>
              <Route path="/registrarIncidencias" exact={true}>
                <RegistrarIncidencias />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
