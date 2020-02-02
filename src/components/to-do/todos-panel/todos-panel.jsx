import React, { Component } from "react";
import TodoItem from "../todo-item/todo-item";

class TodosPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: "28012020-1",
          title: "Tarea Numero 1",
          expireDate: "12/02/2020",
          priority: 2
        },
        {
          id: "28012020-2",
          title: "Tarea Numero 2",
          expireDate: "05/02/2020",
          priority: 1
        },
        {
          id: "28012020-3",
          title: "Tarea Numero 3",
          expireDate: "15/04/2020",
          priority: 4
        }
      ]
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/todo/all")
      .then(res => res.json())
      .then(data => {
        this.setState({ items: data.data });
      })
      .catch(console.log);
  }

  render() {
    const { items } = this.state;
    console.log("Items", items);
    return (
      <div className="w-full">
        {items.map((item, key) => {
          let odd = false;
          if (key % 2 === 0) odd = true;
          return (
            <TodoItem key={"todo-" + key} item={item} odd={odd}></TodoItem>
          );
        })}
      </div>
    );
  }
}

export default TodosPanel;
