import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, getNotesState } from "../../../redux/slice/notesSlice";
// import NoteList from "../NoteList";

function SearchNotes(OriginalComponent) {
  return function WrappedComponent() {
    const dispatch = useDispatch();

    const { filteredNotes, isError, isSuccess, isLoading, message } =
      useSelector(getNotesState);

    useEffect(() => {
      dispatch(getNotes());
    }, []);

    return <OriginalComponent notes={filteredNotes} />;
  };
}

export default SearchNotes;
