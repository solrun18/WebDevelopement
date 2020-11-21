import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BundlesListViewItemBubbleItem = (props) => {
    return (
        <li className="card border-dark mb-3 bundleBubbleCard">
            <div className="card-body">
                <img src={ props.bubbleItem.bubbleImage } width="150" height="150" alt="product" />
                <h4 className="card-title"><Link to={ "/" + props.bubbleItem.bubbleId }>{ props.bubbleItem.bubbleName }</Link></h4>
                <p className="card-text">{ props.bubbleItem.bubbleDescription }</p>
            </div>
        </li>
    );
}

BundlesListViewItemBubbleItem.propTypes = {
	bubbleItem: PropTypes.shape({
        // The bubble ID
        bubbleId: PropTypes.number.isRequired,
        // Bubble name
        bubbleName: PropTypes.string.isRequired,
        // Bubble description - what kind of bubble etc.
        bubbleDescription: PropTypes.string.isRequired,
        // Individual bubble price - bundles come at 10% discount, not required here as it is not shown
        bubblePrice: PropTypes.number,
        // Link to the bubble image
        bubbleImage: PropTypes.string.isRequired
	}).isRequired,
	onClick: PropTypes.func,
};

export default BundlesListViewItemBubbleItem;