import React, { Component } from "react";
import TodoCategories from "../../to-do/menu/menu";
import TodosPanel from "../../to-do/todos-panel/todos-panel";
import ModalCreate from "../../to-do/modal-create/modal-create";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { isBrowser } from "react-device-detect";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedModal: false
    };
  }

  openModalCreate = () => {
    this.setState({ openedModal: true });
  };

  onCloseModal = () => {
    this.setState({ openedModal: false });
  };

  render() {
    const { openedModal } = this.state;
    return (
      <div className="w-full lg:mx-auto px-4 lg:px-16 mt-20">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {isBrowser && (
            <div className="w-full lg:w-1/3 mb-8 lg:mb-0 pr-4">
              <TodoCategories></TodoCategories>
            </div>
          )}
          <div className="w-full lg:flex-1 lg:pl-4">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl">
                <FontAwesomeIcon icon={faListAlt} className="mr-2" />
                Lista de Tareas
              </h1>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg uppercase"
                onClick={this.openModalCreate}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Nuevo
              </button>
            </div>
            <TodosPanel></TodosPanel>
          </div>
        </div>
        <ModalCreate opened={openedModal} onClose={this.onCloseModal} />
      </div>
    );
  }
}

export default Main;
