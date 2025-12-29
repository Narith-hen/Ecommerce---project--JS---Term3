const modal = document.getElementById('discountModal');
const closeBtn = document.querySelector('.close-btn');

// Show modal after 2 seconds (adjust or set to 0 for immediate)
window.onload = () => {
    setTimeout(() => {
        modal.classList.add('show');
    }, 2000); // 2000ms = 2 seconds
};

// Close on button click
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Close on overlay click (outside the card)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});