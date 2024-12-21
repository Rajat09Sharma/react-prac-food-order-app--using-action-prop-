
export async function fetchMeals() {
    const response = await fetch("http://localhost:3000/meals");
    if (!response.ok) {
        throw Error("Failed to fetch food items, please try again.")
    }
    const data = await response.json();
    return data;
}

export async function placeOrder(order) {
    const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        body: JSON.stringify({ order }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw Error("Failed to fetch food items, please try again.")
    }
    const resData = await response.json();
    console.log(resData);

    return resData.message;
}