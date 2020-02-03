import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import TodoItem from "../todo-item/todo-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

const TODOS_QUERY = gql`
  {
    getTodos {
      id
      title
      description
      expirationDate
      priority
    }
  }
`;

const TodosPanel = () => {
  // const fetchData = async () => {
  //   await fetch('http://localhost:4000/todos/list')
  //   .then(res => {

  //   });
  // }
  const { loading, error, data } = useQuery(TODOS_QUERY);

  if (loading)
    return (
      <p className="w-full text-center text-2xl">
        Cargando tareas
        <br />
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </p>
    );
  if (error)
    return (
      <p className="w-full text-center text-2xl">
        Ocurrio un error al cargar los datos
        <br />
        <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
      </p>
    );

  return (
    <div className="w-full mb-8">
      {data.getTodos.map((item, key) => {
        let odd = false;
        if (key % 2 === 0) odd = true;
        return <TodoItem key={"todo-" + key} item={item} odd={odd}></TodoItem>;
      })}
    </div>
  );
};

export default TodosPanel;
