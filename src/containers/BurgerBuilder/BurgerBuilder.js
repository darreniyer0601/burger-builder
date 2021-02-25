import React from 'react';
import axios from '../../axios-orders';

import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('https://burger-builder-9fd12-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(err => {
                this.setState({ error: true });
            })
    }

    purchaseHandler = () => {
        // Cannot use this.setState here because "this" does not
        // refer to the class
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert("You may continue");
        this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Darren',
        //         address: {
        //             street: "Test Street",
        //             zipCode: "42069",
        //             country: "US"
        //         },
        //         email: "test@test.com"
        //     },
        //     deliveryMethod: 'fastes'
        // };

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(err => {
        //         this.setState({ loading: false, purchasing: false });
        //     });
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    }

    updatePurchase(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchase(updatedIngredients);
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchase(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        let orderSummary = <Spinner />;

        console.log(this.state.ingredients);
        if (this.state.ingredients) {
            burger = (
                <Auxilliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        price={this.state.totalPrice}
                        addIngredient={this.addIngredient}
                        removeIngredient={this.removeIngredient}
                        disabled={disabledInfo}
                        purchasable={!this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Auxilliary>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxilliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilliary>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);