import { cart, deleteFromCart, getCartLength } from "./cart.js";
import { products } from "./products.js";
import { centsToDollars } from "./utils/money.js";

document.addEventListener('DOMContentLoaded', ()=>{
  renderCheckoutPage();
  updateDeliveryDates();
})

function renderCheckoutPage() {
  const currentDate = dayjs();
  let orderSummaryHtml = "";
  cart.forEach((cartItem) => {
    for (let i = 0; i < products.length; i++) {
      if (cartItem.productId === products[i].id) {
        const html = `
                <div class="cart-item-container js-cart-item-container-id-${
                  cartItem.productId
                }">
                  <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                  </div>
        
                  <div class="cart-item-details-grid">
                    <img class="product-image"
                      src="${products[i].image}">
        
                    <div class="cart-item-details">
                      <div class="product-name">
                        ${products[i].name}
                      </div>
                      <div class="product-price">
                      ${centsToDollars(products[i].priceCents)}
                      </div>
                      <div class="product-quantity">
                        <span>
                          Quantity: <span class="quantity-label">${
                            cartItem.quantity
                          }</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                          Update
                        </span>
                        <span class="delete-quantity-link link-primary 
                            js-delete-link" data-product-id="${
                              cartItem.productId
                            }">
                          Delete
                        </span>
                      </div>
                    </div>
        
                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>

                      <div class="delivery-option">
                        <input type="radio" checked
                          class="delivery-option-input"
                          name="delivery-option-1-${cartItem.productId}"
                          data-delivery-date="${currentDate.add(7, 'day').format('dddd, MMMM D')}">
                        <div>
                          <div class="delivery-option-date">
                            ${currentDate.add(7, 'day').format('dddd, MMMM D')}
                          </div>
                          <div class="delivery-option-price">
                            FREE Shipping
                          </div>
                        </div>
                      </div>

                      <div class="delivery-option">
                        <input type="radio"
                          class="delivery-option-input"
                          name="delivery-option-1-${cartItem.productId}"
                          data-delivery-date="${currentDate.add(3, 'day').format('dddd, MMMM D')}">
                        <div>
                          <div class="delivery-option-date">
                            ${currentDate.add(3, 'day').format('dddd, MMMM D')}
                          </div>
                          <div class="delivery-option-price">
                            $4.99 - Shipping
                          </div>
                        </div>
                      </div>

                      <div class="delivery-option">
                        <input type="radio"
                          class="delivery-option-input"
                          name="delivery-option-1-${cartItem.productId}"
                          data-delivery-date="${currentDate.add(1, 'day').format('dddd, MMMM D')}">
                        <div>
                          <div class="delivery-option-date">
                            ${currentDate.add(1, 'day').format('dddd, MMMM D')}
                          </div>
                          <div class="delivery-option-price">
                            $9.99 - Shipping
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                `;
        orderSummaryHtml = html + orderSummaryHtml;
        break;
      }
    }
  });
  document.querySelector(".order-summary").innerHTML = orderSummaryHtml;
  document.querySelector(".js-checkout-quantity").innerHTML = getCartLength();
}

// Event listener for deleting item in cart in checkout page
document.querySelector(".order-summary").addEventListener("click", (event) => {

  // For deleting item in order summary
  const deleteButton = event.target.closest(".js-delete-link");
  if (deleteButton) {
    const { productId } = deleteButton.dataset;
    deleteFromCart(productId);
    updateCheckoutQuantity();

    const container = document.querySelector(
      `.js-cart-item-container-id-${productId}`
    );
    container.remove();
  }

  // Updating delivery date for items
  const dateButton = event.target.closest(".delivery-option-input");
  if(dateButton){
    updateDeliveryDates();
  }
});

function updateDeliveryDates(){
  const containers = document.querySelectorAll('.cart-item-container');
  containers.forEach((container) => {
    const buttons = container.querySelectorAll('.delivery-option-input');
    
    buttons.forEach((button) => {
      if(button.checked){
        const { deliveryDate } = button.dataset;
        container.querySelector('.delivery-date').innerHTML = `Delivery data: ${deliveryDate}`;
      }
    })
  })
  console.log('date updated');
}