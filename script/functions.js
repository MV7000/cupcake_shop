import cakes_all from "/script/cakes_database.js";

 // Відкриття-закриття модального вікна корзини покупця в хедері
let modal_window=document.querySelector(".modal_cart_container");
export function visible_modal (){
    modal_window.classList.toggle("modal_visability");
    }
// Переадресація на сторінку оплати товара через VISA
export  function visa_redirect(){
    document.location.href =
    "https://www.visa.com.ua/uk_UA/pay-with-visa/checkout.html";
    }
    // Переадресація на сторінку корзини покупця
export function redirect_cart (){
    document.location.href ="/Cart/index.html"
    }

    // Гамбургер меню
export function hamburger_activate () {
    let head1=document.querySelectorAll(".head1")
    this.classList.toggle("open");
    head1.forEach(elem => {
      elem.classList.toggle("activ_header");
    });
      }

    //   Функція скроллінгу сторінки на потрібну позицію за координатами
    export function scrolling(x,y){
        scroll(x,y)
    }

    // Функція виведення на екран мафінів з бази даних
let cakes_collection=document.querySelector(".cakes_collection"),
div="";
export function cakes_database(arr) {
    arr.forEach(({ id, name, price,description,image }) => {
      div += `<div class="cake_buy">
      <img src="${image}" alt="cake">
  <div class="cake_name">${name}</div>
  <div class="cake_descript">${description}</div>
 <div class="counter_cake_container">
<div class="cake_counter">
<p class="cart_minus" id="${id}">-</p>
<p class="cart_counter" id="${id}">1</p>  
<p class="cart_plus" id="${id}">+</p>
</div> 
<button class="btn cake_btn" id="${id}">ADD TO CART</button>
 </div>
</div>`;
      cakes_collection.innerHTML = div;
        });
 }

//  Формування замовлених товарів в модальному вікні корзини покупця
 export let ordered_cakes="";
export function pars(el){
    let total=(+el.quantity*+el.price).toFixed(2);
   ordered_cakes+=`
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
`
}

// Добавлення товарів в корзину покупця


// Створюємо корзину добавлених товарів користувачем за допомогою localStorage.
export let list_items = [],
  cake_incart = "",
  cakes_buying_container=document.querySelector(".cakes_buying_container"),
// Отримуємо всі значення об'єктів localStorage разом з ключами
entries = Object.entries(localStorage),
quantity_all=0,
cart_header=document.querySelector(".cart_header");
 // Отримуємо та перебираємо всі ключі localStorage.Створюємо масив об"єктів добавлених в корзину речей
 let keys = Object.keys(localStorage);
 keys.forEach((element) => {
   list_items.push(JSON.parse(localStorage.getItem(element)));
 });
export function add_itemToCart() {
    list_items.forEach((element) => {
      let one=(+`${element.price}`),
      two = (+`${element.quantity}`),
      price_item=(one*two).toFixed(2);
      quantity_all+=two;
        cake_incart += `
      <div class="buying_container">
      <div class="cake_img_name">
      <img src="${element.picture}" class="wow animate__animated animate__zoomInUp">
      <div class="mafin_name">${element.name}</div>
  </div>
  <div class="counter_price_container">
      <div class="counter_cart">
          <div class="cart_minus" id="${element.id}">-</div>
          <div class="cart_counter" id="${element.id}">${element.quantity}</div>
          <div class="cart_plus" id="${element.id}">+</div>
      </div>
      <div class="price_inCart">
          <div>$</div>
          <div class="price_mafin" id="${element.id}">${price_item}</div>
      </div>
  </div>
  </div>
  `;
  cakes_buying_container.innerHTML=cake_incart;
  let total_sum=document.querySelector(".total_sum_incart"),
  price_mafin=document.querySelectorAll(".price_mafin"),
  total_count_sum=0,
  cart_counter=document.querySelectorAll(".cart_counter");
  
  
  price_mafin.forEach(elem=>{
      total_count_sum+=+elem.innerText;
      total_sum.innerText=total_count_sum.toFixed(2);
        })
       
       // Відслідковуємо клікі по "плюс" або "мінус"-збільшуємо,зменшуємо кількість обраного виду товарів.
       // Якщо товара в кількості 1шт. в корзині і користувач зменшує цю кількість-товар видаляється з корзини.
      window.addEventListener("click", function (event) {
      cart_counter.forEach(el=>{
     if (event.target.className =="cart_plus"&&event.target.id===el.id){
            el.innerText++;
            // document.location.href ="/Cart/index.html"
            let buing_cake={
              name:cakes_all.cakes[event.target.id-1].name,
              price: cakes_all.cakes[event.target.id-1].price,
              description:cakes_all.cakes[event.target.id-1].description,
              picture: cakes_all.cakes[event.target.id-1].image,
              id: cakes_all.cakes[event.target.id-1].id,
              quantity:el.innerText,
            }
            localStorage.setItem(`${buing_cake.name}`,JSON.stringify(buing_cake));
          }
       if (event.target.className == "cart_minus"&&event.target.id===el.id )
        {let buing_cake={
                        name:cakes_all.cakes[event.target.id-1].name,
                        price: cakes_all.cakes[event.target.id-1].price,
                        description:cakes_all.cakes[event.target.id-1].description,
                        picture: cakes_all.cakes[event.target.id-1].image,
                        id: cakes_all.cakes[event.target.id-1].id,
                        quantity:el.innerText,
                      }
                      localStorage.setItem(`${buing_cake.name}`,JSON.stringify(buing_cake));
            if (el.textContent <= 1) {
              el.parentElement.parentElement.parentElement.remove();
              entries.forEach((e) => {
                if (
                  JSON.parse(localStorage.getItem(e[0])) &&
                  JSON.parse(localStorage.getItem(e[0])).id == el.id
                ) {
                  localStorage.removeItem(e[0]);
                }
              });
            }
                      el.innerText--;
                      // document.location.href ="/Cart/index.html"
        }
  })
  price_mafin.forEach(elem=>{
    if (event.target.id===elem.id&&event.target.className =="cart_plus"){
          elem.innerText=(+elem.innerText+(+`${element.price}`)).toFixed(2)
          }else if(event.target.id===elem.id&&event.target.className =="cart_minus"){
            elem.innerText=(+elem.innerText-(+`${element.price}`)).toFixed(2)
                }
   })
   total_count_sum=0;
   price_mafin.forEach(elem=>{
      total_count_sum+=+elem.innerText;
      total_sum.innerText=total_count_sum.toFixed(2);
    })
       });
          });
    let number_icon=`<div class="number_cakes wow animate__animated animate__shakeY">${quantity_all}</div>
    <img src="/image/Trolley icon.png" alt="cart">`
    cart_header.innerHTML=number_icon
}


// Шаблон перевірки імейла
let pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
mail=document.getElementById('footer_email');

const error = new Error("Incorect mail-adress!Please, try again.");

// Функція перевірки імейла форми футера
export function checking() {
if (pattern.test(mail.value) === true) {
window.location.assign("https://searchthisweb.com/wallpaper/thumb1000/main1000_cake_3840x2160_uet7l.jpg");
mail.style.background = "green";
} else {
mail.setAttribute("style", "background:red");
mail.value='';
mail.value = error;
}
}
