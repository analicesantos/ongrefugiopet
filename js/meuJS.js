$(document).ready(function() {
    //sidenav    
    $('.sidenav').sidenav({
        edge: 'left'
    });

    //rolagem da nav
    const menuItems = document.querySelectorAll('.nav-wrapper-fixed a[href^="#"]');

    function getScrollTopByHref(element) {
        const id = element.getAttribute('href');
        return document.querySelector(id).offsetTop;
    }

    function scrollToPosition(to) {
        // Caso queira o nativo apenas
        // window.scroll({
        // top: to,
        // behavior: "smooth",
        // })
        smoothScrollTo(0, to);
    }

    function scrollToIdOnClick(event) {
        event.preventDefault();
        const to = getScrollTopByHref(event.currentTarget) - 80;
        scrollToPosition(to);
    }

    menuItems.forEach(item => {
        item.addEventListener('click', scrollToIdOnClick);
    });

    // Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
    /**
     * Smooth scroll animation
     * @param {int} endX: destination x coordinate
     * @param {int) endY: destination y coordinate
     * @param {int} duration: animation duration in ms
     */
    function smoothScrollTo(endX, endY, duration) {
        const startX = window.scrollX || window.pageXOffset;
        const startY = window.scrollY || window.pageYOffset;
        const distanceX = endX - startX;
        const distanceY = endY - startY;
        const startTime = new Date().getTime();

        duration = typeof duration !== 'undefined' ? duration : 800;

        // Easing function
        const easeInOutQuart = (time, from, distance, duration) => {
            if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
            return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
        };

        const timer = setInterval(() => {
            const time = new Date().getTime() - startTime;
            const newX = easeInOutQuart(time, startX, distanceX, duration);
            const newY = easeInOutQuart(time, startY, distanceY, duration);
            if (time >= duration) {
                clearInterval(timer);
            }
            window.scroll(newX, newY);
        }, 1000 / 60); // 60 fps
    };


    //Dropdown Menu
    $(".dropdown-trigger").dropdown({ hover: true });

    //Carrossel Menu
    $(".owl-carousel").owlCarousel({
        center: true,
        loop: true,
        margin: 12,
        autoplay: true,
        autoplayTimeout: 1500,
        autoplayHoverPause: true,
        dots: true,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 6
            },
            1000: {
                items: 6
            }
        }
    });

    $('.parallax').parallax();

    $('.carousel.carousel-slider').carousel();

    $('.carousel').carousel();

    $('.datepiker').datepicker();

    //Lightbox
    $('.materialboxed').materialbox();

    //Abas fotos da Adoção
    $('.tabs').tabs();

    //Botão Voltar ao Topo
    $('.nav a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var id = $(this).attr('href'),
            targetOffset = $(id).offset().top;

        $('html, body').animate({
            scrollTop: targetOffset
        }, 1000);
    });
});