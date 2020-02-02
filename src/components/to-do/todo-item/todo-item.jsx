import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isQuickEditing: false
        };
    }


    toggleQuickEdit = () => {
        this.setState({ isQuickEditing: true });
    }

    render() {
        const { item } = this.props;
        return <div className="w-full h-12 px-8 py-4">
            {item.title}
        </div>;
    }
}

TodoItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        expireDate: PropTypes.string,
        priority: PropTypes.number
    })
};

TodoItem.defaultProps = {
    item: {
        title: '',
        expireDate: null,
        priority: 5
    }
};

export default TodoItem;