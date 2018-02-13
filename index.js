import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store, { history } from "./store/createStore";
import { ConnectedRouter } from "react-router-redux";

import AppContainer from "./components/App/AppContainer";

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
