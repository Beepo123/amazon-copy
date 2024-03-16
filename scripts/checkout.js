import { renderCheckoutPage } from "./checkout/orderSummary.js";
import { getProduct } from "../data/products.js";
import { cart } from "../data/cart.js";
import { orderedCart, willPlaceOrder } from "../data/orderedCart.js";


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.js-place-order-button').
    addEventListener('click', () => {
        generateOrderCart();
        willPlaceOrder = true;
    })
})

renderCheckoutPage();

function generateOrderCart(){
    cart.forEach(item => {
        product = getProduct(item);
        const newItem = {
            deliveryDate : item.deliveryDate,
            name : product.name,
            quantity : item.quantity,
            image : product.image,
        }
        orderedCart.push(newItem);
    });
}