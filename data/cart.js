export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId, productQuantity){
    // If the product is already in cart increase item quantity
    let foundMatch = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId) {
            cart[i].quantity += productQuantity;
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
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function deleteFromCart(productId){
    for(let i = 0; i < cart.length; i++){
        if(cart[i].productId === productId){
            cart.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}