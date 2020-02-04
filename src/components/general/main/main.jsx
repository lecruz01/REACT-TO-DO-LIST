import React, { Component } from "react";
import TodoMenu from "../../to-do/menu/menu";
import TodosPanel from "../../to-do/todos-panel/todos-panel";
import ModalCreate from "../../to-do/modal-create/modal-create";
import {
  getTodosFinalizados,
  getTodosPendientes,
  getTodosUrgentes,
  getTodosEliminados
} from "../../../services/todos-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { isBrowser, isMobile } from "react-device-detect";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedModal: false,
      categoryShown: "pendientes",
      todos: [],
      editItem: null
    };
    this.loadTodos = this.loadTodos.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  componentDidMount() {
    if (isMobile) {
      const { mobileCategory } = this.props;
      this.setState({ categoryShown: mobileCategory });
      this.loadTodos();
    } else {
      this.loadTodos();
    }
  }

  // componentDidUpdate(_, prevState) {
  //   if (isMobile) {
  //     const { categoryShown } = prevState;
  //     const { mobileCategory } = this.props;
  //     // console.log(categoryShown);
  //     // console.log(mobileCategory);

  //     if (categoryShown !== mobileCategory) {
  //       this.setState({ categoryShown: mobileCategory });
  //       setTimeout(() => {
  //         console.log("cambio categoria: " + this.state.categoryShown);
  //         this.loadTodos();
  //       }, 500);
  //     }
  //   }
  // }

  openModalCreate = () => {
    this.setState({ openedModal: true });
  };

  openModalEdit = item => {
    this.setState({ editItem: item });
    this.setState({ openedModal: true });
  };

  onCloseModal = () => {
    this.setState({ editItem: null });
    this.setState({ openedModal: false });
  };

  loadTodos() {
    const { categoryShown } = this.state;
    let getToUse;
    switch (categoryShown) {
      case "pendientes":
        getToUse = getTodosPendientes;
        break;
      case "finalizados":
        getToUse = getTodosFinalizados;
        break;
      case "urgentes":
        getToUse = getTodosUrgentes;
        break;
      case "papelera":
        getToUse = getTodosEliminados;
        break;
      default:
        getToUse = getTodosPendientes;
        break;
    }
    getToUse()
      .then(res => {
        const { getTodos: todos } = res.data.data;
        this.setState({ todos });
      })
      .catch(err => {
        console.error(err);
      });
  }

  changeCategory(newCat) {
    console.log(newCat);
    this.setState({ categoryShown: newCat });
    this.loadTodos();
  }

  render() {
    const { openedModal, todos, categoryShown, editItem } = this.state;
    return (
      <div className="w-full lg:mx-auto px-4 lg:px-16 mt-20">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {isBrowser && (
            <div className="w-full lg:w-1/3 mb-8 lg:mb-0 pr-4">
              <TodoMenu changeCategory={this.changeCategory}></TodoMenu>
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
            <TodosPanel
              key={categoryShown}
              todos={todos}
              reloadList={this.loadTodos}
              openEditModal={this.openModalEdit}
            ></TodosPanel>
          </div>
        </div>
        <ModalCreate
          opened={openedModal}
          onClose={this.onCloseModal}
          refreshList={this.loadTodos}
          editableItem={editItem}
        />
      </div>
    );
  }
}

export default Main;
