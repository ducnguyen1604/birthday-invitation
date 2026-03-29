// ===== ROUTER FILE =====
// Quản lý navigation giữa các pages

let currentPage = 'letter';

function navigateTo(page) {
    currentPage = page;
    const app = document.getElementById('app');
    
    // Remove active class from all pages
    const pages = app.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    // Render new page
    if (page === 'letter') {
        app.innerHTML = renderLetterPage();
        setTimeout(() => {
            initLetterPage();
            app.querySelector('.page').classList.add('active');
        }, 0);
    } else if (page === 'love-letter') {
        app.innerHTML = renderLoveLetterPage();
        app.querySelector('.page').classList.add('active');
    } else if (page === 'planning') {
        app.innerHTML = renderPlanningPage();
        setTimeout(() => {
            initPlanningPage();
            app.querySelector('.page').classList.add('active');
        }, 0);
    }
    
    window.scrollTo(0, 0);
}

function goToLoveLetter() {
    navigateTo('love-letter');
}

function goToPlanning() {
    navigateTo('planning');
}

function goToLetter() {
    navigateTo('letter');
}