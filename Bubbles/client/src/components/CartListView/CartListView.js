import React from 'react';
import CartListViewItem from '../CartListViewItem/CartlistViewItem';

const CartListView = (props) => {
    return (
        <div>
            <ul className="list-view">
                { props.list.map(item => 
                    <CartListViewItem 
                        key={ item.id } 
                        cartItem={ item } 
                        onAdd={ props.onAdd }
                        onRemove={ props.onRemove }
                    />) }
            </ul>
        </div>
    );
};

export default CartListView;