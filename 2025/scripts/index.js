let openBtn = document.querySelector(".js-card-opener");

openBtn.onclick = function () {
  document.body.classList.toggle("open");
  if (document.body.classList.contains("open")) {
    jsConfetti.addConfetti({
            confettiRadius: 6,
            confettiNumber: 500,
            confettiColors: [
                '#E57200', '#232D4B',
              ],
        });
    }
};

let jsConfetti;

jsConfetti = new JSConfetti()

function calculateTimeUntil() {
    // Target: December 1st, 11:25 PM Pacific Time
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Create target date string in Pacific timezone format
    // December is always PST (UTC-8), so Dec 1 23:25 PST = Dec 2 07:25 UTC
    let targetYear = currentYear;
    
    // Create target as UTC time (Dec 1 23:25 PST = Dec 2 07:25 UTC)
    let targetUtc = new Date(Date.UTC(targetYear, 11, 2, 7, 25, 0));
    
    // Check if we've passed this year's target, use next year
    if (now >= targetUtc) {
        targetYear = currentYear + 1;
        targetUtc = new Date(Date.UTC(targetYear, 11, 2, 7, 25, 0));
    }
    
    // Calculate difference in milliseconds
    const diff = targetUtc - now;
    
    if (diff <= 0) {
        return "0 days 0 hours and 0 minutes";
    }
    
    // Calculate days, hours, minutes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days} days ${hours} hours and ${minutes} minutes`;
}

function updateTimePlaceholder() {
    const timeText = calculateTimeUntil();
    const content = document.querySelector('.rightContent p:nth-of-type(2)');
    if (content) {
        // First time: replace placeholder
        if (content.textContent.includes('(placeholder)')) {
            content.textContent = content.textContent.replace('(placeholder)', timeText);
        } else {
            // Subsequent updates: replace the time pattern (e.g., "X days X hours and X minutes")
            // Match pattern like "0 days 0 hours and 0 minutes" or any number of days/hours/minutes
            const timePattern = /\d+\s+days?\s+\d+\s+hours?\s+and\s+\d+\s+minutes?/;
            if (timePattern.test(content.textContent)) {
                content.textContent = content.textContent.replace(timePattern, timeText);
            }
        }
    }
}

function setup() {
    new CircleType(document.getElementById('topText'))
    .radius(350);

    new CircleType(document.getElementById('bottomText'))
    .dir(-1)
    .radius(350);
    
    // Update the time placeholder
    updateTimePlaceholder();
    
    // Update every minute to keep the countdown current
    setInterval(updateTimePlaceholder, 1000);
}