// join.js — simple modal open/close logic

// Set the hidden timestamp field when page loads
const ts = document.getElementById('timestamp');
if (ts) {
    ts.value = new Date().toISOString();
}

// Select all card buttons that open modals
const cardButtons = document.querySelectorAll('.card button[data-modal]');

cardButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
        modal.showModal();
        }
    });
});

// Select all close-modal buttons in modals
const closeButtons = document.querySelectorAll('dialog .close-modal');

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const dialog = btn.closest('dialog');
        if (dialog) {
        dialog.close();
        }
    });
});

