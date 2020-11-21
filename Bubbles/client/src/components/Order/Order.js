import React from 'react';
import Cart from '../Cart/Cart';

class Order extends React.Component {

  componentWillMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(localStorage.getItem("my-cart")) {
        this.setState({cartItems: JSON.parse(localStorage.getItem("my-cart"))});
    }
    this.setState({
      user: {
        "Name": urlParams.get("Name"),
        "Telephone": urlParams.get("Telephone"),
        "Address": urlParams.get("Address"),
        "City": urlParams.get("City"),
        "Postal Code": urlParams.get("Postal Code")
      }
    })
    }

  constructor(props) {
      super(props);
      this.sendPost = this.sendPost.bind(this);
      this.state = {
        user: {},
        cartItems: {"bundle":[], "bubbleItem":[]}
      };
  }

  sendPost() {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      console.log(xhr.responseText)
    })
    console.log(this.state.user["Telephone"]);
    xhr.open('POST', ('http://localhost:3000/order/' + this.state.user["Telephone"]) )
    xhr.send(JSON.stringify({ user: this.state.user, cartItems: this.state.cartItems }))

  }


    render() {
      console.log(this.state);
        return (
            <div>
              <h1>Order</h1>
              <p>Name: {this.state.user["Name"]} </p>
              <p>Telephone: {this.state.user["Telephone"]} </p>
              <p>Address: {this.state.user["Address"]} </p>
              <p>City: {this.state.user["City"]} </p>
              <p>Postal Code: {this.state.user["Postal Code"]} </p>
              <p>--------------------------------------------- </p>
              { this.state.cartItems["bundle"].map(b =>
                <div>
                  <p>{b.count}X Name: {b.bundleName}</p>
                  <p>Price: {b.bundlePrice}</p>
                </div>
              ) }
              { this.state.cartItems["bubbleItem"].map(b =>
                <div>
                  <p>{b.count}X Name: {b.name}</p>
                  <p>Price: {b.price}</p>
                </div>
              ) }

              <button className="pickUpBtn" onClick={() => this.sendPost()} action={'/'}>Confirm </button>
            </div>
        );
    }
};

export default Order;
