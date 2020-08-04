import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

//routing
import routes from "./routing/routes";

// componenets
import TopNav from "./components/TopNav";

const landingTitle = {
  textAlign: "center",
  fontWeight: "300",
  margin: "10px 0",
  listStyle: "none",
};

function App() {
  const [token, setToken] = useState(null);
  const [adventurer, setAdventurer] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function tokenHandler(aToken) {
    setToken(aToken);
  }

  function handleNewAdventurer(data) {
    setAdventurer(data);
  }

  function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        render={(props) => (
          <route.component
            {...props}
            token={token}
            callTokenHandler={tokenHandler}
            setNewAdventurer={handleNewAdventurer}
            routes={route.routes}
          />
        )}
      />
    );
  }
  return (
    <div className="App">
      <header>
        <h1 style={landingTitle}>
          <Link
            to="/"
            style={{ color: "inherit", textDecoration: "none" }}
            as="div"
          >
            Adventure Shop
          </Link>
        </h1>
        <TopNav token={token} />
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
