import React from "react";
import { Container } from "react-bootstrap";
import Note from "../Note";
import "./index.css";

const notes = [
  {
    noteId: "3774626e-6091-4910-b877-2375d331f4b9",
    createdAt: "2023-03-19T23:45:43.000Z",
    updatedAt: "2023-03-19T23:45:43.000Z",
    heading: "Test heading",
    body: "This is some test body",
    isPinned: "false",
    isArchived: "false",
    tagId: "T003",
    tagName: "Development",
    userId: "d81fccc7-37d4-41ae-a562-e82a121a1f6c",
  },
  {
    noteId: "79a95e5f-ab7f-4fcf-a8bb-087e8e6f3430",
    createdAt: "2023-03-19T22:59:07.000Z",
    updatedAt: "2023-03-19T22:59:07.000Z",
    heading: "Test heading",
    body: "This is some test body",
    isPinned: "false",
    isArchived: "false",
    tagId: "T002",
    tagName: "Personal",
    userId: "d81fccc7-37d4-41ae-a562-e82a121a1f6c",
  },
  {
    noteId: "c12201ef-f836-4409-bcd3-c39ce907d51e",
    createdAt: "2023-03-19T23:11:20.000Z",
    updatedAt: "2023-03-19T23:11:20.000Z",
    heading: "Test heading",
    body: "This is some test body",
    isPinned: "false",
    isArchived: "false",
    tagId: "T002",
    tagName: "Personal",
    userId: "d81fccc7-37d4-41ae-a562-e82a121a1f6c",
  },
];

function NoteList() {
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
