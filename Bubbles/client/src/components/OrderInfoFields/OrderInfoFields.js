import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

const OrderInfoFields = (props) => {
  console.log(props);
  const info = props.deliveryInfo["info"]
  if (props.deliveryInfo["delivery"] != "") {
    return (
      <div>
      <h2>{props.deliveryInfo["delivery"]}</h2>
      <form action={'/order/0'} >
        { Object.keys(props.deliveryInfo["info"]).map(field =>
          <div>
            {field} :
            <input
            type= "text"
            id= {field}
            name= {field}
            />
          </div>
        ) }
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
};

export default OrderInfoFields;
