import React, { useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

//routing
import routes from "./routing/routes";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from "./store/actions/cartAction";
import { setCart } from "./store/actions/cartAction";

// componenets
import TopNav from "./components/TopNav";

// custon css
const landingTitle = {
  textAlign: "center",
  fontWeight: "300",
  margin: "20px 0 30px 0",
  listStyle: "none",
};

const mainContainer = {
  minHeight: "80vh",
};

const hamedLink = {
  color: "inherit",
  textDecoration: "none",
};

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);

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
        render={(props) => {
          if (!route.protected || isLogged) {
            return <route.component {...props} routes={route.routes} />;
          }
          return <Redirect to="/signin" />;
        }}
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
      <main style={mainContainer}>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </main>
      <footer className="text-center lead">
        &copy; 2020{" "}
        <a
          style={hamedLink}
          href="https://hamedpour.github.io/portfolio-website/"
        >
          HamedPour
        </a>{" "}
      </footer>
    </div>
  );
}

export default App;
