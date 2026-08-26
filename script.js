/* =====================================================
   KH ESPORTS CHAMPIONSHIP 2026
   MASTER JAVASCRIPT
   NAVIGATION + MOTION SYSTEM
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
       MOTION SETTINGS
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const isTouchDevice =
        window.matchMedia(
            "(hover: none)"
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
            behavior: prefersReducedMotion
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
       
       Active state is determined by actual
       scroll position, not by clicking.
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
         * Registration is not part of the
         * main navigation.
         *
         * Therefore RULES stays active
         * while inside the registration area.
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
       MOTION CSS INJECTION
       
       The animation foundation is injected here
       so the existing stylesheet does not need
       to be changed yet.
    ===================================================== */

    function injectMotionStyles() {

        if (
            document.getElementById(
                "kh-motion-styles"
            )
        ) {
            return;
        }

        const style =
            document.createElement("style");

        style.id =
            "kh-motion-styles";

        style.textContent = `

            /* =========================================
               GLOBAL MOTION FOUNDATION
            ========================================= */

            .kh-reveal {
                opacity: 0;
                transform: translateY(34px);
                transition:
                    opacity 0.85s cubic-bezier(.22,1,.36,1),
                    transform 0.85s cubic-bezier(.22,1,.36,1);
                will-change: opacity, transform;
            }

            .kh-reveal.kh-visible {
                opacity: 1;
                transform: translateY(0);
            }


            .kh-reveal-left {
                opacity: 0;
                transform: translateX(-32px);
                transition:
                    opacity 0.85s cubic-bezier(.22,1,.36,1),
                    transform 0.85s cubic-bezier(.22,1,.36,1);
            }

            .kh-reveal-left.kh-visible {
                opacity: 1;
                transform: translateX(0);
            }


            .kh-reveal-right {
                opacity: 0;
                transform: translateX(32px);
                transition:
                    opacity 0.85s cubic-bezier(.22,1,.36,1),
                    transform 0.85s cubic-bezier(.22,1,.36,1);
            }

            .kh-reveal-right.kh-visible {
                opacity: 1;
                transform: translateX(0);
            }


            .kh-scale-reveal {
                opacity: 0;
                transform: scale(.94);
                transition:
                    opacity 0.8s cubic-bezier(.22,1,.36,1),
                    transform 0.8s cubic-bezier(.22,1,.36,1);
            }

            .kh-scale-reveal.kh-visible {
                opacity: 1;
                transform: scale(1);
            }


            /* =========================================
               STAGGER SYSTEM
            ========================================= */

            .kh-stagger-1 {
                transition-delay: 0.08s;
            }

            .kh-stagger-2 {
                transition-delay: 0.16s;
            }

            .kh-stagger-3 {
                transition-delay: 0.24s;
            }

            .kh-stagger-4 {
                transition-delay: 0.32s;
            }

            .kh-stagger-5 {
                transition-delay: 0.40s;
            }

            .kh-stagger-6 {
                transition-delay: 0.48s;
            }


            /* =========================================
               HERO ENTRANCE
            ========================================= */

            .kh-hero-enter {
                opacity: 0;
                transform: translateY(24px);
                animation:
                    khHeroEnter
                    1s
                    cubic-bezier(.22,1,.36,1)
                    forwards;
            }

            .kh-hero-delay-1 {
                animation-delay: .08s;
            }

            .kh-hero-delay-2 {
                animation-delay: .18s;
            }

            .kh-hero-delay-3 {
                animation-delay: .28s;
            }

            .kh-hero-delay-4 {
                animation-delay: .40s;
            }

            .kh-hero-delay-5 {
                animation-delay: .52s;
            }

            @keyframes khHeroEnter {

                from {
                    opacity: 0;
                    transform:
                        translateY(24px);
                }

                to {
                    opacity: 1;
                    transform:
                        translateY(0);
                }

            }


            /* =========================================
               HERO FLOATING ATMOSPHERE
            ========================================= */

            .kh-floating {
                animation:
                    khFloating
                    7s
                    ease-in-out
                    infinite;
            }

            @keyframes khFloating {

                0%,
                100% {
                    transform:
                        translate3d(0,0,0);
                }

                50% {
                    transform:
                        translate3d(0,-10px,0);
                }

            }


            /* =========================================
               CARD HOVER LIGHT
            ========================================= */

            .kh-motion-card {
                position: relative;
                overflow: hidden;
            }

            .kh-motion-card::after {
                content: "";
                position: absolute;

                top: 0;
                left: -130%;

                width: 70%;
                height: 100%;

                background:
                    linear-gradient(
                        90deg,
                        transparent,
                        rgba(255,255,255,.055),
                        transparent
                    );

                transform:
                    skewX(-20deg);

                pointer-events: none;

                transition:
                    left .65s ease;
            }

            .kh-motion-card:hover::after {
                left: 150%;
            }


            /* =========================================
               BUTTON PRESS
            ========================================= */

            .primary-button,
            .secondary-button,
            .nav-button,
            .mobile-register {
                -webkit-tap-highlight-color:
                    transparent;
            }

            .primary-button:active,
            .secondary-button:active,
            .nav-button:active,
            .mobile-register:active {
                transform:
                    translateY(0)
                    scale(.98);
            }


            /* =========================================
               PARALLAX VARIABLES
            ========================================= */

            .kh-parallax {
                transform:
                    translate3d(
                        var(--kh-parallax-x, 0px),
                        var(--kh-parallax-y, 0px),
                        0
                    );
            }


            /* =========================================
               COUNT-UP
            ========================================= */

            .kh-counting {
                font-variant-numeric:
                    tabular-nums;
            }


            /* =========================================
               REDUCED MOTION
            ========================================= */

            @media (prefers-reduced-motion: reduce) {

                .kh-reveal,
                .kh-reveal-left,
                .kh-reveal-right,
                .kh-scale-reveal,
                .kh-hero-enter {

                    opacity: 1 !important;

                    transform:
                        none !important;

                    animation:
                        none !important;

                    transition:
                        none !important;

                }

                .kh-floating {
                    animation:
                        none !important;
                }

                .kh-motion-card::after {
                    display: none;
                }

            }

        `;

        document.head.appendChild(style);

    }


    /* =====================================================
       HERO ENTRANCE ANIMATION
    ===================================================== */

    function setupHeroAnimation() {

        if (
            prefersReducedMotion
        ) {
            return;
        }

        const hero =
            document.querySelector(".hero");

        if (!hero) {
            return;
        }

        const selectors = [

            ".eyebrow",

            ".hero h1",

            ".hero-tagline",

            ".hero-description",

            ".hero-actions",

            ".hero-bottom"

        ];


        selectors.forEach(
            (selector, index) => {

                const element =
                    hero.querySelector(selector);

                if (!element) {
                    return;
                }

                element.classList.add(
                    "kh-hero-enter"
                );

                element.classList.add(
                    `kh-hero-delay-${Math.min(
                        index + 1,
                        5
                    )}`
                );

            }
        );


        const floatingTargets = [

            ".hero::before",

            ".hero::after"

        ];

        /*
         * Pseudo-elements cannot receive
         * classes, so the main hero receives
         * a subtle floating atmosphere class.
         */

        hero.classList.add(
            "kh-floating"
        );

    }


    /* =====================================================
       SCROLL REVEAL SYSTEM
    ===================================================== */

    function setupScrollReveal() {

        const revealElements =
            Array.from(
                document.querySelectorAll(
                    [
                        ".section-heading",

                        ".about-main",

                        ".about-objectives",

                        ".title-card",

                        ".format-flow",

                        ".format-features",

                        ".schedule-card",

                        ".venue-banner",

                        ".prize-total",

                        ".prize-card",

                        ".rule",

                        ".register-content",

                        ".footer-main"

                    ].join(",")
                )
            );


        if (!revealElements.length) {
            return;
        }


        revealElements.forEach(
            (element, index) => {

                /*
                 * Avoid double initialization.
                 */

                if (
                    element.classList.contains(
                        "kh-reveal"
                    )
                ) {
                    return;
                }


                /*
                 * Large structural elements
                 * use a simple vertical reveal.
                 */

                element.classList.add(
                    "kh-reveal"
                );


                /*
                 * Cards get staggered timing.
                 */

                const parent =
                    element.parentElement;

                if (
                    parent &&
                    (
                        parent.classList.contains(
                            "title-grid"
                        ) ||
                        parent.classList.contains(
                            "schedule-grid"
                        ) ||
                        parent.classList.contains(
                            "prize-grid"
                        ) ||
                        parent.classList.contains(
                            "rules-grid"
                        ) ||
                        parent.classList.contains(
                            "format-features"
                        )
                    )
                ) {

                    const siblings =
                        Array.from(
                            parent.children
                        );

                    const siblingIndex =
                        siblings.indexOf(
                            element
                        );

                    const stagger =
                        Math.min(
                            siblingIndex + 1,
                            6
                        );

                    element.classList.add(
                        `kh-stagger-${stagger}`
                    );

                }

            }
        );


        /*
         * If IntersectionObserver is supported,
         * use it for efficient scroll detection.
         */

        if (
            "IntersectionObserver" in window
        ) {

            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "kh-visible"
                                    );

                                    observer.unobserve(
                                        entry.target
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

                    observer.observe(
                        element
                    );

                }
            );

        } else {

            /*
             * Fallback for older browsers.
             */

            revealElements.forEach(
                element => {

                    element.classList.add(
                        "kh-visible"
                    );

                }
            );

        }

    }


    /* =====================================================
       CARD MOTION
    ===================================================== */

    function setupCardMotion() {

        const cards =
            document.querySelectorAll(
                [
                    ".title-card",
                    ".feature-card",
                    ".schedule-card",
                    ".prize-card",
                    ".rule",
                    ".stat-card"
                ].join(",")
            );


        cards.forEach(
            card => {

                card.classList.add(
                    "kh-motion-card"
                );

            }
        );

    }


    /* =====================================================
       STAT COUNT-UP
    ===================================================== */

    function setupStatCounters() {

        if (
            prefersReducedMotion
        ) {
            return;
        }

        const statNumbers =
            Array.from(
                document.querySelectorAll(
                    ".stat-number"
                )
            );


        if (!statNumbers.length) {
            return;
        }


        function animateNumber(
            element
        ) {

            if (
                element.dataset.counted ===
                "true"
            ) {
                return;
            }

            const rawText =
                element.textContent.trim();

            /*
             * Only animate values containing
             * an actual numeric value.
             */

            const match =
                rawText.match(
                    /([0-9]+(?:\.[0-9]+)?)/
                );

            if (!match) {
                return;
            }

            const target =
                Number(match[1]);

            if (
                !Number.isFinite(target)
            ) {
                return;
            }


            const prefix =
                rawText.substring(
                    0,
                    match.index
                );

            const suffix =
                rawText.substring(
                    match.index +
                    match[1].length
                );


            const duration =
                target >= 100
                    ? 1300
                    : 950;


            const startTime =
                performance.now();


            element.dataset.counted =
                "true";

            element.classList.add(
                "kh-counting"
            );


            function update(
                currentTime
            ) {

                const progress =
                    Math.min(
                        (
                            currentTime -
                            startTime
                        ) / duration,
                        1
                    );


                /*
                 * Smooth ease-out curve.
                 */

                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                const current =
                    target * eased;


                const displayValue =
                    Number.isInteger(
                        target
                    )
                        ? Math.round(
                            current
                        ).toString()
                        : current.toFixed(1);


                element.textContent =
                    prefix +
                    displayValue +
                    suffix;


                if (
                    progress < 1
                ) {

                    requestAnimationFrame(
                        update
                    );

                } else {

                    element.textContent =
                        rawText;

                }

            }


            requestAnimationFrame(
                update
            );

        }


        if (
            "IntersectionObserver" in window
        ) {

            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    animateNumber(
                                        entry.target
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.5
                    }
                );


            statNumbers.forEach(
                element => {

                    observer.observe(
                        element
                    );

                }
            );

        } else {

            statNumbers.forEach(
                animateNumber
            );

        }

    }


    /* =====================================================
       MOUSE PARALLAX
    ===================================================== */

    function setupMouseParallax() {

        /*
         * Do not run parallax on touch devices
         * or reduced-motion environments.
         */

        if (
            prefersReducedMotion ||
            isTouchDevice
        ) {
            return;
        }


        const hero =
            document.querySelector(".hero");

        if (!hero) {
            return;
        }


        const targets = [

            hero.querySelector(
                ".hero-content"
            ),

            hero.querySelector(
                ".hero-side"
            )

        ].filter(Boolean);


        if (!targets.length) {
            return;
        }


        let mouseX = 0;

        let mouseY = 0;

        let currentX = 0;

        let currentY = 0;

        let animationFrame = null;


        function animateParallax() {

            currentX +=
                (
                    mouseX -
                    currentX
                ) * 0.06;

            currentY +=
                (
                    mouseY -
                    currentY
                ) * 0.06;


            targets.forEach(
                (element, index) => {

                    const multiplier =
                        index === 0
                            ? 0.35
                            : 0.75;


                    element.style.setProperty(
                        "--kh-parallax-x",
                        `${currentX * multiplier}px`
                    );

                    element.style.setProperty(
                        "--kh-parallax-y",
                        `${currentY * multiplier}px`
                    );

                    element.classList.add(
                        "kh-parallax"
                    );

                }
            );


            animationFrame =
                requestAnimationFrame(
                    animateParallax
                );

        }


        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (
                        event.clientX /
                        window.innerWidth
                    ) - 0.5;

                const y =
                    (
                        event.clientY /
                        window.innerHeight
                    ) - 0.5;


                mouseX =
                    x * 18;

                mouseY =
                    y * 12;

            },
            {
                passive: true
            }
        );


        animationFrame =
            requestAnimationFrame(
                animateParallax
            );


        /*
         * Reset the effect when the pointer
         * leaves the browser window.
         */

        document.addEventListener(
            "mouseleave",
            () => {

                mouseX = 0;
                mouseY = 0;

            }
        );


        /*
         * Prevent unused-frame warnings in
         * browsers that pause animations.
         */

        window.addEventListener(
            "beforeunload",
            () => {

                if (
                    animationFrame
                ) {

                    cancelAnimationFrame(
                        animationFrame
                    );

                }

            }
        );

    }


    /* =====================================================
       SECTION HEADING MICRO ANIMATION
    ===================================================== */

    function setupHeadingMotion() {

        const headings =
            document.querySelectorAll(
                ".section-heading h2"
            );


        headings.forEach(
            heading => {

                heading.addEventListener(
                    "mouseenter",
                    () => {

                        if (
                            prefersReducedMotion
                        ) {
                            return;
                        }

                        heading.style.transform =
                            "translateX(3px)";

                    }
                );


                heading.addEventListener(
                    "mouseleave",
                    () => {

                        heading.style.transform =
                            "translateX(0)";

                    }
                );

            }
        );

    }


    /* =====================================================
       MOBILE MENU LINK ANIMATION
    ===================================================== */

    function setupMobileMenuAnimation() {

        if (!mobileMenu) {
            return;
        }

        const links =
            mobileMenu.querySelectorAll(
                ".mobile-links a, .mobile-register"
            );


        links.forEach(
            (link, index) => {

                link.style.setProperty(
                    "--kh-menu-index",
                    index
                );

            }
        );


        if (
            prefersReducedMotion
        ) {
            return;
        }


        const observer =
            new MutationObserver(
                mutations => {

                    mutations.forEach(
                        mutation => {

                            if (
                                mutation.attributeName !==
                                "class"
                            ) {
                                return;
                            }


                            if (
                                mobileMenu.classList.contains(
                                    "open"
                                )
                            ) {

                                links.forEach(
                                    (link, index) => {

                                        link.animate(
                                            [
                                                {
                                                    opacity: 0,

                                                    transform:
                                                        "translateY(-8px)"
                                                },

                                                {
                                                    opacity: 1,

                                                    transform:
                                                        "translateY(0)"
                                                }

                                            ],
                                            {
                                                duration: 360,

                                                delay:
                                                    index * 45,

                                                easing:
                                                    "cubic-bezier(.22,1,.36,1)",

                                                fill:
                                                    "both"
                                            }
                                        );

                                    }
                                );

                            }

                        }
                    );

                }
            );


        observer.observe(
            mobileMenu,
            {
                attributes: true
            }
        );

    }


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
       INITIALIZATION
    ===================================================== */

    function initialize() {

        /*
         * Navigation
         */

        updateNavbar();

        updateActiveSection();


        /*
         * Motion foundation
         */

        injectMotionStyles();


        /*
         * Hero
         */

        setupHeroAnimation();


        /*
         * Scroll animations
         */

        setupScrollReveal();


        /*
         * Cards
         */

        setupCardMotion();


        /*
         * Statistics
         */

        setupStatCounters();


        /*
         * Mouse interaction
         */

        setupMouseParallax();


        /*
         * Heading interaction
         */

        setupHeadingMotion();


        /*
         * Mobile navigation animation
         */

        setupMobileMenuAnimation();

    }


    /* =====================================================
       START
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();

    }


})();
