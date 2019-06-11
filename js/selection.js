let wrapper_height = document.body.clientHeight - 100,
    wrapper_slider = document.querySelector(".wrapper_slider"),
    wrapper_shop_selection = document.querySelector(".wrapper_shop_selection"),
    men_side = document.querySelector(".men_side"),
    women_side = document.querySelector(".women_side"),
    women_side_text = document.querySelector(".women_side_text h1"),
    men_side_text = document.querySelector(".men_side_text h1"),
    women_side_text_a = document.querySelector(".women_side_text a"),
    men_side_text_a = document.querySelector(".men_side_text a");

wrapper_slider.style.height = wrapper_height + "px";

if(document.body.clientWidth > 633) {

men_side.addEventListener('mouseover', function() {
  bigPoster(men_side, women_side, women_side_text, men_side_text, women_side_text_a, men_side_text_a);
});

women_side.addEventListener('mouseover', function() {
  bigPoster(women_side, men_side, men_side_text, women_side_text, men_side_text_a, women_side_text_a);
});

wrapper_shop_selection.addEventListener('mouseleave', function() {
  sameSize(men_side, women_side, men_side_text, women_side_text, men_side_text_a, women_side_text_a);
});
}
// on hover side to big
function bigPoster(bigger, smaller, min_text, reset_text, min_padding, reset_padding) {
  bigger.style.width = "70%";
  smaller.style.width = "30%";
  if(document.body.clientWidth <= 950) {
  min_text.style.fontSize = "1.8rem";
  reset_text.style.fontSize = "3.7rem";
  min_padding.style.padding = "7.5px 15px";
  min_padding.style.fontSize = "0.9rem";
  reset_padding.style.padding = "10px 20px";
  reset_padding.style.fontSize = "1.05rem";
  } else {
  min_text.style.fontSize = "3rem";
  reset_text.style.fontSize = "5rem";
  min_padding.style.padding = "10px 20px";
  min_padding.style.fontSize = "1rem";
  reset_padding.style.padding = "15px 30px";
  reset_padding.style.fontSize = "1.2rem";
}
}

// not hover in any side
function sameSize(a, b, a_text, b_text, a_text_a, b_text_a) {
  a.style.width = "50%";
  b.style.width = "50%";
  if(document.body.clientWidth <= 950) {
    a_text.style.fontSize = "3.7rem";
    b_text.style.fontSize = "3.7rem";
    a_text_a.style.padding = "10px 20px";
    a_text_a.style.fontSize = "1.05rem";
    b_text_a.style.padding = "10px 20px";
    b_text_a.style.fontSize = "1.05rem";
  } else {
    a_text.style.fontSize = "5rem";
    b_text.style.fontSize = "5rem";
    a_text_a.style.padding = "15px 30px";
    a_text_a.style.fontSize = "1.2rem";
    b_text_a.style.padding = "15px 30px";
    b_text_a.style.fontSize = "1.2rem";
  }

}
