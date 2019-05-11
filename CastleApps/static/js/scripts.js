$(document).ready(function () {

    if ($(window).scrollTop() <= 85) {
        $('.contact-toggle').addClass('full');
    }


    $(window).scroll(function () {
        if ($("body").hasClass('on-top')) {
            $(".contact-toggle").addClass('full');
        }
        else {
            $(".contact-toggle").removeClass('full');
        }
    })

    $(".contact-toggle").on("click", function () {
        $(".site-overlay").addClass('active');
        $(".contact-form").addClass('active');
        $("body").addClass('no-scroll');
    })


    $(".loggin-toggle").on('click', function () {
        $('.site-overlay').addClass('active');
        $(".login-form").addClass('open');
        $("body").addClass('no-scroll');
    });

    $(".site-overlay").on('click', function () {
        closeAll()
    })

    function closeAll() {
        $(".site-overlay").removeClass('active');
        $(".login-form").removeClass('open');
        $("body").removeClass('no-scroll');
        $(".contact-form").removeClass('active');
    }

    $(".form-group input, .form-group textarea").focus(function () {
        $(this).parent().addClass('focused');
    }).blur(function () {
        if ($(this).val() === '' || $(this).val() === undefined) {
            $(this).parent().removeClass('focused');
        }
    });

    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });

});


var pos = $(window).scrollTop();
var current_pos = 0;
var header = $("header");
var headerScrolling = false;
var fullyHeaderShow = false;
var partialHeaderShown = false;
var fullyHeaderShownParam = 65;
var counter = 0;
var upCounter = 0;
$(window).scroll(function (e) {
    current_pos = $(window).scrollTop();

    if (pos < current_pos) {
        $("header").removeAttr("css");

        upCounter += current_pos - pos;
        if (upCounter >= 65) {
            counter = 0;
            headerScrolling = false;
        } else {
            counter -= current_pos - pos;
            if (counter <= 65) {
                partialHeaderShown = false;
            }
        }
    } else {
        if (headerScrolling) {
            $("header").css("transform", "translateY(" + current_pos + "px)");
        } else {
            if (!partialHeaderShown) {
                counter = 0;
                $("header").css(
                    "transform",
                    "translateY(" + (current_pos - 65) + "px)"
                );
                partialHeaderShown = true;
            } else {
                counter += pos - current_pos;
                if (counter >= 60) {
                    upCounter = 0;
                    headerScrolling = true;
                }
            }
        }
    }

    if (current_pos < 65) {
        $("header").removeClass("not-on-top");
        $("header").addClass("on-top");
        $("body").removeClass("not-on-top");
        $("body").addClass("on-top");
    } else {
        $("header").addClass("not-on-top");
        $("header").removeClass("on-top");
        $("body").addClass("not-on-top");
        $("body").removeClass("on-top");
    }
    pos = current_pos;
});
