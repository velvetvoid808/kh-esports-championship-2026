/* =====================================================
   KH ESPORTS CHAMPIONSHIP 2026
   MAIN JAVASCRIPT
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

    const tentativeModal =
        document.getElementById("tentativeModal");

    const teamsModal =
        document.getElementById("teamsModal");

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
       REGISTERED TEAM DATA
       
       IMPORTANT:
       Replace the arrays below with the actual
       registered team names when registration data
       becomes available.
    ====================================================== */

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


    /* =====================================================
       NAVBAR
    ====================================================== */

    function updateNavbar() {

        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }


    /* =====================================================
       SCROLL PROGRESS
    ====================================================== */

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
    ====================================================== */

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
    ====================================================== */

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
            80;

        let current =
            sections[0].id;

        for (const section of sections) {

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
    ====================================================== */

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
    ====================================================== */

    function handleNavigationClick(event) {

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
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeMenu();

                closeAllModals();

            }

        }
    );


    /* =====================================================
       MODAL SYSTEM
    ====================================================== */

    function openModal(modal) {

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


    function closeModal(modal) {

        if (!modal) return;

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
                "menu-open"
            );

        }

    }


    function closeAllModals() {

        document
            .querySelectorAll(
                ".modal.open"
            )
            .forEach(modal => {

                closeModal(modal);

            });

    }


    document
        .querySelectorAll(
            "[data-close-modal]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                closeAllModals
            );

        });


    /* =====================================================
       TENTATIVE FLOW MODAL
    ====================================================== */

    const openTentative =
        document.getElementById(
            "openTentative"
        );

    if (openTentative) {

        openTentative.addEventListener(
            "click",
            () => {

                openModal(
                    tentativeModal
                );

            }
        );

    }


    /* =====================================================
       FLOW TABS
    ====================================================== */

    const flowTabs =
        document.querySelectorAll(
            "[data-flow-tab]"
        );

    const flowContents =
        document.querySelectorAll(
            "[data-flow-content]"
        );


    flowTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                const target =
                    tab.getAttribute(
                        "data-flow-tab"
                    );


                flowTabs.forEach(
                    item => {

                        item.classList.toggle(
                            "active",
                            item === tab
                        );

                    }
                );


                flowContents.forEach(
                    content => {

                        content.classList.toggle(

                            "active",

                            content.getAttribute(
                                "data-flow-content"
                            ) === target

                        );

                    }
                );

            }
        );

    });


    /* =====================================================
       COUNTDOWN SYSTEM
       
       HOK:
       20 November 2026
       
       MLBB:
       27 November 2026
       
       Time is set to 08:00 local time.
    ====================================================== */

    const countdownTargets = {

        hok:
            new Date(
                "2026-11-20T08:00:00+08:00"
            ).getTime(),

        mlbb:
            new Date(
                "2026-11-27T08:00:00+08:00"
            ).getTime()

    };


    function updateCountdown(
        type,
        ids
    ) {

        const target =
            countdownTargets[type];

        const now =
            Date.now();

        let difference =
            target - now;


        if (difference <= 0) {

            ids.days.textContent =
                "00";

            ids.hours.textContent =
                "00";

            ids.minutes.textContent =
                "00";

            ids.seconds.textContent =
                "00";

            return;

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


        ids.days.textContent =
            String(days).padStart(
                2,
                "0"
            );

        ids.hours.textContent =
            String(hours).padStart(
                2,
                "0"
            );

        ids.minutes.textContent =
            String(minutes).padStart(
                2,
                "0"
            );

        ids.seconds.textContent =
            String(seconds).padStart(
                2,
                "0"
            );

    }


    function updateAllCountdowns() {

        updateCountdown(
            "hok",
            {
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
            }
        );


        updateCountdown(
            "mlbb",
            {
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
            }
        );

    }


    updateAllCountdowns();

    setInterval(
        updateAllCountdowns,
        1000
    );


    /* =====================================================
       REGISTERED TEAM COUNTS
    ====================================================== */

    function updateTeamCounts() {

        const hokCount =
            registeredTeams.hok.length;

        const mlbbCount =
            registeredTeams.mlbb.length;


        const hokCountElement =
            document.getElementById(
                "hokTeamCount"
            );

        const mlbbCountElement =
            document.getElementById(
                "mlbbTeamCount"
            );


        if (hokCountElement) {

            hokCountElement.textContent =
                hokCount;

        }


        if (mlbbCountElement) {

            mlbbCountElement.textContent =
                mlbbCount;

        }


        const hokProgress =
            document.getElementById(
                "hokProgress"
            );

        const mlbbProgress =
            document.getElementById(
                "mlbbProgress"
            );


        if (hokProgress) {

            hokProgress.style.width =
                (
                    Math.min(
                        hokCount,
                        32
                    ) / 32 * 100
                ) + "%";

        }


        if (mlbbProgress) {

            mlbbProgress.style.width =
                (
                    Math.min(
                        mlbbCount,
                        32
                    ) / 32 * 100
                ) + "%";

        }

    }


    updateTeamCounts();


    /* =====================================================
       REGISTERED TEAM MODAL
    ====================================================== */

    const teamModalGame =
        document.getElementById(
            "teamModalGame"
        );

    const teamModalCount =
        document.getElementById(
            "teamModalCount"
        );

    const registeredTeamList =
        document.getElementById(
            "registeredTeamList"
        );


    function renderRegisteredTeams(
        type
    ) {

        if (
            !registeredTeamList ||
            !teamModalGame ||
            !teamModalCount
        ) {
            return;
        }


        const teams =
            registeredTeams[type] || [];


        const gameName =
            type === "hok"
                ? "HONOR OF KINGS"
                : "MOBILE LEGENDS";


        teamModalGame.textContent =
            gameName;


        teamModalCount.textContent =
            `${teams.length} / 32`;


        registeredTeamList.innerHTML =
            "";


        if (!teams.length) {

            const empty =
                document.createElement(
                    "div"
                );

            empty.className =
                "team-list-empty";


            const strong =
                document.createElement(
                    "strong"
                );

            strong.textContent =
                "NO TEAMS DISPLAYED YET";


            const span =
                document.createElement(
                    "span"
                );

            span.textContent =
                "Registered team information will appear here.";


            empty.appendChild(
                strong
            );

            empty.appendChild(
                span
            );


            registeredTeamList.appendChild(
                empty
            );

            return;
        }


        teams.forEach(
            (team, index) => {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "team-list-item";


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


    document
        .querySelectorAll(
            "[data-team-modal]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const type =
                        button.getAttribute(
                            "data-team-modal"
                        );


                    renderRegisteredTeams(
                        type
                    );


                    openModal(
                        teamsModal
                    );

                }
            );

        });


    /* =====================================================
       RESIZE
    ====================================================== */

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
    ====================================================== */

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
    ====================================================== */

    window.addEventListener(
        "popstate",
        () => {

            updateActiveNavigation();

        }
    );


    /* =====================================================
       REVEAL ANIMATIONS
       
       Animation repeats whenever an element leaves
       and re-enters the viewport.
    ====================================================== */

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
       INITIAL STATE
    ====================================================== */

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
