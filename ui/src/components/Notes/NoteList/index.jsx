import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, getNotesState } from "../../../redux/slice/notesSlice";
import Note from "../Note";
import "./index.css";

function NoteList() {
  const dispatch = useDispatch();

  const { notes, isError, isSuccess, isLoading, message } =
    useSelector(getNotesState);

  useEffect(() => {
    dispatch(getNotes());
  }, []);

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

export default NoteList;
