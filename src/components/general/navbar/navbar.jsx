import React, { Component } from "react";
import TodoCategories from "../../to-do/menu/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { isMobile } from "react-device-detect";

class Navbar extends Component {
  render() {
    return (
      <div className="fixed top-0 left-0 w-full h-16 flex justify-between items-stretch px-8 py-2 bg-blue-600 text-white border-b border-gray-600 shadow-md z-50">
        <div className="flex-1 flex justify-start items-center">
          <FontAwesomeIcon icon={faReact} className="mr-4" size="2x" />
          <h2 className="uppercase font-semibold">Xcaret ToDo App</h2>
        </div>
        {isMobile && <TodoCategories></TodoCategories>}
      </div>
    );
  }
}

export default Navbar;
