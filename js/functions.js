window.addEventListener('load', function() {

  window.addEventListener('scroll', function() {
    scrollEvent();
  });

let wrapper_loader = document.querySelector(".wrapper_loader"),
    the_path = window.location.pathname,
    // slider vars
    timer = "",
    wrapper_height = document.body.clientHeight - 100,
    wrapper_slider = document.querySelector(".wrapper_slider"),
    slider = document.querySelectorAll(".slider"),
    slider_content = document.querySelectorAll(".slider_content"),
    backgroundPic = document.querySelectorAll(".backgroundPic"),
    circle = document.querySelectorAll(".circle"),
    text_slide = document.querySelectorAll(".text_slide"),
    border_width = document.querySelectorAll(".border_width"),
    mini_background = document.querySelectorAll(".mini_background"),
    dot = document.querySelectorAll(".dot"),
    dot_one = document.querySelector(".dot_one"),
    dot_two = document.querySelector(".dot_two"),
    dot_three = document.querySelector(".dot_three"),
    current = 0,
    // on scroll display poster vars
    wrapper_colllection_poster = document.querySelector(".wrapper_colllection_poster"),
    absolute_poster_left = document.querySelector(".absolute_poster_left"),
    absolute_one = document.querySelector(".absolute_one"),
    absolute_two = document.querySelector(".absolute_two"),
    absolute_left_text_a = document.querySelector(".absolute_left_text a "),
    wrapper_trend = document.querySelector(".wrapper_trend"),
    wrapper_sales = document.querySelector(".wrapper_sales"),

    // newsletter vars
    wrapper_newsletter = document.querySelector(".wrapper_newsletter"),
    full_overlay = document.querySelector(".full_overlay"),
    close_news = document.querySelector(".close_news"),
    header_roll = document.querySelector(".header_roll"),
    newsletter_btn = document.querySelector(".newsletter_btn"),
    email_input = document.querySelector(".email_input"),
    left_news = document.querySelector(".left_news"),
    right_news_text = document.querySelector(".right_news_text");

if(wrapper_loader) {
wrapper_loader.style.display = "none";
}

// SLIDER

// slider 100% height
if(wrapper_slider !== null) {
wrapper_slider.style.height = wrapper_height + "px";
}

//reset slider
function reset() {
  for(i = 0; i < slider.length; i++) {
    slider[i].style.opacity = 0;
    slider[i].style.zIndex = -10;
  }
  for(x = 0; x < slider_content.length; x++) {
    slider_content[x].style.opacity = 0;
    slider_content[x].style.zIndex = -10;
  }
  for(j = 0; j < backgroundPic.length; j++) {
    backgroundPic[j].style.left = "30%";
  }
  for (k = 0; k < circle.length; k++) {
    circle[k].style.left = "65%";
    }
  for(z = 0; z < text_slide.length; z++) {
    text_slide[z].style.top = "55%";
    text_slide[z].style.opacity = 0;
    text_slide[z].style.zIndex = -10;
  }
  for(r = 0; r < mini_background.length; r++) {
    mini_background[r].style.left = "0%";
  }
  for(c = 0; c < border_width.length; c++) {
    border_width[c].style.width = "0%";
  }
  for(a = 0; a < dot.length; a++) {
    dot[a].style.borderLeft = "0.15rem solid transparent";
  }
}

if(the_path == '/ecommerce/index.html' || '/ecommerce/') {
startSlide();
 timer = setInterval(slideRight, 4000);
}

// start
function startSlide() {
  reset();
  theSlider(10, current);
}

// next slide
function slideRight() {
  reset();
  if(current === slider.length - 1 && current === slider_content.length - 1) {
    current = -1;
  }
  theSlider(10, current+1);
}

// slider dots
dot_one.addEventListener('click', (e) => {
  callSlider(e, 50, 0);
});

dot_two.addEventListener('click', (e) => {
  callSlider(e, 50, 1);
});

dot_three.addEventListener('click', (e) => {
  callSlider(e, 50, 2);
});


function callSlider(e, sZindex, theCurrent) {
  e.preventDefault();
  clearInterval(timer);
  reset();
  theSlider(sZindex, theCurrent);
  timer = setInterval(slideRight, 4000);
}

function theSlider(sZindex, theCurrent) {
  backgroundPic[theCurrent].style.left = '50%';
  slider[theCurrent].style.opacity = 1;
  slider[theCurrent].style.zIndex = sZindex;
  text_slide[theCurrent].style.opacity = 1;
  text_slide[theCurrent].style.zIndex = 10;
  text_slide[theCurrent].style.top = '50%';
  border_width[theCurrent].style.width = '100%';
  slider_content[theCurrent].style.opacity = 1;
  slider_content[theCurrent].style.zIndex = 10;
  mini_background[theCurrent].style.left = '70%';
  mini_background[theCurrent].style.zIndex = 5;
  circle[theCurrent].style.left = '50%';
  dot[theCurrent].style.borderLeft = '.15rem solid #ff024a';
  current = theCurrent;
}

// sales
window.addEventListener('scroll', function() {
  if(window.pageYOffset > 350) {
    wrapper_sales.style.opacity = 1;
    wrapper_sales.style.marginTop = "60px";
    setTimeout(displayAbs, 500);
  }
  if(window.pageYOffset > 700) {
    wrapper_colllection_poster.style.marginTop = "60px";
    wrapper_colllection_poster.style.opacity = "1";
  }
  if(window.pageYOffset > 600) {
    wrapper_trend.style.marginTop = "50px";
  }
});

// scroll
function scrollEvent() {
  let wTop = window.pageYOffset,
      offsetTopPoster = wrapper_colllection_poster.offsetTop,
      offsetHeightPoster = wrapper_colllection_poster.offsetHeight;

  if (window.localStorage.getItem('newsletter') !== 'notShow') {
  if(wTop > offsetHeightPoster) {
    displayElement(wrapper_newsletter, 'block');
    wrapper_newsletter.style.top = "50%";
    wrapper_newsletter.style.transform = "translate(-50%, -50%)";
    displayElement(full_overlay, 'block');
    close_news.addEventListener('click', function(e) {
      e.preventDefault();
      displayElement(wrapper_newsletter, 'none');
      displayElement(full_overlay, 'none');
      window.localStorage.setItem('newsletter', 'notShow');
    });

    right_news_text.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    left_news.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    email_input.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    newsletter_btn.addEventListener('click', function(e) {
      e.stopPropagation();
    });


    document.body.addEventListener('click', function(e) {
      displayElement(wrapper_newsletter, 'none');
      displayElement(full_overlay, 'none');
      window.localStorage.setItem('newsletter', 'notShow');
    });
  }
  }
}

function displayElement(theElement, display) {
  theElement.style.display = display;
}

// poster
function displayAbs() {
  absolute_poster_left.style.opacity = "0.6";
  absolute_poster_left.style.left = "0%";
  absolute_poster_left.style.transform = "translate(0%, -50%)";
  absolute_left_text_a.style.opacity = "1";
  absolute_one.style.opacity = "1";
  absolute_two.style.opacity = "1";
  absolute_one.style.marginTop = "30px";
}
});
