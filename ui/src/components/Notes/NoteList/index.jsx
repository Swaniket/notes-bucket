import React from "react";
import { Container } from "react-bootstrap";
import SearchNotes from "../SearchNotes";
import Note from "../Note";
import NoData from "../../common/NoData";
import noNotes from "../../../assets/no_notes.svg";
import noArchiveNotes from "../../../assets/no_archive_notes.svg";

import "./index.css";

function NoteList({ notes, renderArchive = false }) {
  let noNoteIndicator = false;
  let noArchiveNoteIndicator = false;
  let pinnedNotes = [];
  let otherNotes = [];
  let archiveNotes = [];

  // When notes is Array
  if (notes instanceof Array && notes?.length === 0) {
    noNoteIndicator = true;
  }
  // When notes is undefined or null
  else if (!notes) {
    noNoteIndicator = true;
  }
  // When its an object
  else {
    if (notes instanceof Object && Object.keys(notes).length === 0) {
      noNoteIndicator = true;
    } else {
      pinnedNotes = notes?.filter(
        (note) => note?.isPinned === "true" && note?.isArchived !== "true"
      );
      otherNotes = notes?.filter(
        (note) => note?.isPinned !== "true" && note?.isArchived !== "true"
      );
      archiveNotes = notes?.filter((note) => note?.isArchived === "true");
    }
  }

  if (archiveNotes?.length === 0) {
    noArchiveNoteIndicator = true;
  }

  if (!renderArchive && noNoteIndicator) {
    return <NoData svgImage={noNotes} helperText="Notes you add appear here" />;
  }

  if (renderArchive && noArchiveNoteIndicator) {
    return (
      <NoData
        svgImage={noArchiveNotes}
        helperText="Your archived notes appear here"
      />
    );
  }

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
                isPinned={note?.isPinned === "true" ? true : false}
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
