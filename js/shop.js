window.addEventListener('load', function() {
let wrapper_loader = document.querySelector(".wrapper_loader");
wrapper_loader.style.display = "none";
});

window.addEventListener('scroll', function(e) {
  // rollbar
  let wTop = window.pageYOffset;
  let rollbar = document.querySelector(".wrapper_roll_navigation");
  if(wTop > 400) {

    rollbar.style.top = 0;
  } else {
    rollbar.style.top = "-100px";
  }
});

// icon menu
let icon_menu = document.querySelectorAll(".icon_menu img");
icon_menu.forEach(function(icon) {
  icon.addEventListener('click', function(e) {
    e.stopPropagation();
    openMenu(e);
  });
});

// open menu (icon)
function openMenu(e) {
  let close_menu = document.querySelectorAll(".close_menu");
  let icon_menu_inside_a = document.querySelectorAll(".icon_menu_inside ul li a");
  icon_menu_inside_a.forEach(function(icon_a) {
    icon_a.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
  let icon_menu_display = document.querySelectorAll(".icon_menu_display");
  icon_menu_display.forEach(function(menu) {
    menu.style.display = "block";
  });

  document.body.addEventListener('click', function() {
    icon_menu_display.forEach(function(menu) {
      menu.style.display = "none";
    });
  });

  close_menu.forEach(function(close) {
    close.addEventListener('click', function(e) {
      e.stopPropagation();
      icon_menu_display.forEach(function(menu) {
        menu.style.display = "none";
      });
    });
  });
}


// ***************************** cart ***************************************
let wishCart = [];
let numberWish = 0;
let cartList = [];
let number = 0;

// Item constructor
let Item = function(name, price, picture, quantity, size) {
  this.name = name;
  this.price = price;
  this.picture = picture;
  this.quantity = quantity;
  this.size = size;
}

// add item to the cart
function addItem(name, price, picture, quantity, number, size) {
  if(cartList) {
    if(size === "No sizes") {
        for(let i = 0; i < cartList.length; i++) {
        if(cartList[i].name === name)  {
          cartList[i].quantity = cartList[i].quantity + 1;
          saveCart();
          saveNumber();
          return;
        }
      }
    } else {
      for(let i = 0; i < cartList.length; i++) {
      if(cartList[i].name === name) {
        if(cartList[i].size == size) {
        cartList[i].quantity = cartList[i].quantity + 1;
        saveCart();
        saveNumber();
        return;
        }
      }
    }
    }
  }

let item = new Item(name, price, picture, quantity, size);
  cartList.push(item);
  saveCart();
  saveNumber();
}

// increase quantity +1 of the current item
function increaseItem(name, size) {
  if(JSON.parse(localStorage.getItem("cart"))) {
    loadCart();
  }
  let the_cart_count = document.querySelectorAll(".the_cart_count");
  let totalCost = 0;
    cartList.forEach(function(cart) {
    if(cart.name === name) {
      if(cart.size !== "No sizes") {
        if(cart.size === size) {
      cart.quantity = cart.quantity + 1;
      number++;
      the_cart_count.forEach(function(count) {
        count.innerHTML = "My cart \(" +number+ "\)";
      });
      saveCart();
      saveNumber();
      displayCart();
      } // end if size === size
    } // end if no sizes
 else {
   cart.quantity = cart.quantity + 1;
   number++;
   the_cart_count.forEach(function(count) {
     count.innerHTML = "My cart \(" +number+ "\)";
   });
   saveCart();
   saveNumber();
   displayCart();
      }
    } // end if name === name
  });
}

// decrease quantity -1 of the current item
function decreaseItem(name, size) {
  if(JSON.parse(localStorage.getItem("cart"))) {
    loadCart();
  }
  let totalCost = 0;
  let the_cart_count = document.querySelectorAll(".the_cart_count");
  cartList.forEach(function(cart) {
    if(cart.name === name) {
      if(cart.size !== "No sizes") {
      if(cart.size === size) {
      cart.quantity = cart.quantity - 1;
      number--;
      the_cart_count.forEach(function(count) {
        count.innerHTML = "My cart \(" +number+ "\)";
      });
      if(cart.quantity < 1) {
        saveCart();
        saveNumber();
        removeProduct(name, size);
      }
      saveCart();
      saveNumber();
      displayCart();
      } // end if size === size
    } // end if no sizes
    else {
      cart.quantity = cart.quantity - 1;
      number--;
      the_cart_count.forEach(function(count) {
        count.innerHTML = "My cart \(" +number+ "\)";
      });
      if(cart.quantity < 1) {
        saveCart();
        removeProduct(name);
      }
      saveCart();
      saveNumber();
      displayCart();
    }

    } // end if name === name
  });
}

// remove the product from the cart
function removeProduct(name, size) {
  if(JSON.parse(localStorage.getItem("cart"))) {
    loadCart();
  }
let the_cart_count = document.querySelectorAll(".the_cart_count");
let counterCart_p = document.querySelectorAll(".counterCart p");
  for (let i = 0; i < cartList.length; i++) {
    if(cartList[i].name === name) {
      if(cartList[i].size !== "No sizes") {
        if(cartList[i].size === size) {
      number = number - cartList[i].quantity;
      cartList.splice(i, 1);

      counterCart_p.forEach(function(counter_p) {
        counter_p.innerHTML = number;
      });

      the_cart_count.forEach(function(count) {
        count.innerHTML = "My cart \(" +number+ "\)";
      });
      if(cartList.length < 1) {

        let the_cart_content = document.querySelector(".the_cart_content");
        the_cart_content.innerHTML = "";
        cartList.splice(i, 1);
        counterCart_p.forEach(function(counter_p) {
          counter_p.innerHTML = number;
        });
        the_cart_count.forEach(function(count) {
          count.innerHTML = "My cart \(" +number+ "\)";
        });
        saveCart();
        saveNumber();
        displayCart();

        }

        saveCart();
        saveNumber();
        displayCart();
      }
      } // end f no sizes
      else {
        number = number - cartList[i].quantity;
        cartList.splice(i, 1);

        counterCart_p.forEach(function(counter_p) {
          counter_p.innerHTML = number;
        });
        if(cartList.length < 1) {

          let the_cart_content = document.querySelector(".the_cart_content");
          the_cart_content.innerHTML = "";
          cartList.splice(i, 1);
          counterCart_p.forEach(function(counter_p) {
            counter_p.innerHTML = number;
          });
          saveCart();
          saveNumber();
          displayCart();

          }

          saveCart();
          saveNumber();
          displayCart();
      }
      } // end if name === name
      }
        saveCart();
        saveNumber();
      }

// display the cart
function displayCart() {
loadCart();

let totalCostItem = 0;
let the_total_cost = 0;
let the_cart_content = document.querySelector(".the_cart_content");
let output = "";
let product_side = document.querySelector(".product_side");
let product_side_title = document.querySelector(".product_side_title");
let desc_side_title = document.querySelector(".desc_side_title");
let quantity_side_title = document.querySelector(".quantity_side_title");
let price_side_title = document.querySelector(".price_side_title");
let side_title = document.querySelectorAll(".side_title");
let size_side_title = document.querySelector(".size_side_title");

let product_side_content = document.querySelector(".product_side_content");
let description_side_content = document.querySelector(".description_side_content p");
let quantity_side_content = document.querySelector(".quantity_side_content");
let price_side_content = document.querySelector(".price_side_content");

let cart_title = document.querySelector(".cart_title");
let cart_warning = document.querySelector(".cart_warning");
  //check if the cart is empty
  if(cartList.length < 1) {
    cart_warning.innerHTML = "There are no items in your cart.";
    cart_title.innerHTML = "Your cart ("+ cartList.length+")";
    side_title.forEach(function(the_side) {
      the_side.style.display = "none";
    });
  }
  // if the cart has items
  else {
    side_title.forEach(function(the_side) {
      the_side.style.display = "block";
    });

  cart_title.innerHTML = "Your cart ("+ number +")";
  cart_warning.innerHTML = "";
  cartList.forEach(function(cart) {
    totalCostItem = cart.quantity * cart.price;
    output += "<div class='current_content'><p class='hidden_product'>Product</p><div class='product_side_content cart_content'><img src='"+cart.picture+"'></div>";
    output += "<p class='hidden_product'>Description</p><div class='description_side_content cart_content'><p>"+cart.name+"</p></div>";
    output += "<p class='hidden_product'>Size</p><div class='size_side_content cart_content'><p>"+cart.size+"</p></div>";
    output += "<p class='hidden_product'>Quantity</p><div class='quantity_side_content cart_content'><p><span class='decrease_icon inc_dec' data-name='"+cart.name+"' data-size='"+cart.size+"'>-</span>"+cart.quantity+"<span class='increase_icon inc_dec' data-name='"+cart.name+"' data-size='"+cart.size+"'>+</span><span class='removeButton' data-name='"+cart.name+"' data-size='"+cart.size+"'>Remove</span></p></div>";
    output += "<p class='hidden_product'>Price</p><div class='price_side_content cart_content'><p>"+totalCostItem+"<span class='euroFont'> &euro;</span></p></div>";
    output += "</div>";
    if(cart.size === "No sizes") {
    let size_side_content = document.querySelectorAll(".size_side_content p");
    size_side_content.forEach(function(side) {
      side.classList.add("classSize");
          });
        }
      });

  cartList.forEach(function(cart) {
    the_total_cost += cart.price * cart.quantity;
  });
  // total cost
  output += "<div class='clear_total'><div class='clear_cart_side'><p>Clear cart</p></div><div class='the_total_cost_side'><p>Total cost : "+the_total_cost+"<span class='euroFont'> &euro;</span></p></div></div>";

  // output
  the_cart_content.innerHTML = output;

  // the title of each side
  product_side_title.innerHTML = "Product";
  desc_side_title.innerHTML = "Description";
  size_side_title.innerHTML = "Size";
  quantity_side_title.innerHTML = "Quantity";
  price_side_title.innerHTML = "Price";

  // clicking increase icon and increase quantity +1 of the current item
  let increase_icon = document.querySelectorAll(".increase_icon");
  if(increase_icon) {
    increase_icon.forEach(function(the_icon) {
      the_icon.addEventListener('click', function() {
        let data_name = the_icon.dataset.name;
        let data_size = the_icon.dataset.size;
        increaseItem(data_name, data_size);
      });
    });
  }

  // clicking decrease icon and decrease quantity -1 of the current item
  let decrease_icon = document.querySelectorAll(".decrease_icon");
  if(decrease_icon) {
    decrease_icon.forEach(function(the_icon) {
      the_icon.addEventListener('click', function() {
      let data_name = the_icon.dataset.name;
      let data_size = the_icon.dataset.size;
      decreaseItem(data_name, data_size);
      });
    });
  }

  // clicking remove button and remove the product
  let removeButton = document.querySelectorAll(".removeButton");
  if(removeButton) {
    removeButton.forEach(function(the_button) {
      the_button.addEventListener('click', function() {
        let data_name = the_button.dataset.name;
        let data_size = the_button.dataset.size;
        removeProduct(data_name, data_size);
        });
      });
    }

  // clicking the clear cart button
  let clear_cart_btn = document.querySelector(".clear_cart_side p");
  if(clear_cart_btn) {
    clear_cart_btn.addEventListener('click', function() {
      clearCart();
      });
    }
  }
}

// clear the cart (empty)
function clearCart() {
  if(JSON.parse(localStorage.getItem("cart"))) {
    loadCart();
  }
  cartList = [];
  number = 0;
  let the_cart_content = document.querySelector(".the_cart_content");
  the_cart_content.innerHTML = "";
  let counterCart_p = document.querySelectorAll(".counterCart p");
  counterCart_p.forEach(function(the_counter) {
    the_counter.innerHTML = number;
  });
  let the_cart_count = document.querySelectorAll(".the_cart_count");
  the_cart_count.forEach(function(count) {
    count.innerHTML = "My cart \(" +number+ "\)";
  });
  saveCart();
  saveNumber();
  displayCart();
}

// save the cart & and the counter
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartList));
}

// save counter number of cart items
function saveNumber() {
  localStorage.setItem("numberCart", JSON.stringify(number));
}

// load the cart
function loadCart() {
  if(JSON.parse(localStorage.getItem("cart"))) {
  cartList = JSON.parse(localStorage.getItem("cart"));
}
if(JSON.parse(localStorage.getItem("numberCart"))) {
  number = JSON.parse(localStorage.getItem("numberCart"));
}
  // display the counter
  if(number > 0) {
    let the_cart_count = document.querySelectorAll(".the_cart_count");
    let counterCart = document.querySelectorAll(".counterCart");
    let counterCart_p = document.querySelectorAll(".counterCart p");
    counterCart.forEach(function(counter) {
      counter.style.display = "block";
      counter.style.background = "#909090";
      counter.style.borderColor = "#909090";
    });
    counterCart_p.forEach(function(counter_p) {
      counter_p.innerHTML = number;
      counter_p.style.color = "#fff";
    });
    the_cart_count.forEach(function(the_count) {
      the_count.innerHTML = "My cart ("+number+")";
    });
  }
}

let path = window.location.pathname;

if(path == '/ecommerce/men.html' || 'ecommerce/women.html' || 'ecommerce/index.html' || 'ecommerce/shop.html') {
  window.addEventListener('load', loadCart);
}

if(path == '/ecommerce/cart.html') {
displayCart();
}


// ******************************** WishList **********************************
let WishItem = function(the_product, name, price, picture, status, del_price, category) {
  this.the_product = the_product;
  this.name = name;
  this.price = price;
  this.picture = picture;
  this.status = status;
  this.delprice = del_price;
  this.category = category;
}

// add the product to wishList
function addToWish(the_product, name, price, picture,  status, del_price, category) {

  let wishItem = new WishItem(the_product, name, price, picture,  status, del_price, category);
  wishCart.push(wishItem);
  saveWish();
  saveWishNumber();

}

// display the wishList
function displayWish() {
loadWish();

let the_wish_content = document.querySelector(".the_wish_content");
let output = "";
let wish_product_side = document.querySelector(".wish_product_side");
let wish_product_side_title = document.querySelector(".wish_product_side_title");
let wish_desc_side_title = document.querySelector(".wish_desc_side_title");
let wish_delete_side_title = document.querySelector(".wish_delete_side_title");
let wish_cart_product_side_title = document.querySelector(".wish_cart_product_side_title");
let wish_side_title = document.querySelectorAll(".wish_side_title");
let wish_size_side_title = document.querySelector(".wish_size_side_title");
let wish_cart_title = document.querySelector(".wish_cart_title");
let wish_warning = document.querySelector(".wish_warning");

  //check if the cart is empty
  if(wishCart.length < 1) {
    wish_warning.innerHTML = "There are no items in your wishlist.";
    wish_cart_title.innerHTML = "Your wishlist ("+ wishCart.length+")";
    wish_side_title.forEach(function(the_side) {
      the_side.style.display = "none";
    });

  }
  // if the cart has items
  else {
    let megethos = "";
    wish_side_title.forEach(function(the_side) {
      the_side.style.display = "block";
    });

  wish_cart_title.innerHTML = "Your wishlist ("+ numberWish +")";
  wish_warning.innerHTML = "";
  wishCart.forEach(function(cart) {

    output += "<div class='current_content current_wish_content'><div class='wish_product_side_content cart_content'><p class='hidden_product'>Product</p><div class='added wish_cart_added' data-desc='"+cart.name+"'></div><p class='added wish_cart_added_p' data-desc='"+cart.name+"'>Added to the cart</p><img src='"+cart.picture+"'></div>";
    output += "<p class='hidden_product'>Description</p><div class='wish_description_side_content cart_content'><p>"+cart.name+"</p></div>";
    if( (cart.category === 'jacket') || (cart.category === 'fur') || (cart.category === 'shirt') ) {
    megethos = "<p class='hidden_product'>Size</p><div class='cart_content wish_size_content'><select class='size_select_wish' data-pic='"+cart.picture+"'><option value=''>Choose size</option><option value='xs'>XS</option><option value='s'>S</option><option value='m'>M</option><option value='l'>L</option><option value='xl'>XL</option></select></div>";
    output += megethos;
  } else if(cart.category === "shoes") {
    megethos = "<p class='hidden_product'>Size</p><div class='cart_content wish_size_content'><select class='size_select_wish' data-pic='"+cart.picture+"'><option value=''>Choose size</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option></select></div>";
    output += megethos;
  } else if( (cart.category === "sunglasses") || (cart.category === 'accessories') || (cart.category === 'hat') ) {
    megethos = "<p class='hidden_product'>Size</p><div class='cart_content wish_size_content'><p>No sizes</p></div>";
    output += megethos;
  }
    output += "<p class='hidden_product'>Add to cart</p><div class='wish_cart_side_content cart_content'><p><a href='cart.php'><img src='images/cart.png' data-desc='"+cart.name+"' data-theprice='"+cart.price+"' data-pic='"+cart.picture+"' data-product='"+cart.the_product+"' data-category='"+cart.category+"' class='wishlist_product_icon'></a></p></div>";
    output += "<p class='hidden_product'>Delete product</p><div class='delete_side_content cart_content'><p><span class='removeWish' data-name='"+cart.name+"'>Remove</span></p></div>";
    output += "</div>";
  });

  output += "<div class='clear_total'><div class='clear_cart_side clear_wish_side'><p>Clear wishlist</p></div><div class='wish_warning_side'><p></p></div></div>";

  // output
  the_wish_content.innerHTML = output;

  // the title of each side
  wish_product_side_title.innerHTML = "Product";
  wish_desc_side_title.innerHTML = "Description";
  wish_size_side_title.innerHTML = "Size";
  wish_delete_side_title.innerHTML = "Delete product";
  wish_cart_product_side_title.innerHTML = "Add to cart";

  // clear the wishlist
  let clear_wish_btn = document.querySelector(".clear_wish_side p");
  if(clear_wish_btn) {
    clear_wish_btn.addEventListener('click', function() {
      clearWish();
    });
  }

  // clicking remove button and remove the product
  let removeWish = document.querySelectorAll(".removeWish");
  if(removeWish) {
    removeWish.forEach(function(the_button) {
      the_button.addEventListener('click', function() {
        let data_name = the_button.dataset.name;
        removeWishProduct(data_name);
        });
      });
    }
    let size_select_wish = "";
    let wish_warning_side = document.querySelector(".wish_warning_side p");
    // clicking add to cart icon
    let wishlist_product_icon = document.querySelectorAll(".wishlist_product_icon");
    if(wishlist_product_icon) {
      wishlist_product_icon.forEach(function(the_icon) {
        the_icon.addEventListener('click', function(e) {

          let data_pic = e.target.dataset.pic;
          let data_category = e.target.dataset.category;
          e.preventDefault();
          let the_size = "";

    // get size
     size_select_wish = document.querySelectorAll(".size_select_wish[data-pic='"+data_pic+"']")[0];

      if( (data_category === "shoes") || (data_category === "jacket") || (data_category === "fur") || (data_category === "shirt") ) {

           the_size = size_select_wish[size_select_wish.selectedIndex].value;

         } else {
           the_size = "No sizes";
       }

          let the_product = the_icon.dataset.the_product;
          let name = the_icon.dataset.desc;
          let price = parseInt(the_icon.dataset.theprice);
          let picture = the_icon.dataset.pic;

         if((data_category === "shoes") || (data_category === "jacket") || (data_category === "fur") || (data_category === "shirt")) {
          if(the_size === "") {
            wish_warning_side.innerHTML = "Choose your size!";
            return;
          }
        }

      // increase the counter of items
          number++;
          let the_cart_count = document.querySelectorAll(".the_cart_count");
          let counterCart = document.querySelectorAll(".counterCart");
          let counterCart_p = document.querySelectorAll(".counterCart p");

          counterCart.forEach(function(counter) {
          counter.style.display = "block";
          counter.style.background = "green";
          counter.style.borderColor = "green";
          counter.style.transform = "scale(1.2)";
          setTimeout(function() {
            counter.style.transform = "scale(1)";
            counter.style.borderColor = "#909090";
            counter.style.background = "#909090";
          }, 1000);
        });

            counterCart_p.forEach(function(counter_p) {
            counter_p.innerHTML = number;
            setTimeout(function() {
              counter_p.style.color = "#fff";
            }, 2000);
          });
          the_cart_count.forEach(function(the_count) {
            the_count.innerHTML = "My cart ("+number+")";
          });
          wish_warning_side.innerHTML = "";

          addItem(name, price, picture, 1, number, the_size);
          let added = document.querySelectorAll(".wish_cart_added[data-desc='"+name+"']")[0];
          let added_p = document.querySelectorAll(".wish_cart_added_p[data-desc='"+name+"']")[0];

          addedTotheCart(added, added_p);

        });
      });
    }
  }
}

// added to the cart
function addedTotheCart(added, added_p) {
  added.style.display = "block";
  added_p.style.display = "block";
  setTimeout(function() {
    added.style.display= "none";
    added_p.style.display = "none";
  }, 2000);
}

// remove product from wishlist
function removeWishProduct(name) {
  if(JSON.parse(localStorage.getItem("wishCart"))) {
    loadWish();
  }
  let the_wish_count = document.querySelectorAll(".the_wish_count");
  let counterWish_p = document.querySelectorAll(".counterWish p");

  for (let i = 0; i < wishCart.length; i++) {
    if(wishCart[i].name === name) {
      numberWish = numberWish - 1;
      wishCart.splice(i, 1);

      counterWish_p.forEach(function(counter_p) {
        counter_p.innerHTML = numberWish;
      });
      if(wishCart.length < 1) {
        let the_wish_content = document.querySelector(".the_wish_content");
        the_wish_content.innerHTML = "";
        wishCart.splice(i, 1);
        counterWish_p.forEach(function(counter_p) {
          counter_p.innerHTML = numberWish;
        });
        the_wish_count.forEach(function(the_count) {
          the_count.innerHTML = "My wishlist ("+numberWish+")";
        });
        saveWish();
        saveWishNumber();
        displayWish();
      }
        saveWish();
        saveWishNumber();
        displayWish();
        }
      }
      saveWish();
      saveWishNumber();
      displayWish();

      if(JSON.parse(localStorage.getItem("wishCart")))  {
      wishCart.forEach(function(cart) {
        let name = cart.name;
        let added_to_wish = document.querySelectorAll(".added_to_wish p[data-desc='"+cart.name+"']");
        added_to_wish.forEach(function(the_added) {
          the_added.style.display = "block";
        });
        let wish_cart_added_p = document.querySelectorAll(".wish_cart_added_p[data-desc='"+cart.name+"']");
        wish_cart_added_p.forEach(function(added) {
        });
        let added = document.querySelectorAll(".added[data-desc='"+cart.name+"']");
      });
    }
  }

// clear the wishlist (empty)
function clearWish() {
  if(JSON.parse(localStorage.getItem("wishCart"))) {
    loadWish();
  }
  wishCart = [];
  numberWish = 0;
  let the_wish_content = document.querySelector(".the_wish_content");
  the_wish_content.innerHTML = "";
  let counterWish_p = document.querySelectorAll(".counterWish p");
  counterWish_p.forEach(function(the_counter) {
    the_counter.innerHTML = numberWish;
  });
  let the_wish_count = document.querySelectorAll(".the_wish_count");
  the_wish_count.forEach(function(the_count) {
    the_count.innerHTML = "My wishlist ("+numberWish+")";
  });
  saveWish();
  saveWishNumber();
  displayWish();
}

// save the wishCart
function saveWish() {
  localStorage.setItem("wishCart", JSON.stringify(wishCart));
}

// save counter number of wish products
function saveWishNumber() {
  localStorage.setItem("numberWish", JSON.stringify(numberWish));
}

// load the wishCart
function loadWish() {
  if(JSON.parse(localStorage.getItem("wishCart"))) {
  wishCart = JSON.parse(localStorage.getItem("wishCart"));
}
if(JSON.parse(localStorage.getItem("numberWish"))) {
  numberWish = JSON.parse(localStorage.getItem("numberWish"));
}
let counterWish = document.querySelectorAll(".counterWish");
let counterWish_p = document.querySelectorAll(".counterWish p");
let the_wish_count = document.querySelectorAll(".the_wish_count");

  // display the counter
  if(numberWish > 0) {

    counterWish.forEach(function(counter) {
      counter.style.display = "block";
      counter.style.background = "#909090";
      counter.style.borderColor = "#909090";
    });
    counterWish_p.forEach(function(counter_p) {
      counter_p.innerHTML = numberWish;
      counter_p.style.color = "#fff";
    });
    the_wish_count.forEach(function(the_count) {
      the_count.innerHTML = "My wishlist ("+numberWish+")";
    });
  }

  // display the "added to the wish icon" in the selected items
  if(JSON.parse(localStorage.getItem("wishCart")))  {
  wishCart.forEach(function(cart) {
    let name = cart.name;
    let added_to_wish = document.querySelectorAll(".added_to_wish[data-desc='"+name+"']");
    added_to_wish.forEach(function(the_added) {
      the_added.style.display = "block";
      });
    });
  }
}

// clicking wish icon and add the item to the wishList
let wish_icon = document.querySelectorAll(".trend_picture .product_icons .product_wish_icon");
if(wish_icon) {
  wish_icon.forEach(function(the_wish) {
    the_wish.addEventListener('click', function(e) {
      let the_product = the_wish.parentNode.parentNode.parentNode;
      let name = the_product.dataset.desc;
      let picture = the_product.dataset.pic;
      let price = parseInt(the_product.dataset.theprice);
      let status = the_product.dataset.status;
      let del_price = the_product.dataset.delprice;
      let category = the_product.dataset.category;

      // check if already add the item to the wishList
      for(let i in wishCart) {
        if(wishCart[i].name === name) {
          let added_to_wish = document.querySelectorAll(".added_to_wish[data-desc='"+name+"']")[0];
          let added_to_wish_p = document.querySelectorAll(".added_to_wish[data-desc='"+name+"'] p")[0];
          warningColorWish(added_to_wish, added_to_wish_p)
          return;
        }
      }

      // increase the counter of items
      numberWish++;
      let counterWish = document.querySelectorAll(".counterWish");
      let counterWish_p = document.querySelectorAll(".counterWish p");
      let the_wish_count = document.querySelectorAll(".the_wish_count");

      counterWish.forEach(function(counter) {
        counter.style.display = "block";
        counter.style.background = "green";
        counter.style.borderColor = "green";
        counter.style.transform = "scale(1.2)";
        setTimeout(function() {
          counter.style.transform = "scale(1)";
          counter.style.borderColor = "#909090";
          counter.style.background = "#909090";
        }, 1000);
      });

      counterWish_p.forEach(function(counter_p) {
        counter_p.innerHTML = numberWish;
      });

      the_wish_count.forEach(function(the_count) {
        the_count.innerHTML = "My wishlist \("+numberWish+"\)";
      });

      addToWish(the_product, name, price, picture, status, del_price, category);
      let added_to_wish = document.querySelectorAll(".added_to_wish[data-desc='"+name+"']")[0];
      added_to_wish.style.display = "block";
    });
  });
}

// already added to wishlist
function warningColorWish(the_element, the_element_p) {
  the_element.style.background = "green";
  the_element_p.style.color = "#fff";
  the_element_p.innerHTML = "Already added to the wishlist";
  setTimeout(function() {
   the_element.style.background = "#f1f1f1";
    the_element_p.style.color = "#909090";
    the_element_p.innerHTML = "Added to the wishlist";
  }, 2000);
}

// check the path
let wish_path = window.location.pathname;

if(wish_path == '/ecommerce/men.html' || 'ecommerce/women.html' || 'ecommerce/index.html' || 'ecommerce/shop.html') {
  window.addEventListener('load', loadWish);
}

if(wish_path == '/ecommerce/wishlist.html') {
displayWish();
}


// **************************** product page **********************************
let product_array = [];

// constructor
let Prod = function(name, price, picture, status, deleted_price, category) {
  this.name = name;
  this.price = price;
  this.picture = picture;
  this.status = status;
  this.category = category;
  this.deletedprice = deleted_price;
}

// add product
function addProduct(name, price, picture, status, deleted_price, category) {

  let product = new Prod(name, price, picture, status, deleted_price, category);
  product_array.push(product);

  saveProduct(product_array);
}

// clicking in a product in order to add it
let product_image = document.querySelectorAll(".trend_product img");
if(product_image) {
  product_image.forEach(function(the_img) {
    the_img.addEventListener('click', function(e) {
      e.preventDefault();
      let the_product = the_img.parentNode.parentNode;
      if(the_product.classList.contains('trend_product') || the_img.parentNode.classList.contains('trend_product')) {
        window.location.href = "product.html";
        let div_product = the_product;
        let name = the_product.dataset.desc;
        let price = the_product.dataset.theprice;
        let picture = the_product.dataset.pic;
        let status = the_product.dataset.status;
        let category = the_product.dataset.category;
        let deleted_price = "";
        if(status === "sales") {
        deleted_price = the_product.dataset.delprice;
          } else {
        deleted_price = "no";
        }

        addProduct(name, price, picture, status, deleted_price, category);

          }
      });
    });
  }

// display the current product
function displayProduct() {
  loadProduct();
  loadCart();

  let product_page = document.querySelector(".product_page");
  let output = "";
  let product_warning = document.querySelector(".product_warning");
    //check if the product not exists
    if(product_array.length < 1) {
      product_warning.innerHTML = "Product not found";
    }
    // if the product exists
    else {
      let item_size = "";
      product_array.forEach(function(product) {
          let prev_price = "";
        if(product.status === "sales") {
          prev_price = "$"+product.deletedprice;
        } else {
          prev_price = "";
        }
      let megethos = "";

      output += "<div class='product_left'><div class='product_left_pic'><img src='"+product.picture+"'></div></div>";
      output += "<div class='product_right'><div class='product_right_content'><p class='product_right_name'>"+product.name+"</p>";
      if(product.status === "sales") {
        prev_price = product.deletedprice;
        output += "<p class='product_right_price'><span class='right_prev_price'>"+prev_price+"<span class='euroFont'> &euro;</span></span><span class='current_price_display'>"+product.price+"<span class='euroFont'> &euro;</span></span></p>";
      } else {
          output += "<p class='product_right_price'><span class='current_price_display'>$"+product.price+"</span></p>";
      }
      output += "<p class='product_right_size'>Size</p>";
      if( (product.category === 'jacket') || (product.category === 'fur') || (product.category === 'shirt') ) {
      megethos += "<p class='xs size_inline' data-size='xs'>XS</p><p class='s size_inline' data-size='s'>s</p><p class='m size_inline' data-size='m'>M</p><p class='l size_inline' data-size='l'>L</p><p class='xl size_inline' data-size='xl'>XL</p>";
      output += megethos;
    } else if(product.category === "shoes") {
      megethos += "<select class='size_select'><option></option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option>";
      megethos += "<option>42</option><option>43</option><option>44</option><option>45</option><option>46</option>";
      megethos += "</select>";
      output += megethos;
    } else if( (product.category === "sunglasses") || (product.category === 'accessories') || (product.category === 'hat') ) {
      megethos += "<p class='one_size'>This product is one size.</p>";
      output += megethos;
    }
      output += "<div class='wish_cart_display_icons' data-category='"+product.category+"' data-the_product='"+product.the_product+"' data-desc='"+product.name+"' data-price='"+product.price+"' data-pic='"+product.picture+"'><img src='images/wish.png' class='product_display_wish'><img src='images/cart.png' class='product_display_cart' data-category='"+product.category+"' data-the_product='"+product.the_product+"' data-desc='"+product.name+"' data-price='"+product.price+"' data-pic='"+product.picture+"'></div>";
      output += "<p class='available'>Available</p>";
      output += "<p class='product_wish_add_p' data-desc='"+product.name+"'>Added to the wishlist</p>";
      output += "<p class='warning_cart_product'></p>";
      output += "<div class='cart_margin'><p class='product_cart_add_p' data-desc='"+product.name+"'>Added to the cart</p></div>";
      output += "</div>";
      output += "</div>";

});
    product_page.innerHTML = output;

   product_array.forEach(function(product) {
    if( (product.category === "jacket") || (product.category === "shirt") || (product.category === "fur") ) {
    let size_inline = document.querySelectorAll(".size_inline");
    size_inline.forEach(function(size) {
      size.addEventListener('click', function() {
        clearColor(size_inline);

      size.style.border = "2px solid #000";
      item_size = size.dataset.size;

      });
    });
 }
});


  let size_select = document.querySelector(".size_select");
    // add product to the cart
    let product_display_cart = document.querySelectorAll(".product_display_cart");
    product_display_cart.forEach(function(the_icon) {
      the_icon.addEventListener('click', function() {
        data_category = the_icon.dataset.category;
        if(data_category === "shoes") {
          item_size = size_select[size_select.selectedIndex].value;
        }  else if( (data_category === "accessories") || (data_category === "sunglasses") || (data_category === "hat") ) {
       item_size = "No sizes";
     }
        let the_product = the_icon.dataset.the_product;
        let name = the_icon.dataset.desc;
        let price = parseInt(the_icon.dataset.price);
        let picture = the_icon.dataset.pic;

    let warning_cart_product = document.querySelector(".warning_cart_product");
    if( (data_category === "jacket") || (data_category === "shoes") || (data_category === "fur") || (data_category === "shirt") ) {
      if(item_size === "") {
        warning_cart_product.style.display = "block";
        warning_cart_product.innerHTML = "Choose your size";
        return;
      }
    }

        // increace the counter
        number++;
        let the_cart_count = document.querySelectorAll(".the_cart_count");
        let counterCart = document.querySelectorAll(".counterCart");
        let counterCart_p = document.querySelectorAll(".counterCart p");
        counterCart.forEach(function(counter) {
          counter.style.display = "block";
          setTimeout(function() {
            counter.style.background = "green";
          }, 2000);
        });

        // cart icon
        counterCart.forEach(function(counter) {
          counter.style.background = "green";
          counter.style.borderColor = "green";
          counter.style.transform = "scale(1.2)";
          setTimeout(function() {
            counter.style.background = "#909090";
            counter.style.borderColor = "#909090";
            counter.style.transform = "scale(1)";
          }, 2000);
        });

        // add counter to cart icon
        counterCart_p.forEach(function(counter_p) {
          counter_p.innerHTML = number;
          setTimeout(function() {
            counter_p.style.color = "#fff";
          }, 2000);
        });

        the_cart_count.forEach(function(the_count) {
          the_count.innerHTML = "My cart ("+number+")";
        });

        addItem(name, price, picture, 1, number, item_size);
        let product_cart_add = document.querySelectorAll(".product_cart_add[data-desc='"+name+"']")[0];
        let product_cart_add_p = document.querySelectorAll(".product_cart_add_p[data-desc='"+name+"']")[0];
        addedThePTotheCart(product_cart_add_p);
        warning_cart_product.style.display = "none";
        warning_cart_product.innerHTML = "";
        let size_inline = document.querySelectorAll(".size_inline");
        if( (data_category === "jacket") || (data_category === "shoes") || (data_category === "fur") || (data_category === "shirt") ) {
          item_size = "";
        }
        clearColor(size_inline);
        saveCart();
      });
    });

    // add product to the wishList
    let wish_icon = document.querySelectorAll(".product_display_wish");
    if(wish_icon) {
      wish_icon.forEach(function(the_wish) {
        the_wish.addEventListener('click', function(e) {

          let the_product = the_wish.parentNode;
          let name = the_product.dataset.desc;
          let picture = the_product.dataset.pic;
          let price = parseInt(the_product.dataset.theprice);

          // check if already add the item to the wishList

          for(let i in wishCart) {
            if(wishCart[i].name === name) {
              let product_wish_add_p = document.querySelectorAll(".product_wish_add_p[data-desc='"+name+"']")[0];
              warningProductCart(product_wish_add_p);
              return;
            }
          }

          // increase the counter of items
          numberWish++;
          let counterWish = document.querySelectorAll(".counterWish");
          let counterWish_p = document.querySelectorAll(".counterWish p");

          counterWish.forEach(function(counter) {
          counter.style.display = "block";
          counter.style.background = "green";
          counter.style.borderColor = "green";
          counter.style.transform = "scale(1.2)";
          setTimeout(function() {
            counter.style.transform = "scale(1)";
            counter.style.borderColor = "#909090";
            counter.style.background = "#909090";
          }, 1000);
        });

          // add number to wishlist icon
          counterWish_p.forEach(function(counter_p) {
            counter_p.innerHTML = numberWish;
            setTimeout(function() {
              counter_p.style.color = "#fff";
            }, 2000);
          });

          addToWish(the_product, name, price, picture);
          let product_wish_add_p = document.querySelectorAll(".product_wish_add_p[data-desc='"+name+"']")[0];
          product_wish_add_p.style.display = "inline-block";
        });
      });
    }
  }
}

// clear color of selected size
function clearColor(size_inline) {
  size_inline.forEach(function(size) {
    size.style.border = "2px solid #e1e1e1";
  });
}

// display added to the cart
function addedThePTotheCart(added_p) {
  added_p.style.display = "inline-block";
  setTimeout(function() {
    added_p.style.display = "none";
  }, 2500);
}

// save product
function saveProduct(product_array) {
  localStorage.setItem("product", JSON.stringify(product_array));
}

// load product
function loadProduct() {
  if(JSON.parse(localStorage.getItem("product"))) {
  product_array = JSON.parse(localStorage.getItem("product"));
  if(product_array.length > 1) {
  }
}

  // display the "added to the wish icon" in the selected items
  if(JSON.parse(localStorage.getItem("wishCart")))  {
  wishCart.forEach(function(cart) {
    let name = cart.name;
    let product_wish_add_p = document.querySelectorAll(".product_wish_add_p[data-desc='"+name+"']");
    product_wish_add_p.forEach(function(the_added) {
      the_added.style.display = "inline-block";
      });
    });
  }

  // display the "added to the cart" in the selected items
  if(JSON.parse(localStorage.getItem("cart")))  {
  cartList.forEach(function(cart) {
    let name = cart.name;
    let wish_cart_added_p = document.querySelectorAll(".wish_cart_added_p[data-desc='"+name+"']");
    wish_cart_added_p.forEach(function(the_added) {
      the_added.style.display = "block";
        });
      });
    }
}

// already added to wishlist
function warningProductCart(the_element_p) {
  the_element_p.style.background = "green";
  the_element_p.style.display = "inline-block";
  the_element_p.style.color = "#fff";
  the_element_p.style.padding = "15px";
  the_element_p.style.margin = "2.5px 0";
  the_element_p.innerHTML = "Already added to the wishlist";
  setTimeout(function() {
    the_element_p.innerHTML = "Added to the wishList";
    the_element_p.style.background = "#ff0a68";
    the_element_p.style.padding = "10px";
    the_element_p.style.margin = "0";
  }, 2000);
}

// check the path
let product_path = window.location.pathname;

if(product_path == '/ecommerce/product.html') {
  window.addEventListener('load', loadProduct);
}

if(product_path == '/ecommerce/product.html') {
displayProduct();
}
