/*
    - fill hidden timestamp when page loads
    - open/close accessible modals
    - keyboard accessibility: ESC to close, focus management
*/

const timestampField = document.getElementById('timestamp');
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

/* Modal functionality (accessible) */
const modalSelector = '.modal';
const openTriggers = document.querySelectorAll('[data-modal]'); // cards and links
const modalCloseButtons = document.querySelectorAll('.modal-close');

let activeModal = null;
let lastFocusedElement = null;

/* Helper: open modal by ID */
function openModalById(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    activeModal = modal;

    // focus the first focusable element inside modal (close button)
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();

    // add keydown listener for ESC and tab trap
    document.addEventListener('keydown', handleKeydown);
}

/* Helper: close current modal */
function closeActiveModal() {
    if (!activeModal) return;
    activeModal.setAttribute('aria-hidden', 'true');
    activeModal.style.display = 'none';
    // return focus
    if (lastFocusedElement) lastFocusedElement.focus();
    activeModal = null;
    document.removeEventListener('keydown', handleKeydown);
}

/* Keydown handler: ESC to close, basic tab trap */
function handleKeydown(e) {
    if (!activeModal) return;
    if (e.key === 'Escape') {
        e.preventDefault();
        closeActiveModal();
        return;
    }
    if (e.key === 'Tab') {
        // simple focus trap: keep focus inside modal
        const focusable = Array.from(activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.hasAttribute('disabled'));
        if (focusable.length === 0) {
        e.preventDefault();
        return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
        }
    }
}

/* open triggers (card click or 'See Benefits' link) */
openTriggers.forEach(trigger => {
    trigger.addEventListener('click', (ev) => {
        ev.preventDefault();
        // trigger may be <article data-modal="id"> or <a data-modal="id">
        const targetId = trigger.dataset.modal || (ev.currentTarget && ev.currentTarget.dataset.modal);
        if (targetId) openModalById(targetId);
});

  // allow keyboard enter/space on focusable card (articles)
trigger.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        const targetId = trigger.dataset.modal;
        if (targetId) openModalById(targetId);
        }
    });
});

/* close buttons */
modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        closeActiveModal();
    });
});

/* clicking backdrop closes modal */
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (ev) => {
        if (ev.target === modal) {
        closeActiveModal();
        }
    });
});

/* ensure modals are hidden from AT until opened */
document.querySelectorAll('.modal').forEach(m => m.setAttribute('aria-hidden', 'true'));
