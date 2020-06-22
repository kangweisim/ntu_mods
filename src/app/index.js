import MomentUtils from '@date-io/moment';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from "@material-ui/styles";
import { createBrowserHistory } from 'history';
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router-dom';
import './assets/scss/index.scss';
import { CookiesNotification, ScrollReset } from './components';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/prismjs';
import './mixins/validate';
import routes from "./routes";
import { API } from "./services";
import { store } from './store';
import { ProfileActions } from "./store/actions";
import theme from "./theme";


const history = createBrowserHistory();

function App() {

  store.dispatch(ProfileActions.loading_profile(true));
  useEffect(() => {
    const load_profile = async () => {
      const { localstore } = store.getState();
      const { access_token } = localstore;
      if (!access_token) {
        store.dispatch(ProfileActions.loading_profile(false));
        return;
      }
      const { entity } = await API.Auth.retrieve_profile(access_token.token);
      store.dispatch(ProfileActions.update_session(entity, access_token))
    };

    load_profile()
      .finally(() => store.dispatch(ProfileActions.loading_profile(false)));
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router history={history}>
            <ScrollReset />
            <CookiesNotification />
            {renderRoutes(routes)}
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
