import React, { Component } from "react";
import db from "./db/data.json";
import "./App.css";
import FolderList from "./components/FolderList";

export default class App extends Component {
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

  onOpen = (name, parent) => {
    const { tree } = this.state;
    const newTree = [].concat(tree);
    if (parent) {
      const parseTree = (array) => {
        let parentName = parent[0];
        parent.splice(0, 1);
        if (parent.length === 0) {
          array.forEach((el) => {
            if (el.name === parentName) {
              el.children.forEach((el) => {
                if (el.name === name) {
                  if (el.show) {
                    el.show = false;
                    return;
                  }
                  el.show = true;
                }
              });
            }
          });
          this.setState({ tree: newTree });
          return;
        }
        array.forEach((el) => {
          if (el.name === parentName) {
            parseTree(el.children);
          }
        });
      };
      parseTree(newTree);

      return;
    }
    newTree.forEach((el) => {
      if (el.name === name) {
        if (el.show) {
          el.show = false;
          return;
        }
        el.show = true;
        el.children.forEach((el) => {
          el.parent = [name];
        });
      }
    });
    this.setState({ tree: newTree });
  };

  handleClick = ({ target }) => {
    const name = target.id;
    const parent = !!target.dataset.parent ? JSON.parse(target.dataset.parent) : "";
    this.onOpen(name, parent);
  };

  handleChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.searchFiles();
  };

  searchFiles = () => {
    const { tree, search } = this.state;
    const newTree = JSON.parse(JSON.stringify(tree));
    newTree.forEach((el) => {
      const findQuery = (obj) => {
        const objStr = JSON.stringify(obj);
        if (!objStr.includes(search)) {
          obj.show = false;
          return;
        }
        if (obj.type === "FILE") {
          this.setState({ tree: newTree });
          return;
        }
        obj.show = true;
        obj.children.forEach((el) => findQuery(el));
      };
      findQuery(el);
    });
  };

  openDefaultPath = () => {
    const { tree } = this.state;
    const newTree = JSON.parse(JSON.stringify(tree));
    const pathArr = this.props.expandedFolders;
    newTree.forEach((branch) => {
      const branchStr = JSON.stringify(branch);

      pathArr.forEach((el) => {
        let arr = el.split("/");
        let isPresent = true;

        arr.forEach((elem) => {
          if (!branchStr.includes(elem)) {
            isPresent = false;
          }
        });
        if (!isPresent) {
          return;
        }
        let lastEl = arr[arr.length - 1];

        const searchFn = (obj) => {
          if (!JSON.stringify(obj).includes(lastEl)) {
            return;
          }
          obj.show = true;
          if (obj.name === lastEl) {
            this.setState({ tree: [...newTree] });
            return;
          }
          obj.children.forEach((el) => searchFn(el));
        };
        searchFn(branch);
      });
    });
  };

  render() {
    const { tree, search } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={search} onChange={this.handleChange} />
        </form>
        {tree && <FolderList tree={tree} handleClick={this.handleClick} />}
      </>
    );
  }
}
