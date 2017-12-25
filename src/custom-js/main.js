$(document).ready(function() {
  //  ANCHOR-LIST
  var menu_selector = ".js-anchor-list";

  function onScroll() {
      var scroll_top = $(document).scrollTop();
      $(menu_selector + " a").each(function() {
          var hash = $(this).attr("href");
          var target = $(hash);
          if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
              $(menu_selector + " a.active").removeClass("active");
              $(this).addClass("active");
          } else {
              $(this).removeClass("active");
          }
      });
  }

  $(document).ready(function() {
      $(document).on("scroll", onScroll);

      $("a[href^=#]").click(function(e) {
          e.preventDefault();
          $(document).off("scroll");
          $(menu_selector + " a.active").removeClass("active");
          $(this).addClass("active");
          var hash = $(this).attr("href");
          var target = $(hash);

          $("html, body").animate({
            scrollTop: target.offset().top - 50
          }, 500, function() {
              window.location.hash = hash - 50;
              $(document).on("scroll", onScroll);
            

          });
      });
  });

//  menu-fix
  $(window).scroll(function() {
    var lengthScroll = $(".js-height-sect").outerHeight();
    var heightPadding = $(".js-fix-menu").outerHeight();
    var top = $(document).scrollTop();
    
    if (top >= lengthScroll) {
      $(".js-fix-menu").addClass('fix');
      $('.header-page').css('padding-bottom', heightPadding);
    } else {
      $(".js-fix-menu").removeClass('fix');
      $('.js-header').css('padding-bottom', '0');
    }
  });
  
//  open-search
  $('.js-open-search').click(function() {
    $('.js-search-form').slideToggle(300);
  });
  
  //  open-search
  $('.js-leng-list .leng-btn').click(function() {
    $(this).closest('.js-leng-list').toggleClass('active');
    $(this).closest('.leng-list__item').addClass('active').siblings().removeClass('active');
  });
  
  //  mobil-social
  $('.js-open-social').click(function() {
    $('.header-page__social-list').toggleClass('active');
  });
  
  //  open-mobil-menu
  $('.js-open-menu').click(function() {
    $('.header-page__menu').toggleClass('active');
  });
  
  //  open-contact-menu
  $('.js-open-contact').click(function() {
    $('.header-page__contact-list').toggleClass('active');
  });
  
//  circle-silder
  $(window).on('load resize', function(){
    if( $(document).width() > 1030) {
      var firstTitleSect = $('[data-number="item-1"]').find('.circ-item__title').text()
      var firstMainImg =   $('.circ-item .circ-item__pic').attr('src');

      $('.circle-nav__item-title').text(firstTitleSect);
      $('.circle-nav__pic').attr('src', firstMainImg);

      $('.circ-item').click(function() {
        $('.circle-nav__item').css('opacity', '0');
        $('.circle-nav__item').animate({
          opacity: "1"
        },500);

        //    id rotate
        var dataNumb = $(this).attr('data-number');

        $(this).closest('.slider-list').removeAttr('id');
        $(this).closest('.slider-list').attr('id', dataNumb);

        //    color title
        $('.circ-list__item').removeClass('active');
        $(this).closest('.circ-list__item').addClass('active');

        //    add title
        var titleSect = $(this).find('.circ-item__title').text();

        $('.circle-nav__item-title').text('');
        $('.circle-nav__item-title').text(titleSect);

        //    add img 
        var mainImg = $(this).find('.circ-item__pic').attr('src');

        $('.circle-nav__pic').attr('src', false);
        $('.circle-nav__pic').attr('src', mainImg);
      });
    }
    
    if( $(document).width() < 1030  && $(document).width() > 777) { 
      $('.circ-list__item').equivalent();
    }
  });
  
//  video-portfolio
  $('.portfolio-item').hover(function() {
    var vid = $(this).find('.main-video')[0];
    if( vid.paused == true ){
      vid.currentTime=0;
      vid.play();
    }else{
      vid.pause();
    }
  });
  
  //  input placeholder
  $('body').on('change', '.input-item__input', function(){
    if ($(this).val().length > 0) {
      $(this).closest('.input-item').addClass('active');
    }else{
      $(this).closest('.input-item').removeClass('active');
    }
  });
  
  $(".js-carousel-1").slick({
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    dots: true,
    arrows: false
  });
});


//MAP////////////////////
CustomMarker.prototype = new google.maps.OverlayView();

function CustomMarker(opts) {
  this.setValues(opts);
}

CustomMarker.prototype.draw = function() {
  var self = this;
  var div = this.div;
  if (!div) {
    div = this.div = $('' +
                       '<div>' +
                       '<div class="shadow"></div>' +
                       '<div class="pulse"></div>' +
                       '<div class="pin-wrap">' +
                       '<div class="pin"></div>' +
                       '</div>' +
                       '</div>' +
                       '')[0];
    this.pinWrap = this.div.getElementsByClassName('pin-wrap');
    this.pin = this.div.getElementsByClassName('pin');
    this.pinShadow = this.div.getElementsByClassName('shadow');
    div.style.position = 'absolute';
    div.style.cursor = 'pointer';
    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
    google.maps.event.addDomListener(div, "click", function(event) {
      google.maps.event.trigger(self, "click", event);
    });
  }
  var point = this.getProjection().fromLatLngToDivPixel(this.position);
  if (point) {
    div.style.left = point.x + 'px';
    div.style.top = point.y + 'px';
  }
};

CustomMarker.prototype.animateDrop = function() {
  dynamics.stop(this.pinWrap);
  dynamics.css(this.pinWrap, {
    'transform': 'scaleY(2) translateY(-'+$('#map').outerHeight()+'px)',
    'opacity': '1',
  });
  dynamics.animate(this.pinWrap, {
    translateY: 0,
    scaleY: 1.0,
  }, {
    type: dynamics.gravity,
    duration: 1800,
  });

  dynamics.stop(this.pin);
  dynamics.css(this.pin, {
    'transform': 'none',
  });
  dynamics.animate(this.pin, {
    scaleY: 0.8
  }, {
    type: dynamics.bounce,
    duration: 1800,
    bounciness: 600,
  })

  dynamics.stop(this.pinShadow);
  dynamics.css(this.pinShadow, {
    'transform': 'scale(0,0)',
  });
  dynamics.animate(this.pinShadow, {
    scale: 1,
  }, {
    type: dynamics.gravity,
    duration: 1800,
  });
}

CustomMarker.prototype.animateBounce = function() {
  dynamics.stop(this.pinWrap);
  dynamics.css(this.pinWrap, {
    'transform': 'none',
  });
  dynamics.animate(this.pinWrap, {
    translateY: -30
  }, {
    type: dynamics.forceWithGravity,
    bounciness: 0,
    duration: 500,
    delay: 150,
  });

  dynamics.stop(this.pin);
  dynamics.css(this.pin, {
    'transform': 'none',
  });
  dynamics.animate(this.pin, {
    scaleY: 0.8
  }, {
    type: dynamics.bounce,
    duration: 800,
    bounciness: 0,
  });
  dynamics.animate(this.pin, {
    scaleY: 0.8
  }, {
    type: dynamics.bounce,
    duration: 800,
    bounciness: 600,
    delay: 650,
  });

  dynamics.stop(this.pinShadow);
  dynamics.css(this.pinShadow, {
    'transform': 'none',
  });
  dynamics.animate(this.pinShadow, {
    scale: 0.6,
  }, {
    type: dynamics.forceWithGravity,
    bounciness: 0,
    duration: 500,
    delay: 150,
  });
}

CustomMarker.prototype.animateWobble = function() {
  dynamics.stop(this.pinWrap);
  dynamics.css(this.pinWrap, {
    'transform': 'none',
  });
  dynamics.animate(this.pinWrap, {
    rotateZ: -45,
  }, {
    type: dynamics.bounce,
    duration: 1800,
  });

  dynamics.stop(this.pin);
  dynamics.css(this.pin, {
    'transform': 'none',
  });
  dynamics.animate(this.pin, {
    scaleX: 0.8
  }, {
    type: dynamics.bounce,
    duration: 800,
    bounciness: 1800,
  });
}

$(function() {
  var pos = new google.maps.LatLng(50.50582, 30.460837);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: pos,
    // disableDefaultUI: true,
    // clickable: false,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var marker = new CustomMarker({
    position: pos,
    map: map,
    animation: google.maps.Animation.DROP, //BOUNCE  DROP

  });

  var marker1 = new google.maps.Marker({
    map: map,
    title: 'ВЕБСТАРС',
    opacity: 0,
    position: pos,
    icon: {
      // anchor: new google.maps.Point(30, 30.26),
      size: new google.maps.Size(95,125),

      url: 'https://webstars.com.ua/catalog/view/theme/default/images/map.svg'
    }
  });
  // marker1.setMap(null);

  // marker.draw();

  // Создаем наполнение для информационного окна
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">WEBSTARS</h1>'+
      '<div id="bodyContent">'+
      '<p>Разработка сайтов ' +
      'любой сложности</p>'+
      '<p><b>Веб-сайт:</b> <a href="http://www.webstars.com.ua/" target="_blank">webstars.com.ua</a>'+
      '</p>'+
      '</div>'+
      '</div>';

  // Создаем информационное окно
  var poswindow = new google.maps.LatLng(50.507710, 30.460866);
  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    position: poswindow,
    maxWidth: 400
  });

  // Создаем прослушивание, по клику на маркер - открыть инфо-окно infowindow
  marker.addListener('click', function() {
    infowindow.open(map);
  });

  var onMarkermouseover = function() {
    var marker = this;
    var latLng = marker.getPosition();
    infoWindow.setContent(marker.title);
    infoWindow.open(map, marker);
  };

  google.maps.event.addDomListener(window, 'load', function() {
    marker.animateDrop();
  });

  google.maps.event.addListener(marker1, 'mouseover', function(e){
    marker.animateWobble();
  });

  google.maps.event.addListener(marker1, 'click', function(e) {
    marker.animateBounce();

  });
});

//preloader

$(window).on('load', function() {
  $('.preloader').fadeOut(500);
  
  setTimeout(function() {
    $('.top-section__desc, .main-title__ico, .scroll-mouse').addClass('active');
  }, 500);
  

  setTimeout(function() {
    $('body').addClass('load');
  }, 1500);
});

// });












