export const cart = [];

export function addToCart(productId, productQuantity){
    // If the product is already in cart increase item quantity
    let foundMatch = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId) {
            cart[i].quantity += productQuantity;
            console.log(cart);
            foundMatch = true;
        }
    }
    // If the product is not in the cart, add a new item
    if(!foundMatch){
        let item = {
            productId,
            quantity: productQuantity,
        };
        cart.push(item);
        console.log(cart);
    }
}

