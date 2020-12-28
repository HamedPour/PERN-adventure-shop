// views
import Home from "../views/HomePage.js";
import Adventures from "../views/Adventures.js";
import Page404 from "../views/Page404";
import SignupPage from "../views/SignupPage";
import SigninPage from "../views/SigninPage";
import SignoutPage from "../views/SignoutPage";
import Cart from "../views/Cart";
import PaymentResult from "../views/PaymentResult";

export default [
  {
    path: "/",
    name: "home",
    linkName: "home",
    component: Home,
    invisible: true,
    protected: false,
    exact: true,
  },
  {
    path: "/adventures",
    name: "adventures",
    linkName: "adventures",
    component: Adventures,
    invisible: false,
    protected: true,
    exact: true,
  },
  {
    path: "/signup",
    name: "signup",
    linkName: "sign up",
    component: SignupPage,
    invisible: false,
    protected: false,
    exact: true,
  },
  {
    path: "/signin",
    name: "signin",
    linkName: "sign in",
    component: SigninPage,
    invisible: false,
    protected: false,
    exact: true,
  },
  {
    path: "/cart",
    name: "cart",
    linkName: "Cart",
    component: Cart,
    invisible: false,
    protected: true,
    exact: true,
  },
  {
    path: "/cart/payment-result",
    name: "paymentresult",
    linkName: "payment result",
    component: PaymentResult,
    invisible: true,
    protected: true,
    exact: true,
  },
  {
    path: "/signout",
    name: "signout",
    linkName: "sign out",
    component: SignoutPage,
    invisible: false,
    protected: true,
    exact: true,
  },
  {
    path: "*",
    invisible: true,
    protected: false,
    component: Page404,
  },
];
