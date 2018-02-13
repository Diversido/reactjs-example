import React, { Component } from "react";
import Notifications from "react-notification-system-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router-dom";

import OrdersListContainer from "../OrdersList/OrdersListContainer";
import OrderContainer from "../Order/OrderContainer";
import NotFound from "../shared/NotFound";

class App extends Component {
  render() {
    const { notifications } = this.props;
    return (
      <div>
        <Notifications notifications={notifications} />
        <Switch>
          <Route
            exact
            path="/"
            render={({ location }) => <OrdersListContainer />}
          />
          <Route
            exact
            path="/order/:id"
            render={({ match }) => (
              <OrderContainer id={parseInt(match.params.id)} />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
