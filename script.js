/* =====================================================
   KH ESPORTS CHAMPIONSHIP 2026
   MASTER JAVASCRIPT
===================================================== */

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
            document.querySelectorAll("main section[id]")
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

        const scrollable =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (scrollable <= 0) {

            scrollProgress.style.width =
                "100%";

            return;

        }

        const progress =
            (scrollTop / scrollable) * 100;

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

        [...desktopLinks, ...mobileLinks]
            .forEach(link => {

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

            const top =
                section.getBoundingClientRect().top +
                window.scrollY;

            if (activationPoint >= top) {

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
       SMOOTH NAVIGATION
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
       ESCAPE KEY
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

    const countdownTargets = {

        hok: {
            date:
                "2026-11-20T08:00:00+08:00",

            element:
                document.getElementById(
                    "hokCountdown"
                )
        },

        mlbb: {
            date:
                "2026-11-27T08:00:00+08:00",

            element:
                document.getElementById(
                    "mlbbCountdown"
                )

        }

    };


    function pad(number) {

        return String(number)
            .padStart(2, "0");

    }


    function updateCountdown(
        target
    ) {

        if (
            !target.element
        ) {
            return;
        }

        const targetDate =
            new Date(target.date)
                .getTime();

        const now =
            Date.now();

        let difference =
            targetDate -
            now;

        if (difference < 0) {
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
                (totalSeconds % 86400) /
                3600
            );

        const minutes =
            Math.floor(
                (totalSeconds % 3600) /
                60
            );

        const seconds =
            totalSeconds % 60;


        const daysElement =
            target.element.querySelector(
                "[data-days]"
            );

        const hoursElement =
            target.element.querySelector(
                "[data-hours]"
            );

        const minutesElement =
            target.element.querySelector(
                "[data-minutes]"
            );

        const secondsElement =
            target.element.querySelector(
                "[data-seconds]"
            );


        if (daysElement) {

            daysElement.textContent =
                String(days)
                    .padStart(3, "0");

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

    }


    function updateAllCountdowns() {

        Object.values(
            countdownTargets
        ).forEach(
            updateCountdown
        );

    }


    updateAllCountdowns();

    setInterval(
        updateAllCountdowns,
        1000
    );


    /* =====================================================
       BRACKET TITLE TABS
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


    function activateBracket(
        bracket
    ) {

        bracketTabs.forEach(
            tab => {

                tab.classList.toggle(
                    "active",
                    tab.dataset.bracket ===
                    bracket
                );

            }
        );


        bracketPanels.forEach(
            panel => {

                panel.classList.toggle(
                    "active",
                    panel.id ===
                    bracket + "Bracket"
                );

            }
        );

    }


    bracketTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    activateBracket(
                        tab.dataset.bracket
                    );

                }
            );

        }
    );


    /* =====================================================
       ACCORDION
       
       IMPORTANT:
       Default = CLOSED
       Click = OPEN
       Click again = CLOSED
    ===================================================== */

    const accordions =
        Array.from(
            document.querySelectorAll(
                ".bracket-accordion"
            )
        );


    accordions.forEach(
        accordion => {

            const trigger =
                accordion.querySelector(
                    ".accordion-trigger"
                );

            if (!trigger) return;


            trigger.setAttribute(
                "aria-expanded",
                "false"
            );


            trigger.addEventListener(
                "click",
                () => {

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

                    } else {

                        accordion.classList.add(
                            "open"
                        );

                        trigger.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       TENTATIVE FLOW MODAL
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


    function openFlowModal() {

        if (!flowModal) return;

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

        if (!flowModal) return;

        flowModal.classList.remove(
            "open"
        );

        flowModal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !teamModal ||
            !teamModal.classList.contains("open")
        ) {

            document.body.classList.remove(
                "menu-open"
            );

        }

    }


    if (flowButton) {

        flowButton.addEventListener(
            "click",
            openFlowModal
        );

    }


    if (flowModalClose) {

        flowModalClose.addEventListener(
            "click",
            closeFlowModal
        );

    }


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
       REGISTERED TEAMS
       
       EDIT THESE ARRAYS WHEN TEAMS REGISTER.
       Maximum = 32 per title.
    ===================================================== */

    const registeredTeams = {

        hok: [

            // Example:
            // "Team Name 01",
            // "Team Name 02"

        ],

        mlbb: [

            // Example:
            // "Team Name 01",
            // "Team Name 02"

        ]

    };


    const teamModal =
        document.getElementById(
            "teamModal"
        );

    const teamModalClose =
        document.getElementById(
            "teamModalClose"
        );

    const teamList =
        document.getElementById(
            "teamList"
        );

    const teamModalGame =
        document.getElementById(
            "teamModalGame"
        );

    const teamModalCount =
        document.getElementById(
            "teamModalCount"
        );


    function renderTeamList(
        game
    ) {

        if (!teamList) return;

        const teams =
            registeredTeams[game] || [];


        teamList.innerHTML =
            "";


        if (!teams.length) {

            teamList.innerHTML = `

                <div class="empty-team-state">

                    <span>
                        NO TEAM DATA YET
                    </span>

                    <p>
                        Registered team names will appear here
                        once they are added by the organiser.
                    </p>

                </div>

            `;

        } else {

            teams
                .slice(0,32)
                .forEach(
                    (team,index) => {

                        const item =
                            document.createElement(
                                "div"
                            );

                        item.className =
                            "team-list-item";

                        item.innerHTML = `

                            <span>
                                ${String(index + 1)
                                    .padStart(2,"0")}
                            </span>

                            <strong>
                                ${escapeHTML(team)}
                            </strong>

                        `;

                        teamList.appendChild(
                            item
                        );

                    }
                );

        }


        if (teamModalCount) {

            teamModalCount.textContent =
                `${Math.min(teams.length,32)} / 32`;

        }


        if (teamModalGame) {

            teamModalGame.textContent =
                game === "hok"
                    ? "HONOR OF KINGS"
                    : "MOBILE LEGENDS";

        }


        updateTeamProgress(
            game
        );

    }


    function updateTeamProgress(
        game
    ) {

        const teams =
            registeredTeams[game] || [];

        const progress =
            Math.min(
                100,
                (teams.length / 32) * 100
            );


        const element =
            document.getElementById(
                game === "hok"
                    ? "hokTeamProgress"
                    : "mlbbTeamProgress"
            );


        if (element) {

            element.style.width =
                progress + "%";

        }

    }


    function openTeamModal(
        game
    ) {

        if (!teamModal) return;

        renderTeamList(
            game
        );

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

        if (!teamModal) return;

        teamModal.classList.remove(
            "open"
        );

        teamModal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !flowModal ||
            !flowModal.classList.contains("open")
        ) {

            document.body.classList.remove(
                "menu-open"
            );

        }

    }


    document
        .querySelectorAll(
            "[data-team-modal]"
        )
        .forEach(
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


    if (teamModalClose) {

        teamModalClose.addEventListener(
            "click",
            closeTeamModal
        );

    }


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


    function escapeHTML(
        value
    ) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       INITIAL TEAM COUNTERS
    ===================================================== */

    updateTeamProgress(
        "hok"
    );

    updateTeamProgress(
        "mlbb"
    );


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
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
                    threshold:
                        0.12,

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
            passive:
                true
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
