import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { isMobile } from 'react-device-detect';

class TodoMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryStyles: 'todo-category px-4 py-2 bg-white cursor-pointer hover:bg-gray-300',
            categories: [
                {
                    id: 'next-todos',
                    name: 'Tareas proximas a finalizar'
                },
                {
                    id: 'general-todos',
                    name: 'Tareas pendientes'
                },
                {
                    id: 'bin-todos',
                    name: 'Papelera',
                    isBin: true
                },
            ]
        };
    }

    openMenu = () => {
        console.log('menu opened');
    }

    render() {
        const { categoryStyles, categories } = this.state;
        if ( isMobile ) {
            return <div className="flex justify-center items-center">
                <div ref="burguer-button" className="px-4" onClick={this.openMenu.bind(this)}>
                    <FontAwesomeIcon icon={faEllipsisV} size="2x"/>
                </div>
                <div ref="burguer-menu" className="hidden">
                    { categories.map(item => {
                        return <div
                            key={item.id}
                            className={item.isBin ? categoryStyles + ' bg-red-600 text-white hover:bg-red-700' : categoryStyles}
                            >
                            {item.isBin && <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />}
                            { item.name }
                        </div>
                    }) }
                </div>
            </div>;
        }
        return <div className="w-full border border-gray-500 shadow-lg rounded-b">
            <p className="px-4 py-2 bg-blue-400 text-white text-sm font-semibold">Categorias</p>
            <div className="categories">
                { categories.map(item => {
                    return <div
                        key={item.id}
                        className={item.isBin ? categoryStyles + ' bg-red-600 text-white hover:bg-red-700' : categoryStyles}
                        >
                        {item.isBin && <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />}
                        { item.name }
                    </div>
                }) }
            </div>
        </div>;
    }
}

export default TodoMenu;