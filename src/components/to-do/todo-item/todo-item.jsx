import React, { Component } from "react";
import PropTypes from "prop-types";
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
      itemMenuOpened: false
    };
    this.toggleMenuMobile = this.toggleMenuMobile.bind(this);
  }

  toggleMenuMobile() {
    const { itemMenuOpened } = this.state;
    this.setState({ itemMenuOpened: !itemMenuOpened });
  }

  sendToBin(id) {
    console.log("Item " + id + " was sent to the trash bin");
  }

  render() {
    const { item, odd } = this.props;
    const { itemMenuOpened } = this.state;
    const itemClasses =
      "w-full p-2 flex justify-between items-stretch border border-gray-600";
    const itemControlsClasses =
      "item-controls w-full lg:w-2/5 flex justify-end items-stretch z-40 overflow-hidden";
    return (
      <div className="todo-item">
        <div
          className={
            odd ? "bg-white " + itemClasses : "bg-gray-400 " + itemClasses
          }
        >
          <div className="w-full lg:w-3/5 p-2 lg:py-0 flex justify-start items-center">
            {item.priority === 1 && (
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="mr-2 text-red-700"
              />
            )}
            <p>{item.title}</p>
          </div>
          {isMobile && (
            <div
              className="px-4 flex justify-center items-center"
              onClick={this.toggleMenuMobile}
            >
              <FontAwesomeIcon icon={faEllipsisV} size="lg" />
            </div>
          )}
          {isBrowser && (
            <div className={itemControlsClasses}>
              <button className="flex-1 h-full p-2 text-green-500">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="flex-1 h-full p-2 text-blue-700">
                <FontAwesomeIcon icon={faInfoCircle} className="mx-2" />
              </button>
              <button
                className="flex-1 h-full p-2 text-red-500"
                onClick={() => {
                  this.sendToBin(item.id);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mx-2" />
              </button>
            </div>
          )}
        </div>
        {isMobile && (
          <div
            className={
              itemMenuOpened
                ? itemControlsClasses + " h-16 bg-white"
                : itemControlsClasses + " h-0 bg-white"
            }
          >
            <button className="flex-1 h-full p-2 text-green-500">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="flex-1 h-full p-2 text-blue-700">
              <FontAwesomeIcon icon={faInfoCircle} className="mx-2" />
            </button>
            <button
              className="flex-1 h-full p-2 text-red-500"
              onClick={() => {
                this.sendToBin(item.id);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mx-2" />
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
    id: "01012000-0",
    title: "",
    expireDate: null,
    priority: 5
  },
  odd: false
};

export default TodoItem;
