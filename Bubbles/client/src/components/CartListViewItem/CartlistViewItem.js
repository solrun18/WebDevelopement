import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CartListViewItem = (props) => {
	return (
        <div className="section-1">
        <div className="flex-item">
    <h4 className="card-title">#{props.cartItem.count}</h4>
        </div>
    		<div className="flex-item">
				<img src={props.cartItem.image} width="55" height="55" alt="product"/>
            </div>
    		<div className="flex-item">
    			<h4 className="card-title"><Link to={ "/" + props.cartItem.id }>{props.cartItem.name}</Link></h4>
    		</div>
    		<div className="flex-item">{props.cartItem.price}</div>
				<button className="add-one" onClick={() => { props.onAdd(props.cartItem.id,"bubbleItem") } }>+</button>
				<button className="remove-one" onClick={() => { props.onRemove(props.cartItem.id, "bubbleItem") } }>-</button>
    	</div>
    );
};

CartListViewItem.propTypes = {
	cartItem: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    }),
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
};

export default CartListViewItem;