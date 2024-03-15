import cakes_all from "/script/cakes_database.js";
import {
  visible_modal,
  visa_redirect,
  redirect_cart,
  hamburger_activate,
  scrolling,
  cakes_database,
  checking
 } from "/script/functions.js";

// Активуємо кнопки шопінга, що перенаправляють на позицію сторінки купівлі мафінів.
const button_shopping = document.querySelector(".btn1"),
  button_shopping2 = document.querySelector(".btn2");

button_shopping.addEventListener("click", () => scrolling(0, 2170));
button_shopping2.addEventListener("click", () => scrolling(0, 2170));

// Звертаємось до локал сторіджа-виводимо товари на головну сторінку
let colection;
if (localStorage.colection) {
  colection = JSON.parse(localStorage.getItem("colection"));
} else {
  colection = cakes_all.cakes;
}

cakes_database(colection);

let cart_counter = document.querySelectorAll(".cart_counter"),
buing_cake;
// Добавлення мафінів в корзину покупця
window.addEventListener("click", function (event) {
  if (event.target.className === "btn cake_btn") {
    buing_cake = {
      name: cakes_all.cakes[event.target.id - 1].name,
      price: cakes_all.cakes[event.target.id - 1].price,
      description: cakes_all.cakes[event.target.id - 1].description,
      picture: cakes_all.cakes[event.target.id - 1].image,
      id: cakes_all.cakes[event.target.id - 1].id,
      quantity: event.target.previousElementSibling.childNodes[3].innerText,
    };
    window.location.href = "/Cart/index.html";
    localStorage.setItem(`${buing_cake.name}`, JSON.stringify(buing_cake));
  }
  cart_counter.forEach((el) => {
    if (event.target.className == "cart_plus" && event.target.id === el.id) {
      el.innerText++;
    }
    if (event.target.className == "cart_minus" && event.target.id === el.id) {
      if (el.textContent < 2) {
        return;
      }
      el.innerText--;
    }
  });
  localStorage.removeItem("colection");
});

// Добавлення товарів в модальне вікно корзини користувача
let cart_header = document.querySelector(".cart_header"),
  quantity_all = 0,
  list_items = [],
  cakes_incheck = document.querySelector(".cakes_incheck"),
  ordered_cakes = "";

let keys = Object.keys(localStorage);
keys.forEach((element) => {
  list_items.push(JSON.parse(localStorage.getItem(element)));
});

list_items.forEach((el) => {
  quantity_all += +el.quantity;
  let total = (+el.quantity * +el.price).toFixed(2);
  ordered_cakes += `
            <div class="cakes_colections">
            <div class="left_part">
                <img src="${el.picture}" alt="cake">
                <div class="cake_modal_name">${el.name}</div>
                <div class="cake_modal_name">x</div>
                <div class="cake_modal_name">${el.quantity}</div>
            </div>
            <div class="right_part">
                <div class="">$</div>
                <div class="total_forone">${total}</div>
            </div>
          </div>
            `;
});

// Підрахунок замовлених товарів
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
let number_icon = `<div class="number_cakes wow animate__animated animate__shakeY">${quantity_all}</div>
            <img src="/image/Trolley icon.png" alt="cart">`;
cart_header.innerHTML = number_icon;

// Виклик модального вікна на сторінці
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
