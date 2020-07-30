import React from "react";
import { Switch, Route } from "react-router-dom";

//routing
import routes from "./routing/routes";

// componenets
import TopNav from "./components/TopNav";

const landingTitle = {
  textAlign: "center",
  fontWeight: "300",
  margin: "10px 0",
};

function App() {
  function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        render={(props) => <route.component {...props} routes={route.routes} />}
      />
    );
  }
  return (
    <div className="App">
      <header>
        <h1 style={landingTitle}>Adventure Shop</h1>
        <TopNav />
      </header>
      <main>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </main>
    </div>
  );
}

export default App;
