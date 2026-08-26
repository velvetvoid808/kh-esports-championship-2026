/* =========================================================
   KH ESPORTS CHAMPIONSHIP 2026
   MAIN JAVASCRIPT
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

        const scrollableHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (scrollableHeight <= 0) {

            scrollProgress.style.width = "100%";

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
            navbar ?
            navbar.offsetHeight :
            0;

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

            if (activationPoint >= sectionTop) {

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
            navbar ?
            navbar.offsetHeight :
            0;

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

            if (event.key === "Escape") {

                closeMenu();

                closeFlowModal();

            }

        }
    );

    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 1100) {
                closeMenu();
            }

            updateActiveNavigation();
            updateScrollProgress();

        }
    );

    /* =====================================================
       SCROLL
    ===================================================== */

    let scrollTicking = false;

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
        { passive: true }
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
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

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

                    });

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
       BRACKET TITLE TABS
    ===================================================== */

    const bracketTabs =
        document.querySelectorAll(
            ".bracket-tab"
        );

    const bracketPanels =
        document.querySelectorAll(
            ".bracket-panel"
        );

    bracketTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                const title =
                    tab.dataset.title;

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
                            title + "-bracket"
                        );

                    }
                );

            }
        );

    });

    /* =====================================================
       ACCORDIONS
       DEFAULT = CLOSED
    ===================================================== */

    const accordions =
        document.querySelectorAll(
            ".accordion"
        );

    accordions.forEach(accordion => {

        const header =
            accordion.querySelector(
                ".accordion-header"
            );

        if (!header) return;

        header.setAttribute(
            "aria-expanded",
            "false"
        );

        header.addEventListener(
            "click",
            () => {

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

    });

    /* =====================================================
       TENTATIVE FLOW MODAL
    ===================================================== */

    const flowModal =
        document.getElementById(
            "flowModal"
        );

    const openFlow =
        document.getElementById(
            "openFlow"
        );

    const closeFlow =
        document.getElementById(
            "closeFlow"
        );

    function openFlowModal() {

        if (!flowModal) return;

        flowModal.classList.add("open");

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

        flowModal.classList.remove("open");

        flowModal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !mobileMenu ||
            !mobileMenu.classList.contains("open")
        ) {

            document.body.classList.remove(
                "menu-open"
            );

        }
    }

    if (openFlow) {

        openFlow.addEventListener(
            "click",
            openFlowModal
        );

    }

    if (closeFlow) {

        closeFlow.addEventListener(
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
       FLOW MODAL TABS
    ===================================================== */

    const flowTabs =
        document.querySelectorAll(
            ".flow-tab"
        );

    const flowPanels =
        document.querySelectorAll(
            ".flow-panel"
        );

    flowTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                const selected =
                    tab.dataset.flow;

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
                            panel.id ===
                            "flow-" + selected
                        );

                    }
                );

            }
        );

    });

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
