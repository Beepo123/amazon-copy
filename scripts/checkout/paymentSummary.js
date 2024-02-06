import { products } from "../../data/products.js";
import { getCartTotal } from "../../data/cart.js";
import { calculate } from "../../data/utils/money.js";

export function renderPaymentSummary(){
    // Calculates values first and render them in page
    const cartTotal = getCartTotal(products);
    const shippingTotal = getShippingTotal();
    const totalBeforeTax = calculate(cartTotal, shippingTotal);
    const estimatedTax = calculate(totalBeforeTax, 0.1, "*");
    const orderTotal = calculate(totalBeforeTax, estimatedTax);
    
    const moneyValues = [cartTotal, shippingTotal, totalBeforeTax, estimatedTax, orderTotal];
    const paymentSummaryMoney = document.querySelectorAll('.payment-summary-money');
    moneyValues.forEach((value, index) => {
        paymentSummaryMoney[index].innerHTML = `$${value}`;
    })
}

function getShippingTotal(){
    let shippingTotal = 0;
    const deliveryFare = [0, 4.99, 9.99];

    document.querySelectorAll('.delivery-options').
        forEach(deliveryOption => {
            const inputs = deliveryOption.querySelectorAll('.delivery-option-input')
            for(let i = 0; i < inputs.length; i++){
                if(inputs[i].checked){
                    shippingTotal += deliveryFare[i];
                    break;
                }
            }
        });
    
    return shippingTotal;
}