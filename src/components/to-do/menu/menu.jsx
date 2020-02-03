import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faTimes,
  faCheckCircle,
  faExclamationCircle,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import "./menu.scss";

class TodoMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  openMenu = () => {
    const { opened } = this.state;
    this.setState({ opened: !opened });
  };

  render() {
    const { opened } = this.state;
    const categoryStyles =
      "todo-category flex justify-between items-center px-4 py-2 bg-white cursor-pointer hover:bg-gray-300";
    if (isMobile) {
      const mobileClasses =
        "menu absolute top-0 right-0 w-1/2 mt-16 text-black shadow-lg text-center";
      return (
        <div className="menu-mobile flex justify-center items-center">
          <div
            ref="burguer-button"
            className="px-4"
            onClick={this.openMenu.bind(this)}
          >
            <FontAwesomeIcon icon={opened ? faTimes : faBars} size="2x" />
          </div>
          <div
            ref="burguer-menu"
            className={opened ? "opened " + mobileClasses : mobileClasses}
          >
            <div className={categoryStyles}>
              Tareas Finalizadas
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-600 ml-2"
              />
            </div>
            <div className={categoryStyles}>
              Finaliza pronto
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="text-red-500 ml-2"
              />
            </div>
            <div className={categoryStyles}>
              Tareas pendientes
              <FontAwesomeIcon
                icon={faFileAlt}
                className="text-blue-500 ml-2"
              />
            </div>
            <div
              className={
                categoryStyles + " bg-red-600 text-white hover:bg-red-700"
              }
            >
              Papelera
              <FontAwesomeIcon icon={faTrashAlt} className="ml-2" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full border border-gray-500 shadow-lg rounded-b">
        <p className="px-4 py-2 bg-blue-400 text-white text-sm font-semibold">
          Categorias
        </p>
        <div className="categories">
          <div className={categoryStyles}>
            Tareas Finalizadas
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-600 mr-2"
            />
          </div>
          <div className={categoryStyles}>
            Finaliza pronto
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-red-500 mr-2"
            />
          </div>
          <div className={categoryStyles}>
            Tareas pendientes
            <FontAwesomeIcon icon={faFileAlt} className="text-blue-500 mr-2" />
          </div>
          <div
            className={
              categoryStyles + " bg-red-600 text-white hover:bg-red-700"
            }
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
            Papelera
          </div>
        </div>
      </div>
    );
  }
}

export default TodoMenu;
