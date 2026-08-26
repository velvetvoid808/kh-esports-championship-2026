/* =====================================================
   KH ESPORTS CHAMPIONSHIP 2026
   MASTER INTERACTION SYSTEM
   VERSION 2.0
===================================================== */

(() => {

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
       MOTION PREFERENCE
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 24
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

        mobileMenu.classList.add("open");

        menuBackdrop.classList.add("open");

        menuToggle.classList.add("open");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        menuBackdrop.setAttribute(
            "aria-hidden",
            "false"
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

        mobileMenu.classList.remove("open");

        menuBackdrop.classList.remove("open");

        menuToggle.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        menuBackdrop.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu &&
                    mobileMenu.classList.contains("open");

                if (isOpen) {
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
       SMOOTH NAVIGATION
    ===================================================== */

    function getHeaderOffset() {

        if (!navbar) {
            return 0;
        }

        return navbar.offsetHeight + 12;

    }


    function scrollToTarget(targetId) {

        const target =
            document.getElementById(targetId);

        if (!target) {
            return;
        }

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            getHeaderOffset();

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior:
                prefersReducedMotion
                    ? "auto"
                    : "smooth"
        });

    }


    function handleNavigationClick(event) {

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

        const targetId =
            href.substring(1);

        const target =
            document.getElementById(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        closeMenu();

        scrollToTarget(targetId);

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
       ACTIVE NAVIGATION
    ===================================================== */

    function setActiveSection(sectionId) {

        desktopLinks.forEach(
            link => {

                const matches =
                    link.getAttribute("href") ===
                    `#${sectionId}`;

                link.classList.toggle(
                    "active",
                    matches
                );

            }
        );


        mobileLinks.forEach(
            link => {

                const matches =
                    link.getAttribute("href") ===
                    `#${sectionId}`;

                link.classList.toggle(
                    "active",
                    matches
                );

            }
        );

    }


    function updateActiveSection() {

        if (!sections.length) {
            return;
        }

        const headerHeight =
            navbar
                ? navbar.offsetHeight
                : 0;

        const marker =
            window.scrollY +
            headerHeight +
            Math.min(
                window.innerHeight * 0.28,
                220
            );


        let currentSection = "home";


        for (
            let i = 0;
            i < sections.length;
            i++
        ) {

            const section =
                sections[i];

            if (
                marker >= section.offsetTop
            ) {

                currentSection =
                    section.id;

            } else {

                break;

            }

        }


        /*
         * Registration has no direct
         * navigation item.
         *
         * RULES remains highlighted.
         */

        if (
            currentSection === "register"
        ) {

            currentSection = "rules";

        }


        setActiveSection(
            currentSection
        );

    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    let progressBar = null;


    function createScrollProgress() {

        if (
            document.getElementById(
                "scrollProgress"
            )
        ) {
            progressBar =
                document.getElementById(
                    "scrollProgress"
                );

            return;
        }


        progressBar =
            document.createElement("div");

        progressBar.id =
            "scrollProgress";

        progressBar.setAttribute(
            "aria-hidden",
            "true"
        );


        Object.assign(
            progressBar.style,
            {
                position: "fixed",
                top: "0",
                left: "0",
                width: "0%",
                height: "2px",
                zIndex: "2000",
                pointerEvents: "none",
                background:
                    "linear-gradient(90deg, #a855f7, #22d3ee)",
                boxShadow:
                    "0 0 12px rgba(168,85,247,0.45)",
                transformOrigin: "left center",
                transition:
                    prefersReducedMotion
                        ? "none"
                        : "width 0.08s linear"
            }
        );


        document.body.appendChild(
            progressBar
        );

    }


    function updateScrollProgress() {

        if (!progressBar) {
            return;
        }


        const scrollTop =
            window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (scrollHeight <= 0) {

            progressBar.style.width =
                "0%";

            return;

        }


        const percentage =
            Math.min(
                100,
                Math.max(
                    0,
                    (scrollTop / scrollHeight) * 100
                )
            );


        progressBar.style.width =
            `${percentage}%`;

    }


    /* =====================================================
       REVEAL SYSTEM
    ===================================================== */

    function prepareRevealElements() {

        if (prefersReducedMotion) {
            return;
        }


        const selectors = [

            ".section-heading",

            ".about-main",

            ".about-objectives",

            ".title-card",

            ".format-step",

            ".feature-card",

            ".schedule-card",

            ".venue-banner",

            ".prize-total",

            ".prize-card",

            ".rule",

            ".register-content",

            ".footer-main"

        ];


        const elements =
            document.querySelectorAll(
                selectors.join(",")
            );


        elements.forEach(
            element => {

                element.classList.add(
                    "js-reveal"
                );

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(28px)";

                element.style.transition =
                    "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), " +
                    "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";

                element.style.willChange =
                    "opacity, transform";

            }
        );


        createRevealObserver(
            elements
        );

    }


    function createRevealObserver(elements) {

        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(
                element => {

                    element.style.opacity =
                        "1";

                    element.style.transform =
                        "translateY(0)";

                }
            );

            return;

        }


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const element =
                                entry.target;


                            element.style.opacity =
                                "1";

                            element.style.transform =
                                "translateY(0)";


                            observer.unobserve(
                                element
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        elements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       STAGGER EFFECT
    ===================================================== */

    function applyStagger() {

        if (prefersReducedMotion) {
            return;
        }


        const groups = [

            ".title-grid",

            ".format-flow",

            ".format-features",

            ".schedule-grid",

            ".prize-grid",

            ".rules-grid"

        ];


        groups.forEach(
            selector => {

                const container =
                    document.querySelector(
                        selector
                    );


                if (!container) {
                    return;
                }


                const children =
                    Array.from(
                        container.children
                    ).filter(
                        child =>
                            !child.classList.contains(
                                "flow-line"
                            )
                    );


                children.forEach(
                    (child, index) => {

                        child.style.transitionDelay =
                            `${index * 90}ms`;

                    }
                );

            }
        );

    }


    /* =====================================================
       HERO ENTRANCE ANIMATION
    ===================================================== */

    function prepareHeroAnimation() {

        if (prefersReducedMotion) {
            return;
        }


        const hero =
            document.querySelector(
                ".hero"
            );


        if (!hero) {
            return;
        }


        const elements = [

            hero.querySelector(
                ".eyebrow"
            ),

            hero.querySelector(
                "h1"
            ),

            hero.querySelector(
                ".hero-tagline"
            ),

            hero.querySelector(
                ".hero-description"
            ),

            hero.querySelector(
                ".hero-actions"
            ),

            hero.querySelector(
                ".hero-bottom"
            )

        ].filter(Boolean);


        elements.forEach(
            (element, index) => {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(22px)";

                element.style.transition =
                    "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), " +
                    "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";


                window.setTimeout(
                    () => {

                        element.style.opacity =
                            "1";

                        element.style.transform =
                            "translateY(0)";

                    },
                    120 + index * 120
                );

            }
        );

    }


    /* =====================================================
       BACK TO TOP BUTTON
    ===================================================== */

    let backToTop = null;


    function createBackToTop() {

        if (
            document.getElementById(
                "backToTop"
            )
        ) {

            backToTop =
                document.getElementById(
                    "backToTop"
                );

            return;

        }


        backToTop =
            document.createElement("button");

        backToTop.id =
            "backToTop";

        backToTop.type =
            "button";

        backToTop.setAttribute(
            "aria-label",
            "Back to top"
        );

        backToTop.innerHTML =
            "↑";


        Object.assign(
            backToTop.style,
            {
                position: "fixed",
                right: "22px",
                bottom: "22px",
                width: "42px",
                height: "42px",
                zIndex: "900",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border:
                    "1px solid rgba(168,85,247,0.35)",
                background:
                    "rgba(7,8,13,0.82)",
                color: "#f4f5f7",
                fontSize: "17px",
                fontWeight: "700",
                cursor: "pointer",
                opacity: "0",
                visibility: "hidden",
                transform: "translateY(10px)",
                backdropFilter:
                    "blur(14px)",
                WebkitBackdropFilter:
                    "blur(14px)",
                transition:
                    "opacity 0.25s ease, " +
                    "visibility 0.25s ease, " +
                    "transform 0.25s ease, " +
                    "border-color 0.25s ease"
            }
        );


        document.body.appendChild(
            backToTop
        );


        backToTop.addEventListener(
            "mouseenter",
            () => {

                backToTop.style.borderColor =
                    "rgba(168,85,247,0.8)";

            }
        );


        backToTop.addEventListener(
            "mouseleave",
            () => {

                backToTop.style.borderColor =
                    "rgba(168,85,247,0.35)";

            }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"
                });

            }
        );

    }


    function updateBackToTop() {

        if (!backToTop) {
            return;
        }


        const visible =
            window.scrollY >
            window.innerHeight * 0.65;


        backToTop.style.opacity =
            visible ? "1" : "0";

        backToTop.style.visibility =
            visible ? "visible" : "hidden";

        backToTop.style.transform =
            visible
                ? "translateY(0)"
                : "translateY(10px)";

    }


    /* =====================================================
       HERO MOUSE PARALLAX
    ===================================================== */

    function initializeHeroParallax() {

        if (
            prefersReducedMotion ||
            window.matchMedia(
                "(pointer: coarse)"
            ).matches
        ) {
            return;
        }


        const hero =
            document.querySelector(
                ".hero"
            );


        if (!hero) {
            return;
        }


        const heroGrid =
            hero.querySelector(
                ".hero-grid"
            );


        if (!heroGrid) {
            return;
        }


        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;

        let animationRunning = false;


        function animateParallax() {

            currentX +=
                (mouseX - currentX) * 0.045;

            currentY +=
                (mouseY - currentY) * 0.045;


            heroGrid.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;


            if (
                Math.abs(mouseX - currentX) > 0.05 ||
                Math.abs(mouseY - currentY) > 0.05
            ) {

                requestAnimationFrame(
                    animateParallax
                );

            } else {

                animationRunning = false;

            }

        }


        hero.addEventListener(
            "pointermove",
            event => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height;


                mouseX =
                    (x - 0.5) * 10;

                mouseY =
                    (y - 0.5) * 10;


                if (!animationRunning) {

                    animationRunning =
                        true;

                    requestAnimationFrame(
                        animateParallax
                    );

                }

            },
            {
                passive: true
            }
        );


        hero.addEventListener(
            "pointerleave",
            () => {

                mouseX = 0;
                mouseY = 0;


                if (!animationRunning) {

                    animationRunning =
                        true;

                    requestAnimationFrame(
                        animateParallax
                    );

                }

            }
        );

    }


    /* =====================================================
       CARD TILT EFFECT
    ===================================================== */

    function initializeCardTilt() {

        if (
            prefersReducedMotion ||
            window.matchMedia(
                "(pointer: coarse)"
            ).matches
        ) {
            return;
        }


        const cards =
            document.querySelectorAll(
                ".title-card, .feature-card, .prize-card"
            );


        cards.forEach(
            card => {

                card.addEventListener(
                    "pointermove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        const rotateY =
                            (
                                (x - centerX) /
                                centerX
                            ) * 2.5;


                        const rotateX =
                            -(
                                (y - centerY) /
                                centerY
                            ) * 2.5;


                        card.style.transform =
                            `perspective(900px) ` +
                            `rotateX(${rotateX}deg) ` +
                            `rotateY(${rotateY}deg) ` +
                            `translateY(-5px)`;

                    },
                    {
                        passive: true
                    }
                );


                card.addEventListener(
                    "pointerleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       COMBINED SCROLL HANDLER
    ===================================================== */

    let ticking = false;


    function handleScroll() {

        if (ticking) {
            return;
        }


        ticking = true;


        window.requestAnimationFrame(
            () => {

                updateNavbar();

                updateActiveSection();

                updateScrollProgress();

                updateBackToTop();


                ticking = false;

            }
        );

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeMenu();

            }


            updateActiveSection();

            updateScrollProgress();

        }
    );


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    createScrollProgress();

    createBackToTop();

    prepareHeroAnimation();

    prepareRevealElements();

    applyStagger();

    initializeHeroParallax();

    initializeCardTilt();

    updateNavbar();

    updateActiveSection();

    updateScrollProgress();

    updateBackToTop();


})();
