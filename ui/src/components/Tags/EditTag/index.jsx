import React from "react";

function EditTag({ closeModal, id, name }) {
  return (
    <>
      <h1>{id}</h1>
      <p>{name}</p>
    </>
  );
}

export default EditTag;
