/* =========================================================
   KH ESPORTS CHAMPIONSHIP 2026
   MASTER JAVASCRIPT
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

    function setActiveSection(id) {

        desktopLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                "#" + id
            );

        });


        mobileLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                "#" + id
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
            90;

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
       ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

                closeModal(
                    document.getElementById(
                        "flowModal"
                    )
                );

                closeModal(
                    document.getElementById(
                        "teamModal"
                    )
                );

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
       BROWSER HISTORY
    ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            updateActiveNavigation();

        }
    );


    /* =====================================================
       REVEAL ANIMATION
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
       COUNTDOWN
    ===================================================== */

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
        key
    ) {

        const container =
            document.querySelector(
                `[data-countdown="${key}"]`
            );

        if (!container) return;

        const target =
            countdownTargets[key];

        const now =
            Date.now();

        let difference =
            target - now;


        if (difference <= 0) {

            difference = 0;

        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (
                    difference %
                    (1000 * 60)
                ) /
                1000
            );


        const daysElement =
            container.querySelector(
                "[data-days]"
            );

        const hoursElement =
            container.querySelector(
                "[data-hours]"
            );

        const minutesElement =
            container.querySelector(
                "[data-minutes]"
            );

        const secondsElement =
            container.querySelector(
                "[data-seconds]"
            );


        if (daysElement) {

            daysElement.textContent =
                String(days).padStart(
                    3,
                    "0"
                );

        }


        if (hoursElement) {

            hoursElement.textContent =
                String(hours).padStart(
                    2,
                    "0"
                );

        }


        if (minutesElement) {

            minutesElement.textContent =
                String(minutes).padStart(
                    2,
                    "0"
                );

        }


        if (secondsElement) {

            secondsElement.textContent =
                String(seconds).padStart(
                    2,
                    "0"
                );

        }

    }


    function updateAllCountdowns() {

        updateCountdown("hok");

        updateCountdown("mlbb");

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


    bracketTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                const target =
                    tab.dataset.bracketTab;


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

    });


    /* =====================================================
       BRACKET ACCORDIONS
    ===================================================== */

    const accordionHeaders =
        document.querySelectorAll(
            ".bracket-accordion-header"
        );


    accordionHeaders.forEach(
        header => {

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
       FLOW MODAL
    ===================================================== */

    const flowModal =
        document.getElementById(
            "flowModal"
        );

    const openFlowModal =
        document.getElementById(
            "openFlowModal"
        );

    const closeFlowModalButton =
        document.getElementById(
            "closeFlowModal"
        );


    function openModal(modal) {

        if (!modal) return;

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        const anyModalOpen =
            document.querySelector(
                ".modal-overlay.open"
            );

        if (!anyModalOpen) {

            document.body.classList.remove(
                "modal-open"
            );

        }

    }


    if (openFlowModal) {

        openFlowModal.addEventListener(
            "click",
            () => {

                openModal(
                    flowModal
                );

            }
        );

    }


    if (closeFlowModalButton) {

        closeFlowModalButton.addEventListener(
            "click",
            () => {

                closeModal(
                    flowModal
                );

            }
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

                    closeModal(
                        flowModal
                    );

                }

            }
        );

    }


    /* =====================================================
       FLOW TAB
       Kept ready for future expansion
    ===================================================== */

    const flowTabs =
        document.querySelectorAll(
            ".flow-tab"
        );


    flowTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    flowTabs.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    tab.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    /* =====================================================
       REGISTERED TEAM MODAL
    ===================================================== */

    const teamModal =
        document.getElementById(
            "teamModal"
        );

    const closeTeamModalButton =
        document.getElementById(
            "closeTeamModal"
        );

    const teamModalTitle =
        document.getElementById(
            "teamModalTitle"
        );

    const teamModalKicker =
        document.getElementById(
            "teamModalKicker"
        );


    const teamListButtons =
        document.querySelectorAll(
            ".team-list-button"
        );


    function setTeamModalTitle(
        title
    ) {

        if (
            !teamModalTitle ||
            !teamModalKicker
        ) {
            return;
        }


        if (title === "mlbb") {

            teamModalKicker.textContent =
                "REGISTERED TEAMS / MOBILE LEGENDS";


            teamModalTitle.innerHTML =
                'MOBILE <span>LEGENDS</span>';

        } else {

            teamModalKicker.textContent =
                "REGISTERED TEAMS / HONOR OF KINGS";


            teamModalTitle.innerHTML =
                'HONOR OF <span>KINGS</span>';

        }

    }


    teamListButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const teamTitle =
                        button.dataset.teamList ||
                        "hok";

                    setTeamModalTitle(
                        teamTitle
                    );

                    openModal(
                        teamModal
                    );

                }
            );

        }
    );


    if (closeTeamModalButton) {

        closeTeamModalButton.addEventListener(
            "click",
            () => {

                closeModal(
                    teamModal
                );

            }
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

                    closeModal(
                        teamModal
                    );

                }

            }
        );

    }


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
