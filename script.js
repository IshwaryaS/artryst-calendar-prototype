document.addEventListener('DOMContentLoaded', () => {
    // Initialize calendar
    generateCalendar();

    // Handle screen transitions
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentScreen = button.closest('.screen');
            const nextScreenId = button.dataset.next;
            const nextScreen = document.getElementById(nextScreenId);

            if (currentScreen && nextScreen) {
                currentScreen.classList.add('hidden');
                nextScreen.classList.remove('hidden');
            }
        });
    });
});

function generateCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;

    // Clear existing calendar
    calendarGrid.innerHTML = '';

    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Get current date
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDay.getDay();

    // Get last day of month
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();

    // Add empty cells for days before first of month
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        // Highlight current day
        if (day === date.getDate()) {
            dayElement.style.backgroundColor = '#007AFF';
            dayElement.style.color = 'white';
        }

        calendarGrid.appendChild(dayElement);
    }
}

// Add touch support for mobile
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // Swipe left
            const currentScreen = document.querySelector('.screen:not(.hidden)');
            const nextScreen = currentScreen.nextElementSibling;
            if (nextScreen && nextScreen.classList.contains('screen')) {
                currentScreen.classList.add('hidden');
                nextScreen.classList.remove('hidden');
            }
        } else {
            // Swipe right
            const currentScreen = document.querySelector('.screen:not(.hidden)');
            const prevScreen = currentScreen.previousElementSibling;
            if (prevScreen && prevScreen.classList.contains('screen')) {
                currentScreen.classList.add('hidden');
                prevScreen.classList.remove('hidden');
            }
        }
    }

    xDown = null;
    yDown = null;
} 