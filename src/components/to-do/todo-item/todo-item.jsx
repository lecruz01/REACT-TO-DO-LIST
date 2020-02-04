import React, { Component } from "react";
import PropTypes from "prop-types";
import { updateTodo } from "../../../services/todos-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";
import {
  faInfoCircle,
  faEllipsisV,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import { isMobile, isBrowser } from "react-device-detect";
import "./todo-item.scss";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: null,
      itemMenuOpened: false
    };
    this.toggleMenuMobile = this.toggleMenuMobile.bind(this);
  }

  componentDidMount() {
    const { item } = this.props;
    this.setState({ itemData: item });
  }

  toggleMenuMobile() {
    const { itemMenuOpened } = this.state;
    this.setState({ itemMenuOpened: !itemMenuOpened });
  }

  sendToBin() {
    const { itemData } = this.state;
    const { updateList } = this.props;
    const newData = {
      title: itemData.title,
      description: itemData.description,
      priority: itemData.priority,
      expirationDate: itemData.expirationDate,
      category: "papelera",
      completed: itemData.complete
    };
    updateTodo(itemData.id, newData)
      .then(res => {
        const { updateTodo } = res.data.data;
        if (updateTodo) updateList();
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { item, odd, openEditModal } = this.props;
    const { itemMenuOpened } = this.state;
    const itemClasses =
      "w-full p-2 flex justify-between items-stretch flex-wrap border border-gray-600";
    const itemControlsClasses =
      "item-controls w-full lg:w-2/5 flex justify-end items-stretch border-r lg:border-r-0 border-l border-b lg:border-b-0 border-gray-600 z-40 overflow-hidden";
    return (
      <div className="todo-item">
        <div
          className={
            odd ? "bg-white " + itemClasses : "bg-gray-400 " + itemClasses
          }
        >
          <div className="w-4/5 lg:w-3/5 p-2 lg:py-0 flex flex-col justify-between items-start">
            <p>
              {item.priority === 1 && (
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="mr-2 text-red-700"
                />
              )}
              {item.title}
            </p>
            {item.expirationDate && (
              <p className="text-gray-600 text-xs self-end">
                Expira: {item.expirationDate}
              </p>
            )}
          </div>
          {isMobile && (
            <div
              className="w-1/5 px-4 flex justify-center items-center"
              onClick={this.toggleMenuMobile}
            >
              <FontAwesomeIcon icon={faEllipsisV} size="lg" />
            </div>
          )}
          {isBrowser && (
            <div className={itemControlsClasses}>
              <button
                className="flex-1 h-full p-2 text-green-500"
                onClick={() => {
                  openEditModal(item);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
                <br />
                <span className="text-sm">Editar</span>
              </button>
              <button className="flex-1 h-full p-2 text-blue-700">
                <FontAwesomeIcon icon={faInfoCircle} className="mx-2" />
                <br />
                <span className="text-sm">Detalles</span>
              </button>
              <button
                className="flex-1 h-full p-2 text-red-500"
                onClick={this.sendToBin}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mx-2" />
                <br />
                <span className="text-sm">Eliminar</span>
              </button>
            </div>
          )}
          <div className="w-full px-2 py-2 lg:mt-2 bg-gray-300">
            <p className="mb-4 text-gray-700">ID: {item.id}</p>
            <p className="uppercase text-gray-800">Descripcion de la tarea</p>
            <p className="text-gray-900 mb-4">{item.description}</p>
            <p className="text-gray-900 mb-4">Prioridad: {item.priority}</p>
            <p className="text-gray-900">Categoria: {item.category.name}</p>
          </div>
        </div>
        {isMobile && (
          <div
            className={
              itemMenuOpened
                ? itemControlsClasses + " h-16 bg-white"
                : itemControlsClasses + " h-0 bg-white"
            }
          >
            <button
              className="flex-1 h-full p-2 text-green-500"
              onClick={() => {
                openEditModal(item);
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
              <br />
              <span className="text-sm">Editar</span>
            </button>
            <button className="flex-1 h-full p-2 text-blue-700">
              <FontAwesomeIcon icon={faInfoCircle} className="mx-2" />
              <br />
              <span className="text-sm">Detalles</span>
            </button>
            <button
              className="flex-1 h-full p-2 text-red-500"
              onClick={() => {
                this.sendToBin(item.id);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mx-2" />
              <br />
              <span className="text-sm">Eliminar</span>
            </button>
          </div>
        )}
      </div>
    );
  }
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    expireDate: PropTypes.string,
    priority: PropTypes.number
  }),
  odd: PropTypes.bool
};

TodoItem.defaultProps = {
  item: {
    id: "0",
    title: "",
    expireDate: null,
    priority: 5
  },
  odd: false
};

export default TodoItem;
