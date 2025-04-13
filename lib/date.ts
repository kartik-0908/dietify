export function getCurrentIndianDate() {
    const today = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30 (5.5 hours ahead)
    const istDate = new Date(today.getTime() + istOffset + today.getTimezoneOffset() * 60 * 1000);
    
    // Set hours, minutes, seconds, and milliseconds to 0 to get the start of the day
    istDate.setHours(0, 0, 0, 0);
    return istDate;
}

export const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};