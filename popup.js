// Popup Script - Main UI logic

const API_URL = 'http://localhost:3000';

const analyzeBtn = document.getElementById('analyzeBtn');
const resetBtn = document.getElementById('resetBtn');
const jobDescriptionInput = document.getElementById('jobDescription');
const loadingSpinner = document.getElementById('loadingSpinner');
const inputSection = document.getElementById('inputSection');
const resultsSection = document.getElementById('resultsSection');
const errorSection = document.getElementById('errorSection');
const closeErrorBtn = document.getElementById('closeErrorBtn');
const matchedCount = document.getElementById('matchedCount');
const missingCount = document.getElementById('missingCount');

// Event listeners
analyzeBtn.addEventListener('click', analyzeJob);
resetBtn.addEventListener('click', resetUI);
closeErrorBtn.addEventListener('click', dismissError);

async function analyzeJob() {
    const jobDescription = jobDescriptionInput.value.trim();

    if (!jobDescription) {
        showError('Please paste a job description to analyze');
        return;
    }

    showLoading();

    try {
        // Get user's LinkedIn profile
        const profile = await getLinkedInProfile();

        if (!profile || profile.skills.length === 0) {
            showError(
                'Could not extract your LinkedIn profile. Make sure you\'re on your LinkedIn profile page and have skills listed.'
            );
            return;
        }

        // Send to backend for analysis
        const response = await fetch(`${API_URL}/api/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userProfile: profile,
                jobDescription: jobDescription
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const analysis = await response.json();
        displayResults(analysis);
    } catch (error) {
        console.error('Error:', error);
        showError(
            `Analysis failed: ${error.message}. Make sure the backend server is running on port 3000.`
        );
    } finally {
        hideLoading();
    }
}

async function getLinkedInProfile() {
    return new Promise((resolve) => {
        chrome.tabs.query({ url: 'https://www.linkedin.com/*' }, (tabs) => {
            if (tabs.length === 0) {
                resolve(null);
                return;
            }

            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: 'extractProfile' },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                        resolve(null);
                        return;
                    }
                    resolve(response?.profile || null);
                }
            );
        });
    });
}

function displayResults(analysis) {
    // Hide input, show results
    inputSection.classList.add('hidden');
    errorSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    // Match percentage
    document.getElementById('matchPercentage').textContent = `${analysis.matchPercentage}%`;
    document.getElementById('fitLevel').textContent = analysis.fitLevel;

    // Matched skills
    const matchedSkillsContainer = document.getElementById('matchedSkills');
    if (analysis.matchedSkills.length > 0) {
        matchedSkillsContainer.innerHTML = analysis.matchedSkills
            .map(skill => `<span class="skill-tag">${skill}</span>`)
            .join('');
    } else {
        matchedSkillsContainer.innerHTML = '<p class="placeholder">No matched skills</p>';
    }
    matchedCount.textContent = analysis.matchedSkills.length.toString();

    // Missing skills
    const missingSkillsContainer = document.getElementById('missingSkills');
    if (analysis.missingSkills.length > 0) {
        missingSkillsContainer.innerHTML = analysis.missingSkills
            .map(skill => `<span class="skill-tag">${skill}</span>`)
            .join('');
    } else {
        missingSkillsContainer.innerHTML = '<p class="placeholder">No missing skills</p>';
    }
    missingCount.textContent = analysis.missingSkills.length.toString();

    // Recommendations
    document.getElementById('recommendations').textContent = analysis.recommendations;
}

function showLoading() {
    analyzeBtn.disabled = true;
    loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    analyzeBtn.disabled = false;
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    hideLoading();
    inputSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    errorSection.classList.remove('hidden');
    document.getElementById('errorMessage').textContent = message;
}

function dismissError() {
    errorSection.classList.add('hidden');
    inputSection.classList.remove('hidden');
}

function resetUI() {
    jobDescriptionInput.value = '';
    inputSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    errorSection.classList.add('hidden');
    matchedCount.textContent = '0';
    missingCount.textContent = '0';
    document.getElementById('matchPercentage').textContent = '-';
    document.getElementById('fitLevel').textContent = '-';
    hideLoading();
}

console.log('Popup script loaded');
