/* =====================================================
   KH ESPORTS CHAMPIONSHIP 2026
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURATION
       
       IMPORTANT:
       ONLY EDIT THIS SECTION WHEN UPDATING REGISTERED TEAMS.
    ===================================================== */

    const REGISTERED_TEAMS = [

        /*
        Example:

        {
            name: "Team Name",
            title: "MLBB"
        },

        {
            name: "Another Team",
            title: "HOK"
        }

        */

    ];

    const TOTAL_CAPACITY = 64;

    /*
       Tournament starts:
       HOK  : 20 November 2026, 8:00 AM Malaysia
       MLBB : 27 November 2026, 8:00 AM Malaysia
    */

    const HOK_DATE =
        "2026-11-20T08:00:00+08:00";

    const MLBB_DATE =
        "2026-11-27T08:00:00+08:00";


    /* =====================================================
       DOM
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

    function setActiveSection(
        sectionId
    ) {

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
                event.key === "Escape"
            ) {

                closeMenu();

                closeModal(
                    flowModal
                );

                closeModal(
                    teamsModal
                );

            }

        }
    );


    /* =====================================================
       COUNTDOWN
    ===================================================== */

    function updateCountdown(
        targetDate,
        elements
    ) {

        const now =
            Date.now();

        const target =
            new Date(
                targetDate
            ).getTime();

        let difference =
            target - now;

        if (
            Number.isNaN(target)
        ) {

            return;

        }

        if (
            difference < 0
        ) {

            difference = 0;

        }

        const totalSeconds =
            Math.floor(
                difference / 1000
            );

        const days =
            Math.floor(
                totalSeconds /
                86400
            );

        const hours =
            Math.floor(
                (
                    totalSeconds %
                    86400
                ) / 3600
            );

        const minutes =
            Math.floor(
                (
                    totalSeconds %
                    3600
                ) / 60
            );

        const seconds =
            totalSeconds %
            60;

        if (elements.days) {

            elements.days.textContent =
                String(days)
                    .padStart(2, "0");

        }

        if (elements.hours) {

            elements.hours.textContent =
                String(hours)
                    .padStart(2, "0");

        }

        if (elements.minutes) {

            elements.minutes.textContent =
                String(minutes)
                    .padStart(2, "0");

        }

        if (elements.seconds) {

            elements.seconds.textContent =
                String(seconds)
                    .padStart(2, "0");

        }

    }

    const hokCountdownElements = {

        days:
            document.getElementById(
                "hokDays"
            ),

        hours:
            document.getElementById(
                "hokHours"
            ),

        minutes:
            document.getElementById(
                "hokMinutes"
            ),

        seconds:
            document.getElementById(
                "hokSeconds"
            )

    };

    const mlbbCountdownElements = {

        days:
            document.getElementById(
                "mlbbDays"
            ),

        hours:
            document.getElementById(
                "mlbbHours"
            ),

        minutes:
            document.getElementById(
                "mlbbMinutes"
            ),

        seconds:
            document.getElementById(
                "mlbbSeconds"
            )

    };

    function updateAllCountdowns() {

        updateCountdown(
            HOK_DATE,
            hokCountdownElements
        );

        updateCountdown(
            MLBB_DATE,
            mlbbCountdownElements
        );

    }

    updateAllCountdowns();

    setInterval(
        updateAllCountdowns,
        1000
    );


    /* =====================================================
       REVEAL ANIMATION
       REPEATS WHEN ENTERING / LEAVING VIEWPORT
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
       MODAL SYSTEM
    ===================================================== */

    const flowButton =
        document.getElementById(
            "flowButton"
        );

    const flowModal =
        document.getElementById(
            "flowModal"
        );

    const flowModalClose =
        document.getElementById(
            "flowModalClose"
        );

    const teamsButton =
        document.getElementById(
            "teamsButton"
        );

    const teamsModal =
        document.getElementById(
            "teamsModal"
        );

    const teamsModalClose =
        document.getElementById(
            "teamsModalClose"
        );


    function openModal(
        modal
    ) {

        if (!modal) return;

        modal.classList.add(
            "open"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );

    }

    function closeModal(
        modal
    ) {

        if (!modal) return;

        modal.classList.remove(
            "open"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !flowModal.classList.contains(
                "open"
            ) &&
            !teamsModal.classList.contains(
                "open"
            )
        ) {

            document.body.classList.remove(
                "menu-open"
            );

        }

    }


    /* =====================================================
       FLOW MODAL
    ===================================================== */

    if (flowButton) {

        flowButton.addEventListener(
            "click",
            () => {

                openModal(
                    flowModal
                );

            }
        );

    }

    if (flowModalClose) {

        flowModalClose.addEventListener(
            "click",
            () => {

                closeModal(
                    flowModal
                );

            }
        );

    }


    /* Close by clicking overlay */

    if (flowModal) {

        flowModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    flowModal
                ) {

                    closeModal(
                        flowModal
                    );

                }

            }
        );

    }


    /* =====================================================
       FLOW TABS
    ===================================================== */

    const flowTabs =
        document.querySelectorAll(
            ".flow-tab"
        );

    const flowPanels =
        document.querySelectorAll(
            ".flow-panel"
        );

    flowTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    const selected =
                        tab.dataset.flowTitle;

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
                                selected
                            );

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       REGISTERED TEAMS
    ===================================================== */

    const registeredCount =
        document.getElementById(
            "registeredCount"
        );

    const registeredTotal =
        document.getElementById(
            "registeredTotal"
        );

    const registrationPercentage =
        document.getElementById(
            "registrationPercentage"
        );

    const registrationBar =
        document.getElementById(
            "registrationBar"
        );

    const modalRegisteredCount =
        document.getElementById(
            "modalRegisteredCount"
        );

    const modalAvailableCount =
        document.getElementById(
            "modalAvailableCount"
        );

    const registeredTeamList =
        document.getElementById(
            "registeredTeamList"
        );


    function updateRegisteredTeams() {

        const count =
            REGISTERED_TEAMS.length;

        const available =
            Math.max(
                0,
                TOTAL_CAPACITY -
                count
            );

        const percentage =
            Math.min(
                100,
                (
                    count /
                    TOTAL_CAPACITY
                ) * 100
            );

        if (registeredCount) {

            registeredCount.textContent =
                count;

        }

        if (registeredTotal) {

            registeredTotal.textContent =
                TOTAL_CAPACITY;

        }

        if (registrationPercentage) {

            registrationPercentage.textContent =
                Math.round(
                    percentage
                ) + "%";

        }

        if (registrationBar) {

            requestAnimationFrame(
                () => {

                    registrationBar.style.width =
                        percentage + "%";

                }
            );

        }

        if (modalRegisteredCount) {

            modalRegisteredCount.textContent =
                count;

        }

        if (modalAvailableCount) {

            modalAvailableCount.textContent =
                available;

        }

        renderRegisteredTeams();

    }


    function renderRegisteredTeams() {

        if (!registeredTeamList) {
            return;
        }

        registeredTeamList.innerHTML = "";

        if (
            REGISTERED_TEAMS.length === 0
        ) {

            const empty =
                document.createElement(
                    "div"
                );

            empty.className =
                "empty-teams";

            empty.innerHTML = `
                <strong>NO TEAMS YET</strong>
                <p>
                    Registered teams will appear here
                    once registration is confirmed.
                </p>
            `;

            registeredTeamList.appendChild(
                empty
            );

            return;

        }

        REGISTERED_TEAMS.forEach(
            (
                team,
                index
            ) => {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "registered-team";

                const number =
                    document.createElement(
                        "span"
                    );

                number.className =
                    "registered-team-number";

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
                    "registered-team-name";

                if (
                    typeof team ===
                    "string"
                ) {

                    name.textContent =
                        team;

                } else {

                    name.textContent =
                        team.name || "Unnamed Team";

                }

                item.appendChild(
                    number
                );

                item.appendChild(
                    name
                );

                registeredTeamList.appendChild(
                    item
                );

            }
        );

    }

    updateRegisteredTeams();


    /* =====================================================
       REGISTERED TEAM MODAL
    ===================================================== */

    if (teamsButton) {

        teamsButton.addEventListener(
            "click",
            () => {

                updateRegisteredTeams();

                openModal(
                    teamsModal
                );

            }
        );

    }

    if (teamsModalClose) {

        teamsModalClose.addEventListener(
            "click",
            () => {

                closeModal(
                    teamsModal
                );

            }
        );

    }

    if (teamsModal) {

        teamsModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    teamsModal
                ) {

                    closeModal(
                        teamsModal
                    );

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

            if (
                !scrollTicking
            ) {

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
