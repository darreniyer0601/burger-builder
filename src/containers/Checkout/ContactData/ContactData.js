import React from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import './ContactData.css';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Darren',
                address: {
                    street: "Test Street",
                    zipCode: "42069",
                    country: "US"
                },
                email: "test@test.com"
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
                <Button clicked={this.orderHandler} buttonType="Success">ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;