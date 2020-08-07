import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { removeToken } from "../store/actions/tokenAction";
import { signout } from "../store/actions/isLoggedAction";

function SignoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(signout());
    dispatch(removeToken());
    history.push("/signin");
  }, [history, dispatch]);

  return <div>Sign out sucessfully</div>;
}

export default SignoutPage;
