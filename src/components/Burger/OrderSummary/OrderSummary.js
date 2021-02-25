import React from 'react';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
    // This can be a functional component and doesn't need to be a class
    componentDidUpdate() {
        console.log("[Order summary] will update");
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>
                    {igKey}
                </span>: {this.props.ingredients[igKey]}
            </li>
        })

        return (
            <Auxilliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button buttonType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxilliary>
        )
    }
};

export default OrderSummary;