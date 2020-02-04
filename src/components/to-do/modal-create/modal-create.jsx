import React, { Component, createRef } from "react";
import { createTodo } from "../../../services/todos-service";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import "./modal-create.scss";

class ModalCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      itemToEdit: null,
      isEdit: false
    };

    this.closeModal = this.closeModal.bind(this);
    this.checkUrgent = this.checkUrgent.bind(this);

    this.todoName = createRef();
    this.todoDescription = createRef();
    this.urgentCheck = createRef();
    this.dateEnd = createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { opened: prevOpened } = prevState;
    const { editableItem: oldEditable } = prevProps;
    const { opened: openedSent, editableItem } = this.props;

    if (prevOpened !== openedSent) {
      this.setState({ opened: openedSent });
    }

    if (oldEditable !== editableItem) {
      this.setState({ itemToEdit: editableItem });
      if (editableItem) this.setState({ isEdit: true });
      else this.setState({ isEdit: false });
    }
  }

  closeModal() {
    const { onClose } = this.props;
    this.setState({ opened: false });
    this.clearForm();
    if (onClose) onClose();
  }

  checkUrgent() {
    const checked = this.urgentCheck.current.checked;
    this.urgentCheck.current.checked = !checked;
    if (checked) {
    } else {
    }
  }

  createTodo = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    const name = this.todoName.current.value;
    const description = this.todoDescription.current.value;
    const urgent = this.urgentCheck.current.checked ? 1 : 2;
    const category = urgent === 1 ? "urgentes" : "pendientes";
    const firstDate = new Date(this.dateEnd.current.value);
    if (firstDate.toString() === "Invalid Date") return;
    let month = "" + (firstDate.getMonth() + 1),
      day = "" + firstDate.getDate(),
      year = firstDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    const date = [day, month, year].join("-");
    if (name !== "") {
      createTodo(name, urgent, category, description, date)
        .then(res => {
          const { addTodo } = res.data.data;
          if (addTodo) {
            this.closeModal();
            const { refreshList } = this.props;
            refreshList();
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  clearForm() {
    this.todoName.current.value = "";
    this.todoDescription.current.value = "";
    this.urgentCheck.current.checked = false;
    this.dateEnd.current.value = null;
  }

  render() {
    const classesMobile =
      "modal-create fixed top-0 left-0 w-screen h-screen flex flex-col justify-between items-stretch px-8 py-12 bg-white z-50";
    const classesDesktop =
      "modal-create fixed w-1/2 h-auto flex flex-col justify-between items-stretch px-8 py-12 bg-white z-50";
    const backdropClasses =
      "modal-backdrop fixed left-0 w-screen h-screen bg-black opacity-0 z-20";

    const { opened, isEdit } = this.state;
    // let itemDate = undefined;
    // if (itemToEdit) {
    //   const orDate = itemToEdit.expirationDate;
    //   let arrOrDate = orDate.split("-");
    //   arrOrDate = arrOrDate.reverse();
    //   itemDate = arrOrDate.join("-");
    // }

    if (isMobile) {
      return (
        <div className={opened ? classesMobile + " opened" : classesMobile}>
          <div className="modal-header h-16 flex justify-center items-center">
            <h1 className="w-full text-center text-2xl">
              {isEdit ? "Editar" : "Agregar"} Tarea
            </h1>
          </div>
          <div className="modal-body flex-1 py-4">
            <form
              className="flex flex-col justify-start items-center"
              onSubmit={this.createTodo}
            >
              <input
                type="text"
                ref={this.todoName}
                className="w-full h-12 mb-2 px-2 bg-gray-100 border border-gray-600 rounded-lg"
                placeholder="Nombre de la tarea"
              />
              <textarea
                ref={this.todoDescription}
                cols="50"
                rows="10"
                className="w-full mb-4 p-2 bg-gray-100 border border-gray-600 rounded-md"
                placeholder="Descripcion (Opcional)"
              ></textarea>
              <div className="w-full flex justify-between items-center mb-4">
                <div className="flex-1 pr-2">
                  <label htmlFor="dateEnd" className="block mb-2">
                    Finaliza
                  </label>
                  <input
                    ref={this.dateEnd}
                    className="w-full p-2 bg-gray-100 border border-gray-600 rounded-lg"
                    type="date"
                    name="dateEnd"
                  />
                </div>
                <div className="flex justify-start items-center">
                  <input
                    ref={this.urgentCheck}
                    type="checkbox"
                    name="box-urgent"
                  />
                  <label htmlFor="box-urgent" className="text-red-500">
                    Urgente
                  </label>
                </div>
              </div>
              <button
                className="w-2/5 px-4 py-2 bg-blue-600 text-white uppercase rounded-lg"
                type="submit"
              >
                Crear
              </button>
            </form>
          </div>
          <div className="modal-footer h-16 flex justify-center items-center">
            <button
              className="w-2/5 px-4 py-2 border border-gray-600 rounded-lg uppercase"
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
