import React from 'react'
import { Link } from 'react-router-dom';
import BundleListViewItemBubbles from '../BundleListViewItemBubbles/BundleListViewItemBubbles';
import PropTypes from 'prop-types';

const BundleListViewItem = (props) => {
    return (
        <li className="card border-dark mb-3">
            <div className="card-body">
                <div className="split">
                    <div className="left">
                        <h4 className="card-title">{ props.bundleItem.bundleName }</h4>
                        <p className="card-text">This bundle includes:</p>
                    </div>
                    <div className="right">
                        <h4>Price: {props.bundleItem.bundlePrice } kr.</h4>
                    </div>
                </div>
                
                
                <BundleListViewItemBubbles list={ props.bundleItem.bundleItems } />
            </div>
        
            <div>
                <button 
                    className="addTocartBtn" 
                    onClick={() => { props.onClick(props.bundleItem) } }>
                        Add to Cart
                </button>
            </div> 
        </li>
    );
};

BundleListViewItem.propTypes = {
	bundleItem: PropTypes.shape({
        // Name of the bundle
        bundleName: PropTypes.string.isRequired,
        // Price of the bundle
        bundlePrice: PropTypes.number.isRequired,
        // Array with the bubbles in the bundle
        bundleItems: PropTypes.array.isRequired
	}).isRequired,
	onClick: PropTypes.func,
};

export default BundleListViewItem;