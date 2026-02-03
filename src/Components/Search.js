import React from "react";

const Search = ({ setSearch }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
