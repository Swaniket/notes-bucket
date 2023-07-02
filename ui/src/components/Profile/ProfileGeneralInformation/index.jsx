import React from "react";

function ProfileGeneralInformation({ firstName, email }) {
  return (
    <div>
      <h2 style={{ margin: "10px" }}>Welcome, {firstName}</h2>
      <strong style={{ margin: "10px" }}>Email: {email}</strong>
    </div>
  );
}

export default ProfileGeneralInformation;
