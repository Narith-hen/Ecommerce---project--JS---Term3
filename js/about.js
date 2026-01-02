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



// Build Cards Interactivity
const cards = document.querySelectorAll('.build-card');

function closeAllCards() {
    cards.forEach(c => {
        c.classList.remove('active');
        const btn = c.querySelector('.view-btn');
        if (btn) btn.textContent = 'View Details';
    });
}

cards.forEach(card => {
    const btn = card.querySelector('.view-btn');

    // Button click
    if (btn) {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const isActive = card.classList.contains('active');

            closeAllCards();
            if (!isActive) {
                card.classList.add('active');
                btn.textContent = 'Hide Details';
            }
        });
    }

    // Hover (desktop)
    card.addEventListener('mouseenter', () => {
        closeAllCards();
        card.classList.add('active');
        if (btn) btn.textContent = 'Hide Details';
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('active');
        if (btn) btn.textContent = 'View Details';
    });

    // Touch (mobile)
    card.addEventListener('touchstart', () => {
        const isActive = card.classList.contains('active');

        closeAllCards();
        if (!isActive) {
            card.classList.add('active');
            if (btn) btn.textContent = 'Hide Details';
        }
    });
});

document.querySelectorAll('.build-card').forEach(card => {
    const btn = card.querySelector('.view-btn');
    const img = card.querySelector('.build-img');

    // Function to close all other cards
    // const closeOthers = () => {
    //     document.querySelectorAll('.build-card').forEach(otherCard => {
    //         if (otherCard !== card) {
    //             otherCard.classList.remove('active');
    //         }
    //     });
    // };

    // Click on "View Details" button
    // if (btn) {
    //     btn.addEventListener('click', e => {
    //         e.preventDefault();
    //         closeOthers();
    //         card.classList.toggle('active');
    //     });
    // }

    // Hover (mouse) on image area
    // if (img) {
    //     img.addEventListener('mouseenter', () => {
    //         closeOthers();
    //         card.classList.add('active');
    //     });

    //     img.addEventListener('mouseleave', () => {
    //         card.classList.remove('active');
    //     });

    //     // Touch (mobile/tablet) – toggle on tap, but ensure only one is open
    //     img.addEventListener('touchstart', e => {
    //         // Optional: uncomment next line if you experience issues with scrolling
    //         e.preventDefault();
    //         closeOthers();
    //         card.classList.toggle('active');
    //     });
    // }
});





// document.querySelectorAll('.build-card').forEach(card => {
//     const btn = card.querySelector('.view-btn');
//     const img = card.querySelector('.build-img');
    
//     function activateCard() {
//         // Close all other cards first
//         document.querySelectorAll('.build-card').forEach(otherCard => {
//             if (otherCard !== card) {
//                 otherCard.classList.remove('active');
//             }
//         });
//         // Toggle the clicked card
//         card.classList.toggle('active');
//     }
    
//     // Click button
//     if (btn) {
//         btn.addEventListener('click', e => {
//             e.preventDefault();
//             e.stopPropagation(); // Prevent triggering card click
//             activateCard();
//         });
//     }
    
//     // Hover (mouse enter)
//     if (img) {
//         img.addEventListener('mouseenter', () => {
//             // Close all cards first
//             document.querySelectorAll('.build-card').forEach(otherCard => {
//                 otherCard.classList.remove('active');
//             });
//             // Open this card
//             card.classList.add('active');
//         });
        
//         // When leaving the card area, you might want to close it
//         // Or keep it open if button was clicked
//         card.addEventListener('mouseleave', (e) => {
//             // Only auto-close if not clicked (no 'active' class from click)
//             // Or always close on mouseleave:
//             card.classList.remove('active');
//         });
//     }
    
//     // Touch for mobile
//     if (img) {
//         img.addEventListener('touchstart', (e) => {
//             e.preventDefault();
//             activateCard();
//         });
//     }
// });

// // Optional: Click outside to close all cards
// document.addEventListener('click', (e) => {
//     if (!e.target.closest('.build-card')) {
//         document.querySelectorAll('.build-card').forEach(card => {
//             card.classList.remove('active');
//         });
//     }
// });





// const buildCards = document.querySelectorAll('.build-card');

// buildCards.forEach(card => {
//     card.addEventListener('mouseenter', () => {
//         // Remove active from all cards
//         buildCards.forEach(c => c.classList.remove('active'));

//         // Add active to hovered card
//         card.classList.add('active');
//     });

//     card.addEventListener('mouseleave', () => {
//         card.classList.remove('active');
//     });
// });


