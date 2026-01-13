$(function () {
    const MOBILE_WIDTH = 992;

    document.getElementById('year').textContent = new Date().getFullYear();

    const $body = $("body");
    const $burger = $(".js-burger-icon");
    const $close = $(".js-close-icon");
    const $nav = $(".js-nav");
    const $langBtn = $(".js-lang-button");
    const $langMenu = $(".js-lang-menu");
    const $langItems = $(".js-lang-menu li");
    const $servicesToggle = $(".js-services");
    const $sidebarList = $(".js-sidebar-navigation-list");
    const $sideButton = $(".js-side-button");

    const langClassMap = {
        SRB: "serbian",
        ENG: "english",
        RUS: "russian",
    };

    function isMobile() {
        return window.innerWidth < MOBILE_WIDTH;
    }

    function showMenu() {
        $burger.addClass("d-none");
        $close.removeClass("d-none");
        $nav.removeClass("d-none");
    }

    function hideMenu() {
        $burger.removeClass("d-none");
        $close.addClass("d-none");
        $nav.addClass("d-none");
    }

    $burger.on("click", function () {
        if (isMobile()) showMenu();
    });

    $close.on("click", function () {
        if (isMobile()) hideMenu();
    });

    // Sidebar toggle for mobile
    $servicesToggle.add($sidebarList).on("click", function () {
        if (window.innerWidth < 768) {
            $sideButton.toggleClass("open");
            $sidebarList.toggleClass("open");
            $body.toggleClass("open-menu");
        }
    });

    // Language switch
    $langBtn.on("click", function (e) {
        e.stopPropagation();
        $langMenu.toggleClass("d-none");
    });

    $langItems.on("click", function () {
        const selectedLang = $(this).text().trim();
        const langClass = langClassMap[selectedLang];
        if (langClass) {
            $body.removeClass("serbian english russian").addClass(langClass);
            $langBtn.text(selectedLang);
        }
        $langMenu.addClass("d-none");
    });

    $(document).on("click", function () {
        $langMenu.addClass("d-none");
    });

    // Sidebar navigation logic
    const menuItems = document.querySelectorAll(".sidebar-link");
    const contents = document.querySelectorAll(".service");
    const contentWrapper = document.querySelector(".services-content");

    function activateSection(item) {
        const targetId = item.getAttribute("data-target");

        menuItems.forEach((el) => el.classList.remove("active"));
        contents.forEach((el) => el.classList.remove("service-open"));

        item.classList.add("active");

        const target = document.getElementById(targetId);
        if (target) {
            target.classList.add("service-open");
            contentWrapper.className = "services-content " + targetId;
        }
    }

    menuItems.forEach((item) => {
        item.addEventListener("click", () => activateSection(item));
    });

    // Set first section active by default
    if (menuItems.length && contents.length) {
        activateSection(menuItems[0]);
    }

    window.addEventListener("scroll", () => {
        const nav = document.getElementById("mainNav");
        const hero = document.querySelector(".hero");
        const scrollTrigger = hero.offsetHeight;

        if (window.pageYOffset >= scrollTrigger) {
            nav.classList.add("sticky");
        } else {
            nav.classList.remove("sticky");
        }
    });


    // const modal = document.getElementById('imageModal');
    // const modalCarousel = document.getElementById('modalCarousel');

    // modal.addEventListener('show.bs.modal', function (event) {
    // const clickedImg = event.relatedTarget;
    // const slideTo = clickedImg.getAttribute('data-bs-slide-to');
    // const carousel = bootstrap.Carousel.getOrCreateInstance(modalCarousel);
    // carousel.to(parseInt(slideTo));
    // });
});
