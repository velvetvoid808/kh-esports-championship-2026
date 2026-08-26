/* =====================================================
   KH ESPORTS CHAMPIONSHIP 2026
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

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
                ".mobile-links a"
            )
        );

    const sections =
        Array.from(
            document.querySelectorAll(
                "main section[id]"
            )
        );


    /* =================================================
       REGISTERED TEAM DATA

       IMPORTANT:
       Replace the empty arrays below with the REAL
       registered team names.

       Example:

       const HOK_TEAMS = [
           "Team Alpha",
           "Team Bravo"
       ];

       Maximum: 32 teams per title.
    ================================================= */

    const HOK_TEAMS = [

        // "Team Name 01",
        // "Team Name 02",
        // "Team Name 03"

    ];


    const MLBB_TEAMS = [

        // "Team Name 01",
        // "Team Name 02",
        // "Team Name 03"

    ];


    /* =================================================
       NAVBAR SCROLL
    ================================================= */

    function updateNavbar() {

        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }


    /* =================================================
       SCROLL PROGRESS
    ================================================= */

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
                Math.max(
                    0,
                    progress
                )
            ) + "%";

    }


    /* =================================================
       BACK TO TOP
    ================================================= */

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

                    behavior:
                        "smooth"

                });

            }
        );

    }


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    function setActiveSection(
        sectionId
    ) {

        desktopLinks.forEach(
            link => {

                link.classList.toggle(
                    "active",

                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + sectionId
                );

            }
        );

        mobileLinks.forEach(
            link => {

                link.classList.toggle(
                    "active",

                    link.getAttribute(
                        "href"
                    ) ===
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
            100;

        let current =
            sections[0].id;

        for (
            const section of sections
        ) {

            const sectionTop =
                section
                    .getBoundingClientRect()
                    .top +
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


    /* =================================================
       INTERNAL NAVIGATION
    ================================================= */

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
            target
                .getBoundingClientRect()
                .top +
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


    /* =================================================
       ESCAPE KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeMenu();

                closeModal(
                    tentativeModal
                );

                closeModal(
                    teamModal
                );

            }

        }
    );


    /* =================================================
       REPEATING REVEAL ANIMATION
    ================================================= */

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


    /* =================================================
       COUNTDOWN
    ================================================= */

    /*
       Dates use Malaysia local time.
       The exact start times can be changed here later.

       HOK:
       20 November 2026, 8:00 AM

       MLBB:
       27 November 2026, 8:00 AM
    */

    const HOK_DATE =
        new Date(
            "2026-11-20T08:00:00+08:00"
        ).getTime();

    const MLBB_DATE =
        new Date(
            "2026-11-27T08:00:00+08:00"
        ).getTime();


    function updateCountdown(
        targetDate,
        prefix
    ) {

        const now =
            Date.now();

        let difference =
            targetDate -
            now;

        if (difference < 0) {

            difference = 0;

        }

        const days =
            Math.floor(
                difference /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );

        const hours =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                ) /
                (
                    1000 *
                    60 *
                    60
                )
            );

        const minutes =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60 *
                        60
                    )
                ) /
                (
                    1000 *
                    60
                )
            );

        const seconds =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60
                    )
                ) /
                1000
            );


        const dayElement =
            document.getElementById(
                prefix + "Days"
            );

        const hourElement =
            document.getElementById(
                prefix + "Hours"
            );

        const minuteElement =
            document.getElementById(
                prefix + "Minutes"
            );

        const secondElement =
            document.getElementById(
                prefix + "Seconds"
            );


        if (dayElement) {

            dayElement.textContent =
                String(days);

        }

        if (hourElement) {

            hourElement.textContent =
                String(hours)
                    .padStart(
                        2,
                        "0"
                    );

        }

        if (minuteElement) {

            minuteElement.textContent =
                String(minutes)
                    .padStart(
                        2,
                        "0"
                    );

        }

        if (secondElement) {

            secondElement.textContent =
                String(seconds)
                    .padStart(
                        2,
                        "0"
                    );

        }

    }


    function updateAllCountdowns() {

        updateCountdown(
            HOK_DATE,
            "hok"
        );

        updateCountdown(
            MLBB_DATE,
            "mlbb"
        );

    }


    updateAllCountdowns();


    setInterval(
        updateAllCountdowns,
        1000
    );


    /* =================================================
       GROUP STAGE GENERATOR
    ================================================= */

    function createGroups(
        containerId,
        teams
    ) {

        const container =
            document.getElementById(
                containerId
            );

        if (!container) {

            return;

        }

        container.innerHTML = "";


        for (
            let groupIndex = 0;
            groupIndex < 8;
            groupIndex++
        ) {

            const groupCard =
                document.createElement(
                    "article"
                );

            groupCard.className =
                "group-card reveal";


            const groupHeader =
                document.createElement(
                    "div"
                );

            groupHeader.className =
                "group-header";


            const groupName =
                document.createElement(
                    "strong"
                );

            groupName.textContent =
                "GROUP " +
                String.fromCharCode(
                    65 + groupIndex
                );


            const groupFormat =
                document.createElement(
                    "span"
                );

            groupFormat.textContent =
                "4 TEAMS";


            groupHeader.appendChild(
                groupName
            );

            groupHeader.appendChild(
                groupFormat
            );


            const teamList =
                document.createElement(
                    "div"
                );

            teamList.className =
                "group-team-list";


            for (
                let teamIndex = 0;
                teamIndex < 4;
                teamIndex++
            ) {

                const team =
                    document.createElement(
                        "div"
                    );

                team.className =
                    "group-team";

                team.setAttribute(
                    "contenteditable",
                    "true"
                );

                team.setAttribute(
                    "spellcheck",
                    "false"
                );

                const overallIndex =
                    groupIndex * 4 +
                    teamIndex;

                if (
                    teams[
                        overallIndex
                    ]
                ) {

                    team.textContent =
                        teams[
                            overallIndex
                        ];

                } else {

                    team.textContent =
                        "TEAM " +
                        String(
                            overallIndex + 1
                        );

                }

                teamList.appendChild(
                    team
                );

            }


            groupCard.appendChild(
                groupHeader
            );

            groupCard.appendChild(
                teamList
            );

            container.appendChild(
                groupCard
            );

        }


        /*
           Make generated elements visible
           immediately if they are already in view.
        */

        requestAnimationFrame(
            () => {

                const generated =
                    container.querySelectorAll(
                        ".reveal"
                    );

                generated.forEach(
                    element => {

                        element.classList.add(
                            "reveal-visible"
                        );

                    }
                );

            }
        );

    }


    createGroups(
        "hokGroups",
        HOK_TEAMS
    );

    createGroups(
        "mlbbGroups",
        MLBB_TEAMS
    );


    /* =================================================
       REGISTERED TEAM COUNTERS
    ================================================= */

    function updateRegisteredCounter(
        teams,
        countId,
        barId
    ) {

        const countElement =
            document.getElementById(
                countId
            );

        const barElement =
            document.getElementById(
                barId
            );

        const count =
            Math.min(
                teams.length,
                32
            );

        const percentage =
            (
                count /
                32
            ) * 100;


        if (countElement) {

            countElement.textContent =
                count;

        }


        if (barElement) {

            barElement.style.width =
                percentage + "%";

        }

    }


    updateRegisteredCounter(
        HOK_TEAMS,
        "hokRegisteredCount",
        "hokRegisteredBar"
    );


    updateRegisteredCounter(
        MLBB_TEAMS,
        "mlbbRegisteredCount",
        "mlbbRegisteredBar"
    );


    /* =================================================
       MODALS
    ================================================= */

    const tentativeModal =
        document.getElementById(
            "tentativeModal"
        );

    const teamModal =
        document.getElementById(
            "teamModal"
        );

    const openTentativeFlow =
        document.getElementById(
            "openTentativeFlow"
        );

    const teamList =
        document.getElementById(
            "teamList"
        );

    const teamModalTitle =
        document.getElementById(
            "teamModalTitle"
        );

    const teamModalSubtitle =
        document.getElementById(
            "teamModalSubtitle"
        );

    const teamModalKicker =
        document.getElementById(
            "teamModalKicker"
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

        /*
           Only remove body lock if neither
           modal nor mobile menu is open.
        */

        const anotherModalOpen =
            document.querySelector(
                ".modal.open"
            );

        const menuOpen =
            mobileMenu &&
            mobileMenu.classList.contains(
                "open"
            );

        if (
            !anotherModalOpen &&
            !menuOpen
        ) {

            document.body.classList.remove(
                "menu-open"
            );

        }

    }


    if (openTentativeFlow) {

        openTentativeFlow.addEventListener(
            "click",
            () => {

                openModal(
                    tentativeModal
                );

            }
        );

    }


    /* =================================================
       CLOSE MODALS
    ================================================= */

    document.querySelectorAll(
        "[data-close-modal]"
    ).forEach(
        element => {

            element.addEventListener(
                "click",
                () => {

                    const type =
                        element.getAttribute(
                            "data-close-modal"
                        );

                    if (
                        type ===
                        "tentative"
                    ) {

                        closeModal(
                            tentativeModal
                        );

                    }

                    if (
                        type ===
                        "teams"
                    ) {

                        closeModal(
                            teamModal
                        );

                    }

                }
            );

        }
    );


    /* =================================================
       REGISTERED TEAM LIST MODAL
    ================================================= */

    function openTeamList(
        title,
        teams,
        game
    ) {

        if (!teamList) return;


        teamList.innerHTML = "";


        if (teamModalTitle) {

            teamModalTitle.innerHTML =
                "TEAM <span>LIST</span>";

        }


        if (teamModalKicker) {

            teamModalKicker.textContent =
                game +
                " / REGISTERED TEAMS";

        }


        if (teamModalSubtitle) {

            teamModalSubtitle.textContent =
                teams.length +
                " / 32 teams registered";

        }


        if (!teams.length) {

            const empty =
                document.createElement(
                    "div"
                );

            empty.className =
                "empty-team-list";

            empty.innerHTML =
                "No registered teams have been published yet.<br>" +
                "The team list will appear here once registration data is added.";

            teamList.appendChild(
                empty
            );

        } else {

            teams
                .slice(0, 32)
                .forEach(
                    (
                        teamName,
                        index
                    ) => {

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
                            teamName;


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


        openModal(
            teamModal
        );

    }


    document.querySelectorAll(
        "[data-team-list]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const type =
                        button.getAttribute(
                            "data-team-list"
                        );


                    if (
                        type ===
                        "hok"
                    ) {

                        openTeamList(
                            "Honor of Kings",
                            HOK_TEAMS,
                            "HONOR OF KINGS"
                        );

                    }


                    if (
                        type ===
                        "mlbb"
                    ) {

                        openTeamList(
                            "Mobile Legends",
                            MLBB_TEAMS,
                            "MOBILE LEGENDS"
                        );

                    }

                }
            );

        }
    );


    /* =================================================
       CONTENTEDITABLE TEAM SLOTS
    ================================================= */

    /*
       Allows you to click on group/bracket team
       placeholders and type the actual team name.

       This is intentionally local/browser-side.
       It does not upload data anywhere.
    */

    document.querySelectorAll(
        ".editable-team"
    ).forEach(
        slot => {

            slot.setAttribute(
                "contenteditable",
                "true"
            );

            slot.setAttribute(
                "spellcheck",
                "false"
            );

        }
    );


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

            updateActiveNavigation();

            updateScrollProgress();

        }
    );


    /* =================================================
       SCROLL
    ================================================= */

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


    /* =================================================
       BROWSER BACK / FORWARD
    ================================================= */

    window.addEventListener(
        "popstate",
        () => {

            updateActiveNavigation();

        }
    );


    /* =================================================
       INITIAL STATE
    ================================================= */

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
