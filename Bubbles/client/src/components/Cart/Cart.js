import React from 'react';
import CartListView from '../CartListView/CartListView';
import CartListBundleView from '../CartListBundleView/CartListBundleView';
import Order from '../Order/Order';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import OrderInfoFields from '../OrderInfoFields/OrderInfoFields'

class Cart extends React.Component {
    componentWillMount() {
        if(localStorage.getItem("my-cart")) {
            this.setState({cartItems: JSON.parse(localStorage.getItem("my-cart"))});
        }
    }

    constructor(props) {
        super(props);
        this.clearCart = this.clearCart.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.openModal = this.openModal.bind(this);
        this.state = {
            cartItems: {"bundle":[], "bubbleItem":[]},
            bubbleItems: [],
            modalIsOpen: false,
            deliveryInfo: {"delivery":"", "info":{}},
            showButtons: true
        };
    }

    openModal() {
      this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }

    renderBundleItems() {
        var bundleItemArray = [];
        itemIds.forEach(id => {
            this.state.bubbleItems.forEach(element => {
                if(id === element.id) {
                    bundleItemArray.push(element);
                    return;
                }
            });
        });
        return bundleItemArray;
    }

    clearCart() {
        this.setState({cartItems: {"bundle":[],"bubbleItem":[]}});
        localStorage.clear();
    }

    addItem(id, key) {
        var newCart = JSON.parse(localStorage.getItem("my-cart"));
        newCart[key].forEach(item => {
            if(id === item.id) {
                item.count++;
                return;
            }
        });
        localStorage.setItem("my-cart", JSON.stringify(newCart));
        this.setState({cartItems: newCart});
    }

    getForm(d) {
      if (d == "Store Pickup") {
        console.log('inside submit form and form is SP');
          this.setState({deliveryInfo: {"delivery": d, "info":{"Name":"", "Telephone":""}}});
      }
      if (d == "Home Delivery") {
        console.log('inside submit form and form is HD');
        this.setState({deliveryInfo: {"delivery": d, "info":{"Name":"", "Telephone":"", "Address":"", "City":"", "Postal Code":""}}});
      }
    }

    removeItem(id, key) {
        var newCart = JSON.parse(localStorage.getItem("my-cart"));
        var removeId = false;
        newCart[key].forEach(item => {
            if(id === item.id) {
                item.count--;
                if(item.count === 0) {
                    removeId = true;
                }
                return;
            }
        });
        if(removeId) {
            newCart[key] = newCart[key].filter(item => item.id != id);
        }
        localStorage.setItem("my-cart", JSON.stringify(newCart));
        this.setState({cartItems: newCart});
    }

    render() {
        const bubbleItems = this.state.cartItems["bubbleItem"];
        const bundles = this.state.cartItems["bundle"];
        const deliveryInfo = this.state.deliveryInfo;
        return (
            <div>
              <h1>Cart</h1>
              <CartListBundleView
                    bundleList={ bundles }
                    ondAddBundle={ this.addItem }
                    onRemoveBundle={ this.removeItem }
                />
                <CartListView
                    list={ bubbleItems }
                    onAdd={ this.addItem }
                    onRemove={ this.removeItem }
                />
                <Modal
                  isOpen={this.state.modalIsOpen}
                  ariaHideApp={false}
                >
                  <div>
                    <button className="pickUpBtn" onClick={()  => this.getForm("Store Pickup")}>Store Pickup</button>
                    <button className="pickUpBtn" onClick={()  => this.getForm("Home Delivery")}>Home Delivery</button>
                  </div>
                  <OrderInfoFields
                      deliveryInfo={ deliveryInfo }
                      bubbleItems ={ bubbleItems }
                      bundles = { bundles }
                      onFinish={ this.orderComplete }
                  />
                  <button className="clearBtn" onClick={() => { this.openModal() } }>Quit</button>
                </Modal>
                <div id="button_container">
        			    <button className="finishBtn" onClick={() => { this.openModal() } }>Purchase</button>
        			    <button className="clearBtn" onClick={() => { this.clearCart() } }>Clear Cart</button>
                </div>
            </div>
        );
    }
};

export default Cart;
