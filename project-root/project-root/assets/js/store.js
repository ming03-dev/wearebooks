// assets/js/storage.js
const CART_KEY = "YES24_CART";

function getCart() {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}


//JSON.stringify, JSON.parse 활용은 JSON파일을 사용하는 것이랑은 다른 개념임.

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
}

// 전역에서 쓰기 위해 window에 등록
window.CartStore = {
  getCart,
  addToCart,
  clearCart
};
