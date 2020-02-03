import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import "./modal-create.scss";

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.closeModal = this.closeModal.bind(this);

    this.todoName = createRef();
    this.todoDescription = createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { opened: prevOpened } = prevState;
    const { opened: openedSent } = this.props;

    if (prevOpened !== openedSent) {
      this.setState({ opened: openedSent });
    }
  }

  closeModal() {
    const { onClose } = this.props;
    this.setState({ opened: false });
    if (onClose) onClose();
  }

  createTodo = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    console.log(this.todoName.current.value);
  };

  render() {
    const classesMobile =
      "modal-create fixed top-0 left-0 w-screen h-screen flex flex-col justify-between items-stretch px-8 py-12 bg-white z-50";
    const classesDesktop =
      "modal-create fixed w-1/2 h-auto flex flex-col justify-between items-stretch px-8 py-12 bg-white z-50";
    const backdropClasses =
      "modal-backdrop fixed left-0 w-screen h-screen bg-black opacity-0 z-20";

    const { opened } = this.state;

    if (isMobile) {
      return (
        <div className={opened ? classesMobile + " opened" : classesMobile}>
          <div className="modal-header h-16 flex justify-center items-center">
            <h1 className="w-full text-center text-2xl">Agregar Tarea</h1>
          </div>
          <div className="modal-body flex-1 py-4">
            <form
              className="flex flex-col justify-start items-center"
              onSubmit={this.createTodo}
            >
              <input
                type="text"
                ref={this.todoName}
                className="w-full h-12 mb-2 px-2 border border-gray-600 rounded-lg"
                placeholder="Nombre de la tarea"
              />
              <textarea
                ref={this.todoDescription}
                cols="50"
                rows="10"
                className="w-full mb-4 p-2 border border-gray-600 rounded-md"
                placeholder="Descripcion (Opcional)"
              ></textarea>
              <button
                className="px-4 py-2 bg-blue-600 text-white uppercase rounded-lg"
                type="submit"
              >
                Crear
              </button>
            </form>
          </div>
          <div className="modal-footer h-16 flex justify-center items-center">
            <button
              className="w-2/5 h-12 border border-gray-600 rounded-full uppercase"
              onClick={this.closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      );
    }
    return (
      <>
        <div className={opened ? classesDesktop + " opened" : classesDesktop}>
          <div className="modal-header h-16 flex justify-center items-center">
            <h1 className="w-full text-center text-2xl">Agregar Tarea</h1>
          </div>
          <div className="modal-body flex-1 py-4">
            <form
              className="flex flex-col justify-start items-center"
              onSubmit={this.createTodo}
            >
              <input
                type="text"
                ref={this.todoName}
                className="w-full h-12 mb-2 px-2 border border-gray-600 rounded-lg"
                placeholder="Nombre de la tarea"
              />
              <textarea
                ref={this.todoDescription}
                cols="50"
                rows="10"
                className="w-full mb-4 p-2 border border-gray-600 rounded-md"
                placeholder="Descripcion (Opcional)"
              ></textarea>
              <button
                className="px-4 py-2 bg-blue-600 text-white uppercase rounded-lg"
                type="submit"
              >
                Crear
              </button>
            </form>
          </div>
          <div className="modal-footer h-16 flex justify-center items-center">
            <button
              className="w-2/5 h-12 border border-gray-600 rounded-full uppercase"
              onClick={this.closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
        <div
          className={opened ? backdropClasses + " opened" : backdropClasses}
        ></div>
      </>
    );
  }
}

ModalCreate.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ModalCreate;
