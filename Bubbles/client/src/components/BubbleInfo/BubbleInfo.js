import React from 'react'
import productService from '../services/productService'

class BubbleInfo extends React.Component{
    componentWillMount(){
        productService.fetchBubble(this.props.match.params.bubbleId).then(
            bubbleInf => this.setState({ bubbleInfo: bubbleInf })
        );
    }

    constructor(props){
        super(props);
        this.state = {
            bubbleInfo: {}
        };
    }

    render ()
    { 
        const { name, description, price, image } = this.state.bubbleInfo;
        return (
            <div id="bubbleInfo" className="jumbotron">
                <h1>{ name }</h1>
                <img src={image} width="300" height="300" alt="Bubble image" />
                <div className="rightInfo">
                    <h2 className="price">Price: { price } kr.</h2>
                    <p>{ description }</p>
                </div>    
            </div>
        );
    }
};

export default BubbleInfo;

