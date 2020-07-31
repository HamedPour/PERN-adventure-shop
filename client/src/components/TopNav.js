import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// routing
import allRoutes from "../routing/routes";

// react-bootstrap
import Nav from "react-bootstrap/Nav";

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

function TopNav({ token }) {
  const [tokenFound, setToken] = useState(false);

  useEffect(() => {
    if (token) {
      console.log("HAVE TOKEN");
      setToken(token);
    }
    return () => {};
  }, [token]);

  function resolveRoutes(routes) {
    let result = [];
    // if its * send it back
    routes.forEach((route) => {
      if (route.path === "*") {
        return;
      }
      if (!tokenFound) {
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
