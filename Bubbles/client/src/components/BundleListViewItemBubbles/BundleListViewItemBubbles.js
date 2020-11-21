import React from 'react'
import BundlesListViewItemBubbleItem from '../BundlesListViewItemBubbleItem/BundlesListViewItemBubbleItem';
import PropTypes from 'prop-types';

const BundleListViewItemBubbles = (props) => {
    return(
        <ul className="list-view split">
            {
                props.list.map(item => <BundlesListViewItemBubbleItem key={ item.bubbleId } bubbleItem={ item } /> )
            }
        </ul>
    );
}

BundleListViewItemBubbles.propTypes = {
    // Array with the list of bubble in the bundle
    item: PropTypes.array
}

export default BundleListViewItemBubbles;