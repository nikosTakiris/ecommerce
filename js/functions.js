window.addEventListener('load', function() {
let wrapper_loader = document.querySelector(".wrapper_loader");
wrapper_loader.style.display = "none";
});

window.addEventListener('load', function() {
let the_path = window.location.pathname;
let timer = "";

// slider 100% height
let wrapper_height = document.body.clientHeight - 100;
let wrapper_slider = document.querySelector(".wrapper_slider");
if(wrapper_slider !== null) {
wrapper_slider.style.height = wrapper_height + "px";
}

let slider = document.querySelectorAll(".slider");
let slider_content = document.querySelectorAll(".slider_content");
let backgroundPic = document.querySelectorAll(".backgroundPic");
let circle = document.querySelectorAll(".circle");
let text_slide = document.querySelectorAll(".text_slide");
let border_width = document.querySelectorAll(".border_width");
let mini_background = document.querySelectorAll(".mini_background");
let dot = document.querySelectorAll(".dot");
let dot_one = document.querySelector(".dot_one");
let dot_two = document.querySelector(".dot_two");
let dot_three = document.querySelector(".dot_three");

let current = 0;

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

// start
function startSlide() {
  reset();
  slider[current].style.opacity = 1;
  slider[current].style.zIndex = 10;

  backgroundPic[current].style.left = "50%";

  circle[current].style.left = "50%";

  dot[current].style.borderLeft = "0.15rem solid #ff024a";

  text_slide[current].style.opacity = 1;
  text_slide[current].style.zIndex = 10;
  text_slide[current].style.top = "50%";

  border_width[current].style.width = "100%";

  mini_background[current].style.left = "70%";
  mini_background[current].style.zIndex = 5;
  slider_content[current].style.opacity = 1;
  slider_content[current].style.zIndex = 10;
//  setInterval(slideRight, 4000);
}

// next slide
function slideRight() {
  reset();
  if(current === slider.length - 1 && current === slider_content.length - 1) {
    current = -1;
  }

  slider[current + 1].style.opacity = 1;
  slider[current + 1].style.zIndex = 10;

  backgroundPic[current + 1].style.left = "50%";

  circle[current + 1].style.left = "50%";

  dot[current + 1].style.borderLeft = "0.15rem solid #ff024a";

  text_slide[current + 1].style.opacity = 1;
  text_slide[current + 1].style.zIndex = 10;
  text_slide[current + 1].style.top = "50%";

  border_width[current + 1].style.width = "100%";

  mini_background[current + 1].style.zIndex = 5;
  mini_background[current + 1].style.left = "70%";

  slider_content[current + 1].style.opacity = 1;
  slider_content[current + 1].style.zIndex = 10;

  current++;
}

if(the_path == '/ecommerce/index.html' || '/ecommerce/') {
startSlide();
 timer = setInterval(slideRight, 4000);
}

//dots
dot_one.addEventListener('click', function(e) {
  e.preventDefault();
  clearInterval(timer);
  reset();
  backgroundPic[0].style.left = "50%";
  slider[0].style.opacity = 1;
  slider[0].style.zIndex = 50;
  text_slide[0].style.opacity = 1;
  text_slide[0].style.zIndex = 10;
  text_slide[0].style.top = "50%";
  border_width[0].style.width = "100%";
  slider_content[0].style.opacity = 1;
  slider_content[0].style.zIndex = 10;
  mini_background[0].style.left = "70%";
  mini_background[0].style.zIndex = 5;
  circle[0].style.left = "50%";
  dot[0].style.borderLeft = "0.15rem solid #ff024a";
  current = 0;
  timer = setInterval(slideRight, 4000);
});

dot_two.addEventListener('click', function() {
  clearInterval(timer);
  reset();
  backgroundPic[1].style.left = "50%";
  slider[1].style.opacity = 1;
  slider[1].style.zIndex = 50;
  text_slide[1].style.opacity = 1;
  text_slide[1].style.zIndex = 10;
  text_slide[1].style.top = "50%";
  border_width[1].style.width = "100%";
  slider_content[1].style.opacity = 1;
  slider_content[1].style.zIndex = 10;
  mini_background[1].style.left = "70%";
  mini_background[1].style.zIndex = 5;
  circle[1].style.left = "50%";
  dot[1].style.borderLeft = "0.15rem solid #ff024a";
  current = 1;
  timer = setInterval(slideRight, 4000);
});

dot_three.addEventListener('click', function() {
  clearInterval(timer);
  reset();
  backgroundPic[2].style.left = "50%";
  slider[2].style.opacity = 1;
  slider[2].style.zIndex = 50;
  text_slide[2].style.opacity = 1;
  text_slide[2].style.zIndex = 10;
  text_slide[2].style.top = "50%";
  border_width[2].style.width = "100%";
  slider_content[2].style.opacity = 1;
  slider_content[2].style.zIndex = 10;
  mini_background[2].style.left = "70%";
  mini_background[2].style.zIndex = 5;
  circle[2].style.left = "50%";
  dot[2].style.borderLeft = "0.15rem solid #ff024a";
  current = 2;
  timer = setInterval(slideRight, 4000);
});

// on scroll display poster
let wrapper_colllection_poster = document.querySelector(".wrapper_colllection_poster");
let absolute_poster_left = document.querySelector(".absolute_poster_left");
let absolute_one = document.querySelector(".absolute_one");
let absolute_two = document.querySelector(".absolute_two");
let absolute_left_text_a = document.querySelector(".absolute_left_text a ");
let wrapper_trend = document.querySelector(".wrapper_trend");
let wrapper_sales = document.querySelector(".wrapper_sales");

// newsletter
let wrapper_newsletter = document.querySelector(".wrapper_newsletter");
let full_overlay = document.querySelector(".full_overlay");
let close_news = document.querySelector(".close_news");
let header_roll = document.querySelector(".header_roll");
let newsletter_btn = document.querySelector(".newsletter_btn");
let email_input = document.querySelector(".email_input");
let left_news = document.querySelector(".left_news");
let right_news_text = document.querySelector(".right_news_text");

window.addEventListener('scroll', function() {

let wTop = window.pageYOffset;

let offsetTopPoster = wrapper_colllection_poster.offsetTop;

let offsetHeightPoster = wrapper_colllection_poster.offsetHeight;

if (window.localStorage.getItem('newsletter') !== 'notShow') {

if(wTop > offsetHeightPoster) {
  wrapper_newsletter.style.display = "block";
  wrapper_newsletter.style.top = "50%";
  wrapper_newsletter.style.transform = "translate(-50%, -50%)";
  full_overlay.style.display = "block";

  close_news.addEventListener('click', function(e) {
    e.preventDefault();
    wrapper_newsletter.style.display = "none";
    full_overlay.style.display = "none";

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
    wrapper_newsletter.style.display = "none";
    full_overlay.style.display = "none";

    window.localStorage.setItem('newsletter', 'notShow');

  });
}
}

});

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
