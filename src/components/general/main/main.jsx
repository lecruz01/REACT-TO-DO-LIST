import React, { Component } from "react";
import TodoCategories from "../../to-do/menu/menu";
import TodosPanel from "../../to-do/todos-panel/todos-panel";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import { isBrowser } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Main extends Component {
  render() {
    return (
      <div className="w-full lg:mx-auto px-4 lg:px-16 mt-20">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {isBrowser && (
            <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
              <TodoCategories></TodoCategories>
            </div>
          )}
          <div className="w-full lg:flex-1">
            <h1 className="mb-4 text-2xl">
              <FontAwesomeIcon icon={faListAlt} className="mr-2" />
              Lista de Tareas
            </h1>
            <TodosPanel></TodosPanel>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
