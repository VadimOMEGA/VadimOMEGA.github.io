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
  


  //logged user

navUser = document.querySelectorAll('.nav-user');

userObj = JSON.parse(localStorage.getItem('user'));

if(userObj !== null) {
  navUser[0].parentNode.setAttribute('href', 'user.html');
  navUser[1].parentNode.setAttribute('href', 'user.html');
}