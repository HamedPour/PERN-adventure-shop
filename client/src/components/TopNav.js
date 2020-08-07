import React from "react";
import { NavLink } from "react-router-dom";
// routing
import allRoutes from "../routing/routes";

// react-bootstrap
import Nav from "react-bootstrap/Nav";

// Redux
import { useSelector } from "react-redux";

const navIcons = {
  width: "20px",
  marginRight: "5px",
  paddingBottom: "3px",
};

const normaliseLink = {
  linkStyle: "none",
  textDecoration: "none",
};

const activeLink = {
  color: "green",
};

const cartBadge = {
  backgroundColor: "#0275d8",
  position: "relative",
  fontSize: "0.8rem",
  fontWeight: "bold",
  bottom: "10px",
  right: "1px",
  padding: "2px 8px",
  borderRadius: "50%",
  color: "#fff",
};

function TopNav() {
  const totalQty = useSelector((state) => state.cart.totalQty);
  const isLogged = useSelector((state) => state.isLogged);
  function resolveRoutes(routes) {
    let result = [];
    // if its * send it back
    routes.forEach((route) => {
      if (route.path === "*" || route.name === "home") {
        return;
      }
      if (!isLogged) {
        // user has not token
        if (route.name === "signup" || route.name === "signin") {
          result.push(route);
        }
        return;
      }
      // user has token, remove signup and sigin
      if (route.name === "signup" || route.name === "signin") {
        return;
      }
      result.push(route);
    });
    return result;
  }

  const routes = resolveRoutes(allRoutes);

  return (
    <>
      <Nav justify="right">
        {routes.map((route, i) => {
          return (
            <Nav.Item key={i}>
              <NavLink
                to={route.path}
                activeStyle={activeLink}
                exact={route.exact}
                style={normaliseLink}
              >
                <Nav.Link as="span">
                  <img
                    style={navIcons}
                    alt={`${route.name} icon`}
                    src={
                      process.env.PUBLIC_URL + `/images/icons/${route.name}.png`
                    }
                  />
                  {route.linkName.toUpperCase()}
                  {route.linkName === "Cart" ? (
                    <span style={cartBadge}>{totalQty}</span>
                  ) : null}
                </Nav.Link>
              </NavLink>
            </Nav.Item>
          );
        })}
      </Nav>
    </>
  );
}

export default TopNav;
