import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTags, getTagsState } from "../../../redux/slice/tagsSlice";

function SearchTags(OriginalComponent) {
  return function WrappedComponent(props) {
    const dispatch = useDispatch();

    const { tags } = useSelector(getTagsState);

    useEffect(() => {
      dispatch(getTags());
    }, []);

    return <OriginalComponent {...props} tags={tags} />;
  };
}

export default SearchTags;
