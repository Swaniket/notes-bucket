import React from "react";
import { Container } from "react-bootstrap";
import SearchNotes from "../SearchNotes";
import Note from "../Note";
import "./index.css";

function NoteList({ notes }) {
  return (
    <Container className="note-container">
      {notes.map((note) => (
        <Note
          key={note?.noteId}
          title={note?.heading}
          body={note?.body}
          createdAt={note?.createdAt}
          updatedAt={note?.updatedAt}
          tagName={note?.tagName}
        />
      ))}
    </Container>
  );
}

export default SearchNotes(NoteList);
