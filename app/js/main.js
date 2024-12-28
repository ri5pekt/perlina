$(document).ready(function ($) {
    function onScroll() {
        var distanceY = $(window).scrollTop();
        var shrinkOn = 85;
        if (distanceY > shrinkOn) {
            $("header, body").addClass("scrolled");
        } else {
            $("header, body").removeClass("scrolled");
        }
    }
    // Call onScroll initially to set the correct state based on the initial scroll position
    onScroll();
    $(window).scroll(onScroll);

    if($(window).width() <= 950) {
        $(".mobile_menu").simpleMobileMenu({
            "menuStyle": "slide",
        });
    }


    $(".accordion .item .title").click(function () {
        const $currentItem = $(this).closest(".item");
        const $currentItemContent = $currentItem.find(".content");
        
        if ($currentItem.hasClass("open")) {
            // If already open, toggle off
            $currentItem.removeClass("open");
            $currentItemContent.slideUp();
        } else {
            // Remove open class from all items and slide up answers
            $(".accordion .item").removeClass("open");
            $(".accordion .content").slideUp();

            // Add open class to clicked item and slide down its answer
            $currentItem.addClass("open");
            $currentItemContent.slideDown();
        }
    });


    $('.custom-select .select-title').on('click', function() {
        $(this).next('.dropdown').slideToggle();
    });

    // Handle click on dropdown items
    $('.dropdown .item').on('click', function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(this).closest('.custom-select').find('.select-title').text($(this).text());
        $(this).closest('.dropdown').slideUp();
    });

    $('.custom-multi-select .item').on('click', function() {
        $(this).toggleClass('active');
    });
   
});

