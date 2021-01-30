import React from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import styles from "./ListItem.module.css";

function ListItemContainer({ branch, handleClick, parent }) {

  const handleItemClick = (e) => {
    if (branch.type === "FILE") {
      return;
    }
    handleClick(e);
  };

  let newParent = [];

  if (parent) {
    newParent = [...parent, branch.name];
  } else {
    newParent = [branch.name];
  }

  let classItem = "";
  
  if (branch.type === "FILE") {
    classItem = styles.file;
  } else {
    classItem = branch.show ? styles.open : styles.close;
  }

  return (
    <ListItem
      branch={branch}
      parent={parent}
      newParent={newParent}
      onClick={handleItemClick}
      handleClick={handleClick}
      className={classItem}
    />
  );
}

ListItemContainer.propTypes = {
  branch: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  parent: PropTypes.array,
};

export default ListItemContainer;
