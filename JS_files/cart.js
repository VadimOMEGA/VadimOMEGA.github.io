const openCartNav1 = document.querySelector('#navCart1');
const openCartNav2 = document.querySelector('#navCart2');
const closeCart = document.querySelector('#closeCartBtn');
const cartOverlay = document.querySelector('.shopping-cart-overlay');
const cartContainer = document.querySelector('.shopping-cart-container');

openCartNav1.addEventListener('click', () => {
  cartOverlay.style.display = 'block';
  setTimeout(() => {
    cartOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  }, 1);
  cartContainer.style.transform = `translateX(0px)`;
})

openCartNav2.addEventListener('click', () => {
  cartOverlay.style.display = 'block';
  setTimeout(() => {
    cartOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  }, 1);
  cartContainer.style.transform = `translateX(0px)`;
})

closeCart.addEventListener('click', () => {
  cartOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
  cartContainer.style.transform = `translateX(${Number.parseInt(getComputedStyle(cartContainer).width) + 300}px)`;
  setTimeout(() => {
    cartOverlay.style.display = 'none';
  }, 500)
})

const swiperCart = new Swiper('.swiperCart', {
  loop: false,
  direction: 'vertical',
  slidesPerView: '2',
  spaceBetween: 10,
  mousewheel: true,
});


let decreaseBtns = [];
let increaseBtns = [];
let flowerAmounts = [];
let flowerTotalCosts = [];
let flowerPrices = [];
let cartItemsID = [];
let deleteItemBtns = [];
let cartItemSlides = [];
const submitOrder = document.querySelector('#totalOrderPrice');
const totalOrderPrice = document.querySelector('.total-order-value');

function calcTotal(){
  let sum = 0;
  let allCosts = document.querySelectorAll('.total-product-cost');
  allCosts.forEach(cost => {
    sum += Number.parseInt(cost.innerText, 10);
  })
  return sum;
}

totalOrderPrice.innerText = `${calcTotal()} MDL`;


openCartNav1.addEventListener('click', () => {
  decreaseBtns = document.querySelectorAll('.decrease');
  increaseBtns = document.querySelectorAll('.increase');
  flowerAmounts = document.querySelectorAll('.flower-cart-amount');
  flowerTotalCosts = document.querySelectorAll('.total-product-cost');
  flowerPrices = document.querySelectorAll('.flower-cart-price');
  cartItemsID = document.querySelectorAll('.cart-item-image');
  deleteItemBtns = document.querySelectorAll('.cart-item-delete-icon');
  cartItemSlides = document.querySelectorAll('.cart-swiper-slide');

  increaseBtns.forEach((increaseBtn, index) => {
    increaseBtn.addEventListener('click', () => {
      if(Number.parseInt(flowerAmounts[index].innerText, 10) < 10){
        flowerAmounts[index].innerText = `${loadedCartItems[index].amount+1}`;
        loadedCartItems[index].amount = loadedCartItems[index].amount+1;
        flowerTotalCosts[index].innerText = `${loadedCartItems[index].amount * loadedCartItems[index].price} MDL`;
        localStorage.setItem('storedCartItems', JSON.stringify(loadedCartItems));
      }
      totalOrderPrice.innerText = `${calcTotal()} MDL`;
    })
    
  })
  
  decreaseBtns.forEach((decreaseBtn, index) => {
    decreaseBtn.addEventListener('click', () => {
      if(Number.parseInt(flowerAmounts[index].innerText, 10) > 1){
        flowerAmounts[index].innerText = loadedCartItems[index].amount-1;
        loadedCartItems[index].amount = loadedCartItems[index].amount-1;
        flowerTotalCosts[index].innerText = `${loadedCartItems[index].amount * loadedCartItems[index].price} MDL`;
        localStorage.setItem('storedCartItems', JSON.stringify(loadedCartItems));
      }
      totalOrderPrice.innerText = `${calcTotal()} MDL`;
    })
  })

  deleteItemBtns.forEach((deleteItemBtn, index) => {
    deleteItemBtn.addEventListener('click', () => {

        cartItemSlides[index].remove();

        loadedCartItems.forEach((loadedCartItem, index) => {
          if(`deleteBtn${loadedCartItem.id}` == deleteItemBtn.getAttribute('id')) loadedCartItems.splice(index, 1);
        })

        console.log(loadedCartItems);
        localStorage.setItem('storedCartItems', JSON.stringify(loadedCartItems));

        if(loadedCartItems.length === 0){
          document.querySelector('.cart-items-box').style.border = '1px solid var(--light-gray)';
          document.querySelector('.empty-cart').style.display = 'flex';
          document.querySelectorAll('.nav-cart')[0].classList.remove('nav-cart-full');
          document.querySelectorAll('.nav-cart')[1].classList.remove('nav-cart-full');
          document.querySelector('.swiperCart').style.display = 'none';
          }
          totalOrderPrice.innerText = `${calcTotal()} MDL`;
    })
    })
  })

  openCartNav2.addEventListener('click', () => {
    decreaseBtns = document.querySelectorAll('.decrease');
    increaseBtns = document.querySelectorAll('.increase');
    flowerAmounts = document.querySelectorAll('.flower-cart-amount');
    flowerTotalCosts = document.querySelectorAll('.total-product-cost');
    flowerPrices = document.querySelectorAll('.flower-cart-price');
    cartItemsID = document.querySelectorAll('.cart-item-image');
    deleteItemBtns = document.querySelectorAll('.cart-item-delete-icon');
    cartItemSlides = document.querySelectorAll('.cart-swiper-slide');
  
    increaseBtns.forEach((increaseBtn, index) => {
      increaseBtn.addEventListener('click', () => {
        if(Number.parseInt(flowerAmounts[index].innerText, 10) < 10){
          flowerAmounts[index].innerText = `${loadedCartItems[index].amount+1}`;
          loadedCartItems[index].amount = loadedCartItems[index].amount+1;
          flowerTotalCosts[index].innerText = `${loadedCartItems[index].amount * loadedCartItems[index].price} MDL`;
          localStorage.setItem('storedCartItems', JSON.stringify(loadedCartItems));
        }
        totalOrderPrice.innerText = `${calcTotal()} MDL`;
      })
      
    })
    
    decreaseBtns.forEach((decreaseBtn, index) => {
      decreaseBtn.addEventListener('click', () => {
        if(Number.parseInt(flowerAmounts[index].innerText, 10) > 1){
          flowerAmounts[index].innerText = loadedCartItems[index].amount-1;
          loadedCartItems[index].amount = loadedCartItems[index].amount-1;
          flowerTotalCosts[index].innerText = `${loadedCartItems[index].amount * loadedCartItems[index].price} MDL`;
          localStorage.setItem('storedCartItems', JSON.stringify(loadedCartItems));
        }
        totalOrderPrice.innerText = `${calcTotal()} MDL`;
      })
    })
  
    deleteItemBtns.forEach((deleteItemBtn, index) => {
      deleteItemBtn.addEventListener('click', () => {
  
          cartItemSlides[index].remove();
  
          loadedCartItems.forEach((loadedCartItem, index) => {
            if(`deleteBtn${loadedCartItem.id}` == deleteItemBtn.getAttribute('id')) loadedCartItems.splice(index, 1);
          })
          localStorage.setItem('storedCartItems', JSON.stringify(loadedCartItems));
  
          if(loadedCartItems.length === 0){
            document.querySelector('.cart-items-box').style.border = '1px solid var(--light-gray)';
            document.querySelector('.empty-cart').style.display = 'flex';
            document.querySelectorAll('.nav-cart')[0].classList.remove('nav-cart-full');
            document.querySelectorAll('.nav-cart')[1].classList.remove('nav-cart-full');
            document.querySelector('.swiperCart').style.display = 'none';
            }
            totalOrderPrice.innerText = `${calcTotal()} MDL`;
      })
      })
    })
  
