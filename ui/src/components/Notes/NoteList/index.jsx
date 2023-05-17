import React from "react";
import { Container } from "react-bootstrap";
import SearchNotes from "../SearchNotes";
import Note from "../Note";
import "./index.css";

function NoteList({ notes, renderArchive = false }) {
  const pinnedNotes = notes.filter(
    (note) => note?.isPinned === "true" && note?.isArchived !== "true"
  );
  const otherNotes = notes.filter(
    (note) => note?.isPinned !== "true" && note?.isArchived !== "true"
  );
  const archiveNotes = notes.filter((note) => note?.isArchived === "true");

  return (
    <>
      {pinnedNotes && !renderArchive && pinnedNotes?.length > 0 && (
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
                isPinned={true}
                isArchived={note?.isArchived === "true" ? true : false}
              />
            ))}
          </Container>
        </>
      )}

      {otherNotes && !renderArchive && otherNotes?.length > 0 && (
        <>
          <h6 className="note-section">OTHERS</h6>
          <Container className="note-container">
            {otherNotes.map((note) => (
              <Note
                key={note?.noteId}
                noteId={note?.noteId}
                title={note?.heading}
                body={note?.body}
                createdAt={note?.createdAt}
                updatedAt={note?.updatedAt}
                tagName={note?.tagName}
                tagId={note?.tagId}
                isPinned={false}
                isArchived={note?.isArchived === "true" ? true : false}
              />
            ))}
          </Container>
        </>
      )}

      {renderArchive ? (
        <>
          <h6 className="note-section">ARCHIVE NOTES</h6>
          <Container className="note-container">
            {archiveNotes.map((note) => (
              <Note
                key={note?.noteId}
                noteId={note?.noteId}
                title={note?.heading}
                body={note?.body}
                createdAt={note?.createdAt}
                updatedAt={note?.updatedAt}
                tagName={note?.tagName}
                tagId={note?.tagId}
                isPinned={note?.isArchived === "true" ? true : false}
                isArchived={note?.isArchived === "true" ? true : false}
              />
            ))}
          </Container>
        </>
      ) : null}
    </>
  );
}

export default SearchNotes(NoteList);
