import React from "react";
import { Container } from "react-bootstrap";
import SearchNotes from "../SearchNotes";
import Note from "../Note";
import "./index.css";

function NoteList({ notes }) {
  const pinnedNotes = notes.filter((note) => note?.isPinned === "true");
  const otherNotes = notes.filter((note) => note?.isPinned !== "true");

  return (
    <>
      {pinnedNotes && pinnedNotes?.length > 0 && (
        <>
          <h6 className="note-section">PINNED NOTES</h6>
          <Container className="note-container">
            {pinnedNotes.map((note) => (
              <Note
                key={note?.noteId}
                noteId={note?.noteId}
                title={note?.heading}
                body={note?.body}
                createdAt={note?.createdAt}
                updatedAt={note?.updatedAt}
                tagName={note?.tagName}
                tagId={note?.tagId}
              />
            ))}
          </Container>
        </>
      )}

      {otherNotes && otherNotes?.length > 0 && (
        <>
          <h6 className="note-section">OTHERS</h6>
          <Container className="note-container">
            {notes.map((note) => (
              <Note
                key={note?.noteId}
                noteId={note?.noteId}
                title={note?.heading}
                body={note?.body}
                createdAt={note?.createdAt}
                updatedAt={note?.updatedAt}
                tagName={note?.tagName}
                tagId={note?.tagId}
              />
            ))}
          </Container>
        </>
      )}
    </>
  );
}

export default SearchNotes(NoteList);
