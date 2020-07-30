// views
import Home from "../views/HomePage.js";
import Page404 from "../views/Page404";
import SignupPage from "../views/SignupPage.js";
import SigninPage from "../views/SigninPage.js";

export default [
  {
    path: "/",
    name: "adventures",
    linkName: "adventures",
    component: Home,
    exact: true,
  },
  {
    path: "/signup",
    name: "signup",
    linkName: "sign up",
    component: SignupPage,
    exact: true,
  },
  {
    path: "/signin",
    name: "signin",
    linkName: "sign in",
    component: SigninPage,
    exact: true,
  },
  {
    path: "/cart",
    name: "cart",
    linkName: "Cart",
    component: null,
    exact: true,
  },
  {
    path: "*",
    component: Page404,
  },
];
