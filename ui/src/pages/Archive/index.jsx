import React from "react";
import { NoteList } from "../../components";

function Archive() {
  return (
    <div>
      <NoteList renderArchive={true} />
    </div>
  );
}

export default Archive;
