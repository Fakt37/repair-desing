$(document).ready(function () {
  new WOW().init();
  /* $(window).scroll(function(){
      $('.card__image ').addClass('card__animation', $(this).scrollTop() > 3000);
  }); */
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
        $('html, body').animate({scrollTop:0},'300');
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
      stepsSwiper[0].slideTo(event);
      stepsSwiper[1].slideTo(event);
    })
        
    stepsSwiper[0].on('slideChange', (function () {
      let event = stepsSwiper[0].activeIndex - 1;
      if (event === 6) {event=0};
      $('.steps__tabs-item').removeClass('active');
      $('.steps__tabs-item').eq(event).addClass('active');
    }))

  //Валидация формы
  function validateForm(form){
    $(form).validate({
      errorClass: "invalid",
      rules: {
        // simple rule, converted to {required:true}
        policyCheckbox: "required",
        userName: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        userPhone: "required",
        userQuestion: {
          required: true,
          minlength: 20,
          maxlength: 400
        },
        // compound rule
        userEmail: {
          required: true,
          email: true
        }
      },
      errorElement: "div",
      messages: {
        userName: {
          required: "Имя обязательно",
          minlength: "Имя не короче 2 букв",
          maxlength: "Имя не длиннее 10 букв"
        },
        policyCheckbox: "Подтвердите согланисе на обработку данных",
        userPhone: "Телефон обязателен",
        userQuestion: {
          required: "Вопрос обязателен",
          minlength: "Вопрос слишком короткий",
          maxlength: "Слишком длинный вопрос"
        },
        userEmail: {
          required: "Обязательно укажите email",
          email: "Введите в формате name@domain.com"
        }
      },
      errorPlacement: function (error, element) {
        if (element.attr("type") == "checkbox") {
            return element.next('label').append(error);
        }
        error.insertAfter($(element));
      },
      submitHandler: function (form) {
        event.preventDefault();
        modalThanks = $('.modal__thanks');
        closeThanks = $('.modal__thanks__close');
        $.ajax ({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function(response) {
            console.log('Прибыли данные: ' + response);
            $(form)[0].reset();
            if (modal.hasClass("modal--visible")) {
              modal.toggleClass('modal--visible');
              modalThanks.toggleClass('modal__thanks--visible');
              closeThanks.on('click', function () {
                modalThanks.removeClass('modal__thanks--visible');
              })
            } else {
              modalThanks.toggleClass('modal__thanks--visible');
            closeThanks.on('click', function () {
              modalThanks.removeClass('modal__thanks--visible');
            })
            } 
          },
          error: function(jqXHR, textStatus) {
            console.log(jqXHR + " " + textStatus);
          }
        });
      }
    });
  }
  validateForm('.modal__form');
  validateForm('.control__form');
  validateForm('.footer__form');

  $('[type=tel]').mask('+7 (000) 000-00-00', {placeholder: ""});
  $(document).ready(function () {
    $('[type=tel]').focus(function(){
      $(this).data('placeholder',$(this).attr('placeholder'))
      $(this).attr('placeholder','+7 (___) ___-__-__');
    });
    $('[type=tel]').blur(function(){
      $(this).attr('placeholder',$(this).data('placeholder'));
    });
    });
  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '465',
      width: '100%',
      videoId: 'cu_l1JNB5ds',
      events: {
        'onReady': videoPlay,
      }
    });
  })
  function videoPlay(event) {
    event.target.playVideo();
  }
  var spinner = $('.ymap-container').children('.loader');
var check_if_load = 0;
var myMap, myPlacemark;

$("body").on('click', '[href*="#"]', function(e){
  var fixed_offset = 100;
  $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
  e.preventDefault();
});

function init () {
  var myMapTemp = new ymaps.Map("map-yandex", {
    center: [47.244734, 39.723227],
    zoom: 18,
    controls: ['zoomControl', 'fullscreenControl']
  });

  var myPlacemarkTemp = new ymaps.Placemark([47.244734, 39.723227], {
      balloonContent: "Здесь может быть ваш адрес",
  }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#imageWithContent',
      // Своё изображение иконки метки.
      iconImageHref: 'img/map-marker.png',
      // Размеры метки.
      iconImageSize: [50, 50],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-25, -50],
  });
  
  myMapTemp.geoObjects.add(myPlacemarkTemp)
  myMapTemp.behaviors
  // Отключаем часть включенных по умолчанию поведений:
  //  - drag - перемещение карты при нажатой левой кнопки мыши;
  //  - magnifier.rightButton - увеличение области, выделенной правой кнопкой мыши.
  .disable(['scrollZoom', 'rightMouseButtonMagnifier'])
  // Включаем линейку.
  .enable('ruler');
  ;

  //Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);

  //Решение по callback-у для определния полной загрузки карты: http://ru.stackoverflow.com/questions/463638/callback-загрузки-карты-yandex-map
  waitForTilesLoad(layer).then(function() {
    //Скрываем
    spinner.removeClass('is-active');
  });
}

function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}

function loadScript(url, callback){

  var script = document.createElement("script");

  if (script.readyState){  //IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Другие браузеры
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

var ymap = function() {
  $('.ymap-container').mouseenter(function(){
      if (check_if_load == 0) {
        check_if_load = 1;

        spinner.addClass('is-active');

        loadScript("https://api-maps.yandex.ru/2.1/?apikey=ba048591-32ec-4859-99fe-2c4e993f5320&lang=ru_RU", function(){
           ymaps.load(init);
        });         
       
      }
    }
  );  
}

$(function() {

  //Map Yandex
  ymap();

});
});