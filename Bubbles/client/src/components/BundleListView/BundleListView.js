import React from 'react';
import BundlesListViewItem from '../BundleListViewItem/BundleListViewItem';
import PropTypes from 'prop-types';

const BundleListView = (props) => {
    return(

        <ul className="list-view">
            { props.list.map(item => <BundlesListViewItem key={ item.id } bundleItem={ item } onClick={ props.onClick } />) }
        </ul>
    );

};

BundleListView.propTypes = {
    // An array containing info about the bundles
	list: PropTypes.array,
	onClick: PropTypes.func,
};

export default BundleListView;