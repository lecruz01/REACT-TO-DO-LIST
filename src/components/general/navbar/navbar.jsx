import React, { Component } from "react";
import TodoMenu from "../../to-do/menu/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { isMobile } from "react-device-detect";

class Navbar extends Component {
  render() {
    const { changeCategory } = this.props;
    return (
      <div className="fixed top-0 left-0 w-full h-16 flex justify-between items-stretch px-8 py-2 bg-blue-600 text-white border-b border-gray-600 shadow-md z-50">
        <div className="flex-1 flex justify-start items-center">
          <FontAwesomeIcon icon={faReact} className="mr-4" size="2x" />
          <h2 className="uppercase font-semibold">Xcaret ToDo App</h2>
        </div>
        {isMobile && <TodoMenu changeCategory={changeCategory}></TodoMenu>}
      </div>
    );
  }
}

export default Navbar;
