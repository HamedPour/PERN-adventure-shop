import React from "react";
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

function TopNav() {
  const routes = allRoutes.filter((route) => {
    // This is stupid and Vue.js would not make me have to do this!
    return route.path !== "*";
  });
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
