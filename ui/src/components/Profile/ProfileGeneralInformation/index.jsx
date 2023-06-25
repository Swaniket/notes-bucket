import React from "react";

function ProfileGeneralInformation({ user }) {
  return (
    <div>
      <h2 style={{ margin: "10px" }}>Welcome, {user?.firstName}</h2>
      <strong style={{ margin: "10px" }}>Email: {user?.email}</strong>
    </div>
  );
}

export default ProfileGeneralInformation;
