import React from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import ListItemContainer from "./ListItem/ListItemContainer";

const FolderList = ({ tree, handleClick, parent }) => (
  <ul>
    {tree.map((branch) => (
      <ListItemContainer key={uuidv4()} branch={branch} handleClick={handleClick} parent={parent} />
    ))}
  </ul>
);

FolderList.propTypes = {
  tree: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  parent: PropTypes.array,
};

export default FolderList;
