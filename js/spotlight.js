/* ========================================
   Spotlight Effect — Card hover glow
   ======================================== */

/**
 * Updates CSS custom properties on a card so the radial-gradient
 * pseudo-elements follow the cursor position.
 */
function handleSpotlight(e, card) {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
}

// Event delegation: attach spotlight to all .spotlight-card elements
document.addEventListener('mousemove', function (e) {
    const card = e.target.closest('.spotlight-card');
    if (card) handleSpotlight(e, card);
});
