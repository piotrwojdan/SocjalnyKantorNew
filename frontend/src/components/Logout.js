import React, { useState } from "react";

const Logout = () => {
  sessionStorage.removeItem("token");
  console.log("Wylogowano");

  return (
    <div className="content-section">
      <h1>Wylogowano</h1>
    </div>
  );
};

export default Logout;
