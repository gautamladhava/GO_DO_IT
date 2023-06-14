function eqHeight() {
    $.fn.extend({
        equalHeights: function () {
            var top = 0;
            var row = [];
            var classname = ('equalHeights' + Math.random()).replace('.', '');
            $(this).each(function () {
                var thistop = $(this).offset().top;
                if (thistop > top) {
                    $('.' + classname).removeClass(classname);
                    top = thistop;
                }
                $(this).addClass(classname);
                $(this).height('auto');
                var h = (Math.max.apply(null, $('.' + classname).map(function () {
                    return $(this).height();
                }).get()));
                $('.' + classname).height(h);
            }).removeClass(classname);
        }
    });
    $('.brand-slider .item').equalHeights();
    $('.service-list-block .service-list-inner .service-list .service-text .text-inner').equalHeights();
    if (jQuery(window).width() > 574) {
        jQuery(".title-desp").equalHeights();
    } else {
        jQuery(".title-desp").css("height", "auto");
    }

}


// Header Adj
function headerAdj() {
    var headerH = $("header").innerHeight();
    $(".main-content").css({ "padding-top": headerH });
}

function footerTopSpacing() {
    var footerH = $(".home-content-block").innerHeight();
    if (jQuery(window).width() < 1025) {
    var footerH = footerH + 30;
    $(".home-content-second-block .content-text").css({ "padding-top": footerH });
    }else if (jQuery(window).width() < 767) {

        var footerH = footerH + 0;
        $(".home-content-second-block .content-text").css({ "padding-top": footerH });
    }
}

function browserDetection() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        $("body").addClass("opera-browser");
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        $("body").addClass("chrome-browser");
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        $("body").addClass("safari-browser");
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        $("body").addClass("firefox-browser");
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        $("body").addClass("ie-browser");
    }

}

function footerAdj() {
    var footerH = $("footer").outerHeight();

    $("footer").css({ "margin-top": -footerH });
    $("footer").css({ "height": footerH });
    $(".wrapper").css({ "padding-bottom": footerH });
}

function search_box_width() {

    var menuWidth = $('.menu-block').width() + 40;
    //console.log('menuWidth'); 
    $(".search-block").css({ "width": menuWidth });


}


function counter_start() {
    var counter_div = $(".counter-block");
    if (counter_div.length) {
        var div_top = counter_div.offset().top;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if (bottom_of_window > div_top) {

            if (!$(".counter-block").hasClass("counting")) {
                count_animation();
            }
            $(".counter-block").addClass("counting");
        }
    }
}

function count_animation() {

    $('.number').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-count');

        $({ countNum: $this.text() }).animate({
            countNum: countTo
        }, {
                duration: 1500,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                }

            });
    });
}

// banner dynamic height JS    
function viewPortImageAdj() {
    var viewportHeight = $(window).height();
    var header_height = $("header").innerHeight();
    var total_height = viewportHeight - header_height;
    $(".banner .home-banner .bg-img").css("min-height", total_height);
}

function press_dropdown() {
    jQuery('.year-wrapper .year-list li a').click(function (e) {
        var selected_text = jQuery(this).html();;
        jQuery('.year-wrapper .year-list li').show().removeClass('active');
        jQuery(this).parent("li").addClass('active');
        jQuery(this).closest('.blog-list').find('.dropdown-list span').html(selected_text);
        jQuery('.year-wrapper .blog-list').removeClass('show-list');
        e.stopImmediatePropagation();
        if (jQuery(window).width() < 768) {
            jQuery('.year-wrapper .year-list').slideUp();
        } else {
            jQuery('.year-wrapper .year-list').show();
        }
    });

    jQuery('.year-wrapper .blog-list a.dropdown-list').click(function (e) {
        jQuery(this).closest('.blog-list').siblings().find('.year-list').slideUp();
        jQuery(this).closest('.blog-list').find('.year-list').slideToggle();
        jQuery(this).closest('.blog-list').siblings().removeClass('show-list');
        jQuery(this).closest('.blog-list').toggleClass('show-list');
        e.stopImmediatePropagation();
    });
}

$(function () {

    $("<select />").appendTo("nav");
    $("nav a").each(function () {
        var el = $(this);
        $("<option />", {
            "value": el.attr("href"),
            "text": el.text()
        }).appendTo("nav select");
    });
});

$(document).ready(function () {

    footerTopSpacing();
    // setTimeout(function(){
        // $("body").addClass("show-content");
        // $(".introduction-section").css("display",);
        // $(".homepage-wrapper , footer").fadeIn("slow");       

        // $("body").removeClass("show-intro");
        // $(".introduction-section").fadeOut();
    // },9000);

    // $(".parallax-window").attr("Data-parralax","scroll");
    // $(".parallax-window").parallax();
    
    $('div[data-type="background"]').each(function(){
        var $bgobj = $(this); // assigning the object
    
        $(window).scroll(function() {
            var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
            
            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });
        }); 
    }); 

    document.addEventListener('touchstart', function () { }, { passive: false })

    footerAdj();
    headerAdj();
    counter_start();
    // viewPortImageAdj();
    press_dropdown();




    $(".menu-block li").each(function () {
        if ($(this).has("ul").length) {
            $(this).addClass('sub');
        }
    });
    $(".menu-block li.sub ").append("<span class='sub-menu-icon'></span>");

    $(".sub-menu-icon").click(function (e) {
        if ($(this).hasClass('active')) {
            $(this).prev("ul").stop(true, true).slideUp();
            $(this).prev("ul").find("ul").slideUp();
            $(this).removeClass('active');
            $(this).prevAll("a").removeClass("active-bg");
            //alert("dfd");
            $(this).prev("ul").find(".sub-menu-icon").removeClass('active');
            $(this).prev("ul").find("a").removeClass('active-bg');
        } else {
            $(this).parents(".sub").siblings("li").find("ul").slideUp();
            $(this).parents(".sub").siblings("li").find("a").removeClass('active-bg');
            $(this).parents(".sub").siblings("li").find(".sub-menu-icon ").removeClass('active');
            $(this).addClass('active');
            $(this).prevAll("a").addClass("active-bg");
            $(this).prev().stop(true, true).slideDown();
        }
        e.stopPropagation();
    });

    // paroller
    // $(".parallax-shape").paroller({
    //  factor: 0.2,         
    //  factorXs: 0.4, 
    //  type: 'foreground',     
    //  direction: 'vertical', 
    // });


    //Prevent Page Reload on all # links
    $("a[href='#']").click(function (e) {
        e.preventDefault();
    });

    // Placeholder
    $("[placeholder]").each(function () {
        $(this).attr("data-placeholder", this.placeholder);

        $(this).bind("focus", function () {
            this.placeholder = "";
        });
        $(this).bind("blur", function () {
            this.placeholder = $(this).attr("data-placeholder");
        });
    });

    setTimeout(function () {
        eqHeight();
        search_box_width();
    }, 100);

    // small header
    $(window).on("scroll", function () {
        var header_height = $("header").innerHeight();
        if ($(window).scrollTop() > header_height) {
            $(".wrapper").addClass("small-header");
        } else {
            $(".wrapper").removeClass("small-header");
        }
    });

    // hamburger menu
    $(".hamburger-menu").click(function () {
        $("html, body").toggleClass("open-menu");
    });

    //Back to Top
    $('.back_top').click(function (e) {
        e.preventDefault();
        $("body,html").animate({
            scrollTop: 0
        }, 1200);
        return false;
    });

    // $(window).scroll(function() {
    //     if($(this).scrollTop() != 0) {
    //         $('.back_top').fadeIn();    
    //     } else {
    //         $('.back_top').fadeOut();
    //     }
    // }); 

    // search block
    $(".btn-search").click(function () {
        $("body, html").toggleClass("open-search");
    });
    $(".search-block .close-btn").click(function () {
        $("body, html").removeClass("open-search");

    });
    $(document).click(function (e) {
        if ($(e.target).closest(".btn-search,.search-block").length === 0) {
            $("body, html").removeClass("open-search");
        }

    });

    // Modal JS
    $(".modal-header .close, .modal").click(function () {
        $('#popup-youtube-player')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    });
    $(document).keydown(function (event) {
        if (event.keyCode == 27) {
            $('#popup-youtube-player')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        }
    });

    $(".modal-header .close").click(function () {
        $("video").get(0).pause();
    });
    $(document).keydown(function (event) {
        if (event.keyCode == 27) {
            $("video").get(0).pause();
        }
    });
    $(".play-btn").click(function () {
        $("video").get(0).play();
    });




    if ($(window).width() > 1024) {
        $(window).stellar({
            positionProperty: "position",
            hideDistantElements: !1,
            horizontalScrolling: false,
            responsive: false,
        });
    }
    AOS.init({
        once: true,
    });

    // contactpage change iframe 
    $(".secondary-dropdown select").dropkick({
        mobile: true,
        change: function () {
            var option_val = this.value;
            $(".address-block address").each(function () {
                var $this_add = $(this);
                var data_add = $(this).data("add");
                if (option_val == data_add) {
                    $(".address-block address").removeClass("active");
                    $this_add.addClass("active");

                }
                $(".map-block .map-list").each(function () {
                    var $this_map = $(this);
                    var data_map = $(this).data("map");
                    if (option_val == data_map) {
                        $(".map-block .map-list").removeClass("active");
                        $this_map.addClass("active");
                    }
                })
            });
        }
    });


});

$(window).on("load", function () {
    eqHeight();
    footerAdj();
    search_box_width();
    // viewPortImageAdj();
    browserDetection();
    press_dropdown();
    headerAdj();
    footerTopSpacing();
    // paroller
    // $(".parallax-shape").paroller({
    //  factor: 0.4,         
    //  factorXs: 0.4, 
    //  type: 'foreground',     
    //  direction: 'vertical', 
    // });
});



$(window).resize(function () {
    // viewPortImageAdj();
    headerAdj();
    eqHeight();
    search_box_width();
    footerAdj();
    counter_start();
    // eventMediaAdj();
    // brandGrid();
    setTimeout(function () {
        footerTopSpacing();
    });
    press_dropdown();

    // $.stellar('refresh');
    if ($(window).width() > 1024) {
        $("html, body").removeClass("open-menu");
    }

});

/* Window scroll */
$(window).scroll(function () {
    counter_start();
    var scrollTopPos = $(window).scrollTop();

    $(".parallax-shape").each(function () {
        var parella_ratio = $(this).attr("parallax-ratio");
        $(this).css({ "transform": "translateY(-" + scrollTopPos * parella_ratio + "px)" })
    });

});


$(window).scroll(function () {
    var scrollTopPos = $(window).scrollTop();
    $(".parallax-img").each(function () {
        var get_offset = $(this).offset().top;
        var parellax_ratio = $(this).attr("parallax-ratio");
        var total = (scrollTopPos - get_offset) * parellax_ratio;
        $(this).css({
            "transform": "translateY(" + total + "px)"
        })
    });
});