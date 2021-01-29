import React from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";

const FolderList = ({ tree, handleClick, parent }) => (
  <ul>
    {tree.map((item) => (
      <ListItem key={item.name} item={item} handleClick={handleClick} parent={parent} />
    ))}
  </ul>
);

FolderList.propTypes = {
  // bla: PropTypes.string,
};

FolderList.defaultProps = {
  // bla: 'test',
};

export default FolderList;
