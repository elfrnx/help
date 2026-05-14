// Service Worker - handles background tasks and messaging
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getProfileData') {
        // Message handler for getting profile data from content script
        sendResponse({ status: 'ready' });
    }
});

console.log('Background service worker loaded');
