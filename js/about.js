// Animation on scroll
function animateOnScroll() {
    const buildCards = document.querySelectorAll('.build-card');
    const behaviourCards = document.querySelectorAll('.behaviour-card');
    const accomplishmentCards = document.querySelectorAll('.accomplishment-card');

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Animate build cards
    buildCards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('animated');
        }
    });

    // Animate behaviour cards
    behaviourCards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('animated');
        }
    });

    // Animate accomplishment cards
    accomplishmentCards.forEach((card, index) => {
        if (isInViewport(card)) {
            // Add delay for each card
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 150);
        }
    });
}

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initial animation check
    animateOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add a subtle animation to the hero section
    const hero = document.querySelector('.hero h1');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';

        setTimeout(() => {
            hero.style.transition = 'opacity 1s, transform 1s';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 300);
    }
});