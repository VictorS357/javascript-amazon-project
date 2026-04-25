import { cart, addToCart, calculateSiteCartNumber } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';

  calculateSiteCartNumber();

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            ${product.getStarsUrl()}
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-display-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary 
        js-add-to-cart-btn" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });
    
  document.querySelector('.js-products-grid')
      .innerHTML = productsHTML;

  function addMessageDisplay(productId) {
    const addedDisplayElement = document.querySelector(`.js-added-display-${productId}`);
    let addedMsg = addedDisplayElement.innerHTML;
    addedMsg = 'Added';
    addedDisplayElement.classList.add('added-class');

    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }
    const timeoutId = setTimeout(() => {
      addedDisplayElement.classList.remove('added-class');
    }, 2000);

    addedMessageTimeouts[productId] = timeoutId;
  }

  const addedMessageTimeouts = {};
  document.querySelectorAll('.js-add-to-cart-btn')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const { productId } = button.dataset;
        const quantitySelectorElementValue = document.querySelector(`.js-quantity-selector-${productId}`).value;
        const quantity = Number(quantitySelectorElementValue);
        addToCart(productId, quantity);
        calculateSiteCartNumber();
        addMessageDisplay(productId);
      });
    });

  document.querySelector('.js-search-btn')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });
}