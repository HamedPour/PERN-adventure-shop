// views
import Home from "../views/HomePage.js";
import Adventures from "../views/Adventures.js";
import Page404 from "../views/Page404";
import SignupPage from "../views/SignupPage";
import SigninPage from "../views/SigninPage";
import SignoutPage from "../views/SignoutPage";
import Cart from "../views/Cart";

export default [
  {
    path: "/",
    name: "home",
    linkName: "home",
    component: Home,
    exact: true,
  },
  {
    path: "/adventures",
    name: "adventures",
    linkName: "adventures",
    component: Adventures,
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
    component: Cart,
    protected: true,
    exact: true,
  },
  {
    path: "/signout",
    name: "signout",
    linkName: "sign out",
    component: SignoutPage,
    exact: true,
  },
  {
    path: "*",
    component: Page404,
  },
];
