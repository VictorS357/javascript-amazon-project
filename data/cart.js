export const cart = [];

export function addToCart (productId) {
  let matchingItem;

    const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const selectorValue = quantitySelectorElement.value

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += Number(selectorValue);
    } else {
      cart.push({
        productId,
        quantity: Number(selectorValue)
      });
    }
}