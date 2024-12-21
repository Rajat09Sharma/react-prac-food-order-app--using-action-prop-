import { useContext, useEffect, useState } from "react"
import { CartContext } from "../store/cartContext";
import { useFetch } from "../hooks/useFetch";
import { fetchMeals } from "../http";


export default function Meals() {
    const { addToCart } = useContext(CartContext);

    const { fetchedData: meals, isFetching, error } = useFetch([], fetchMeals);

    function handleAddToCart(id, name, price) {
        const item = {
            id,
            name,
            price
        }
        // console.log("addtocart");

        addToCart(item);
    }

    return (
        <div id="meals">
            {isFetching && <p>Fetching food items.........</p>}
            {!isFetching && error && <p>{error}</p>}
            {!isFetching && !error && meals.map(meal => {
                return (
                    <div className="meal-item" key={meal.id}>
                        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                        <h3>{meal.name}</h3>
                        <p className="meal-item-price">${meal.price}</p>
                        <p className="meal-item-description">{meal.description}</p>
                        <div className="meal-item-actions">
                            <button className="button" onClick={() => handleAddToCart(meal.id, meal.name, meal.price)}> Add to Cart</button>
                        </div>
                        <article>
                        </article>
                    </div>
                )
            })}

        </div>
    )
}
