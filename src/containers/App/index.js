import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReduxToastr from 'react-redux-toastr';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router';

import Home from 'containers/Home';
import Game from 'containers/Game';

import 'styles/containers/app.css';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="app">
        <Helmet>
          <meta name="description" content="Battleship Game" />
          <title>Troy's Test - Battleship Game Challenge</title>
        </Helmet>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game" component={Game} />
          <Route path="" component={Home} />
        </Switch>
        <ReduxToastr
          timeOut={5000}
          newestOnTop={true}
          preventDuplicates
          position="top-right"
          transitionIn="bounceIn"
          transitionOut="bounceOut"
          progressBar={false} />
      </div>
    </MuiThemeProvider>
  );
}
