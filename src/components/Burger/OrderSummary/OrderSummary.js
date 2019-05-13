import React from 'react';
import Hoc from '../../../hoc/Hoc';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span 
                        style={{textTransform:'capitalize'}}>{igKey}: 
                    </span>{props.ingredients[igKey]}
                </li>);
        });

    return (
        <Hoc>
            <h3>Your Order</h3>
            <p>Delicous burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <p align='center'>
                <Button btnType="Success" clicked={props.cotinueOrder}>Yes</Button>
                <Button btnType="Danger" clicked={props.cancelOrder}>No</Button>
            </p>
        </Hoc>
    );
};

export default orderSummary;