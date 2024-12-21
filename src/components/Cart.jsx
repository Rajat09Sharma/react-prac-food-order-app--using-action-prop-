import React, { useContext, useState } from 'react'
import { CartContext } from '../store/cartContext'
import Modal from './Modal';
import CheckoutForm from './CheckoutForm';
import { usesModal } from '../hooks/useModal';

export default function Cart({ onClose }) {
    const { items, updateItem } = useContext(CartContext);

    const {isModalOpen,handleModalOpen,handleModalClose}=usesModal();
    
    let totalAmount = null;
    if (items.length > 0) {

        totalAmount = items.reduce((total, item) => total + (item.quantity * item.price), 0)
    }

    // function handleCheckout() {
    //     handleModalOpen();
    // }

    function handleItemUpdate(id, num) {
        const item = {
            id,
            num
        }
        updateItem(item)
    }
    return (
        <>
            <Modal open={isModalOpen} onClose={handleModalClose}>
                <CheckoutForm totalAmount={totalAmount} onClose={handleModalClose}/>
            </Modal>
            <div className="cart">
                <h2>{items.length ? "Your Cart" : "Empty Cart!"}</h2>
                <ul>
                    {items.map(item => <li className='cart-item' key={item.id} >
                        <p>{item.name}  {item.quantity}×{item.price}</p>
                        <div className='cart-item-actions'>
                            <button onClick={() => handleItemUpdate(item.id, 1)}>+</button>
                            {item.quantity}
                            <button onClick={() => handleItemUpdate(item.id, -1)}>-</button>
                        </div>
                    </li>
                    )}
                </ul>
                <p className='cart-total'>{totalAmount}</p>
                <div className="modal-actions">
                    <button className="text-button" onClick={onClose}>close</button>
                    {items.length ? <button className="button" onClick={handleModalOpen}>Go to Checkout</button> : null}
                </div>
            </div>
        </>
    )
}
