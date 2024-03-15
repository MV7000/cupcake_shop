import {
  visible_modal,
  visa_redirect,
  redirect_cart,
  hamburger_activate,
  pars,
  ordered_cakes,
  add_itemToCart,
  list_items,
  checking,
} from "/script/functions.js";

// Розміщення товарів в корзину
add_itemToCart();

// Натиск на кнопку купівлі очищує корзину і переводить на користувача на сайт VISA
// Працює,зрозуміло,як заглушка
document.addEventListener("click", (event) => {
  if (event.target.className === "btn_buy_all") {
    localStorage.clear();
    document.location.href =
      "https://www.visa.com.ua/uk_UA/pay-with-visa/checkout.html";
  }
});

// Модальне вікно корзини
let cakes_incheck = document.querySelector(".cakes_incheck");
//  Добавляємо товари в модальне вікно корзини покупця
list_items.forEach(pars);
cakes_incheck.innerHTML = ordered_cakes;

let count_total_sum = document.querySelector(".count_total_sum"),
  count_total_modal = 0,
  total_forone = document.querySelectorAll(".total_forone"),
  mod_top_sign = document.querySelector(".mod_top_sign");
total_forone.forEach((e) => {
  count_total_modal += +e.innerText;
});
count_total_sum.innerText = `${count_total_modal.toFixed(2)}`;

// Функція виклику модального вікна на сторінці
let cart_icon = document.querySelector(".cart_header>img"),
  btn_modal_checkout = document.querySelector(".btn_modal_checkout"),
  btn_modal_viewcart = document.querySelector(".btn_modal_viewcart");

cart_icon.addEventListener("click", visible_modal);
mod_top_sign.addEventListener("click", visible_modal);
btn_modal_checkout.addEventListener("click", visa_redirect);
btn_modal_viewcart.addEventListener("click", redirect_cart);

// Розгортання гамбургер меню хедера
let hamburger = document.getElementById("hamburger_menu");
hamburger.addEventListener("click", hamburger_activate);

// Перевірка і-мейла
let submit=document.querySelector('.footer_btn');
submit.onclick=()=>{
checking();
}