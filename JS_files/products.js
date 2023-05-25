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



  function addToCartBtnFunction(){
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

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
  }



  fetch('../Flowers_database/flowers.json')
  .then(response => response.json())
  .then(data => {
    // time 0.2s (200ms)
    flowerDatabaseArr = data.flowers;

    const allProductsSection = document.querySelector('.all-products-section');

    flowerDatabaseArr.forEach(flowerElement => {
        allProductsSection.innerHTML += `
        <div class="product-container">
                <div class="product-image" id="${flowerElement.id}">
                    <a href="product_blank.html"><img src="${flowerElement.image}" alt="plant"></a>
                    <button class="add-to-cart">Adaugă în coș</button>
                </div>
                <div class="product-text">
                    <span class="name">${flowerElement.name}</span>
                    <span class="price">${flowerElement.price} MDL</span>
                </div>
            </div>
        `
    })

  //retreiving product info fr product page

  const productImages = document.querySelectorAll('.product-image');

  productImages.forEach(productImage => {
    productImage.addEventListener('click', () => {
      localStorage.setItem('clickedProductId', productImage.getAttribute('id'));
    })
  })

  addToCartBtnFunction();

    //category buttons

    const allFlowersBtn = document.querySelector('#noCategoryBtn');
    const cactusCategoryBtn = document.querySelector('#cactusCategoryBtn');
    const housePlantCategoryBtn = document.querySelector('#housePlantCategoryBtn');
    const treeCategoryBtn = document.querySelector('#treeCategoryBtn');
    const flowerCategoryBtn = document.querySelector('#flowerCategoryBtn');

    const allCategoryBtns = document.querySelectorAll('.head-bar-category-btn');

    //creating subarrays by category

    const cactusArray = [];
    const housePlantArray = [];
    const treeArray = [];
    const flowerArray = [];
    let activeCategory = 0;

    flowerDatabaseArr.forEach(flowerElement => {
      if(flowerElement.category === 'Cactusi') cactusArray.push(flowerElement);
      if(flowerElement.category === 'Copaci mici') treeArray.push(flowerElement);
      if(flowerElement.category === 'Flori') flowerArray.push(flowerElement);
      if(flowerElement.category === 'Flori de camera') housePlantArray.push(flowerElement);
    })

    //
    let activeCategoryArray = flowerDatabaseArr;

    allFlowersBtn.addEventListener('click', () => {
      searchBar.value = '';
      activeCategoryArray = flowerDatabaseArr;
      allProductsSection.innerHTML = '';
      allCategoryBtns.forEach(categoryBtn => {
        categoryBtn.classList.remove('active-category-btn')
      })
      flowerDatabaseArr.forEach(flowerElement => {
        allProductsSection.innerHTML += `
        <div class="product-container">
                <div class="product-image" id="${flowerElement.id}">
                    <a href="product_blank.html"><img src="${flowerElement.image}" alt="plant"></a>
                    <button class="add-to-cart">Adaugă în coș</button>
                </div>
                <div class="product-text">
                    <span class="name">${flowerElement.name}</span>
                    <span class="price">${flowerElement.price} MDL</span>
                </div>
            </div>
        `;
    })
    allFlowersBtn.classList.add('active-category-btn');
    addToCartBtnFunction();
    })

    cactusCategoryBtn.addEventListener('click', () => {
      searchBar.value = '';
      activeCategoryArray = cactusArray;
      allProductsSection.innerHTML = '';
      allCategoryBtns.forEach(categoryBtn => {
        categoryBtn.classList.remove('active-category-btn')
      })
      cactusArray.forEach(cactusElement => {
        allProductsSection.innerHTML += `
        <div class="product-container">
                <div class="product-image" id="${cactusElement.id}">
                    <a href="product_blank.html"><img src="${cactusElement.image}" alt="plant"></a>
                    <button class="add-to-cart">Adaugă în coș</button>
                </div>
                <div class="product-text">
                    <span class="name">${cactusElement.name}</span>
                    <span class="price">${cactusElement.price} MDL</span>
                </div>
            </div>
        `;
    })
    cactusCategoryBtn.classList.add('active-category-btn');
    addToCartBtnFunction();
    })

    housePlantCategoryBtn.addEventListener('click', () => {
      searchBar.value = '';
      activeCategoryArray = housePlantArray;
      allProductsSection.innerHTML = '';
      allCategoryBtns.forEach(categoryBtn => {
        categoryBtn.classList.remove('active-category-btn')
      })
      housePlantArray.forEach(housePlantElement => {
        allProductsSection.innerHTML += `
        <div class="product-container">
                <div class="product-image" id="${housePlantElement.id}">
                    <a href="product_blank.html"><img src="${housePlantElement.image}" alt="plant"></a>
                    <button class="add-to-cart">Adaugă în coș</button>
                </div>
                <div class="product-text">
                    <span class="name">${housePlantElement.name}</span>
                    <span class="price">${housePlantElement.price} MDL</span>
                </div>
            </div>
        `;
    })
    housePlantCategoryBtn.classList.add('active-category-btn');
    addToCartBtnFunction();
    })

    treeCategoryBtn.addEventListener('click', () => {
      searchBar.value = '';
      activeCategoryArray = treeArray;
      allProductsSection.innerHTML = '';
      allCategoryBtns.forEach(categoryBtn => {
        categoryBtn.classList.remove('active-category-btn')
      })
      treeArray.forEach(treeElement => {
        allProductsSection.innerHTML += `
        <div class="product-container">
                <div class="product-image" id="${treeElement.id}">
                    <a href="product_blank.html"><img src="${treeElement.image}" alt="plant"></a>
                    <button class="add-to-cart">Adaugă în coș</button>
                </div>
                <div class="product-text">
                    <span class="name">${treeElement.name}</span>
                    <span class="price">${treeElement.price} MDL</span>
                </div>
            </div>
        `;
    })
    treeCategoryBtn.classList.add('active-category-btn');
    addToCartBtnFunction();
    })

    flowerCategoryBtn.addEventListener('click', () => {
      searchBar.value = '';
      activeCategoryArray = flowerArray;
      allProductsSection.innerHTML = '';
      allCategoryBtns.forEach(categoryBtn => {
        categoryBtn.classList.remove('active-category-btn')
      })
      flowerArray.forEach(flowerElement => {
        allProductsSection.innerHTML += `
        <div class="product-container">
                <div class="product-image" id="${flowerElement.id}">
                    <a href="product_blank.html"><img src="${flowerElement.image}" alt="plant"></a>
                    <button class="add-to-cart">Adaugă în coș</button>
                </div>
                <div class="product-text">
                    <span class="name">${flowerElement.name}</span>
                    <span class="price">${flowerElement.price} MDL</span>
                </div>
            </div>
        `;
    })
    flowerCategoryBtn.classList.add('active-category-btn');
    addToCartBtnFunction();
    })



    const searchBar = document.querySelector('#productSearch');

    searchBar.addEventListener('input', () => {
      setTimeout(() => {
      allProductsSection.innerHTML = '';
      allProductsSection.style.height = '3000px';

        let searchBarValue = searchBar.value;
      const searchedArray = [];

      activeCategoryArray.forEach(activeCategoryElement => {
        if(activeCategoryElement.name.toLowerCase().includes(searchBarValue.toLowerCase().trim())) searchedArray.push(activeCategoryElement);
        console.log(activeCategoryElement.name.toLowerCase(), searchBarValue.toLowerCase());
      })

        searchedArray.forEach(searchedElement => {
          allProductsSection.style.height = 'unset';
          allProductsSection.innerHTML += `
          <div class="product-container">
                  <div class="product-image" id="${searchedElement.id}">
                      <a href="product_blank.html"><img src="${searchedElement.image}" alt="plant"></a>
                      <button class="add-to-cart">Adaugă în coș</button>
                  </div>
                  <div class="product-text">
                      <span class="name">${searchedElement.name}</span>
                      <span class="price">${searchedElement.price} MDL</span>
                  </div>
              </div>
          `;
      })
      addToCartBtnFunction();
      }, 500)
    })

    //burger menu

const burgerButton = document.querySelector('#burger-menu-btn');
let clicked = false;

const allFlowersBtnBurger = document.querySelector('#noCategoryBtnBurger');
const cactusCategoryBtnBurger = document.querySelector('#cactusCategoryBtnBurger');
const housePlantCategoryBtnBurger = document.querySelector('#housePlantCategoryBtnBurger');
const treeCategoryBtnBurger = document.querySelector('#treeCategoryBtnBurger');
const flowerCategoryBtnBurger = document.querySelector('#flowerCategoryBtnBurger');
const allCategoryBtnsBurgerContainer = document.querySelector('.burger-menu-category-buttons');
const allCategoryBtnsBurger = document.querySelectorAll('.head-bar-category-btn-burger');

  burgerButton.addEventListener('click', () => {

  clicked = !clicked;

  if(clicked === true){
    allCategoryBtnsBurgerContainer.style.display = 'block';
  } else{
    allCategoryBtnsBurgerContainer.style.display = 'none';
  }

})

 activeCategoryArray = flowerDatabaseArr;

allFlowersBtnBurger.addEventListener('click', () => {
  searchBar.value = '';
  activeCategoryArray = flowerDatabaseArr;
  allProductsSection.innerHTML = '';
  allCategoryBtnsBurger.forEach(categoryBtn => {
    categoryBtn.classList.remove('active-category-btn')
  })
  flowerDatabaseArr.forEach(flowerElement => {
    allProductsSection.innerHTML += `
    <div class="product-container">
            <div class="product-image" id="${flowerElement.id}">
                <a href="product_blank.html"><img src="${flowerElement.image}" alt="plant"></a>
                <button class="add-to-cart">Adaugă în coș</button>
            </div>
            <div class="product-text">
                <span class="name">${flowerElement.name}</span>
                <span class="price">${flowerElement.price} MDL</span>
            </div>
        </div>
    `;
})
allFlowersBtnBurger.classList.add('active-category-btn');
addToCartBtnFunction();
})

cactusCategoryBtnBurger.addEventListener('click', () => {
  searchBar.value = '';
  activeCategoryArray = cactusArray;
  allProductsSection.innerHTML = '';
  allCategoryBtnsBurger.forEach(categoryBtn => {
    categoryBtn.classList.remove('active-category-btn')
  })
  cactusArray.forEach(cactusElement => {
    allProductsSection.innerHTML += `
    <div class="product-container">
            <div class="product-image" id="${cactusElement.id}">
                <a href="product_blank.html"><img src="${cactusElement.image}" alt="plant"></a>
                <button class="add-to-cart">Adaugă în coș</button>
            </div>
            <div class="product-text">
                <span class="name">${cactusElement.name}</span>
                <span class="price">${cactusElement.price} MDL</span>
            </div>
        </div>
    `;
})
cactusCategoryBtnBurger.classList.add('active-category-btn');
addToCartBtnFunction();
})

housePlantCategoryBtnBurger.addEventListener('click', () => {
  searchBar.value = '';
  activeCategoryArray = housePlantArray;
  allProductsSection.innerHTML = '';
  allCategoryBtnsBurger.forEach(categoryBtn => {
    categoryBtn.classList.remove('active-category-btn')
  })
  housePlantArray.forEach(housePlantElement => {
    allProductsSection.innerHTML += `
    <div class="product-container">
            <div class="product-image" id="${housePlantElement.id}">
                <a href="product_blank.html"><img src="${housePlantElement.image}" alt="plant"></a>
                <button class="add-to-cart">Adaugă în coș</button>
            </div>
            <div class="product-text">
                <span class="name">${housePlantElement.name}</span>
                <span class="price">${housePlantElement.price} MDL</span>
            </div>
        </div>
    `;
})
housePlantCategoryBtnBurger.classList.add('active-category-btn');
addToCartBtnFunction();
})

treeCategoryBtnBurger.addEventListener('click', () => {
  searchBar.value = '';
  activeCategoryArray = treeArray;
  allProductsSection.innerHTML = '';
  allCategoryBtnsBurger.forEach(categoryBtn => {
    categoryBtn.classList.remove('active-category-btn')
  })
  treeArray.forEach(treeElement => {
    allProductsSection.innerHTML += `
    <div class="product-container">
            <div class="product-image" id="${treeElement.id}">
                <a href="product_blank.html"><img src="${treeElement.image}" alt="plant"></a>
                <button class="add-to-cart">Adaugă în coș</button>
            </div>
            <div class="product-text">
                <span class="name">${treeElement.name}</span>
                <span class="price">${treeElement.price} MDL</span>
            </div>
        </div>
    `;
})
treeCategoryBtnBurger.classList.add('active-category-btn');
addToCartBtnFunction();
})

flowerCategoryBtnBurger.addEventListener('click', () => {
  searchBar.value = '';
  activeCategoryArray = flowerArray;
  allProductsSection.innerHTML = '';
  allCategoryBtnsBurger.forEach(categoryBtn => {
    categoryBtn.classList.remove('active-category-btn')
  })
  flowerArray.forEach(flowerElement => {
    allProductsSection.innerHTML += `
    <div class="product-container">
            <div class="product-image" id="${flowerElement.id}">
                <a href="product_blank.html"><img src="${flowerElement.image}" alt="plant"></a>
                <button class="add-to-cart">Adaugă în coș</button>
            </div>
            <div class="product-text">
                <span class="name">${flowerElement.name}</span>
                <span class="price">${flowerElement.price} MDL</span>
            </div>
        </div>
    `;
})
flowerCategoryBtnBurger.classList.add('active-category-btn');
addToCartBtnFunction();
})



  
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


