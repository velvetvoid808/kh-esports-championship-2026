/* =====================================================
   KH ESPORTS CHAMPIONSHIP 2026
   MASTER INTERACTION SYSTEM — V2
===================================================== */

(() => {

    "use strict";


    /* =================================================
       ELEMENTS
    ================================================= */

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
                ".mobile-links a"
            )
        );

    const sections =
        Array.from(
            document.querySelectorAll(
                "main section[id]"
            )
        );


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =================================================
       SCROLL PROGRESS
    ================================================= */

    const progressBar =
        document.createElement("div");

    progressBar.id =
        "scrollProgress";

    progressBar.setAttribute(
        "aria-hidden",
        "true"
    );

    progressBar.style.cssText = `
        position:fixed;
        top:0;
        left:0;
        width:0%;
        height:2px;
        z-index:3000;
        pointer-events:none;
        background:
            linear-gradient(
                90deg,
                #a855f7,
                #c084fc,
                #22d3ee
            );
        box-shadow:
            0 0 10px rgba(168,85,247,.55),
            0 0 18px rgba(34,211,238,.25);
        transition:width .08s linear;
    `;

    document.body.appendChild(
        progressBar
    );


    /* =================================================
       BACK TO TOP
    ================================================= */

    const backToTop =
        document.createElement("button");

    backToTop.id =
        "backToTop";

    backToTop.type =
        "button";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    backToTop.innerHTML = `
        <span>—</span>
        <strong>↑</strong>
    `;

    backToTop.style.cssText = `
        position:fixed;
        right:28px;
        bottom:28px;
        width:46px;
        height:46px;
        z-index:1200;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:0;
        color:#f4f5f7;
        border:1px solid rgba(168,85,247,.35);
        background:rgba(7,8,13,.82);
        cursor:pointer;
        opacity:0;
        visibility:hidden;
        transform:translateY(14px);
        backdrop-filter:blur(14px);
        -webkit-backdrop-filter:blur(14px);
        transition:
            opacity .3s ease,
            visibility .3s ease,
            transform .3s ease,
            border-color .25s ease,
            background .25s ease;
    `;

    document.body.appendChild(
        backToTop
    );


    const backToTopStyle =
        document.createElement("style");

    backToTopStyle.textContent = `
        #backToTop.visible {
            opacity:1 !important;
            visibility:visible !important;
            transform:translateY(0) !important;
        }

        #backToTop:hover {
            border-color:rgba(168,85,247,.8);
            background:rgba(168,85,247,.12);
            transform:translateY(-3px);
        }

        #backToTop span {
            font-size:9px;
            color:#c084fc;
            line-height:.5;
        }

        #backToTop strong {
            font-size:17px;
            font-weight:500;
            line-height:1;
        }

        @media (max-width:760px) {
            #backToTop {
                right:17px;
                bottom:18px;
                width:42px;
                height:42px;
            }
        }
    `;

    document.head.appendChild(
        backToTopStyle
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top:0,
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"
            });

        }
    );


    /* =================================================
       NAVBAR
    ================================================= */

    function updateNavbar() {

        if (!navbar) {
            return;
        }

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 24
        );

    }


    /* =================================================
       SCROLL PROGRESS
    ================================================= */

    function updateProgress() {

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (scrollHeight <= 0) {

            progressBar.style.width =
                "0%";

            return;

        }

        const progress =
            (
                window.scrollY /
                scrollHeight
            ) * 100;

        progressBar.style.width =
            `${Math.min(
                100,
                Math.max(
                    0,
                    progress
                )
            )}%`;

    }


    /* =================================================
       BACK TO TOP VISIBILITY
    ================================================= */

    function updateBackToTop() {

        backToTop.classList.toggle(
            "visible",
            window.scrollY > 500
        );

    }


    /* =================================================
       MOBILE MENU
    ================================================= */

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

        document.body.classList.add(
            "menu-open"
        );

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

        mobileMenu.classList.remove(
            "open"
        );

        menuBackdrop.classList.remove(
            "open"
        );

        menuToggle.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "menu-open"
        );

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


    /* =================================================
       SMOOTH NAVIGATION
    ================================================= */

    function getHeaderOffset() {

        return navbar
            ? navbar.offsetHeight + 12
            : 0;

    }


    function scrollToTarget(
        targetId
    ) {

        const target =
            document.getElementById(
                targetId
            );

        if (!target) {
            return;
        }

        const position =
            target.getBoundingClientRect().top +
            window.scrollY -
            getHeaderOffset();

        window.scrollTo({
            top:
                Math.max(
                    0,
                    position
                ),
            behavior:
                prefersReducedMotion
                    ? "auto"
                    : "smooth"
        });

    }


    function handleNavigationClick(
        event
    ) {

        const link =
            event.currentTarget;

        const href =
            link.getAttribute(
                "href"
            );

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
            document.getElementById(
                targetId
            );

        if (!target) {

            return;

        }

        event.preventDefault();

        closeMenu();

        scrollToTarget(
            targetId
        );

    }


    [
        ...desktopLinks,
        ...mobileLinks
    ].forEach(
        link => {

            link.addEventListener(
                "click",
                handleNavigationClick
            );

        }
    );


    /* =================================================
       ACTIVE SECTION
    ================================================= */

    function setActiveSection(
        sectionId
    ) {

        [
            ...desktopLinks,
            ...mobileLinks
        ].forEach(
            link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute(
                        "href"
                    ) ===
                    `#${sectionId}`
                );

            }
        );

    }


    function updateActiveSection() {

        if (!sections.length) {
            return;
        }

        const marker =
            window.scrollY +
            (
                navbar
                    ? navbar.offsetHeight
                    : 0
            ) +
            Math.min(
                window.innerHeight * 0.28,
                220
            );


        let current =
            sections[0].id;


        for (
            let i = 0;
            i < sections.length;
            i++
        ) {

            if (
                marker >=
                sections[i].offsetTop
            ) {

                current =
                    sections[i].id;

            } else {

                break;

            }

        }


        setActiveSection(
            current
        );

    }


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    function prepareRevealElements() {

        const headings =
            document.querySelectorAll(
                ".section-heading"
            );


        headings.forEach(
            element => {

                element.classList.add(
                    "kh-reveal"
                );

            }
        );


        const contentBlocks =
            document.querySelectorAll(
                `
                .about-main,
                .format-intro,
                .format-flow,
                .format-features,
                .schedule-grid,
                .registration-status-grid,
                .prize-total,
                .prize-grid,
                .rules-grid,
                .register-content,
                .footer-main
                `
            );


        contentBlocks.forEach(
            element => {

                element.classList.add(
                    "kh-reveal"
                );

            }
        );


        const cards =
            document.querySelectorAll(
                `
                .stat-card,
                .title-card,
                .format-step,
                .feature-card,
                .schedule-card,
                .prize-card,
                .rule,
                .countdown-card
                `
            );


        cards.forEach(
            element => {

                element.classList.add(
                    "kh-card-reveal"
                );

            }
        );


        return [
            ...document.querySelectorAll(
                ".kh-reveal, .kh-card-reveal"
            )
        ];

    }


    const revealStyle =
        document.createElement("style");

    revealStyle.textContent = `

        .kh-reveal {
            opacity:0;
            transform:translateY(28px);
            transition:
                opacity .75s cubic-bezier(.22,1,.36,1),
                transform .75s cubic-bezier(.22,1,.36,1);
        }

        .kh-reveal.kh-visible {
            opacity:1;
            transform:translateY(0);
        }

        .kh-card-reveal {
            opacity:0;
            transform:
                translateY(24px)
                scale(.985);
            transition:
                opacity .7s cubic-bezier(.22,1,.36,1),
                transform .7s cubic-bezier(.22,1,.36,1);
        }

        .kh-card-reveal.kh-visible {
            opacity:1;
            transform:
                translateY(0)
                scale(1);
        }

        @media (prefers-reduced-motion:reduce) {
            .kh-reveal,
            .kh-card-reveal {
                opacity:1;
                transform:none;
                transition:none;
            }
        }

    `;

    document.head.appendChild(
        revealStyle
    );


    function setupRevealObserver() {

        const elements =
            prepareRevealElements();


        if (!elements.length) {
            return;
        }


        if (
            prefersReducedMotion ||
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(
                element => {

                    element.classList.add(
                        "kh-visible"
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
                                "kh-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold:
                        0.12,

                    rootMargin:
                        "0px 0px -60px 0px"
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


    /* =================================================
       CARD STAGGER
    ================================================= */

    function setupCardStagger() {

        const groups = [

            ".stats-grid",
            ".title-grid",
            ".format-features",
            ".schedule-grid",
            ".prize-grid",
            ".rules-grid",
            ".countdown-grid"

        ];


        groups.forEach(
            selector => {

                const group =
                    document.querySelector(
                        selector
                    );

                if (!group) {
                    return;
                }


                const cards =
                    group.querySelectorAll(
                        ".kh-card-reveal"
                    );


                cards.forEach(
                    (
                        card,
                        index
                    ) => {

                        card.style.transitionDelay =
                            `${Math.min(
                                index * 0.08,
                                0.36
                            )}s`;

                    }
                );

            }
        );

    }


    /* =================================================
       HERO INITIAL ANIMATION
    ================================================= */

    const heroAnimationStyle =
        document.createElement("style");

    heroAnimationStyle.textContent = `

        body.kh-page-ready
        .hero .eyebrow {

            opacity:0;

            transform:
                translateY(14px);

            animation:
                khFadeUp
                .7s
                cubic-bezier(.22,1,.36,1)
                .08s
                forwards;
        }


        body.kh-page-ready
        .hero h1 strong {

            opacity:0;

            transform:
                translateY(35px)
                scale(.985);

            animation:
                khHeroTitle
                1s
                cubic-bezier(.22,1,.36,1)
                .18s
                forwards;
        }


        body.kh-page-ready
        .hero h1 em {

            opacity:0;

            transform:
                translateY(22px);

            animation:
                khFadeUp
                .85s
                cubic-bezier(.22,1,.36,1)
                .3s
                forwards;
        }


        body.kh-page-ready
        .hero h1 small {

            opacity:0;

            transform:
                translateY(15px);

            animation:
                khFadeUp
                .7s
                cubic-bezier(.22,1,.36,1)
                .4s
                forwards;
        }


        body.kh-page-ready
        .hero .hero-tagline {

            opacity:0;

            transform:
                translateY(12px);

            animation:
                khFadeUp
                .7s
                cubic-bezier(.22,1,.36,1)
                .52s
                forwards;
        }


        body.kh-page-ready
        .hero .hero-description {

            opacity:0;

            transform:
                translateY(12px);

            animation:
                khFadeUp
                .7s
                cubic-bezier(.22,1,.36,1)
                .62s
                forwards;
        }


        body.kh-page-ready
        .hero .hero-actions {

            opacity:0;

            transform:
                translateY(12px);

            animation:
                khFadeUp
                .7s
                cubic-bezier(.22,1,.36,1)
                .72s
                forwards;
        }


        body.kh-page-ready
        .hero .hero-events {

            opacity:0;

            transform:
                translateY(12px);

            animation:
                khFadeUp
                .7s
                cubic-bezier(.22,1,.36,1)
                .82s
                forwards;
        }


        body.kh-page-ready
        .hero .hero-bottom {

            opacity:0;

            transform:
                translateY(10px);

            animation:
                khFadeUp
                .65s
                cubic-bezier(.22,1,.36,1)
                .92s
                forwards;
        }


        @keyframes khFadeUp {

            from {
                opacity:0;
                transform:
                    translateY(18px);
            }

            to {
                opacity:1;
                transform:
                    translateY(0);
            }

        }


        @keyframes khHeroTitle {

            from {
                opacity:0;

                transform:
                    translateY(35px)
                    scale(.985);
            }

            to {
                opacity:1;

                transform:
                    translateY(0)
                    scale(1);
            }

        }


        @media (prefers-reduced-motion:reduce) {

            body.kh-page-ready
            .hero .eyebrow,

            body.kh-page-ready
            .hero h1 strong,

            body.kh-page-ready
            .hero h1 em,

            body.kh-page-ready
            .hero h1 small,

            body.kh-page-ready
            .hero .hero-tagline,

            body.kh-page-ready
            .hero .hero-description,

            body.kh-page-ready
            .hero .hero-actions,

            body.kh-page-ready
            .hero .hero-events,

            body.kh-page-ready
            .hero .hero-bottom {

                opacity:1;
                transform:none;
                animation:none;

            }

        }

    `;

    document.head.appendChild(
        heroAnimationStyle
    );


    function startPageAnimation() {

        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        document.body.classList.add(
                            "kh-page-ready"
                        );

                    }
                );

            }
        );

    }


    /* =================================================
       COUNTDOWN SYSTEM
    ================================================= */

    function pad(
        number
    ) {

        return String(
            Math.max(
                0,
                number
            )
        ).padStart(
            2,
            "0"
        );

    }


    function updateCountdown(
        element
    ) {

        const targetString =
            element.dataset.countdown;

        const target =
            new Date(
                targetString
            ).getTime();

        if (
            Number.isNaN(target)
        ) {
            return;
        }


        const now =
            Date.now();

        let difference =
            target - now;


        if (difference <= 0) {

            difference = 0;

        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const days =
            Math.floor(
                totalSeconds / 86400
            );


        const hours =
            Math.floor(
                (
                    totalSeconds % 86400
                ) / 3600
            );


        const minutes =
            Math.floor(
                (
                    totalSeconds % 3600
                ) / 60
            );


        const seconds =
            totalSeconds % 60;


        const daysElement =
            element.querySelector(
                "[data-days]"
            );

        const hoursElement =
            element.querySelector(
                "[data-hours]"
            );

        const minutesElement =
            element.querySelector(
                "[data-minutes]"
            );

        const secondsElement =
            element.querySelector(
                "[data-seconds]"
            );


        if (daysElement) {
            daysElement.textContent =
                pad(days);
        }

        if (hoursElement) {
            hoursElement.textContent =
                pad(hours);
        }

        if (minutesElement) {
            minutesElement.textContent =
                pad(minutes);
        }

        if (secondsElement) {
            secondsElement.textContent =
                pad(seconds);
        }


        if (
            difference === 0
        ) {

            element.classList.add(
                "countdown-live"
            );

        }

    }


    const countdowns =
        Array.from(
            document.querySelectorAll(
                "[data-countdown]"
            )
        );


    function updateAllCountdowns() {

        countdowns.forEach(
            updateCountdown
        );

    }


    updateAllCountdowns();


    setInterval(
        updateAllCountdowns,
        1000
    );


    /* =================================================
       BRACKET TABS
    ================================================= */

    const bracketTabs =
        Array.from(
            document.querySelectorAll(
                ".bracket-tab"
            )
        );


    const bracketPanels =
        Array.from(
            document.querySelectorAll(
                "[data-bracket-panel]"
            )
        );


    bracketTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    const target =
                        tab.dataset.bracket;


                    bracketTabs.forEach(
                        item => {

                            item.classList.toggle(
                                "active",
                                item === tab
                            );

                        }
                    );


                    bracketPanels.forEach(
                        panel => {

                            panel.classList.toggle(
                                "active",
                                panel.dataset.bracketPanel ===
                                target
                            );

                        }
                    );

                }
            );

        }
    );


    /* =================================================
       MODAL SYSTEM
    ================================================= */

    const tentativeModal =
        document.getElementById(
            "tentativeModal"
        );

    const tentativeButton =
        document.getElementById(
            "tentativeButton"
        );


    const teamsModal =
        document.getElementById(
            "teamsModal"
        );

    const registeredTeamsButton =
        document.getElementById(
            "registeredTeamsButton"
        );


    function openModal(
        modal
    ) {

        if (!modal) {
            return;
        }

        modal.classList.add(
            "open"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeModal(
        modal
    ) {

        if (!modal) {
            return;
        }

        modal.classList.remove(
            "open"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !document.querySelector(
                ".modal.open"
            )
        ) {

            document.body.classList.remove(
                "modal-open"
            );

        }

    }


    if (tentativeButton) {

        tentativeButton.addEventListener(
            "click",
            () => {

                openModal(
                    tentativeModal
                );

            }
        );

    }


    if (registeredTeamsButton) {

        registeredTeamsButton.addEventListener(
            "click",
            () => {

                renderTeams(
                    "hok"
                );

                openModal(
                    teamsModal
                );

            }
        );

    }


    document.querySelectorAll(
        "[data-close-modal]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.closest(
                            ".modal"
                        )
                    );

                }
            );

        }
    );


    document.querySelectorAll(
        ".modal-backdrop"
    ).forEach(
        backdrop => {

            backdrop.addEventListener(
                "click",
                () => {

                    closeModal(
                        backdrop.closest(
                            ".modal"
                        )
                    );

                }
            );

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                document.querySelectorAll(
                    ".modal.open"
                ).forEach(
                    modal => {

                        closeModal(
                            modal
                        );

                    }
                );

                closeMenu();

            }

        }
    );


    /* =================================================
       TENTATIVE FLOW TABS
    ================================================= */

    const flowTabs =
        Array.from(
            document.querySelectorAll(
                "[data-flow-tab]"
            )
        );


    const flowPanels =
        Array.from(
            document.querySelectorAll(
                "[data-flow-panel]"
            )
        );


    flowTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    const target =
                        tab.dataset.flowTab;


                    flowTabs.forEach(
                        item => {

                            item.classList.toggle(
                                "active",
                                item === tab
                            );

                        }
                    );


                    flowPanels.forEach(
                        panel => {

                            panel.classList.toggle(
                                "active",
                                panel.dataset.flowPanel ===
                                target
                            );

                        }
                    );

                }
            );

        }
    );


    /* =================================================
       REGISTERED TEAM DATABASE
       
       IMPORTANT:
       Do not invent real registered teams.
       Add confirmed names into these arrays.
    ================================================= */

    const registeredTeams = {

        hok: [

            /*
             * Example:
             *
             * "Team Name"
             *
             * Only add officially confirmed teams.
             */

        ],

        mlbb: [

            /*
             * Example:
             *
             * "Team Name"
             *
             * Only add officially confirmed teams.
             */

        ]

    };


    const teamTabs =
        Array.from(
            document.querySelectorAll(
                "[data-team-tab]"
            )
        );


    const teamList =
        document.getElementById(
            "teamList"
        );


    function renderTeams(
        game
    ) {

        if (!teamList) {
            return;
        }


        const teams =
            registeredTeams[game] || [];


        teamList.innerHTML =
            "";


        if (!teams.length) {

            const empty =
                document.createElement(
                    "div"
                );

            empty.className =
                "team-empty";

            empty.textContent =
                "No officially confirmed registered teams have been published yet.";

            teamList.appendChild(
                empty
            );

            return;

        }


        teams.forEach(
            (
                team,
                index
            ) => {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "team-item";


                const number =
                    document.createElement(
                        "span"
                    );

                number.className =
                    "team-item-number";

                number.textContent =
                    String(
                        index + 1
                    ).padStart(
                        2,
                        "0"
                    );


                const name =
                    document.createElement(
                        "span"
                    );

                name.className =
                    "team-item-name";

                name.textContent =
                    team;


                item.appendChild(
                    number
                );

                item.appendChild(
                    name
                );


                teamList.appendChild(
                    item
                );

            }
        );

    }


    teamTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    const game =
                        tab.dataset.teamTab;


                    teamTabs.forEach(
                        item => {

                            item.classList.toggle(
                                "active",
                                item === tab
                            );

                        }
                    );


                    renderTeams(
                        game
                    );

                }
            );

        }
    );


    /* =================================================
       REGISTRATION COUNTER
    ================================================= */

    function updateRegistrationCounter() {

        const hokCount =
            registeredTeams.hok.length;

        const mlbbCount =
            registeredTeams.mlbb.length;

        const total =
            hokCount +
            mlbbCount;


        const capacity =
            64;


        const percentage =
            Math.min(
                100,
                (
                    total /
                    capacity
                ) * 100
            );


        const totalElement =
            document.getElementById(
                "registeredTotal"
            );

        const capacityElement =
            document.getElementById(
                "registeredCapacity"
            );

        const hokElement =
            document.getElementById(
                "hokRegistered"
            );

        const mlbbElement =
            document.getElementById(
                "mlbbRegistered"
            );

        const bar =
            document.getElementById(
                "registrationBar"
            );


        if (totalElement) {

            totalElement.textContent =
                total;

        }


        if (capacityElement) {

            capacityElement.textContent =
                capacity;

        }


        if (hokElement) {

            hokElement.textContent =
                hokCount;

        }


        if (mlbbElement) {

            mlbbElement.textContent =
                mlbbCount;

        }


        if (bar) {

            bar.style.width =
                `${percentage}%`;

        }

    }


    updateRegistrationCounter();


    /* =================================================
       RESIZE
    ================================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                1100
            ) {

                closeMenu();

            }

            updateProgress();

            updateActiveSection();

        }
    );


    /* =================================================
       COMBINED SCROLL HANDLER
    ================================================= */

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

                updateProgress();

                updateBackToTop();

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
            passive:true
        }
    );


    /* =================================================
       INITIALIZATION
    ================================================= */

    setupRevealObserver();

    setupCardStagger();

    updateNavbar();

    updateProgress();

    updateBackToTop();

    updateActiveSection();

    startPageAnimation();


    /* =================================================
       FINAL CONSOLE MESSAGE
    ================================================= */

    console.log(
        "%cKH ESPORTS CHAMPIONSHIP 2026",
        "font-size:18px;font-weight:800;"
    );

    console.log(
        "Master Interaction System V2 initialized."
    );


})();
