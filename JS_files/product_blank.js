const nav2 = document.querySelector('.nav2');

window.addEventListener("scroll", function() {
  let scroll = window.pageYOffset;
  if(scroll > 300) nav2.style.top = '0';
    else nav2.style.top = '-90px';
});

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

  const cartSwiper = document.querySelector('.cart-swiper-wrapper');

let loadedCartItems = JSON.parse(localStorage.getItem('storedCartItems'));
if (loadedCartItems === null) {
loadedCartItems = [];
}

let flowerDatabaseArr = [];
const productSection = document.querySelector('.product-section');


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

fetch('../Flowers_database/flowers.json')
  .then(response => response.json())
  .then(data => {
    // time 0.2s (200ms)
    flowerDatabaseArr = data.flowers;

    let loadedID = localStorage.getItem('clickedProductId');
    let loadedFlowerObj;

    flowerDatabaseArr.forEach(flowerElement => {
      if(flowerElement.id == loadedID) loadedFlowerObj = flowerElement;
    })

    document.querySelector('title').innerHTML = loadedFlowerObj.name;

    productSection.innerHTML = `
    <div class="product-section-left">
            <img src="${loadedFlowerObj.image}" alt="plant" draggable="false">
        </div>
        <div class="product-section-right">
            <h1>${loadedFlowerObj.name}</h1>
            <h5>${loadedFlowerObj.price} MDL</h5>

            <hr class="first-line">

            <p>${loadedFlowerObj.description}</p>

            <hr class="second-line">

            <div class="add-to-cart">

                <button id="blankProductPageAddToCartBtn">Adaugă în coș</button>
            </div>

            <div class="features">
            <a href="services.html"><div class="delivery">
                    <i class="fa-solid fa-truck"></i>
                    Livrare gratuită
                </div></a>
            </div>

            <hr class="third-line">

            <div class="category">Categorie: <span>plante de cameră</span></div>

            <div class="share">
                Distribuiți pe social media
                <a href="https://www.instagram.com"><img src="../Images/home_page_images/instagram.svg" alt="instagram" draggable="false"></a>
                <a href="https://www.facebook.com"><img src="../Images/home_page_images/facebook.svg" alt="facebook" draggable="false"></a>
                <a href="https://www.twitter.com"><img src="../Images/home_page_images/twitter.svg" alt="twitter" draggable="false"></a>
            </div>

        </div>
    `

    const addToCart = document.querySelector('#blankProductPageAddToCartBtn');

    addToCart.addEventListener('click', () => {
      addToCart.classList.add('add-to-cart-animation-class');
    
      setTimeout(() => {
        addToCart.classList.remove('add-to-cart-animation-class');
      }, 1000)

      document.querySelector('.swiperCart').style.display = 'block';
      document.querySelector('.cart-items-box').style.border = 'none';
      document.querySelector('.empty-cart').style.display = 'none';
      document.querySelectorAll('.nav-cart')[0].classList.add('nav-cart-full');
      document.querySelectorAll('.nav-cart')[1].classList.add('nav-cart-full');

          const isAlreadyInCart = loadedCartItems.some(item => item.id === loadedFlowerObj.id);
          if (isAlreadyInCart) {
            let flowerAmounts = document.querySelectorAll('.flower-cart-amount');
            let flowerTotalCosts = document.querySelectorAll('.total-product-cost');
            let flowerPrices = document.querySelectorAll('.flower-cart-price');

            flowerAmounts.forEach((flowerAmount, index) => {

            if(flowerAmount.getAttribute('id') == `amount${loadedFlowerObj.id}`) {
            if(Number.parseInt(flowerAmount.innerText, 10) < 10){

            loadedFlowerObj.amount = Number.parseInt(flowerAmount.innerText, 10) + 1;
            flowerAmount.innerText = Number.parseInt(flowerAmount.innerText, 10) + 1;
            flowerTotalCosts[index].innerText = `${Number.parseInt(flowerAmount.innerText,10) * Number.parseInt(flowerPrices[index].innerText, 10)} MDL`;

              loadedCartItems.forEach(loadedCartItem => {
                if(loadedCartItem.id == loadedFlowerObj.id) loadedCartItem.amount = loadedFlowerObj.amount; 
              })
            }
          }
        })
          } else {
            cartSwiper.innerHTML += createCartSlide(loadedFlowerObj.id, loadedFlowerObj.name, loadedFlowerObj.price, loadedFlowerObj.image, 1);
            loadedFlowerObj.amount = 1;
            loadedCartItems.push(loadedFlowerObj);
          }

          swiperCart.update();
          localStorage.setItem('storedCartItems', JSON.stringify(loadedCartItems));
          totalOrderPrice.innerText = `${calcTotal()} MDL`;
        });


  })
  .catch(error => {
    console.error('Error:', error);
  });





  //logged user

navUser = document.querySelectorAll('.nav-user');

userObj = JSON.parse(localStorage.getItem('user'));

if(userObj !== null) {
  navUser[0].parentNode.setAttribute('href', 'user.html');
  navUser[1].parentNode.setAttribute('href', 'user.html');
}