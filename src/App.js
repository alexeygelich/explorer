import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import FolderList from "./components/FolderList";

export default function App({ onSubmit, value, onChange, handleClick, tree }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <button type="submit">Search</button>
      </form>
      {tree && <FolderList tree={tree} handleClick={handleClick} />}
    </>
  );
}

App.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  tree: PropTypes.array.isRequired,
};
