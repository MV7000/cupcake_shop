import {
  visible_modal,
  visa_redirect,
  redirect_cart,
  hamburger_activate,
  pars,
  ordered_cakes,
  list_items,
  checking,
} from "/script/functions.js";

let cart_header = document.querySelector(".cart_header"),
  cakes_incheck = document.querySelector(".cakes_incheck");

list_items.forEach(pars);
// Розміщуємо сформоване замовлення товарів в модальному вікні корзини
cakes_incheck.innerHTML = ordered_cakes;

let count_total_sum = document.querySelector(".count_total_sum"),
  count_total_modal = 0,
  total_forone = document.querySelectorAll(".total_forone"),
  mod_top_sign = document.querySelector(".mod_top_sign");
total_forone.forEach((e) => {
  count_total_modal += +e.innerText;
});
count_total_sum.innerText = `${count_total_modal.toFixed(2)}`;

// Віконце показу кількості товарів в корзині покупця
let quantity_all = 0;
list_items.forEach((el) => {
  quantity_all += +el.quantity;
});
let number_icon = `<div class="number_cakes wow animate__animated animate__shakeY">${quantity_all}</div>
  <img src="/image/Trolley icon.png" alt="cart">`;
cart_header.innerHTML = number_icon;

//   Функція виклику модального вікна на сторінці

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

