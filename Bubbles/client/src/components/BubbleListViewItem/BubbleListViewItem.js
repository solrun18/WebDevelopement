import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BubbleListViewItem = (props) => {
	return (
        <li className="card border-dark mb-3">
    		<div className="card-body">
				<img src={props.bubbleItem.image} width="150" height="150" alt="product"/>
    			<h4 className="card-title"><Link to={ "/" + props.bubbleItem.id }>{props.bubbleItem.name}</Link></h4>
    			<p className="card-text">{props.bubbleItem.description}</p>
    		</div>
    		<div className="card-header">{props.bubbleItem.price}</div>
			<div>
				<button 
					className="addTocartBtn" 
					onClick={() => { props.onClick(props.bubbleItem) } }>
						Add to Cart
				</button>
			</div>
    	</li>
    );
};

BubbleListViewItem.propTypes = {
	bubbleItem: PropTypes.shape({
		// The bubble ID
		id: PropTypes.number.isRequired,
		// Name of the bubble
		name: PropTypes.string.isRequired,
		// Description of the bubble
		description: PropTypes.string.isRequired,
		// Price of the bubble
		price: PropTypes.number.isRequired,
		// Image url for the bubble
        image: PropTypes.string.isRequired
	}).isRequired,
	onClick: PropTypes.func,
};

export default BubbleListViewItem;
