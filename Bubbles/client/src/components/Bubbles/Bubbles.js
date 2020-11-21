import React from 'react';
import BubbleListView from '../BubbleListView/BubbleListView';
import productService from '../services/productService';
import toastr from 'toastr';

class Bubbles extends React.Component {
    componentWillMount() {
           productService.fetchAllBubbles().then(
               bubbleArray => this.setState({ bubbleItems: bubbleArray }));
    }

    constructor(props) {
        super(props);
        this.state = {
            bubbleItems: []
        };
    }

    addToCart(item) {
        if(localStorage.getItem("my-cart")) {
            var notExist = true;
            var existingData = JSON.parse(localStorage.getItem("my-cart"));
            existingData["bubbleItem"].forEach(element => {
                if("count" in element && item.id === element.id) {
                    element.count++;
                    notExist = false;
                }
            });
            if(notExist) {
                item.count = 1;
                existingData["bubbleItem"].push(item);
            }
            localStorage.setItem("my-cart", JSON.stringify(existingData));
            toastr.success(`${item.name} added to cart`, 'Cart');
        } else {
            item.count = 1;
            var newData = {"bundle":[],"bubbleItem":[item]};
            localStorage.setItem("my-cart", JSON.stringify(newData));
            toastr.success(`${item.name} added to cart`, 'Cart');
        }
    }

    render() {
        return (
            <div>
              <h1>Product list</h1>
                <BubbleListView list={ this.state.bubbleItems } onClick={ this.addToCart }/>
            </div>
        );
    }
};

export default Bubbles;