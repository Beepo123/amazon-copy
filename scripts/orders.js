import { orderedCart, willPlaceOrder } from "../data/orderedCart.js";
import { cart } from "../data/cart.js";
import { getCartTotal } from "../data/cart.js";

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

if(willPlaceOrder){
    console.log('true');
    placeOrder();
}

function placeOrder() {
  let ordersHTML = "";
  orderedCart.forEach((orderedItem) => {
    ordersHTML = generateOrderHeader(orderedItem);

    const html = `
  <div class="order-details-grid">
    <div class="product-image-container">
      <img src="../${orderedItem.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${orderedItem.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${orderedItem.deliveryDate}
      </div>
      <div class="product-quantity">
        Quantity: ${orderedItem.quantity}
      </div>
      <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
  </div>
        `;

    ordersHTML += html;
  });
  console.log('print');
  document.querySelector(".orders-grid").innerHTML = ordersHTML;
}

function generateOrderHeader() {
  day = dayjs().format('MMMM dddd');
  const html = `
        <div class="order-header">
            <div class="order-header-left-section">
            <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${day}</div>
            </div>
            <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${getCartTotal}</div>
            </div>
            </div>

            <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${cart[0].productId}</div>
            </div>
        </div>
    `;

  return html;
}
