import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CartListBundleItem = (props) => {
	return (
        <div className="section-1">
        <div className="flex-item">
        <h4 className="card-title">#{props.cartItem.count}</h4>
        </div>
    		<div className="flex-item">
    			<h4 className="card-title"><Link to={ "/" + props.cartItem.bundleId }>{props.cartItem.bundleName}</Link></h4>
    		</div>
    		<div className="flex-item">{props.cartItem.bundlePrice}</div>
				<button className="add-one" onClick={() => { props.ondAddBundle(props.cartItem.id,"bundle") } }>+</button>
				<button className="remove-one" onClick={() => { props.onRemoveBundle(props.cartItem.id, "bundle") } }>-</button>
    	</div>
    );
};

CartListBundleItem.propTypes = {
	cartItem: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		items: PropTypes.array
    }),
    onAddBundle: PropTypes.func,
    onRemoveBundle: PropTypes.func,
};

export default CartListBundleItem;