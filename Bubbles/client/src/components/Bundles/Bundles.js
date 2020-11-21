import React from 'react';
import productService from '../services/productService';
import BundleListView from '../BundleListView/BundleListView';
import toastr from 'toastr';

class Bundles extends React.Component {
    componentWillMount() {

        // Fetch both bundles and bubbles and combine them
        const bubbles = productService.fetchAllBubbles();
        const bundles = productService.fetchAllBundles();

        Promise.all([bubbles, bundles]).then(requestData => {
            let bubbles = requestData[0];
            let bundles = requestData[1];
            let combo = [];
            bundles.forEach((bundle, indexBun) => { 
                combo[indexBun] = { 
                    id: bundle.id,
                    bundleName: bundle.name,
                    bundlePrice: 0,
                    bundleItems: []
                };
                bundle.items.forEach((itemId) => {
                    bubbles.forEach((bubble) => {
                        if(itemId == bubble.id){
                            combo[indexBun].bundleItems.push({
                                bubbleId: bubble.id,
                                bubbleName: bubble.name,
                                bubbleDescription: bubble.description,
                                bubblePrice: bubble.price,
                                bubbleImage: bubble.image
                            });
                            combo[indexBun].bundlePrice = combo[indexBun].bundlePrice + bubble.price;
                        }
                    });
                    combo[indexBun].bundlePrice = Math.round(combo[indexBun].bundlePrice * 0.9); // 10% discount for bundles
                }); 
            });
            this.setState({combo: combo });
        }).catch(err => console.error(err));
    };

    constructor(props) {
        super(props);
        this.state = {
            combo: []
        };
    }

    addToCartBundle(item) {
        if(localStorage.getItem("my-cart")) {
            var notExist = true;
            var existingData = JSON.parse(localStorage.getItem("my-cart"));
            existingData["bundle"].forEach(element => {
                if("count" in element && item.id === element.id) {
                    element.count++;
                    notExist = false;
                }
            });
            if(notExist) {
                item.count = 1;
                existingData["bundle"].push(item);
            }
            localStorage.setItem("my-cart", JSON.stringify(existingData));
            toastr.success(`${item.bundleName} added to cart`, 'Cart');
        } else {
            item.count = 1;
            var newData = {"bundle":[item],"bubbleItem":[]};
            localStorage.setItem("my-cart", JSON.stringify(newData));
            toastr.success(`${item.bundleName} added to cart`, 'Cart');
        }
    }

    // replace the buttons with the actual bundles
    render() {
        return (
        <div id="bundlesList">
            <h1>Check out our Bubble Bundles!</h1>
            <BundleListView list={ this.state.combo } onClick={ this.addToCartBundle } />
{/*             <button 
				className="addTocartBtn" 
				onClick={() => { this.addToCartBundle(this.state.bundleItems[0]) } }>
					Add to Cart
			</button>
            <button 
				className="addTocartBtn" 
				onClick={() => { this.addToCartBundle(this.state.bundleItems[1]) } }>
					Add to Cart
			</button> */}
        </div>
        );
    }
};

export default Bundles;