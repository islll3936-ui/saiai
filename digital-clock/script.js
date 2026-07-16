// Default timezones to display
const DEFAULT_TIMEZONES = [
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo'
];

// Store active timezones in localStorage
let activeTimezones = JSON.parse(localStorage.getItem('activeTimezones')) || DEFAULT_TIMEZONES;

// Valid timezone list (IANA timezone database)
const VALID_TIMEZONES = [
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'America/Anchorage', 'Pacific/Honolulu', 'America/Toronto', 'America/Mexico_City',
    'America/Argentina/Buenos_Aires', 'America/Sao_Paulo', 'America/Caracas',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Moscow', 'Europe/Istanbul',
    'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Lagos', 'Africa/Nairobi',
    'Asia/Dubai', 'Asia/Bangkok', 'Asia/Singapore', 'Asia/Hong_Kong', 'Asia/Shanghai',
    'Asia/Tokyo', 'Asia/Seoul', 'Asia/Kolkata', 'Asia/Jakarta', 'Asia/Manila',
    'Australia/Sydney', 'Australia/Brisbane', 'Australia/Perth', 'Australia/Adelaide',
    'Pacific/Auckland', 'Pacific/Fiji', 'Pacific/Tongatapu'
];

// DOM Elements
const timezoneInput = document.getElementById('timezoneInput');
const addTimezoneBtn = document.getElementById('addTimezoneBtn');
const resetBtn = document.getElementById('resetBtn');
const timezoneList = document.getElementById('timezoneList');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderClocks();
    updateClocks();
    setInterval(updateClocks, 1000);

    addTimezoneBtn.addEventListener('click', addTimezone);
    resetBtn.addEventListener('click', resetTimezones);
    timezoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTimezone();
    });

    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tz = btn.getAttribute('data-tz');
            if (!activeTimezones.includes(tz)) {
                activeTimezones.push(tz);
                saveTimezones();
                renderClocks();
            }
        });
    });
});

function addTimezone() {
    const tz = timezoneInput.value.trim();

    if (!tz) {
        showMessage('Please enter a timezone', 'error');
        return;
    }

    if (!VALID_TIMEZONES.includes(tz)) {
        showMessage(`Invalid timezone: ${tz}. Please use IANA timezone format.`, 'error');
        return;
    }

    if (activeTimezones.includes(tz)) {
        showMessage(`Timezone already added: ${tz}`, 'error');
        return;
    }

    activeTimezones.push(tz);
    saveTimezones();
    timezoneInput.value = '';
    renderClocks();
    showMessage(`Added timezone: ${tz}`, 'success');
}

function removeTimezone(tz) {
    activeTimezones = activeTimezones.filter(t => t !== tz);
    saveTimezones();
    renderClocks();
}

function resetTimezones() {
    activeTimezones = [...DEFAULT_TIMEZONES];
    saveTimezones();
    timezoneInput.value = '';
    renderClocks();
    showMessage('Reset to default timezones', 'success');
}

function saveTimezones() {
    localStorage.setItem('activeTimezones', JSON.stringify(activeTimezones));
}

function renderClocks() {
    timezoneList.innerHTML = '';

    activeTimezones.forEach(tz => {
        const card = document.createElement('div');
        card.className = 'timezone-card';
        card.innerHTML = `
            <button class="remove-btn" onclick="removeTimezone('${tz}')">×</button>
            <div class="timezone-name">${tz}</div>
            <div class="timezone-time" id="time-${tz}">--:--:--</div>
            <div class="timezone-date" id="date-${tz}">Loading...</div>
            <div class="timezone-details">
                <span id="utc-${tz}">UTC offset: --</span>
                <span id="dst-${tz}">--</span>
            </div>
        `;
        timezoneList.appendChild(card);
    });
}

function updateClocks() {
    activeTimezones.forEach(tz => {
        try {
            const time = new Date();
            const tzTime = new Date(time.toLocaleString('en-US', { timeZone: tz }));
            const tzDate = new Date(time.toLocaleString('en-US', { timeZone: tz }));

            // Update time
            const timeStr = tzTime.toLocaleTimeString('en-US', { hour12: false });
            document.getElementById(`time-${tz}`).textContent = timeStr;

            // Update date
            const dateStr = tzDate.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            document.getElementById(`date-${tz}`).textContent = dateStr;

            // Update UTC offset
            const offset = getUTCOffset(tz);
            document.getElementById(`utc-${tz}`).textContent = `UTC ${offset}`;

            // Update DST info
            const dstInfo = getDSTInfo(tz, tzDate);
            document.getElementById(`dst-${tz}`).textContent = dstInfo;
        } catch (error) {
            console.error(`Error updating timezone ${tz}:`, error);
        }
    });
}

function getUTCOffset(tz) {
    const time = new Date();
    const tzTime = new Date(time.toLocaleString('en-US', { timeZone: tz }));
    const utcTime = new Date(time.toLocaleString('en-US', { timeZone: 'UTC' }));
    
    const diff = (tzTime - utcTime) / (1000 * 60); // difference in minutes
    const hours = Math.floor(Math.abs(diff) / 60);
    const minutes = Math.abs(diff) % 60;
    const sign = diff >= 0 ? '+' : '-';
    
    return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function getDSTInfo(tz, date) {
    // Create two dates 6 months apart
    const date1 = new Date(date.getFullYear(), 0, 1);
    const date2 = new Date(date.getFullYear(), 6, 1);
    
    const offset1 = new Date(date1.toLocaleString('en-US', { timeZone: tz })) - new Date(date1.toLocaleString('en-US', { timeZone: 'UTC' }));
    const offset2 = new Date(date2.toLocaleString('en-US', { timeZone: tz })) - new Date(date2.toLocaleString('en-US', { timeZone: 'UTC' }));
    
    if (offset1 !== offset2) {
        const currentOffset = new Date(date.toLocaleString('en-US', { timeZone: tz })) - new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        return currentOffset === offset1 ? 'Standard Time' : 'Daylight Time';
    }
    
    return 'No DST';
}

function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = text;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.maxWidth = '400px';
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}
