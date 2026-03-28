// ======================================
// NAVBAR: Hamburger Toggle, Active Link & Smooth Scroll
// ======================================

// Select elements
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

// ----------------------
// 1. Hamburger Menu Toggle
// ----------------------
hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active'); // 🔥 THIS
});
// ----------------------
// 2. Scroll-based Active Link
// ----------------------
window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for navbar height
        if (scrollY >= sectionTop) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSectionId}`
        );
    });
});

// ----------------------
// 3. Smooth Scroll + Close Menu on Click
// ----------------------
navLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        // Close mobile menu if open
        if (nav.classList.contains("active")) {
            nav.classList.remove("active");
        }
    });
});

// ======================================
// HERO CARD 3D TILT (TIGHT HITBOX)
// ======================================
const heroCard = document.getElementById("heroCard");

if (heroCard) {
    // ----------------------
    // Mouse Move: Tilt Effect
    // ----------------------
    heroCard.addEventListener("mousemove", (e) => {
        // Temporarily stop the CSS levitate animation
        heroCard.style.animation = "none";

        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate tilt, capped at 15 degrees
        const rotateX = ((y - centerY) / centerY) * 15;
        const rotateY = ((x - centerX) / centerX) * 15;

        heroCard.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        heroCard.style.transition = "transform 0.1s ease"; // smooth follow
    });

    // ----------------------
    // Mouse Leave: Reset Tilt & Resume Float
    // ----------------------
    heroCard.addEventListener("mouseleave", () => {
        heroCard.style.transition = "transform 0.6s ease";
        heroCard.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";

        // Resume levitate animation after transition
        setTimeout(() => {
            heroCard.style.animation = "levitate 6s ease-in-out infinite";
        }, 600);
    });
}

// ===============================
// SMART GALLERY FILTERING
// ===============================
const filterButtons = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');
const noResults = document.getElementById('no-results');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Highlight active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter.toLowerCase();
        let hasVisible = false;

        carCards.forEach(card => {
            const brand = card.dataset.brand.toLowerCase();
            const showCard = filter === 'all' || brand === filter;
            card.style.display = showCard ? 'block' : 'none';
            if (showCard) hasVisible = true;
        });

        // Toggle "No Results" message
        noResults.style.display = hasVisible ? 'none' : 'block';
    });
});

// ===============================
// SCROLL REVEAL
// ===============================
function revealElements() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            el.classList.add("active");
        }
    });
}

// Listen for scroll and trigger once on load
window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// ===============================
// CONTACT FORM VALIDATION
// ===============================
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-text').forEach(el => el.remove());
        [name, email, message].forEach(el => el.style.borderColor = "rgba(255,255,255,0.2)");

        // Validation
        if (name.value.trim().length < 3) {
            showValidation(name, "Please provide your name (min 3 chars).");
            isValid = false;
        }

        if (!email.value.includes('@') || !email.value.includes('.')) {
            showValidation(email, "Please provide a valid email.");
            isValid = false;
        }

        if (message.value.trim().length < 5) {
            showValidation(message, "Please enter a message (min 5 chars).");
            isValid = false;
        }

        // Success
        if (isValid) {
            successMsg.style.display = "flex";
            contactForm.reset();
            setTimeout(() => { successMsg.style.display = "none"; }, 4000);
        }
    });
}

function showValidation(input, message) {
    input.style.borderColor = "#ff4d4d";

    const error = document.createElement('div');
    error.className = 'error-text';
    error.textContent = message;
    error.style.color = "#ff4d4d";
    error.style.fontSize = "0.85rem";
    error.style.marginTop = "5px";

    input.after(error);
}

// ===============================
// THEME TOGGLE (LIGHT / DARK)
// ===============================
const themeToggle = document.getElementById('themeToggle');
const bodyEl = document.body;

if (themeToggle) {
    const icon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        bodyEl.classList.toggle('light-mode');

        if (!icon) return; // safety check

        if (bodyEl.classList.contains('light-mode')) {
            // Light mode: show sun
            icon.classList.replace('fa-moon', 'fa-sun');
            icon.classList.add('animate-sun');

            setTimeout(() => icon.classList.remove('animate-sun'), 600);
        } else {
            // Dark mode: show moon
            icon.classList.replace('fa-sun', 'fa-moon');
            icon.classList.add('animate-moon');

            setTimeout(() => icon.classList.remove('animate-moon'), 600);
        }
    });
}

