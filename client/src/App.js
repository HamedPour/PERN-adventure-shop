import React, { useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

//routing
import routes from "./routing/routes";

// Redux
import { useDispatch } from "react-redux";
import { deleteCart } from "./store/actions/cartAction";
import { setCart } from "./store/actions/cartAction";

// componenets
import TopNav from "./components/TopNav";

const landingTitle = {
  textAlign: "center",
  fontWeight: "300",
  margin: "10px 0",
  listStyle: "none",
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) return;
    const { expires } = cart;
    if (expires < Date.now()) {
      // time has expired
      localStorage.removeItem("cart");
      return dispatch(deleteCart());
    }
    // All good - load cart from localstorage
    dispatch(setCart(cart));
  }, [dispatch]);

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
        <h1 style={landingTitle}>
          <Link
            to="/"
            style={{ color: "inherit", textDecoration: "none" }}
            as="div"
          >
            Adventure Shop
          </Link>
        </h1>
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
