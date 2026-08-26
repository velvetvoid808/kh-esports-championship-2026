/* =====================================================
   KH ESPORTS CHAMPIONSHIP 2026
   MASTER JAVASCRIPT
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
       REDUCED MOTION
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

            top:
                Math.max(
                    0,
                    targetPosition
                ),

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

        let currentSection =
            "home";


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
         * Registration does not have
         * a corresponding navigation item.
         *
         * RULES remains highlighted.
         */

        if (
            currentSection ===
            "register"
        ) {

            currentSection =
                "rules";

        }


        setActiveSection(
            currentSection
        );

    }


    /* =====================================================
       SCROLL HANDLER
    ===================================================== */

    let ticking =
        false;


    function handleScroll() {

        if (ticking) {
            return;
        }

        ticking =
            true;

        window.requestAnimationFrame(
            () => {

                updateNavbar();

                updateActiveSection();

                ticking =
                    false;

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

        }
    );


    /* =====================================================
       ESCAPE KEY
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
       ANIMATION SYSTEM
       
       This section controls:
       - Scroll reveal
       - Staggered cards
       - Hero entrance
       - Counter animation
    ===================================================== */


    /* =====================================================
       REVEAL SELECTOR
    ===================================================== */

    const revealSelectors = [

        ".section-heading",

        ".about-main",

        ".about-objectives",

        ".title-card",

        ".format-flow",

        ".feature-card",

        ".schedule-card",

        ".venue-banner",

        ".prize-total",

        ".prize-card",

        ".rule",

        ".register-content",

        ".footer-main"

    ];


    /* =====================================================
       PREPARE REVEAL ELEMENTS
    ===================================================== */

    function prepareRevealElements() {

        if (prefersReducedMotion) {
            return;
        }

        revealSelectors.forEach(
            selector => {

                const elements =
                    document.querySelectorAll(
                        selector
                    );

                elements.forEach(
                    element => {

                        element.classList.add(
                            "js-reveal"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       STAGGER GROUPS
    ===================================================== */

    function prepareStaggerGroups() {

        if (prefersReducedMotion) {
            return;
        }

        const groups = [

            ".title-grid .title-card",

            ".format-features .feature-card",

            ".schedule-grid .schedule-card",

            ".prize-grid .prize-card",

            ".rules-grid .rule",

            ".stats-section .stat-card"

        ];


        groups.forEach(
            selector => {

                const elements =
                    Array.from(
                        document.querySelectorAll(
                            selector
                        )
                    );


                elements.forEach(
                    (element, index) => {

                        element.style
                            .setProperty(
                                "--reveal-delay",
                                `${index * 90}ms`
                            );

                    }
                );

            }
        );

    }


    /* =====================================================
       HERO ELEMENTS
    ===================================================== */

    function prepareHero() {

        if (prefersReducedMotion) {
            return;
        }

        const heroElements = [

            document.querySelector(
                ".hero .eyebrow"
            ),

            document.querySelector(
                ".hero h1"
            ),

            document.querySelector(
                ".hero-tagline"
            ),

            document.querySelector(
                ".hero-description"
            ),

            document.querySelector(
                ".hero-actions"
            ),

            document.querySelector(
                ".hero-bottom"
            )

        ].filter(Boolean);


        heroElements.forEach(
            (element, index) => {

                element.classList.add(
                    "hero-enter"
                );

                element.style
                    .setProperty(
                        "--hero-delay",
                        `${index * 110}ms`
                    );

            }
        );

    }


    /* =====================================================
       ADD ANIMATION STYLES
       
       The CSS file does not need to be
       modified for this first animation layer.
       
       JavaScript injects the required
       animation CSS dynamically.
    ===================================================== */

    function injectAnimationStyles() {

        if (prefersReducedMotion) {
            return;
        }

        if (
            document.getElementById(
                "kh-animation-styles"
            )
        ) {
            return;
        }


        const style =
            document.createElement(
                "style"
            );

        style.id =
            "kh-animation-styles";


        style.textContent = `

            /* =========================================
               SCROLL REVEAL
            ========================================= */

            .js-reveal {

                opacity: 0;

                transform:
                    translateY(28px);

                transition:
                    opacity 0.75s cubic-bezier(
                        0.22,
                        1,
                        0.36,
                        1
                    ),
                    transform 0.75s cubic-bezier(
                        0.22,
                        1,
                        0.36,
                        1
                    );

                transition-delay:
                    var(--reveal-delay, 0ms);

            }


            .js-reveal.is-visible {

                opacity: 1;

                transform:
                    translateY(0);

            }


            /* =========================================
               HERO ENTRANCE
            ========================================= */

            .hero-enter {

                opacity: 0;

                transform:
                    translateY(22px);

                animation:
                    khHeroEnter
                    0.85s cubic-bezier(
                        0.22,
                        1,
                        0.36,
                        1
                    )
                    forwards;

                animation-delay:
                    var(--hero-delay, 0ms);

            }


            @keyframes khHeroEnter {

                from {

                    opacity: 0;

                    transform:
                        translateY(22px);

                }

                to {

                    opacity: 1;

                    transform:
                        translateY(0);

                }

            }


            /* =========================================
               HERO TITLE ENHANCEMENT
            ========================================= */

            .hero h1.hero-title-active {

                animation:
                    khHeroTitleGlow
                    1.4s ease-out
                    0.15s both;

            }


            @keyframes khHeroTitleGlow {

                0% {

                    filter:
                        blur(4px);

                }

                100% {

                    filter:
                        blur(0);

                }

            }


            /* =========================================
               COUNTER
            ========================================= */

            .counter-value {

                display: inline-block;

                font-variant-numeric:
                    tabular-nums;

            }


            /* =========================================
               CARD HOVER ENHANCEMENT
            ========================================= */

            .title-card,
            .feature-card,
            .schedule-card,
            .prize-card,
            .rule,
            .stat-card {

                will-change:
                    transform;

            }


            /* =========================================
               REVEAL LINE
            ========================================= */

            .section-heading.is-visible
            .section-index {

                animation:
                    khIndexReveal
                    0.65s ease-out
                    both;

            }


            @keyframes khIndexReveal {

                from {

                    opacity: 0;

                    transform:
                        translateX(-12px);

                }

                to {

                    opacity: 1;

                    transform:
                        translateX(0);

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    function setupRevealObserver() {

        if (prefersReducedMotion) {

            document
                .querySelectorAll(
                    ".js-reveal"
                )
                .forEach(
                    element => {

                        element.classList.add(
                            "is-visible"
                        );

                    }
                );

            return;

        }


        if (
            !("IntersectionObserver" in window)
        ) {

            document
                .querySelectorAll(
                    ".js-reveal"
                )
                .forEach(
                    element => {

                        element.classList.add(
                            "is-visible"
                        );

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


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {

                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -55px 0px"

                }
            );


        document
            .querySelectorAll(
                ".js-reveal"
            )
            .forEach(
                element => {

                    observer.observe(
                        element
                    );

                }
            );

    }


    /* =====================================================
       COUNTER SYSTEM
       
       Automatically detects numbers inside
       selected statistic / prize elements.
    ===================================================== */

    function animateNumber(
        element,
        target,
        duration = 1200
    ) {

        if (prefersReducedMotion) {

            element.textContent =
                target.toLocaleString();

            return;

        }


        const start =
            0;

        const startTime =
            performance.now();


        function update(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
             * Ease-out curve.
             */

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.round(
                    start +
                    (
                        target -
                        start
                    ) *
                    eased
                );


            element.textContent =
                currentValue.toLocaleString();


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    update
                );

            }

        }


        requestAnimationFrame(
            update
        );

    }


    function setupCounters() {

        if (
            !("IntersectionObserver" in window)
        ) {
            return;
        }


        const counterElements = [];


        /*
         * STAT CARDS
         */

        document
            .querySelectorAll(
                ".stat-number"
            )
            .forEach(
                element => {

                    const raw =
                        element.textContent
                            .replace(
                                /,/g,
                                ""
                            )
                            .replace(
                                /[^\d.]/g,
                                ""
                            );

                    const target =
                        Number(raw);


                    if (
                        Number.isFinite(
                            target
                        )
                    ) {

                        const prefix =
                            element.textContent
                                .trim()
                                .startsWith(
                                    "RM"
                                )
                                ? "RM"
                                : "";

                        const suffix =
                            element.textContent
                                .trim()
                                .endsWith(
                                    "+"
                                )
                                ? "+"
                                : "";


                        counterElements.push({

                            element,

                            target,

                            prefix,

                            suffix

                        });

                    }

                }
            );


        /*
         * PRIZE TOTAL
         */

        document
            .querySelectorAll(
                ".prize-total strong"
            )
            .forEach(
                element => {

                    const raw =
                        element.textContent
                            .replace(
                                /,/g,
                                ""
                            )
                            .replace(
                                /[^\d.]/g,
                                ""
                            );

                    const target =
                        Number(raw);


                    if (
                        Number.isFinite(
                            target
                        )
                    ) {

                        counterElements.push({

                            element,

                            target,

                            prefix:
                                "RM",

                            suffix:
                                ""

                        });

                    }

                }
            );


        if (
            !counterElements.length
        ) {
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


                            const item =
                                counterElements.find(
                                    counter =>
                                        counter.element ===
                                        entry.target
                                );


                            if (!item) {
                                return;
                            }


                            const {
                                element,
                                target,
                                prefix,
                                suffix
                            } = item;


                            /*
                             * Remove the original
                             * content before counting.
                             */

                            element.textContent =
                                `${prefix}0${suffix}`;


                            /*
                             * Custom animation so
                             * RM formatting remains correct.
                             */

                            const startTime =
                                performance.now();

                            const duration =
                                1250;


                            function updateCounter(
                                currentTime
                            ) {

                                const elapsed =
                                    currentTime -
                                    startTime;

                                const progress =
                                    Math.min(
                                        elapsed /
                                        duration,
                                        1
                                    );


                                const eased =
                                    1 -
                                    Math.pow(
                                        1 - progress,
                                        3
                                    );


                                const value =
                                    Math.round(
                                        target *
                                        eased
                                    );


                                element.textContent =
                                    `${prefix}${value.toLocaleString()}${suffix}`;


                                if (
                                    progress < 1
                                ) {

                                    requestAnimationFrame(
                                        updateCounter
                                    );

                                }

                            }


                            requestAnimationFrame(
                                updateCounter
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {

                    threshold: 0.6

                }
            );


        counterElements.forEach(
            item => {

                observer.observe(
                    item.element
                );

            }
        );

    }


    /* =====================================================
       INITIALISE ANIMATION SYSTEM
    ===================================================== */

    function initializeAnimations() {

        prepareRevealElements();

        prepareStaggerGroups();

        prepareHero();

        injectAnimationStyles();

        setupRevealObserver();

        setupCounters();

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateNavbar();

    updateActiveSection();

    initializeAnimations();


})();
