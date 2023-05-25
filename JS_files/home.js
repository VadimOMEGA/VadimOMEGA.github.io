const nav2 = document.querySelector('.nav2');

window.addEventListener("scroll", function() {
  let scroll = window.pageYOffset;
  if(scroll > 300) nav2.style.top = '0';
    else nav2.style.top = '-90px';
});




let flowerDatabaseArr = [];

fetch('../Flowers_database/flowers.json')
  .then(response => response.json())
  .then(data => {
    // time 0.2s (200ms)
    flowerDatabaseArr = data.flowers;
  })
  .catch(error => {
    console.error('Error:', error);
  });

  const swiperProducts = new Swiper('.home-products-slider', {
      loop: true,
      allowTouchMove: true,
      speed: 1000,
      slidesPerView: 5,
      spaceBetween: 5,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },

      breakpoints: 
      {
        100:{
          slidesPerView: 1,
        },
        750:{
          slidesPerView: 2,
        },
        950:{
          slidesPerView: 3,
        },
        1250: {
          slidesPerView: 4,
        },
        1450:{
        slidesPerView: 5,
        }
      }
  });

  //open product page
/*const flowerSlides = document.querySelectorAll('.swiper-slide');

flowerSlides.forEach(flowerSlide => {
flowerSlide.addEventListener('click', e => {

})
}) */

//add to cart

const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartSwiper = document.querySelector('.cart-swiper-wrapper');

function createCartSlide(id, name, price, image, amount){
return `
<div class="swiper-slide cart-swiper-slide">
  <div class="cart-item">
      <div class="cart-item-image" id="${id}">
          <img src="${image}" alt="plant1">
      </div>
      <div class="cart-item-details">
          <div class="details-header">
              <span>${name}</span>
              <i class="fa-regular fa-trash-can cart-item-delete-icon" id="deleteBtn${id}"></i>
          </div>
          <div class="details-price">
              <span class="flower-cart-price">${price} MDL</span>
          </div>
          <div class="details-quantity">
              <div class="quantity-selector">
                  <span>Cantitate</span>
                  <div class="quantity-selector-btns">
                    <button class="decrease">
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <span id="amount${id}" class="flower-cart-amount">${amount}</span>
                    <button class="increase">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
              <span class="total-product-cost">${amount*price} MDL</span>
          </div>
        </div>
  </div>
</div>
`
}

let loadedCartItems = JSON.parse(localStorage.getItem('storedCartItems'));
if (loadedCartItems === null) {
loadedCartItems = [];
}

if(loadedCartItems.length > 0){
document.querySelector('.cart-items-box').style.border = 'none';
document.querySelector('.empty-cart').style.display = 'none';
document.querySelectorAll('.nav-cart')[0].classList.add('nav-cart-full');
document.querySelectorAll('.nav-cart')[1].classList.add('nav-cart-full');
document.querySelector('.swiperCart').style.display = 'block';

loadedCartItems.forEach(loadedCartItem => {
      cartSwiper.innerHTML += createCartSlide(loadedCartItem.id, loadedCartItem.name, loadedCartItem.price, loadedCartItem.image, loadedCartItem.amount);
    })

} else{
document.querySelector('.cart-items-box').style.border = '1px solid var(--light-gray)';
document.querySelector('.empty-cart').style.display = 'flex';
document.querySelectorAll('.nav-cart')[0].classList.remove('nav-cart-full');
document.querySelectorAll('.nav-cart')[1].classList.remove('nav-cart-full');
document.querySelector('.swiperCart').style.display = 'none';
}


addToCartBtns.forEach(addToCartBtn => {
addToCartBtn.addEventListener('click', e => {
  let clickedID = addToCartBtn.parentNode.getAttribute('id');
  let addedFlowerObj;
  flowerDatabaseArr.forEach(flowerElement => {
    if(flowerElement.id == clickedID) {
      addedFlowerObj = flowerElement;
    }
  }); 
  addToCartBtn.classList.add('add-to-cart-animation-class');

  setTimeout(() => {
    addToCartBtn.classList.remove('add-to-cart-animation-class');
  }, 1000)

  document.querySelector('.swiperCart').style.display = 'block';
  document.querySelector('.cart-items-box').style.border = 'none';
  document.querySelector('.empty-cart').style.display = 'none';
  document.querySelectorAll('.nav-cart')[0].classList.add('nav-cart-full');
  document.querySelectorAll('.nav-cart')[1].classList.add('nav-cart-full');

  const isAlreadyInCart = loadedCartItems.some(item => item.id === addedFlowerObj.id);
  
  if(isAlreadyInCart){

    let flowerAmounts = document.querySelectorAll('.flower-cart-amount');
    let flowerTotalCosts = document.querySelectorAll('.total-product-cost');
    let flowerPrices = document.querySelectorAll('.flower-cart-price');

    flowerAmounts.forEach((flowerAmount, index) => {

      if(flowerAmount.getAttribute('id') == `amount${addedFlowerObj.id}`) {
        if(Number.parseInt(flowerAmount.innerText, 10) < 10){

        addedFlowerObj.amount = Number.parseInt(flowerAmount.innerText, 10) + 1;
        flowerAmount.innerText = Number.parseInt(flowerAmount.innerText, 10) + 1;
        flowerTotalCosts[index].innerText = `${Number.parseInt(flowerAmount.innerText,10) * Number.parseInt(flowerPrices[index].innerText, 10)} MDL`;

          loadedCartItems.forEach(loadedCartItem => {
            if(loadedCartItem.id == addedFlowerObj.id) loadedCartItem.amount = addedFlowerObj.amount; 
          })
        }
      }
    })

  } else {
    cartSwiper.innerHTML += createCartSlide(addedFlowerObj.id, addedFlowerObj.name, addedFlowerObj.price, addedFlowerObj.image, 1);
    addedFlowerObj.amount = 1;
    loadedCartItems.push(addedFlowerObj);
  }

  swiperCart.update();
  localStorage.setItem('storedCartItems', JSON.stringify(loadedCartItems));
  totalOrderPrice.innerText = `${calcTotal()} MDL`;
  
})
})




//retreiving product info fr product page

const sliderProductImages = document.querySelectorAll('.slider-product-image');

sliderProductImages.forEach(sliderProductImage => {
  sliderProductImage.addEventListener('click', () => {
    localStorage.setItem('clickedProductId', sliderProductImage.getAttribute('id'));
  })
})




//logged user

navUser = document.querySelectorAll('.nav-user');

userObj = JSON.parse(localStorage.getItem('user'));

if(userObj !== null) {
  navUser[0].parentNode.setAttribute('href', 'user.html');
  navUser[1].parentNode.setAttribute('href', 'user.html');
}