import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, getNotesState } from "../../../redux/slice/notesSlice";

function SearchNotes(OriginalComponent) {
  return function WrappedComponent(props) {
    const dispatch = useDispatch();

    const {
      filteredNotes,
      isError,
      isSuccess,
      isLoading,
      message,
      filteredNotesByTag,
    } = useSelector(getNotesState);

    useEffect(() => {
      dispatch(getNotes());
    }, []);

    let notesToShow = [];
    if (
      Object.keys(filteredNotesByTag).length > 0 &&
      filteredNotesByTag?.shouldConsider
    ) {
      notesToShow = filteredNotesByTag?.notes;
    } else {
      // Most probably this is an object, make it into an array
      notesToShow = filteredNotes;
    }

    return <OriginalComponent {...props} notes={notesToShow} />;
  };
}

export default SearchNotes;
