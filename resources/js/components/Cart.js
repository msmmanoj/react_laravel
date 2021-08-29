import React, {useState} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Cart = (props) => {

    const customStyles = {
        content: {
            position: 'absolute',
            top: '5%',
            left: '70%',
            right: 'auto',
            bottom: 'auto',
            maxHeight: '500px',
            overlfow: 'scroll',
            width: "250px"
        },
    };

    return (
        <Modal
            isOpen={props.openCart}
            onRequestClose={() => props.closeCart()}
            style={customStyles}
        >
            <h2>Cart Items</h2>
            <h4> Total Cart Value : {'₹' + props.totalPrice + ' /-'}</h4>
            <ul style={{listStyleType: "none", "margin": 0, "padding": 0}}>
                {props.items.map((item) => {
                    return (
                        <li key={item.product_id}>
                            <h4>{item.name} ({item.count})</h4>
                            <i className="fas fa-plus" style={{color: "red", marginRight: "3px"}}
                               onClick={() => props.incrementOrDecrementCartItem(true, item.product_id)}> </i>
                            <i className="fas fa-minus" style={{color: "red"}}
                               onClick={() => props.incrementOrDecrementCartItem(false, item.product_id)}> </i>
                            <p>Product price : {'₹' + item.price + ' /-'}</p>
                        </li>
                    )
                })}
            </ul>
        </Modal>
    );
}

export default Cart

