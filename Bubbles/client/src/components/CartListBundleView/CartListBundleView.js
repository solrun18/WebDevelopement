import React from 'react';
import CartListBundleItem from '../CartListBundleItem/CartListBundleItem';

const CartListBundleView = (props) => {
    return (
        <div>
            <ul className="list-view">
                { props.bundleList.map(item => 
                    <CartListBundleItem
                        key={ item.id } 
                        cartItem={ item } 
                        ondAddBundle={ props.ondAddBundle }
                        onRemoveBundle={ props.onRemoveBundle }
                    />) }
            </ul>
        </div>
    );
};

export default CartListBundleView;