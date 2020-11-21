import React from 'react';
import BubbleListViewItem from '../BubbleListViewItem/BubbleListViewItem';
import PropTypes from 'prop-types';

const BubbleListView = (props) => {
    return (
        <ul className="list-view">
            { props.list.map(item => <BubbleListViewItem key={ item.id } bubbleItem={ item } onClick={ props.onClick }/>) }
        </ul>
    );
};

BubbleListView.propTypes = {
    // The array containing info about the bubbles
    list: PropTypes.array
}

export default BubbleListView;
