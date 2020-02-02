import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isQuickEditing: false
    };
  }

  toggleQuickEdit = () => {
    this.setState({ isQuickEditing: true });
  };

  sendToBin(id) {
    console.log("Item " + id + " was sent to the trash bin");
  }

  render() {
    const { item, odd } = this.props;
    const itemClasses =
      "w-full p-2 flex justify-between items-stretch border border-gray-600";
    return (
      <div
        className={
          odd ? "bg-white " + itemClasses : "bg-gray-400 " + itemClasses
        }
      >
        <div className="flex-1 px-2">{item.title}</div>
        <div className="item-controls w-1/2 flex justify-end items-stretch">
          <button className="flex-1 h-full p-2 text-green-500">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="flex-1 h-full p-2 text-red-500"
            onClick={() => {
              this.sendToBin(item.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mx-2" />
          </button>
          <button className="flex-1 h-full p-2 text-blue-700">
            <FontAwesomeIcon icon={faInfoCircle} className="mx-2" />
          </button>
        </div>
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
