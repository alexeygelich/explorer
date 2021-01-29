import React from "react";
import PropTypes from "prop-types";
import FolderList from "../../FolderList";

const ListItem = ({ branch, handleClick, parent, newParent, className, onClick }) => {
  return (
    <>
      <li id={branch.name} data-parent={parent && JSON.stringify(parent)} onClick={onClick} className={className}>
        {branch.name}
      </li>
      {branch.show && <FolderList tree={branch.children} handleClick={handleClick} parent={newParent} />}
    </>
  );
};

ListItem.propTypes = {
  branch: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  parent: PropTypes.array,
  newParent: PropTypes.array,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListItem;
