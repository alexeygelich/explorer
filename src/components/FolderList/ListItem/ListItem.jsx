import React from "react";
import PropTypes from "prop-types";
import FolderList from "../../FolderList";

const ListItem = ({ item, handleClick, parent }) => {
  const handleItemClick = (e) => {
    if (item.type === "FILE") {
      return
    }
    handleClick(e);
  };
  let newParent = [];
  if (parent) {
    newParent = [...parent, item.name];
  } else {
    newParent = [item.name];
  }

  return (
    <>
      <li id={item.name} data-parent={parent && JSON.stringify(parent)} onClick={handleItemClick}>
        {item.name}
      </li>
      {item.show && <FolderList tree={item.children} handleClick={handleClick} parent={newParent} />}
    </>
  );
};

ListItem.propTypes = {
  // bla: PropTypes.string,
};

ListItem.defaultProps = {
  // bla: 'test',
};

export default ListItem;
