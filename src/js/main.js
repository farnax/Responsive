$(document).ready(function() {
  $('.nav__link').on('click', function() {
  	var target = $(this).attr('href');
  	animateScroll(target);
  	$('.nav__link').css({
  	  'color': '#191919'
  	});
  	$(this).css({
  	  'color': '#4AD2CD'
  	});
  	return false;
  });
  $('.button__link a').on('click', function() {
  	var target = $(this).attr('href');
  	animateScroll(target);
  	return false;
  });
  $(window).scroll(function () {
      if ($(this).scrollTop() != 0)
         $('.toTop').fadeIn();
      else
         $('.toTop').fadeOut();
   });
   $('.toTop').click(function () {
      $('body,html').animate({
         scrollTop: 0
      }, 800);
   });
   $('.menu-icon').on('click', function() {
    $('.header__nav').slideToggle(500);
    $('.header__nav').css({
      'text-align': 'center'
    });
    $('.nav__item').css({
      'display': 'block',
      'border': '1px solid #191919',
      'margin-bottom': '2%'
    });
    $('.nav__link').css({
      'display': 'block'
    })
   });
   $('.work__button').on('click', function() {
    $(this).toggleClass('work__button_active').html('Hide');
    if($(this).hasClass('work__button_active')) {
      $('.work__item').css({
        'display': 'block'
      });
    } else {
      $(this).html('See more');
      $('.work__item:nth-child(n+3):nth-child(-n+8)').css({
        'display': 'none'
      });
    }
   });
});
var animateScroll = function(target) {
  $('html, body').animate({
  	scrollTop: $(target).offset().top
  }, 800);
};
