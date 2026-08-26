/* =========================================================
   KH ESPORTS CHAMPIONSHIP 2026
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


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

    const flowDetailButton =
        document.getElementById("flowDetailButton");

    const flowModal =
        document.getElementById("flowModal");

    const teamModal =
        document.getElementById("teamModal");

    const teamModalList =
        document.getElementById("teamModalList");

    const teamModalTitle =
        document.getElementById("teamModalTitle");

    const teamModalSubtitle =
        document.getElementById("teamModalSubtitle");

    const desktopLinks =
        Array.from(
            document.querySelectorAll(".nav-links a")
        );

    const mobileLinks =
        Array.from(
            document.querySelectorAll(".mobile-links a")
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

        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        if (!scrollProgress) return;

        const scrollTop =
            window.scrollY;

        const scrollableHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (scrollableHeight <= 0) {

            scrollProgress.style.width =
                "100%";

            return;
        }

        const progress =
            (scrollTop / scrollableHeight) * 100;

        scrollProgress.style.width =
            Math.min(
                100,
                Math.max(0, progress)
            ) + "%";

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function updateBackToTop() {

        if (!backToTop) return;

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

    function setActiveSection(sectionId) {

        desktopLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                "#" + sectionId
            );

        });

        mobileLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                "#" + sectionId
            );

        });

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
            100;

        let current =
            sections[0].id;

        for (const section of sections) {

            const sectionTop =
                section.getBoundingClientRect().top +
                window.scrollY;

            if (
                activationPoint >= sectionTop
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

        mobileMenu.classList.add("open");

        menuBackdrop.classList.add("open");

        menuToggle.classList.add("open");

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

        mobileMenu.classList.remove("open");

        menuBackdrop.classList.remove("open");

        menuToggle.classList.remove("open");

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
                    mobileMenu.classList.contains("open")
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
       INTERNAL NAVIGATION
    ===================================================== */

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


    desktopLinks.forEach(link => {

        link.addEventListener(
            "click",
            handleNavigationClick
        );

    });


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            handleNavigationClick
        );

    });


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

                closeFlowModal();

                closeTeamModal();

            }

        }
    );


    /* =====================================================
       COUNTDOWN
    ===================================================== */

    const countdowns =
        Array.from(
            document.querySelectorAll(
                "[data-countdown]"
            )
        );


    function pad(number) {

        return String(number)
            .padStart(2, "0");

    }


    function updateCountdown(element) {

        const targetDate =
            new Date(
                element.dataset.countdown
            ).getTime();

        const now =
            Date.now();

        const difference =
            targetDate - now;


        const days =
            element.querySelector(
                '[data-unit="days"]'
            );

        const hours =
            element.querySelector(
                '[data-unit="hours"]'
            );

        const minutes =
            element.querySelector(
                '[data-unit="minutes"]'
            );

        const seconds =
            element.querySelector(
                '[data-unit="seconds"]'
            );


        if (difference <= 0) {

            if (days) days.textContent = "00";
            if (hours) hours.textContent = "00";
            if (minutes) minutes.textContent = "00";
            if (seconds) seconds.textContent = "00";

            return;

        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );

        const dayValue =
            Math.floor(
                totalSeconds / 86400
            );

        const hourValue =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );

        const minuteValue =
            Math.floor(
                (totalSeconds % 3600) / 60
            );

        const secondValue =
            totalSeconds % 60;


        if (days) {
            days.textContent =
                String(dayValue);
        }

        if (hours) {
            hours.textContent =
                pad(hourValue);
        }

        if (minutes) {
            minutes.textContent =
                pad(minuteValue);
        }

        if (seconds) {
            seconds.textContent =
                pad(secondValue);
        }

    }


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


    /* =====================================================
       REVEAL ANIMATION
       Replays when entering viewport again.
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
       BRACKET TITLE SWITCHER
    ===================================================== */

    const bracketTabs =
        Array.from(
            document.querySelectorAll(
                ".bracket-tab"
            )
        );

    const bracketPanels =
        Array.from(
            document.querySelectorAll(
                ".bracket-panel"
            )
        );


    bracketTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    const selected =
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
                                panel.id ===
                                "bracket-" +
                                selected
                            );

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       BRACKET ACCORDIONS
       DEFAULT = CLOSED
    ===================================================== */

    const accordionHeaders =
        document.querySelectorAll(
            ".accordion-header"
        );


    accordionHeaders.forEach(
        header => {

            header.setAttribute(
                "aria-expanded",
                "false"
            );


            header.addEventListener(
                "click",
                () => {

                    const accordion =
                        header.closest(
                            ".bracket-accordion"
                        );

                    if (!accordion) {
                        return;
                    }


                    const isOpen =
                        accordion.classList.contains(
                            "open"
                        );


                    accordion.classList.toggle(
                        "open",
                        !isOpen
                    );


                    header.setAttribute(
                        "aria-expanded",
                        String(!isOpen)
                    );

                }
            );

        }
    );


    /* =====================================================
       REGISTERED TEAM TABS
    ===================================================== */

    const registeredTabs =
        Array.from(
            document.querySelectorAll(
                ".registered-tab"
            )
        );

    const teamListPanels =
        Array.from(
            document.querySelectorAll(
                ".team-list-panel"
            )
        );


    registeredTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    const selected =
                        tab.dataset.teamList;


                    registeredTabs.forEach(
                        item => {

                            item.classList.toggle(
                                "active",
                                item === tab
                            );

                        }
                    );


                    teamListPanels.forEach(
                        panel => {

                            panel.classList.toggle(
                                "active",
                                panel.id ===
                                "team-list-" +
                                selected
                            );

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       REGISTERED TEAM DATA
       
       Replace the empty arrays with real teams later.
       Example:
       "TEAM NAME"
    ===================================================== */

    const registeredTeams = {

        hok: [

            // "Team Name 01",
            // "Team Name 02"

        ],

        mlbb: [

            // "Team Name 01",
            // "Team Name 02"

        ]

    };


    /* =====================================================
       UPDATE REGISTERED TEAM COUNTERS
    ===================================================== */

    function updateRegisteredCounters() {

        const hokCount =
            registeredTeams.hok.length;

        const mlbbCount =
            registeredTeams.mlbb.length;


        const hokPanel =
            document.getElementById(
                "team-list-hok"
            );

        const mlbbPanel =
            document.getElementById(
                "team-list-mlbb"
            );


        if (hokPanel) {

            const strong =
                hokPanel.querySelector(
                    ".team-progress-top strong"
                );

            const bar =
                hokPanel.querySelector(
                    ".team-progress-bar"
                );

            if (strong) {

                strong.textContent =
                    `${hokCount} / 32 TEAMS`;

            }

            if (bar) {

                bar.style.width =
                    `${Math.min(
                        100,
                        (hokCount / 32) * 100
                    )}%`;

            }

        }


        if (mlbbPanel) {

            const strong =
                mlbbPanel.querySelector(
                    ".team-progress-top strong"
                );

            const bar =
                mlbbPanel.querySelector(
                    ".team-progress-bar"
                );

            if (strong) {

                strong.textContent =
                    `${mlbbCount} / 32 TEAMS`;

            }

            if (bar) {

                bar.style.width =
                    `${Math.min(
                        100,
                        (mlbbCount / 32) * 100
                    )}%`;

            }

        }

    }


    updateRegisteredCounters();


    /* =====================================================
       TEAM MODAL
    ===================================================== */

    function openTeamModal(type) {

        if (!teamModal) {
            return;
        }


        const teams =
            registeredTeams[type] || [];


        const title =
            type === "hok"
                ? "HONOR OF KINGS"
                : "MOBILE LEGENDS";


        if (teamModalSubtitle) {

            teamModalSubtitle.textContent =
                title;

        }


        if (teamModalList) {

            teamModalList.innerHTML = "";


            if (!teams.length) {

                const empty =
                    document.createElement(
                        "div"
                    );

                empty.className =
                    "team-entry";

                empty.style.gridColumn =
                    "1 / -1";

                empty.textContent =
                    "No teams have been registered yet.";

                teamModalList.appendChild(
                    empty
                );

            } else {

                teams.forEach(
                    (team, index) => {

                        const entry =
                            document.createElement(
                                "div"
                            );

                        entry.className =
                            "team-entry";


                        const number =
                            document.createElement(
                                "span"
                            );

                        number.textContent =
                            String(
                                index + 1
                            ).padStart(
                                2,
                                "0"
                            );


                        const name =
                            document.createElement(
                                "strong"
                            );

                        name.textContent =
                            team;


                        entry.appendChild(
                            number
                        );

                        entry.appendChild(
                            name
                        );


                        teamModalList.appendChild(
                            entry
                        );

                    }
                );

            }

        }


        teamModal.classList.add(
            "open"
        );

        teamModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeTeamModal() {

        if (!teamModal) {
            return;
        }

        teamModal.classList.remove(
            "open"
        );

        teamModal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !flowModal ||
            !flowModal.classList.contains(
                "open"
            )
        ) {

            document.body.classList.remove(
                "menu-open"
            );

        }

    }


    document.querySelectorAll(
        "[data-team-modal]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    openTeamModal(
                        button.dataset.teamModal
                    );

                }
            );

        }
    );


    document.querySelectorAll(
        "[data-close-team-modal]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                closeTeamModal
            );

        }
    );


    if (teamModal) {

        teamModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    teamModal
                ) {

                    closeTeamModal();

                }

            }
        );

    }


    /* =====================================================
       TENTATIVE FLOW MODAL
    ===================================================== */

    function openFlowModal() {

        if (!flowModal) {
            return;
        }

        flowModal.classList.add(
            "open"
        );

        flowModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeFlowModal() {

        if (!flowModal) {
            return;
        }

        flowModal.classList.remove(
            "open"
        );

        flowModal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !teamModal ||
            !teamModal.classList.contains(
                "open"
            )
        ) {

            document.body.classList.remove(
                "menu-open"
            );

        }

    }


    if (flowDetailButton) {

        flowDetailButton.addEventListener(
            "click",
            openFlowModal
        );

    }


    document.querySelectorAll(
        "[data-close-modal]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                closeFlowModal
            );

        }
    );


    if (flowModal) {

        flowModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    flowModal
                ) {

                    closeFlowModal();

                }

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
                window.innerWidth > 1100
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
