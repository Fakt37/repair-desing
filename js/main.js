/*document.addEventListener("DOMContentLoaded", function(event) { 
    const modal = document.querySelector('.modal');
    const modalDialog = document.querySelector('.modal__dialog');
    const modalBtn = document.querySelectorAll('[data-toggle=modal]');
    const closeBtn = document.querySelector('.modal__close');
    const switchModal = () => {
        modal.classList.toggle('modal--visible');
    }
    modalBtn.forEach(element => {
        element.addEventListener('click', switchModal);
    });
    closeBtn.addEventListener('click', switchModal);
    document.addEventListener('keyup', (event) => {
        if(event.which =='27'){
            modal.classList.remove('modal--visible');
        }
    });
    document.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.classList.remove('modal--visible');
        }
      });
  }); */

  $(document).ready(function () {
    var modal = $('.modal'),
        modalDialog = $('.modal__dialog'),
        modalBtn = $('[data-toggle="modal"]'),
        closeBtn = $('.modal__close');
        modalBtn.on('click', function () {
            modal.toggleClass('modal--visible');
        });
        closeBtn.on('click', function () {
            modal.toggleClass('modal--visible');
        });
        $(document).keyup(function (event) {
            if(event.which == '27') {
                modal.toggleClass('modal--visible');
            };
        });
        $(document).on('click', function (event) {
            if (modal.is(event.target)) {
                modal.toggleClass('modal--visible');
            };
        });
        $(window).scroll(function () {
            if($(this).scrollTop() > 1000) {
                $('.button-up'). fadeIn();
            } else {
                $('.button-up').fadeOut();
            }
        });
        $('#button-up').on('click', function (event) {
            event.preventDefault;
            $('html, body').animate({scrollTop:0},
                '300');
        });
        var projectSwiper = new Swiper('.projects-swiper-container', {
            // Optional parameters
            loop: true,
            pagination: {
              el: '.projects-swiper-pagination',
              type: 'bullets',
              clickable: true
            },
            navigation: {
              nextEl: '.projects-swiper-button-next',
              prevEl: '.projects-swiper-button-prev',
            },
          });
        
          var next = $('.projects-swiper-button-next');
          var prev = $('.projects-swiper-button-prev');
          var bullets = $('.projects-swiper-pagination');
        
          next.css('left', prev.width() + bullets.width() + 45)
          bullets.css('left', prev.width() + 25)

        var stepsSwiper = new Swiper('.steps__swiper-container', {
            // Optional parameters
            loop: true,
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            pagination: {
              el: '.steps__swiper-pagination',
              type: 'bullets',
              clickable: true
            },
            navigation: {
              nextEl: '.steps__swiper-button-next',
              prevEl: '.steps__swiper-button-prev',
            },
          });
        
          var next2 = $('.steps__swiper-button-next');
          var prev2 = $('.steps__swiper-button-prev');
          var bullets2 = $('.steps__swiper-pagination');
        
          next2.css('left', prev2.width() + bullets2.width() + 40)
          bullets2.css('left', prev2.width() + 23)
        
          $('.steps__tabs-item').on('click', function () {
            $('.steps__tabs-item').removeClass('active');
            $(this).addClass('active');
            const event = $(this).data('index');
            stepsSwiper.slideTo(event)
          })
        
          stepsSwiper.on('slideChange', (function () {
            let event = stepsSwiper.activeIndex - 1;
            if (event === 6) {event=0};
            $('.steps__tabs-item').removeClass('active');
            $('.steps__tabs-item').eq(event).addClass('active');
          }))
});