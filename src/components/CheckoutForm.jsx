import { useContext, useState } from "react";
import { placeOrder } from "../http";
import { CartContext } from "../store/cartContext";
import Modal from "./Modal";
import { usesModal } from "../hooks/useModal";
import { useActionState } from "react";


export default function CheckoutForm({ totalAmount, onClose }) {

    const { items, orderPlaced } = useContext(CartContext);

    const { isModalOpen, handleModalOpen, handleModalClose } = usesModal();

    const [message, setMessage] = useState("");
    // const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    async function CheckoutAction(prevsFormState, formData) {
        const data = Object.fromEntries(formData.entries());

        const order = {
            items: items,
            customer: data
        }

        let errors = [];

        try {
            // setIsFetching(true);
            const response = await placeOrder(order);
            setMessage(response);
            // setIsFetching(false);
            handleModalOpen();
            onClose();
            return { errors: [] };

        } catch (error) {
            setError(error.message);
            errors.push({ message: error.message })
            // setIsFetching(false);
            return { errors, enterValues: data };
        }
    }
    const [formState, newFormActionFn, pending] = useActionState(CheckoutAction, { errors: [] })
    // console.log(message);

    function handleOrderOkay() {
        handleModalClose();
        orderPlaced();
    }


    return (
        <>

            <Modal open={isModalOpen} onClose={handleModalClose}>
                <div className="cart">
                    <h2>{message}</h2>
                    <div className="modal-actions">
                        <button className="button" onClick={handleOrderOkay}>Okay</button>
                    </div>
                </div>
            </Modal>

            <div className="cart">
                {error && <p className="error">Eroor occured,please try again!</p>}
                <h2>Checkout</h2>
                <p>Total Amout:${totalAmount}</p>

                <form className="control" action={newFormActionFn}>
                    <label>Full Name</label>
                    <input name="name" type="text" defaultValue={formState.enterValues?.name} required />
                    <label>E-Mail Address</label>
                    <input name="email" type="email" defaultValue={formState.enterValues?.email} required />
                    <label>Street</label>
                    <input name="street" type="text" defaultValue={formState.enterValues?.street} required />
                    <div className="control-row">
                        <p>
                            <label>Postal Code</label>
                            <input name="postal-code" type="number" required />
                        </p>
                        <p>
                            <label>City</label>
                            <input name="city" type="text" defaultValue={formState.enterValues?.city} required />
                        </p>
                    </div>
                    <div className="modal-actions">
                        {!pending && <button type="button" className="text-button"
                            onClick={() => {
                                setError(null);
                                onClose();
                            }}>Close</button>}
                        <button className="button">{pending ? "Submitting......." : "Submit Order"}</button>
                    </div>
                </form>
            </div>
        </>
    )
}


/*
    async function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        console.log(data);
        // console.log(items);

        const order = {
            items: items,
            customer: data
        }

        try {
            setIsFetching(true);
            const response = await placeOrder(order);
            setMessage(response);
            setIsFetching(false);
            handleModalOpen();
            onClose();

        } catch (error) {
            setError(error.message);
            setIsFetching(false);
        }

        event.target.reset();
    }
    // console.log(message);

    function handleOrderOkay() {
        handleModalClose();
        orderPlaced();
    } 
*/