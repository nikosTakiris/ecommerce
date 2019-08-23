window.addEventListener('load', function() {
let wrapper_loader = document.querySelector(".wrapper_loader");
wrapper_loader.style.display = "none";
});

let the_product = {}, // the product objects
    array_product = [], // the array of product objects
    filter_array = [], // the array of checkbox checked objects
    the_filter = {}; // the checked checkeboxes object

// show/hide filter content
let filter_items_title = document.querySelectorAll(".filter_items_title");
if(filter_items_title) {
  filter_items_title.forEach(function(title) {
    title.addEventListener('click', function(e) {
      let data_id = title.dataset.id,
          filter_content = document.querySelectorAll(".filter_content[data-id='"+data_id+"']")[0],
          plus_sign = document.querySelectorAll(".plus_sign[data-id='"+data_id+"']")[0],
          content_title = document.querySelectorAll(".content_title[data-id='"+data_id+"']")[0];

      title.classList.toggle('show');
      if(title.classList.contains('show')) {
        content_title.classList.add('boldText');
        content_title.style.borderBottom = "1.5px solid #e1e1e1";
        filter_content.style.display = "block";
        plus_sign.innerHTML = "-";
      } else if(!title.classList.contains('show')) {
        content_title.style.border = "none";
        content_title.style.fontWeight = "0";
        displayElement(filter_content, 'none');
        //    filter_content.style.display = "none";
        plus_sign.innerHTML = "+";
        filter_array = [];
        content_title.classList.remove('boldText');
        let filter_wrapper = document.querySelectorAll(".filter_wrapper");
          filter_wrapper.forEach(function(wrapper) {
          displayElement(wrapper, 'block');
            });
          let filter_general = document.querySelectorAll(".filter_general");
          filter_general.forEach(function(general) {
            general.checked = false;
          });
          let product_shop = document.querySelectorAll(".product_shop");
          product_shop.forEach(function(product) {
            displayElement(product, 'block');
          });
        }
    });
  });
}

let product_shop = document.querySelectorAll(".product_shop");
if(product_shop) {
let array_product_data = [];
product_shop.forEach(function(product) {
  let product_data = product.dataset.general;

array_product.push(
  the_product = {
    "product_div": product,
    "price": product.dataset.price,
    "color": product.dataset.color,
    "category": product.dataset.category,
    "status": product.dataset.status
  }
);
});
}

// checkboxes filter
let filter_general = document.querySelectorAll(".filter_general");
if(filter_general) {
filter_general.forEach(function(general) {
  general.addEventListener('change', function(e) {
    if(general.checked) {
    let filter_wrapper = document.querySelectorAll(".filter_wrapper");
      filter_wrapper.forEach(function(wrapper) {
        wrapper.style.display = "none";
      });

      let current_filter_wrapper = general.parentNode.parentNode.parentNode;
      current_filter_wrapper.style.display = "block";

      // filter checkbox array
      filter_array.push(general.dataset.general);
    }
    else {
      let index = filter_array.indexOf(general.dataset.general);
      filter_array.splice(index, 1);
    }
    displayFilter(filter_array);
  });

});
}

// display filter
function displayFilter(filter_array) {
  resetProducts();
  checkFilter(filter_array);
  filter_array.forEach(function(data_filter) {
      array_product.forEach(function(product) {

        if( (product.price == data_filter) || (product.color == data_filter) || (product.category == data_filter) || (product.status == data_filter) )  {
          product.product_div.style.display = "block";
            }
          else {
           product.product_div.style.display = "none";  
          }
        });
      });
    }

    //reset the products
    function resetProducts() {
      filter_general.forEach(function(general) {
        if(general.checked) {
        filter_array.forEach(function(data_filter) {
          array_product.forEach(function(product) {
          if( (product.price !== data_filter) && (product.color !== data_filter) && (product.category !== data_filter) && (product.status !== data_filter) )  {
            product.product_div.style.display = "none";
                }
            });
          });
        }
      });
    }

    // check if filter array is empty or not
    function checkFilter(filter_array) {
      if(filter_array == "") {
      array_product.forEach(function(product) {
        product.product_div.style.display = "block";
        });
        let filter_wrapper = document.querySelectorAll(".filter_wrapper");
          filter_wrapper.forEach(function(wrapper) {
            wrapper.style.display = "block";
          });
      }
    }

// display elemfunction displayElement(theElement, display) {
  theElement.style.display = display;
}

