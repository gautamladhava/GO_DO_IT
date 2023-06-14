function eqHeight() {
  $.fn.extend({
    equalHeights: function () {
      var top = 0;
      var row = [];
      var classname = ("equalHeights" + Math.random()).replace(".", "");
      $(this)
        .each(function () {
          var thistop = $(this).offset().top;
          if (thistop > top) {
            $("." + classname).removeClass(classname);
            top = thistop;
          }
          $(this).addClass(classname);
          $(this).height("auto");
          var h = Math.max.apply(
            null,
            $("." + classname)
              .map(function () {
                return $(this).height();
              })
              .get()
          );
          $("." + classname).height(h);
        })
        .removeClass(classname);
    },
  });
  $(".brand-slider .item").equalHeights();
  $(
    ".service-list-block .service-list-inner .service-list .service-text .text-inner"
  ).equalHeights();
  if (jQuery(window).width() > 574) {
    jQuery(
      ".help-section .help-list .cards .img-content-card .content"
    ).equalHeights();
  } else {
    jQuery(".help-section .help-list .cards .img-content-card .content").css(
      "height",
      "auto"
    );
  }
}

function hhight() {
  var hhight = $(".header").innerHeight();
  $(".main-wrapper").css("padding-top", hhight);
}

function fheight() {
  var fhight = $(".footer").innerHeight();
  $(".main-wrapper").css("padding-bottom", fhight);
  $(".footer").css("margin-top", -fhight);
}

function sticky_home_nav() {
  var hhight = $(".header").innerHeight();
  var soffset = $(".section-list").offset().top - hhight;
  $(window).scroll(function () {
    var tscroll = $(window).scrollTop();
    if (tscroll > soffset) {
      $(".section-list").addClass("sticky");
      $(".sticky").css("top", hhight);
    } else {
      $(".section-list").removeClass("sticky");
    }
  });
}

$(document).ready(function () {
  $(".slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  });

  $(".benefit-list").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".prev-btn").on("click", function () {
    $(".benefit-list").slick("slickPrev");
  });

  $(".next-btn").on("click", function () {
    $(".benefit-list").slick("slickNext");
  });

  $(".benefit-list").on("afterChange", function (event, slick, currentSlide) {
    if (currentSlide === 0) {
      $(".slick-prev").prop("disabled", true);
    } else {
      $(".slick-next").prop("disabled", false);
    }
  });

  $("#normal").dropkick({
    mobile: true,
  });

  $(".scroll-btn-wrapper").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "300");
  });

  $(".open-menu").click(function () {
    $(".nav-menu").css("right", "0");
    $(".overly").css("display", "block");
    $("body").css("overflow", "hidden");
  });

  $(".close-menu").click(function () {
    $(".nav-menu").css("right", "-300px");
    $(".overly").css("display", "none");
    $("body").css("overflow", "visible");
  });
  $(".overly").click(function () {
    $(".nav-menu").css("right", "-300px");
    $(".overly").css("display", "none");
    $("body").css("overflow", "visible");
  });

  $(".download").click(function () {
    $(".user-info-section").css("display", "none");
    $(".book-content-section.user-info-section").css("display", "block");
  });

  $(".section-list li").click(function () {
    var section_list_Width = $(".section-list").width();
    var li_Width = $(this).outerWidth();
    var position = section_list_Width / 2 - li_Width / 2;
    $(".section-list").animate(
      {
        scrollLeft: $(this).position().left - position,
      },
      500
    );
  });

  $(".section-list li").click(function () {
    var sectionlestvalue = $(this).find("a").attr("data-target");
    var hhight = $(".header").innerHeight();
    var hsection_list = $(".section-list").innerHeight();
    $(".custom-section").each(function () {
      var sectionvalue = $(this).attr("data-value");
      if (sectionlestvalue == sectionvalue) {
        var section_offset = $(this).offset().top;
        var section_scroll = section_offset - hhight - hsection_list;
        // $(window).scrollTop(section_scroll);
        $("html, body").animate({ scrollTop: section_scroll }, "slow");
        // $("html, body").scrollTop(section_scroll);
      }
    });
  });
  
  hhight();
  fheight();
  eqHeight();
  sticky_home_nav();
});

$(window).resize(function () {
  hhight();
  fheight();
  eqHeight();
  sticky_home_nav();
});

// $(window).ready(function () {
//   $(".section-list li").click(function () {
//     // var hhight = $(".header").innerHeight();
//     // var sectionlestvalue = $(this).find("a").attr("data-target");
//     // var sectionvalue = $("section").attr("data-value");
//     // // var  sectionvalue = $(".main-wrapper").find("section").attr("data-value");
//     // var sectionoffset = $(sectionvalue).offset().top
//     // console.log(svalue)
//     // if(sectionlestvalue == sectionvalue){
//     //     $(sectionvalue).scrollTop = sectionoffset - hhight
//     // }
//     var sectionlestvalue = $(this).find("a").attr("data-target");

//     $(".custom-section").each(function () {
//       var sectionvalue = $(this).attr("data-value");
//       if(sectionlestvalue == sectionvalue){
//             // $(sectionvalue).css("background-color","red")
//             // console.log(sectionvalue)
//             // $(sectionvalue).css("background-color","red")
//             $("[data-value='" + sectionvalue + "']").scrollTop(0)
//          }
//     });
//   });
// });

