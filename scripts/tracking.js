import { getOrder } from "../data/orders.js";
import { calculateSiteCartNumber } from "../data/cart.js";
import { getProducts, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

async function loadPage() {
  await loadProductsFetch();
  calculateSiteCartNumber();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  let trackHTML = '';

  const order = getOrder(orderId);
  const product = getProducts(productId);

  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });
  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const deliveryProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  
  const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';
  
  trackHTML += `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      ${deliveredMessage} ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container
      ${deliveryProgress < 50 ? 'current-status' : ''}">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label 
        ${deliveryProgress >= 50 && deliveryProgress < 100 ? 'current-status' : ''}">
        Shipped
      </div>
      <div class="progress-label
        ${deliveryProgress >= 100 ? 'current-status' : ''}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${deliveryProgress}%"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking')
    .innerHTML = trackHTML;

  document.querySelector('.js-search-btn')
  .addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value;
    window.location.href = `amazon.html?search=${search}`;
  });
}

loadPage();
