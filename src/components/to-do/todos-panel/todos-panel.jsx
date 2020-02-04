import React, { Component } from "react";
import TodoItem from "../todo-item/todo-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";

class TodosPanel extends Component {
  render() {
    const { todos, reloadList, openEditModal } = this.props;
    return (
      <div className="w-full mb-8">
        {todos.length > 0 ? (
          todos.map((item, key) => {
            let odd = false;
            if (key % 2 === 0) odd = true;
            return (
              <TodoItem
                key={"todo-" + key}
                item={item}
                odd={odd}
                updateList={reloadList}
                openEditModal={openEditModal}
              ></TodoItem>
            );
          })
        ) : (
          <div className="text-center text-3xl text-gray-600">
            <p>No hay tareas pendientes</p>
            <FontAwesomeIcon icon={faCalendarCheck} size="3x" />
          </div>
        )}
      </div>
    );
  }
}

export default TodosPanel;
