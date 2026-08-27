/* =====================================================
   KH ESPORTS CHAMPIONSHIP 2026
   MASTER INTERACTION SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar =
        document.getElementById("navbar");

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const menuBackdrop =
        document.getElementById("menuBackdrop");

    const scrollProgress =
        document.getElementById("scrollProgress");

    const backToTop =
        document.getElementById("backToTop");


    const desktopLinks =
        Array.from(
            document.querySelectorAll(
                ".nav-links a"
            )
        );


    const mobileLinks =
        Array.from(
            document.querySelectorAll(
                ".mobile-links a, .mobile-register"
            )
        );


    const sections =
        Array.from(
            document.querySelectorAll(
                "main section[id]"
            )
        );


    /* =====================================================
       NAVBAR
    ===================================================== */

    function updateNavbar() {

        if (!navbar) {
            return;
        }

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        if (!scrollProgress) {
            return;
        }

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight;

        const viewportHeight =
            window.innerHeight;

        const scrollableHeight =
            documentHeight -
            viewportHeight;


        if (scrollableHeight <= 0) {

            scrollProgress.style.width =
                "100%";

            return;

        }


        const progress =
            (
                scrollTop /
                scrollableHeight
            ) * 100;


        scrollProgress.style.width =
            Math.min(
                100,
                Math.max(
                    0,
                    progress
                )
            ) + "%";

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }

        backToTop.classList.toggle(
            "visible",
            window.scrollY > 600
        );

    }


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function setActiveSection(
        sectionId
    ) {

        desktopLinks.forEach(
            link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") ===
                    "#" + sectionId
                );

            }
        );


        mobileLinks.forEach(
            link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") ===
                    "#" + sectionId
                );

            }
        );

    }


    function getCurrentSection() {

        if (!sections.length) {

            return "home";

        }


        const navbarHeight =
            navbar
                ? navbar.offsetHeight
                : 0;


        const activationPoint =
            window.scrollY +
            navbarHeight +
            80;


        let current =
            sections[0].id;


        for (
            const section of sections
        ) {

            const sectionTop =
                section.getBoundingClientRect().top +
                window.scrollY;


            if (
                activationPoint >=
                sectionTop
            ) {

                current =
                    section.id;

            } else {

                break;

            }

        }


        return current;

    }


    function updateActiveNavigation() {

        setActiveSection(
            getCurrentSection()
        );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMenu() {

        if (
            !mobileMenu ||
            !menuBackdrop ||
            !menuToggle
        ) {
            return;
        }


        mobileMenu.classList.add(
            "open"
        );


        menuBackdrop.classList.add(
            "open"
        );


        menuToggle.classList.add(
            "open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );


        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMenu() {

        if (
            !mobileMenu ||
            !menuBackdrop ||
            !menuToggle
        ) {
            return;
        }


        mobileMenu.classList.remove(
            "open"
        );


        menuBackdrop.classList.remove(
            "open"
        );


        menuToggle.classList.remove(
            "open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        document.body.classList.remove(
            "menu-open"
        );

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                if (
                    mobileMenu &&
                    mobileMenu.classList.contains(
                        "open"
                    )
                ) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }


    if (menuBackdrop) {

        menuBackdrop.addEventListener(
            "click",
            closeMenu
        );

    }


    /* =====================================================
       NAVIGATION CLICK
    ===================================================== */

    function handleNavigationClick(
        event
    ) {

        const link =
            event.currentTarget;


        const href =
            link.getAttribute("href");


        if (
            !href ||
            !href.startsWith("#") ||
            href === "#"
        ) {

            return;

        }


        const target =
            document.getElementById(
                href.substring(1)
            );


        if (!target) {

            return;

        }


        event.preventDefault();


        closeMenu();


        const navbarHeight =
            navbar
                ? navbar.offsetHeight
                : 0;


        const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;


        window.scrollTo({

            top:
                Math.max(
                    0,
                    targetTop
                ),

            behavior:
                "smooth"

        });


        if (
            window.history &&
            window.history.pushState
        ) {

            window.history.pushState(
                null,
                "",
                href
            );

        }

    }


    desktopLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                handleNavigationClick
            );

        }
    );


    mobileLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                handleNavigationClick
            );

        }
    );


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                1100
            ) {

                closeMenu();

            }


            updateActiveNavigation();

            updateScrollProgress();

        }
    );


    /* =====================================================
       SCROLL
    ===================================================== */

    let scrollTicking =
        false;


    window.addEventListener(
        "scroll",
        () => {

            updateNavbar();

            updateBackToTop();

            updateScrollProgress();


            if (!scrollTicking) {

                window.requestAnimationFrame(
                    () => {

                        updateActiveNavigation();

                        scrollTicking =
                            false;

                    }
                );


                scrollTicking =
                    true;

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       BROWSER BACK / FORWARD
    ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            updateActiveNavigation();

        }
    );


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal-visible"
                                );

                            } else {

                                entry.target.classList.remove(
                                    "reveal-visible"
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -8% 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal-visible"
                );

            }
        );

    }


    /* =====================================================
       BRACKET SYSTEM
    ===================================================== */

    const bracketTabs =
        document.querySelectorAll(
            ".bracket-tab"
        );


    const bracketPanels =
        document.querySelectorAll(
            ".bracket-panel"
        );


    const accordionTriggers =
        document.querySelectorAll(
            ".bracket-accordion-trigger"
        );


    /* =====================================================
       SWITCH HOK / MLBB
    ===================================================== */

    function switchBracketTitle(
        title
    ) {

        bracketTabs.forEach(
            tab => {

                const active =
                    tab.dataset.bracketTitle ===
                    title;


                tab.classList.toggle(
                    "active",
                    active
                );


                tab.setAttribute(
                    "aria-selected",
                    active
                        ? "true"
                        : "false"
                );

            }
        );


        bracketPanels.forEach(
            panel => {

                const active =
                    panel.dataset.bracketPanel ===
                    title;


                panel.classList.toggle(
                    "active",
                    active
                );

            }
        );

    }


    bracketTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    switchBracketTitle(
                        tab.dataset.bracketTitle
                    );

                }
            );

        }
    );


    /* =====================================================
       GROUP / KNOCKOUT ACCORDION
       
       IMPORTANT:
       All accordions start CLOSED because the
       HTML uses the hidden attribute.
    ===================================================== */

    accordionTriggers.forEach(
        trigger => {

            trigger.addEventListener(
                "click",
                () => {

                    const accordion =
                        trigger.closest(
                            ".bracket-accordion"
                        );


                    if (!accordion) {
                        return;
                    }


                    const content =
                        accordion.querySelector(
                            ".bracket-accordion-content"
                        );


                    if (!content) {
                        return;
                    }


                    const isOpen =
                        accordion.classList.contains(
                            "open"
                        );


                    if (isOpen) {

                        accordion.classList.remove(
                            "open"
                        );


                        trigger.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        content.hidden =
                            true;

                    } else {

                        accordion.classList.add(
                            "open"
                        );


                        trigger.setAttribute(
                            "aria-expanded",
                            "true"
                        );


                        content.hidden =
                            false;

                    }

                }
            );

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateNavbar();

    updateScrollProgress();

    updateBackToTop();

    updateActiveNavigation();


    window.setTimeout(
        updateActiveNavigation,
        100
    );


    window.setTimeout(
        updateActiveNavigation,
        500
    );

});
