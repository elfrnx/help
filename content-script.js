// Content Script - Runs on LinkedIn pages
// Extracts profile data from the LinkedIn profile page

function extractLinkedInProfile() {
    const profile = {
        skills: [],
        experience: [],
        education: []
    };

    // Extract skills from skills section
    const skillElements = document.querySelectorAll(
        'a[data-tracking-control-name*="skill"]'
    );
    
    skillElements.forEach(el => {
        const skill = el.textContent.trim();
        if (skill && !profile.skills.includes(skill)) {
            profile.skills.push(skill);
        }
    });

    // Fallback: Try alternative skill selector
    if (profile.skills.length === 0) {
        const skillCards = document.querySelectorAll('[data-test-id*="skill"]');
        skillCards.forEach(el => {
            const skill = el.textContent.trim();
            if (skill && !profile.skills.includes(skill)) {
                profile.skills.push(skill);
            }
        });
    }

    return profile;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractProfile') {
        const profile = extractLinkedInProfile();
        sendResponse({ profile: profile });
    }
});

console.log('Content script injected on', document.location.hostname);
