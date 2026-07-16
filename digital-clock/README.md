# Digital Clock - Multi Timezone Display

A beautiful, real-time digital clock application that displays the current time across multiple time zones simultaneously.

## Features

✨ **Key Features:**
- 🌍 Real-time display of time in multiple time zones
- ⏰ Automatic updates every second
- 📅 Date display with day of week
- 🌐 UTC offset calculation
- 🌅 Daylight Saving Time (DST) detection
- ➕ Add custom timezones via input
- ⭐ Quick-add buttons for popular timezones
- 💾 Persistent storage (LocalStorage)
- 🎨 Modern, responsive UI with gradients
- 📱 Mobile-friendly design

## Supported Timezones

### Americas
- `America/New_York` (EST/EDT)
- `America/Chicago` (CST/CDT)
- `America/Denver` (MST/MDT)
- `America/Los_Angeles` (PST/PDT)
- `America/Anchorage` (AKST/AKDT)
- `Pacific/Honolulu` (HST)
- `America/Toronto` (EST/EDT)
- `America/Mexico_City` (CST/CDT)
- `America/Argentina/Buenos_Aires` (ART)
- `America/Sao_Paulo` (BRT/BRST)
- `America/Caracas` (VET)

### Europe & Africa
- `Europe/London` (GMT/BST)
- `Europe/Paris` (CET/CEST)
- `Europe/Berlin` (CET/CEST)
- `Europe/Moscow` (MSK)
- `Europe/Istanbul` (EET/EEST)
- `Africa/Cairo` (EET/EEST)
- `Africa/Johannesburg` (SAST)
- `Africa/Lagos` (WAT)
- `Africa/Nairobi` (EAT)

### Asia
- `Asia/Dubai` (GST)
- `Asia/Bangkok` (ICT)
- `Asia/Singapore` (SGT)
- `Asia/Hong_Kong` (HKT)
- `Asia/Shanghai` (CST)
- `Asia/Tokyo` (JST)
- `Asia/Seoul` (KST)
- `Asia/Kolkata` (IST)
- `Asia/Jakarta` (WIB/WITA)
- `Asia/Manila` (PHT)

### Oceania
- `Australia/Sydney` (AEDT/AEST)
- `Australia/Brisbane` (AEST)
- `Australia/Perth` (AWST)
- `Australia/Adelaide` (ACDT/ACST)
- `Pacific/Auckland` (NZDT/NZST)
- `Pacific/Fiji` (FJT)
- `Pacific/Tongatapu` (TOT)

## Usage

### Installation

1. Clone or download the repository
2. Open `index.html` in your web browser
3. No additional dependencies required!

### Adding a Timezone

**Method 1: Input Field**
```
1. Type a valid IANA timezone code (e.g., "America/New_York")
2. Click "Add Timezone" or press Enter
3. The timezone will appear on the dashboard
```

**Method 2: Quick-Add Buttons**
```
1. Click any of the popular timezone buttons
2. The timezone is instantly added to your dashboard
```

### Removing a Timezone

```
1. Click the × button on any timezone card
2. The timezone will be removed from the display
```

### Resetting

```
1. Click "Reset to Default" button
2. The display returns to the default 3 timezones:
   - America/New_York
   - Europe/London
   - Asia/Tokyo
```

## Data Displayed

Each timezone card shows:
- **Timezone Name** - IANA timezone identifier
- **Current Time** - HH:MM:SS format (24-hour)
- **Current Date** - Day, Month, Year format
- **UTC Offset** - Difference from UTC time
- **DST Status** - Whether Daylight Saving Time is active

## Technical Details

### Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **JavaScript (Vanilla)** - Real-time updates and logic
- **LocalStorage API** - Persistent timezone preferences

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Key Functions

- `addTimezone()` - Validates and adds a new timezone
- `removeTimezone(tz)` - Removes a timezone from display
- `updateClocks()` - Updates all displayed times
- `getUTCOffset(tz)` - Calculates UTC offset for a timezone
- `getDSTInfo(tz, date)` - Determines if DST is active
- `renderClocks()` - Renders all timezone cards

## Features Explained

### Real-Time Updates
The application updates every second using `setInterval()` to refresh all displayed times.

### Timezone Validation
Only valid IANA timezone identifiers are accepted. Invalid entries show an error message.

### Persistent Storage
Your selected timezones are saved to browser LocalStorage and automatically loaded on page reload.

### DST Detection
Automatically detects and displays whether Daylight Saving Time is currently active for each timezone.

### Responsive Design
The grid layout automatically adjusts for different screen sizes (desktop, tablet, mobile).

## File Structure

```
digital-clock/
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── script.js       # Application logic
└── README.md       # Documentation
```

## Future Enhancements

- [ ] 12-hour/24-hour format toggle
- [ ] Analog clock display option
- [ ] Alarm functionality for specific timezones
- [ ] Weather integration for each timezone
- [ ] Dark/Light theme toggle
- [ ] Sound notifications at specific times
- [ ] Export/import timezone configurations
- [ ] Timezone search with autocomplete

## License

MIT License - Feel free to use and modify

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.
