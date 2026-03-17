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
// 2. HERO CARD 3D TILT
// ===============================
const heroCard = document.getElementById('heroCard');
const heroContainer = document.querySelector('.tilt-card-container');

if(heroCard && heroContainer){
    heroContainer.addEventListener('mousemove', (e) => {
        const rect = heroContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;

        heroCard.style.transform = `
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    });

    heroContainer.addEventListener('mouseleave', () => {
        heroCard.style.transition = "all 0.6s ease";
        heroCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
}

// ===============================
// 3. GALLERY FILTERING
// ===============================
const filterButtons = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        carCards.forEach(card => {
            const brand = card.dataset.brand;
            if (filter === 'all' || brand === filter) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
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