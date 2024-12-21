import { useContext, useState } from "react";
import logoImage from "../assets/logo.jpg";
import Modal from "./Modal";
import Cart from "./Cart";
import { CartContext } from "../store/cartContext";
import { usesModal } from "../hooks/useModal";

export default function Header() {

    const { items } = useContext(CartContext);

    const { handleModalOpen, isModalOpen, handleModalClose } = usesModal();
    return (
        <>
            <Modal open={isModalOpen} onClose={handleModalClose}>
                <Cart onClose={handleModalClose} />
            </Modal>
            <div id="main-header">
                <div id="title">
                    <img src={logoImage} alt="food order app logo icon." />
                    <h1>REACTFOOD</h1>
                </div>
                <button onClick={() => handleModalOpen()} className="text-button">Cart {items.length > 0 && `(${items.length})`}</button>
            </div>
        </>
    )
}
