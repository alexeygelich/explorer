import React, { Component } from "react";
import PropTypes from "prop-types";
import db from "./db/data.json";
import App from "./App";

export default class AppContainer extends Component {
  static propTypes = {
    expandedFolders: PropTypes.array,
  };

  state = {
    tree: [],
    search: "",
  };

  componentDidMount() {
    this.parseData();
  }

  parseData = async () => {
    try {
      await this.setState({ tree: db });
    } catch (error) {
      console.log("error", error);
    }

    this.openDefaultPath();
  };

  openFolder = (name) => {
    const { tree } = this.state;
    const newTree = JSON.parse(JSON.stringify(tree));

    newTree.forEach((folder) => {
      if (folder.name === name) {
        if (folder.show) {
          folder.show = false;
          return;
        }

        folder.show = true;

        folder.children.forEach((subfolder) => {
          subfolder.parent = name;
        });
      }
    });

    this.setState({ tree: newTree });
  };

  openFolderWithParent = (name, parent) => {
    const { tree } = this.state;
    const newTree = JSON.parse(JSON.stringify(tree));

    const parseTree = (folders) => {
      let parentName = parent.splice(0, 1)[0];

      if (parent.length === 0) {
        folders.forEach((folder) => {
          if (folder.name === parentName) {
            folder.children.forEach((subfolder) => {
              if (subfolder.name === name) {
                return (subfolder.show = !subfolder.show);
              }
            });
          }
        });

        this.setState({ tree: newTree });
        return;
      }

      folders.forEach((folder) => {
        if (folder.name === parentName) {
          parseTree(folder.children);
        }
      });
    };

    parseTree(newTree);
    this.setState({ tree: newTree });
  };

  handleClick = ({ target }) => {
    const folderName = target.id;
    const folderParent = !!target.dataset.parent ? JSON.parse(target.dataset.parent) : null;

    if (folderParent) {
      this.openFolderWithParent(folderName, folderParent);
      return;
    }

    this.openFolder(folderName);
  };

  handleChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  handleSubmit = (e) => {
    const { search } = this.state;
    e.preventDefault();

    if (!search) {
      return;
    }

    this.searchFiles();
  };

  searchFiles = () => {
    const { tree, search } = this.state;
    const newTree = JSON.parse(JSON.stringify(tree));

    newTree.forEach((folder) => {
      const findQuery = (child) => {
        const childToString = JSON.stringify(child);
        if (!childToString.includes(search)) {
          child.show = false;
          return;
        }

        if (child.type === "FILE") {
          return;
        }

        child.show = true;
        child.children.forEach((subChild) => findQuery(subChild));
      };

      findQuery(folder);
    });
    this.setState({ tree: newTree });
  };

  openDefaultPath = () => {
    const { tree } = this.state;
    const newTree = JSON.parse(JSON.stringify(tree));
    const pathFromProps = this.props.expandedFolders;

    newTree.forEach((branch) => {
      const branchToString = JSON.stringify(branch);

      pathFromProps.forEach((pathEl) => {
        let pathElToArr = pathEl.split("/");
        let isPresent = true;

        pathElToArr.forEach((path) => {
          if (!branchToString.includes(path)) {
            isPresent = false;
          }
        });

        if (!isPresent) {
          return;
        }

        const searchFn = (branch, index = 0) => {
          if (branch.type === "FILE") {
            return;
          }

          let pathArrAfterCheck = pathElToArr.slice(index, pathElToArr.length);
          let isPresent = true;

          pathArrAfterCheck.forEach((pathEl) => {
            if (!JSON.stringify(branch).includes(pathEl)) {
              isPresent = false;
              branch.show = false;
              return;
            }
          });

          if (!isPresent) {
            return;
          }

          branch.show = true;
          if (pathArrAfterCheck.length === 1) {
            return;
          }

          index++;
          branch.children.forEach((branchChild) => searchFn(branchChild, index));
        };

        searchFn(branch);
      });
    });

    this.setState({ tree: [...newTree] });
  };

  render() {
    const { tree, search } = this.state;
    return (
      <App
        onSubmit={this.handleSubmit}
        value={search}
        onChange={this.handleChange}
        tree={tree}
        handleClick={this.handleClick}
      />
    );
  }
}
