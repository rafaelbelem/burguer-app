import React, { Component } from 'react';
import Hoc from '../../hoc/Hoc'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.2,
    bacon: 0.6
}

class BurgerBuilder extends Component {

    /*constructor(props) {
        super(props);
        this.state = {}
    }*/

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        ordered: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://burguer-app-af538.firebaseio.com/ingredients.json')
            .then(resp => {
                this.setState({ingredients: resp.data})
            })
            .catch(error => {this.setState({error: error})});
    }

    updateOrderedState = () => {
        this.setState({ordered: true});
    }

    cancelOrderedState = () => {
        this.setState({ordered: false});
    }

    continueOrderedState = () => {
        //alert('You can continue');
        this.setState({ loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Rafael Belem',
                address: {
                    street: 'Street EDICIN',
                    zipConde: '20511120',
                    country: 'BR'
                },
                email: 'rafael@belem.com'
            },
            delivery: 'fastest'
        };
        axios.post('/orders.json', order)
            .then( resp => {
                this.setState({ loading: false, ordered: false })
            })
            .catch( error => { 
                this.setState({ loading: false, ordered: false });
            });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        console.log(updatedIngredients);
        const priceAddition  = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount !== 0)
            {
             const updatedCount = oldCount - 1;
             const updatedIngredients = {
                ...this.state.ingredients
               };
             updatedIngredients[type] = updatedCount;
             console.log(updatedIngredients);
             const priceMinus  = INGREDIENT_PRICES[type];
             const oldPrice = this.state.totalPrice;
             const newPrice = oldPrice - priceMinus;
             this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
             this.updatePurchaseState(updatedIngredients);
            }
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] === 0
        }

        let ordersummary = null;
        let burguer = this.state.error ? <p> Ingredients cant be loaded </p> : <Spinner />;

        if(this.state.ingredients) {
            burguer = (
                <Hoc>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        order={this.updateOrderedState}/>
                </Hoc>
            );

            ordersummary =  <OrderSummary 
            ingredients={this.state.ingredients}
            cancelOrder={this.cancelOrderedState}
            cotinueOrder={this.continueOrderedState}
            totalPrice={this.state.totalPrice}/>; 
        }

        if(this.state.loading) {
            ordersummary = <Spinner />;
        }

        return (
            <Hoc>
                <Modal show={this.state.ordered} modalClosed={this.cancelOrderedState}>
                    {ordersummary}
                </Modal>
                {burguer}
            </Hoc>
        );
    }
};

export default withErrorHandler(BurgerBuilder, axios);