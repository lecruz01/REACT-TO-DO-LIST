import React, { Component } from 'react';
import TodoItem from '../todo-item/todo-item';

class TodosPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    title: 'Tarea Numero 1',
                    expireDate: '12/02/2020',
                    priority: 2
                },
                {
                    title: 'Tarea Numero 2',
                    expireDate: '05/02/2020',
                    priority: 1
                },
                {
                    title: 'Tarea Numero 3',
                    expireDate: '15/04/2020',
                    priority: 4
                }
            ]
        };
    }

    render() {
        const { items } = this.state;
        return <div className="w-full">
            {
                items.map((item, key) => {
                    return <TodoItem key={'todo-'+key} item={item}></TodoItem>
                })
            }
        </div>;
    }
}

export default TodosPanel;