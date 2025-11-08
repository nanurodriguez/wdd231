// Enhanced renderer for course cards (JS-only change)
// If you fetch JSON, call renderCourses(fetchedCourses) after fetch completes.
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, description: 'Intro to programming.', completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, description: 'Web fundamentals.', completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, description: 'Functions and modular programming.', completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, description: 'Intro to OOP.', completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, description: 'Dynamic web with JS.', completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, description: 'Frontend fundamentals and accessibility.', completed: false }
];

// DOM references (IDs must match your HTML)
const courseCardsContainer = document.querySelector('#course-cards');
const allBtn = document.querySelector('#allCourses');
const wddBtn = document.querySelector('#wddCourses');
const cseBtn = document.querySelector('#cseCourses');
const creditsSpan = document.querySelector('#credits-completed');

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, (s) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[s]));
}

function renderCourses(list) {

    courseCardsContainer.innerHTML = '';

    // total credits for completed courses within the filtered list 
    const total = list.filter(c => c.completed).reduce((s, c) => s + (Number(c.credits) || 0), 0);
    if (creditsSpan) creditsSpan.textContent = total;

    // Build each card with course name and number 
    list.forEach(course => {
        const article = document.createElement('article');
        article.className = 'course-card';
        if (course.completed) article.classList.add('completed');

        // Header
        const header = document.createElement('div');
        header.className = 'course-card-header';
        const title = document.createElement('h3');
        title.className = 'course-title';
        title.innerHTML = `${escapeHtml(course.subject)} ${escapeHtml(course.number)}`;
        header.appendChild(title);

        // Meta row
        const meta = document.createElement('div');
        meta.className = 'course-meta';
        article.appendChild(header);
        article.appendChild(meta);
        courseCardsContainer.appendChild(article);
    });
}

// Wire up buttons (register once)
if (allBtn) allBtn.addEventListener('click', () => renderCourses(courses));
if (wddBtn) wddBtn.addEventListener('click', () => renderCourses(courses.filter(c => c.subject === 'WDD')));
if (cseBtn) cseBtn.addEventListener('click', () => renderCourses(courses.filter(c => c.subject === 'CSE')));

// Initial render
renderCourses(courses);

// Expose for debugging
window._renderCourses = renderCourses;



