import { orders } from "../data/orders.js";
import { getProducts, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { formatCurrency } from "./utils/money.js";
import { addToCart, calculateSiteCartNumber, updateQuantity } from "../data/cart.js";

async function loadPage() {
  await loadProductsFetch();

  calculateSiteCartNumber();

  let ordersHTML = '';

  orders.forEach((order) => {
    const orderDate = dayjs(order.orderTime)
    const orderDateString = orderDate.format('MMMM D');
    ordersHTML += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">${productsListHTML(order)}</div>

        </div>
    `;
  });
  
  function productsListHTML(order) {
    let productListHTML = '';

    order.products.forEach((productDetails) => {
      const productDeliveryTime = dayjs(productDetails.estimatedDeliveryTime);
      const deliveryTimeString = productDeliveryTime.format('MMMM D');
      

      const product = getProducts(productDetails.productId);
      productListHTML += `
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryTimeString}
              </div>
              <div class="product-quantity">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="buy-again-button button-primary
                js-buy-again-btn"
                data-product-id="${product.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
      `;
    });
    return productListHTML;
  }

  document.querySelector('.orders-grid')
    .innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again-btn')
    .forEach((button) => {
      button.addEventListener('click', () => {
        addToCart(button.dataset.productId, 1);
        calculateSiteCartNumber();

        button.innerHTML = 'Added';
        setTimeout(() => {
          button.innerHTML = `
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          `;
        }, 1000);
      });
    });
}

loadPage();