import React from "react";

function Page404() {
  const container404 = {
    width: "100%",
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "300",
  };

  const linkStyle = {
    fontSize: "1.6rem",
    color: "lightblue",
    textDecoration: "none",
  };

  return (
    <div style={container404}>
      <div>
        <h2 style={titleStyle}>I think you've taken a wrong turn somewhere!</h2>
      </div>
      <br />
      <div>
        <a style={linkStyle} href="/">
          Click here to get to safety
        </a>
      </div>
    </div>
  );
}

export default Page404;
