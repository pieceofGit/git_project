$(document).ready(function () {
    $(".apartments .slider").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            1000: {
                items: 3
            }
        }
    });
});