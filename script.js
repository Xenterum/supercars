// ===============================
// 1. NAVBAR: Hamburger Toggle & Active Link
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

// Hamburger toggle
hamburger.addEventListener('click', () => {
    nav.classList.toggle('active'); // toggle active on nav, not ul
});

// Scroll-based active link
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            nav.classList.remove('active'); // close menu on click
        }
    });
});

// ===============================
// 2. HERO CARD 3D TILT - TIGHT HITBOX
// ===============================
const heroCard = document.getElementById('heroCard');

if(heroCard){
    // Listen directly on the card, not the empty space around it
    heroCard.addEventListener('mousemove', (e) => {
        // Stop the CSS float so it doesn't fight the mouse
        heroCard.style.animation = 'none'; 

        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Limits the tilt so it stays classy
        const rotateX = ((y - centerY) / centerY) * 15;
        const rotateY = ((x - centerX) / centerX) * 15;

        heroCard.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    heroCard.addEventListener('mouseleave', () => {
        // Bring back the floating animation when the mouse leaves
        heroCard.style.transition = "transform 0.6s ease";
        heroCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        
        // Restart the CSS float after a tiny delay to keep it smooth
        setTimeout(() => {
            heroCard.style.animation = 'levitate 6s ease-in-out infinite';
        }, 600);
    });
}
// ===============================
// 3. SMART GALLERY FILTERING
// ===============================
const filterButtons = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');
const noResults = document.getElementById('no-results');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter.toLowerCase();
        let visibleCount = 0; // Track if any cars match

        carCards.forEach(card => {
            const brand = card.dataset.brand.toLowerCase();

            if (filter === 'all' || brand === filter) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        // Show "No Results" message if visibleCount is 0
        if (visibleCount === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    });
});

// ===============================
// 4. SCROLL REVEAL
// ===============================
function revealElements(){
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((element)=>{
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;
        if(elementTop < windowHeight - revealPoint){
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealElements);
revealElements(); // run once on load

// ===============================
// 5. CONTACT FORM VALIDATION (Pure JS)
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

        // 1. Clear previous errors
        document.querySelectorAll('.error-text').forEach(el => el.remove());
        [name, email, message].forEach(el => el.style.borderColor = "rgba(255,255,255,0.2)");

        // 2. Validation Checks
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

        // 3. Success Notification
        if (isValid) {
            successMsg.style.display = "flex";
            contactForm.reset();
            // Hide after 4 seconds
            setTimeout(() => { successMsg.style.display = "none"; }, 4000);
        }
    });
}

function showValidation(input, message) {
    // Change border to red
    input.style.borderColor = "#ff4d4d";
    
    // Create error text element
    const error = document.createElement('div');
    error.className = 'error-text';
    error.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    error.style.color = "#ff4d4d";
    error.style.fontSize = "0.85rem";
    error.style.marginTop = "5px";
    
    // Insert after input
    input.after(error);
}
// ===============================
// 6. CLEAN THEME TOGGLE LOGIC
// ===============================
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
const bodyEl = document.body;

themeToggle.addEventListener('click', () => {
    bodyEl.classList.toggle('light-mode');
    
    if (bodyEl.classList.contains('light-mode')) {
        // Switch to SUN (Light Mode)
        icon.classList.replace('fa-moon', 'fa-sun');
        icon.classList.add('animate-sun');
        
        // Remove class after animation finishes so it can re-run
        setTimeout(() => icon.classList.remove('animate-sun'), 600);
    } else {
        // Switch to MOON (Dark Mode)
        icon.classList.replace('fa-sun', 'fa-moon');
        icon.classList.add('animate-moon');
        
        setTimeout(() => icon.classList.remove('animate-moon'), 600);
    }
});
