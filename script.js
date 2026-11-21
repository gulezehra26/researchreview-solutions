
/* RESEARCHREVIEW SOLUTIONS
   Website Interactions*/

document.addEventListener("DOMContentLoaded", () => {

    //1. CURRENT YEAR

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    //2. HEADER SCROLL EFFECT

    const header = document.getElementById("header");

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    handleHeaderScroll();

    window.addEventListener("scroll", handleHeaderScroll);


    //3. MOBILE NAVIGATION

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    function openMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.add("active");
        menuToggle.classList.add("open");

        menuToggle.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("active");
        menuToggle.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu after selecting a navigation link
        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener("click", event => {

            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

        // Close menu with Escape key
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close menu when returning to desktop layout
        window.addEventListener("resize", () => {
            if (window.innerWidth > 780) {
                closeMenu();
            }
        });
    }


    // 4. ACTIVE NAVIGATION LINK

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 130;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {

            const linkTarget = link.getAttribute("href");

            link.classList.toggle(
                "active",
                linkTarget === `#${currentSection}`
            );
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    //5. CONTACT FORM

    const contactForm = document.getElementById("contactForm");
    const formError = document.getElementById("formError");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            if (formError) {
                formError.style.display = "none";
                formError.textContent = "";
            }

            const name = document.getElementById("name")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const service = document.getElementById("service")?.value;
            const message = document.getElementById("message")?.value.trim();

            // Validate required fields
            if (!name || !email || !service || !message) {
                showFormError("Please complete all required fields.");
                return;
            }

            // Validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                showFormError("Please enter a valid email address.");
                return;
            }

            // Prepare WhatsApp message
            const whatsappMessage = `
Hello ResearchReview Solutions,

I would like to discuss my research project.

Name: ${name}

Email: ${email}

Service Required: ${service}

Project Details:
${message}

Thank you.
            `.trim();

            const whatsappURL =
                "https://wa.me/923222565188?text=" +
                encodeURIComponent(whatsappMessage);

            // Open WhatsApp with the prepared inquiry
            window.open(whatsappURL, "_blank", "noopener,noreferrer");

        });
    }


    /* 6. FORM ERROR MESSAGE */

    function showFormError(message) {

        if (!formError) return;

        formError.textContent = message;
        formError.style.display = "block";

        formError.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }


    /* 7. CLEAR FORM ERROR */

    const formInputs = document.querySelectorAll(
        "#contactForm input, #contactForm select, #contactForm textarea"
    );

    formInputs.forEach(input => {

        input.addEventListener("input", () => {

            if (formError) {
                formError.textContent = "";
                formError.style.display = "none";
            }

        });

        input.addEventListener("change", () => {

            if (formError) {
                formError.textContent = "";
                formError.style.display = "none";
            }

        });

    });


    /*8. SMOOTH SCROLL*/

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            closeMenu();

        });

    });


     //# 9. CONSOLE MESSAGE

    console.log(
        "ResearchReview Solutions website initialized successfully."
    );

});
