import React from "react";

const Search = (props) => {
  return (
    <div>
      <label for="exampleDataList" class="form-label">
        <b>Search Users by Name, Email, or Location.</b>
      </label>
      <input class="form-control" type="text" placeholder="Type to search..." onChange={props.onChange} />
    </div>
  );
};

export default Search;
