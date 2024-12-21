import { createContext, useReducer } from "react"


export const CartContext = createContext({
    items: [],
    addToCart: () => { },
    updateItem: () => { },
    orderPlaced: () => { }
})

function cartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const cartItems = [...state.items];
        const existingItemIndex = cartItems.findIndex(item => item.id == action.payload.id);
        if (cartItems.length === 0 || existingItemIndex === -1) {
            const cartItem = {
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                quantity: 1
            }
            return { items: [...cartItems, cartItem] }
        }

        const existingCartItem = cartItems[existingItemIndex];
        const cartItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1
        }
        cartItems[existingItemIndex] = cartItem;
        // const total = parseFloat(state.total) + parseFloat(cartItem.price);

        return { items: [...cartItems] }
    }

    if (action.type === "UPDATE_ITEM") {
        const cartItems = [...state.items];
        const existingItemIndex = cartItems.findIndex(item => item.id == action.payload.id);
        const existingCartItem = cartItems[existingItemIndex];
        const cartItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + action.payload.num
        }
        if (cartItem.quantity === 0) {
            const newCartItems = cartItems.filter(item => item.id !== action.payload.id);
            return { items: [...newCartItems] }
        }
        cartItems[existingItemIndex] = cartItem;
        return { items: [...cartItems] }

    }

    if (action.type === "ORDER_PLACED") {
        return { items: [] };
    }

}


export default function CartContextProvider({ children }) {

    const [cart, dispatch] = useReducer(cartReducer, { items: [] });

    function handleAddToCart(item) {
        dispatch({
            type: "ADD_ITEM",
            payload: { ...item }
        })
    }

    function handleUpdateItem(item) {
        dispatch({
            type: "UPDATE_ITEM",
            payload: { ...item }
        })
    }

    function handlePlaceOrder() {
        dispatch({
            type: "ORDER_PLACED"
        })
    }

    // console.log("cart", cart.items);


    const cartCtx = {
        items: cart.items,
        addToCart: handleAddToCart,
        updateItem: handleUpdateItem,
        orderPlaced: handlePlaceOrder
    }


    return (
        <CartContext.Provider value={cartCtx} >{children}</CartContext.Provider>
    )
}
