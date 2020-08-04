import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function SignoutPage({ callTokenHandler }) {
  const history = useHistory();
  useEffect(() => {
    localStorage.removeItem("token");
    callTokenHandler(null);
    history.push("/signin");
  }, [callTokenHandler, history]);

  return <div>Sign out sucessfully</div>;
}

export default SignoutPage;
