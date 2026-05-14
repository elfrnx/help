// ── STATE ──────────────────────────────────────────────
let allJobs = [];
let allProfiles = [];
let candidateProfile = null;
let lastMatches = [];
let outreachState = {};
let currentJobSearchQuery = '';
let currentLang = 'tr';
let currentTheme = 'dark';

const I18N = {
  tr: {
    tabJobs: '💼 Is Ilanlari',
    tabProfiles: '👤 Profiller',
    tabMatches: '🎯 Uygun Ilanlar',
    searchJob: '🔍 Ilan veya sirket ara...',
    searchProfile: '🔍 Isim veya unvan ara...',
    searchMatch: '🔍 Pozisyon/sirket/skill filtrele...',
    searchModeJobs: 'İşler',
    searchModeCompanies: 'Şirketler',
    inpName: 'Ad Soyad *',
    inpTitle: 'Unvan / Pozisyon',
        tabJobs: 'İş İlanları',
        tabProfiles: 'Profiller',
        tabMatches: 'Uygun İlanlar',
    btnAddProfile: '+ Ekle',
    btnSaveSkills: 'Becerileri Kaydet',
    btnReadLinkedin: 'Aktif LinkedIn Profilinden Cek',
    btnParseCv: 'CV Metninden Becerileri Cikar',
    formHintProfile: '* Ad Soyad zorunlu. Diger alanlar istege bagli.',
    noProfileYet: 'Henuz aday profili olusturulmadi.',
    waitingSkillProfile: 'CV ya da LinkedIn hesabi ekleyip eslestirmeyi baslat',
    skillProfileActive: '{count} beceri profili aktif',
    manualInput: 'Manuel giris',
    cvText: 'CV metni',
    linkedinProfile: 'LinkedIn profili',
    sourceLine: '{source} | {count} beceri | {date}',
    recordsJob: '{count} ilan',
    recordsMatch: '{count} uygun',
    noJobsSaved: 'Henuz kayitli ilan yok.<br>LinkedIn\'de bir is ilani acinca<br>eklenti otomatik olarak kaydeder.<br>Gerekirse <strong>"Açık İlanı Kaydet"</strong> ile elle de ekleyebilirsin.',
    noJobSearchResults: 'Aramanla eslesen ilan bulunamadi.',
    noProfilesSaved: 'Henuz kayitli profil yok.<br>Yukaridan manuel ekleyebilirsin.',
    noSkillInfo: 'Once beceri bilgisi ekle.<br>CV metninden cikarabilir veya<br>manuel yazabilirsin.',
    noJobsForMatch: 'Eslesme icin once ilan kaydetmelisin.<br>LinkedIn Jobs sayfasindan<br><strong>"Ilani Kaydet"</strong> butonunu kullan.',
    noMatchFound: 'Mevcut ilanlarda eslesme bulunamadi.<br>Daha fazla beceri ekleyebilirsin.',
    showProfileMatches: 'Profil ile eşleşenleri göster',
    insightTitle: 'AI içgörüsü',
    insightRecommendation: 'Öneri',
    insightMatchCount: 'Eşleşen ilan',
        noJobsSaved: 'Henüz kayıtlı ilan yok. LinkedIn’de bir iş ilanı açıp "İlanı Kaydet" butonunu kullanın.',
    insightSaveDraft: 'Taslak kaydet',
    insightCopyMessage: 'Mesajı kopyala',
    insightMarkApplied: 'Başvurdum',
    insightOpenJob: 'İlanı aç',
    insightDraftSaved: '✅ Taslak kaydedildi.',
    insightAppliedSaved: '✅ Başvuruldu olarak işaretlendi.',
    insightMissingSkills: 'Eksik: {skills}',
    insightStrongMatch: 'Güçlü eşleşme',
    insightReviewManually: 'Manuel incele',
    insightReadyToSend: 'Göndermeden önce gözden geçir',
    insightNoDraft: 'Bu rol için önerilen mesaj hazır.',
    statusNone: 'Hazır',
    statusDraft: 'Taslak',
    statusApplied: 'Başvuruldu',
    goToJob: '🔗 Ilana Git',
    goToProfile: '🔗 Profile Git',
    saveNote: '💾 Notu Kaydet',
    delete: 'Sil',
    addNotePlaceholder: 'Not ekle... (izlenim, asama, tarih vb.)',
    fitScore: 'Uyum {score}%',
    noJobExport: 'Disa aktarilacak ilan yok.',
    noProfileExport: 'Disa aktarilacak profil yok.',
    noMatchExport: 'Disa aktarilacak eslesme yok.',
    nameRequired: 'Ad Soyad zorunludur.',
        goToJob: 'İlanı Aç',
        goToProfile: 'Profili Aç',
    skillUpdated: '✅ Beceri profili guncellendi.',
    minOneSkill: 'En az 1 beceri girmelisin.',
    pasteCv: 'Lutfen CV metnini yapistir.',
    cvNotParsed: 'CV metninden beceri cikarilamadi. Manuel olarak ekleyebilirsin.',
    openProfileTab: 'Once bir LinkedIn profil sekmesi acmalisin.',
    profileReadError: 'LinkedIn profilinden veri alinamadi. Profil sayfasini yenileyip tekrar dene.',
    noProfileSkill: 'Profilde beceri bulunamadi.',
    clearSkillConfirm: 'Aday beceri profili silinsin mi?',
    clearJobsConfirm: 'Tum is ilanlari silinsin mi?',
    clearProfilesConfirm: 'Tum profiller silinsin mi?'
  },
  en: {
    tabJobs: '💼 Jobs',
    tabProfiles: '👤 Profiles',
    tabMatches: '🎯 Matches',
    searchJob: '🔍 Search jobs or companies...',
    searchProfile: '🔍 Search name or title...',
    searchMatch: '🔍 Filter by role/company/skill...',
    searchModeJobs: 'Jobs',
    searchModeCompanies: 'Companies',
    inpName: 'Full Name *',
    inpTitle: 'Title / Position',
    inpUrl: 'LinkedIn profile link (linkedin.com/in/...)',
    inpSkills: 'Skills (e.g. JavaScript, React, SQL)',
    inpCv: 'Paste your CV text here...',
    btnAddProfile: '+ Add',
    btnSaveSkills: 'Save Skills',
    btnReadLinkedin: 'Read From Active LinkedIn Profile',
    btnParseCv: 'Extract Skills From CV Text',
    formHintProfile: '* Full name is required. Other fields are optional.',
    noProfileYet: 'No candidate profile yet.',
    waitingSkillProfile: 'Add a CV or LinkedIn account to start matching',
    skillProfileActive: '{count} skills profile active',
    manualInput: 'Manual input',
    cvText: 'CV text',
    linkedinProfile: 'LinkedIn profile',
    sourceLine: '{source} | {count} skills | {date}',
    recordsJob: '{count} jobs',
    recordsMatch: '{count} matched',
    noJobsSaved: 'No saved jobs yet.<br>When you open a LinkedIn job post,<br>the extension will save it automatically.<br>You can still add it manually with <strong>"Save Open Job"</strong>.',
    noJobSearchResults: 'No jobs matched your search.',
    noProfilesSaved: 'No saved profiles yet.<br>You can add one manually above.',
    noSkillInfo: 'Add your skill profile first.<br>You can extract from CV text or<br>enter skills manually.',
    noJobsForMatch: 'Save jobs first to run matching.<br>Use the save button on a<br><strong>LinkedIn Jobs</strong> page.',
    noMatchFound: 'No matching jobs found yet.<br>Try adding more skills.',
    showProfileMatches: 'Show profile matches',
    insightTitle: 'AI insight',
    insightRecommendation: 'Recommendation',
    insightMatchCount: 'Matched jobs',
    insightAverageScore: 'Average fit',
    insightSaveDraft: 'Save draft',
    insightCopyMessage: 'Copy message',
    insightMarkApplied: 'Applied',
    insightOpenJob: 'Open job',
    insightDraftSaved: '✅ Draft saved.',
    insightAppliedSaved: '✅ Marked as applied.',
    insightMissingSkills: 'Missing: {skills}',
    insightStrongMatch: 'Strong match',
    insightReviewManually: 'Review manually',
    insightReadyToSend: 'Review before sending',
    insightNoDraft: 'Suggested message is ready for this role.',
    statusNone: 'Ready',
    statusDraft: 'Draft',
    statusApplied: 'Applied',
    goToJob: '🔗 Open Job',
        noJobsSaved: 'No saved jobs yet. Open a LinkedIn job and click "Save Open Job" or save manually.',
    saveNote: '💾 Save Note',
    delete: 'Delete',
    addNotePlaceholder: 'Add note... (impression, stage, date, etc.)',
    fitScore: 'Fit {score}%',
    noJobExport: 'No jobs to export.',
    noProfileExport: 'No profiles to export.',
    noMatchExport: 'No matches to export.',
    nameRequired: 'Full name is required.',
    duplicateProfile: 'This profile is already saved.',
    noteSaved: '✅ Note saved!',
    skillUpdated: '✅ Skill profile updated.',
    minOneSkill: 'Enter at least one skill.',
    pasteCv: 'Please paste your CV text.',
    cvNotParsed: 'Could not extract skills from CV text. You can add them manually.',
    openProfileTab: 'Open a LinkedIn profile tab first.',
    profileReadError: 'Could not read from LinkedIn profile. Refresh the profile page and try again.',
    noProfileSkill: 'No skills found on the profile.',
    clearSkillConfirm: 'Delete candidate skill profile?',
    clearJobsConfirm: 'Delete all saved jobs?',
    clearProfilesConfirm: 'Delete all saved profiles?'
  }
};

I18N.tr.signedInAs = 'Giriş: {name}';
const SKILL_DICTIONARY = [
  'javascript', 'typescript', 'react', 'next.js', 'nextjs', 'vue', 'angular', 'node', 'node.js',
  'express', 'nest', 'python', 'django', 'flask', 'java', 'spring', 'c#', '.net', 'php', 'laravel',
  'go', 'golang', 'rust', 'kotlin', 'swift', 'sql', 'postgresql', 'mysql', 'mongodb', 'redis',
  'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'git', 'linux', 'rest', 'graphql', 'microservice',
  'jira', 'figma', 'excel', 'power bi', 'tableau', 'etl', 'data analysis', 'machine learning',
  'nlp', 'deep learning', 'seo', 'google ads', 'meta ads', 'ui', 'ux', 'product management',
  'scrum', 'agile', 'test automation', 'cypress', 'selenium', 'playwright', 'qa', 'devops',
  'iletişim', 'liderlik', 'problem solving', 'müşteri ilişkileri', 'satış', 'pazarlama', 'finans'
];

// ── TABS ───────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
  });
});

// ── LOAD ───────────────────────────────────────────────
function loadAll() {
  chrome.storage.local.get(['savedJobs', 'savedProfiles', 'candidateProfile', 'uiLang', 'uiTheme', 'linkedInAccount', 'outreachState'], (result) => {
    currentLang = result.uiLang === 'en' ? 'en' : 'tr';
    currentTheme = result.uiTheme === 'light' ? 'light' : 'dark';
    try { applyTheme(currentTheme); } catch(e) {}
    applyStaticTexts();
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.value = currentLang;
    }
    allJobs = result.savedJobs || [];
    allProfiles = result.savedProfiles || [];
    candidateProfile = result.candidateProfile || null;
    outreachState = result.outreachState || {};
    const storedAccount = result.linkedInAccount || null;
    renderJobs(allJobs);
    renderProfiles(allProfiles);
    refreshMatches();
    updateCandidateHint();
    updateBadges();
    // show stored account if present, then attempt to discover/update
    if (storedAccount) updateHeaderAccount(storedAccount.name, storedAccount.url, storedAccount.image || '');
    try { fetchLinkedInAccount(); } catch (e) { }
    try { updateAccountUI(); } catch(e) { }
  });
}

function applyTheme(theme) {
  try {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
    currentTheme = theme === 'light' ? 'light' : 'dark';
    const btn = document.getElementById('btn-theme-toggle');
    if (btn) btn.innerText = theme === 'light' ? 'Light' : 'Dark';
    chrome.storage.local.set({ uiTheme: currentTheme });
  } catch (e) { console.error(e); }
}

function updateHeaderAccount(name, url, image = '') {
  const imgEl = document.getElementById('header-account-img');
  const initialsEl = document.getElementById('header-account-initials');
  const nameEl = document.getElementById('header-account-name');
  const subEl = document.getElementById('header-account-sub');
  if (!nameEl) return;
  if (!name) {
    nameEl.innerText = '';
    if (imgEl) imgEl.style.display = 'none';
    if (initialsEl) {
      initialsEl.innerText = 'PS';
      initialsEl.style.display = '';
    }
    if (subEl) subEl.innerText = '';
    return;
  }
  if (imgEl && image) {
    imgEl.src = image;
    imgEl.style.display = '';
    if (initialsEl) initialsEl.style.display = 'none';
  } else if (imgEl) {
    imgEl.style.display = 'none';
    if (initialsEl) {
      const initials = name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase() || 'PS';
      initialsEl.innerText = initials;
      initialsEl.style.display = '';
    }
  }
  // name may include URL link
  if (url) {
    nameEl.innerHTML = `<a href="${h(url)}" target="_blank" rel="noreferrer" style="color:inherit;text-decoration:none;">${h(name)}</a>`;
  } else {
    nameEl.innerText = name;
  }
  if (subEl) subEl.innerText = 'LinkedIn';
}

function fetchLinkedInAccount() {
  chrome.storage.local.get(['careerPulseLastTabId'], (saved) => {
    const tryTabIds = [];
    if (saved?.careerPulseLastTabId) tryTabIds.push(saved.careerPulseLastTabId);

    chrome.tabs.query({ url: ['https://www.linkedin.com/*'] }, (tabs) => {
      (tabs || []).forEach((t) => { if (t.id && !tryTabIds.includes(t.id)) tryTabIds.push(t.id); });
      if (!tryTabIds.length) { updateHeaderAccount(''); return; }

      const tryNext = (i) => {
        const tabId = tryTabIds[i];
        if (!tabId) { updateHeaderAccount(''); return; }
        chrome.tabs.sendMessage(tabId, { type: 'LJS_GET_ACCOUNT' }, (resp) => {
          const hasRuntimeError = chrome.runtime.lastError;
          if (hasRuntimeError || !resp || !resp.ok) {
              // fallback: try executing a quick extractor in the tab if scripting API available
              try {
                if (chrome.scripting && chrome.scripting.executeScript) {
                  chrome.scripting.executeScript(
                    { target: { tabId }, func: () => {
                        const selCandidates = ['a[href^="/in/"][data-control-name]', 'a[href^="/in/"]', 'a.global-nav__me-link', 'img.global-nav__me-photo'];
                        let found = null;
                        for (const sel of selCandidates) {
                          const e = document.querySelector(sel);
                          if (e) { found = e; break; }
                        }
                        let name = '';
                        let url = '';
                        if (found) {
                          name = (found.innerText || found.alt || found.getAttribute('aria-label') || '').trim();
                          url = found.getAttribute('href') || '';
                          if (url && url.startsWith('/')) url = window.location.origin + url;
                        }
                        return { name, url };
                      } },
                    (res) => {
                      tryNext(i + 1); // advance if no good result, but update if found
                      if (res && res[0] && res[0].result) {
                          const { name, url } = res[0].result || {};
                          if (name) updateHeaderAccount(name, url || '', '');
                        }
                    }
                  );
                  return;
                }
                } catch (e) {
                // ignore and continue
              }
              tryNext(i + 1);
              return;
          }
              const name = resp.accountName || '';
              const url = resp.accountUrl || '';
              const image = resp.accountImage || '';
              if (name) {
                updateHeaderAccount(name, url, image);
                if (image) {
                  const imgEl = document.getElementById('header-account-img');
                  if (imgEl) {
                    imgEl.src = image;
                    imgEl.style.display = '';
                  }
                }
                // persist discovered account
                chrome.storage.local.set({ linkedInAccount: { name, url, image, updatedAt: new Date().toISOString() } }, () => {
                  // if we don't have a candidateProfile yet, attempt to auto-populate from LinkedIn
                  if (!candidateProfile || !(candidateProfile.skills || []).length) {
                    try { openAndReadLinkedInProfile(); } catch (e) { /* ignore */ }
                  }
                });
              } else updateHeaderAccount('');
        });
      };

      tryNext(0);
    });
  });
}

function openAndFetchAccount() {
  // Open /in/me and attempt to extract profile info
  chrome.tabs.create({ url: 'https://www.linkedin.com/in/me' }, (tab) => {
    if (!tab || !tab.id) { alert(t('profileReadError')); return; }
    const tryExtract = (attempts = 10) => {
      if (attempts <= 0) { alert(t('profileReadError')); return; }
      chrome.tabs.sendMessage(tab.id, { type: 'LJS_EXTRACT_PROFILE' }, (resp) => {
        const hasRuntimeError = chrome.runtime.lastError;
        if (hasRuntimeError || !resp || !resp.ok) {
          setTimeout(() => tryExtract(attempts - 1), 900);
          return;
        }
        const profile = resp.profile || {};
        const name = profile.name || '';
        const headline = profile.headline || '';
        const url = profile.url || '';
        if (!name) { alert(t('profileReadError')); return; }
        const acc = { name, headline, url, updatedAt: new Date().toISOString() };
        chrome.storage.local.set({ linkedInAccount: acc }, () => {
          updateHeaderAccount(name, url, acc.image || '');
        });
      });
    };
    setTimeout(() => tryExtract(), 900);
  });
}

function getLocale() {
  return currentLang === 'en' ? 'en-US' : 'tr-TR';
}

function t(key, vars = {}) {
  const dict = I18N[currentLang] || I18N.tr;
  const fallback = I18N.tr[key] || key;
  let text = dict[key] || fallback;
  Object.keys(vars).forEach((name) => {
    text = text.replaceAll(`{${name}}`, String(vars[name]));
  });
  return text;
}

function applyStaticTexts() {
  document.documentElement.lang = currentLang;
  document.title = 'PulseScout';

  const jobsTab = document.querySelector('.tab-btn[data-tab="jobs"]');
  const profilesTab = document.querySelector('.tab-btn[data-tab="profiles"]');
  const matchesTab = document.querySelector('.tab-btn[data-tab="matches"]');

  if (jobsTab) jobsTab.innerHTML = `${t('tabJobs')} <span id="job-count"></span>`;
  if (profilesTab) profilesTab.innerHTML = `${t('tabProfiles')} <span id="profile-count"></span>`;
  if (matchesTab) matchesTab.innerHTML = `${t('tabMatches')} <span id="match-count"></span>`;

  const setPlaceholder = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = value;
  };

  setPlaceholder('job-search', t('searchJob'));
  setPlaceholder('profile-search', t('searchProfile'));
  setPlaceholder('match-search', t('searchMatch'));
  setPlaceholder('inp-name', t('inpName'));
  setPlaceholder('inp-title', t('inpTitle'));
  setPlaceholder('inp-url', t('inpUrl'));
  setPlaceholder('inp-skills', t('inpSkills'));
  setPlaceholder('inp-cv-text', t('inpCv'));

  const byIdText = [
    ['btn-add-profile', t('btnAddProfile')],
    ['btn-save-skills', t('btnSaveSkills')],
    ['btn-read-linkedin', t('btnReadLinkedin')],
    ['btn-parse-cv', t('btnParseCv')]
  ];
  byIdText.forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
  });

  const profileLabel = document.getElementById('profile-match-label');
  if (profileLabel) {
    const s = profileLabel.querySelectorAll('span');
    if (s && s[0]) s[0].innerText = t('showProfileMatches');
  }

  const formHint = document.querySelector('#panel-profiles .form-hint');
  if (formHint) {
    formHint.innerText = t('formHintProfile');
  }

  const insightTitle = document.getElementById('insight-panel-title');
  const insightMatchLabel = document.getElementById('insight-match-label');
  const insightAverageLabel = document.getElementById('insight-average-label');
  const insightRecommendationLabel = document.getElementById('insight-recommendation-label');
  if (insightTitle) insightTitle.innerText = t('insightTitle');
  if (insightMatchLabel) insightMatchLabel.innerText = t('insightMatchCount');
  if (insightAverageLabel) insightAverageLabel.innerText = t('insightAverageScore');
  if (insightRecommendationLabel) insightRecommendationLabel.innerText = t('insightRecommendation');

  const searchMode = document.getElementById('job-search-mode');
  if (searchMode) {
    const options = searchMode.querySelectorAll('option');
    if (options[0]) options[0].innerText = t('searchModeJobs');
    if (options[1]) options[1].innerText = t('searchModeCompanies');
  }
  try { updateProfileMatchCount(); } catch(e) { }
}

function updateBadges() {
  document.getElementById('job-count').innerText = allJobs.length ? `(${allJobs.length})` : '';
  document.getElementById('profile-count').innerText = allProfiles.length ? `(${allProfiles.length})` : '';
  document.getElementById('match-count').innerText = lastMatches.length ? `(${lastMatches.length})` : '';

  const totalBadge = document.getElementById('total-badge');
  if (!totalBadge) return;

  if (!candidateProfile?.skills?.length) {
    totalBadge.innerText = t('recordsJob', { count: allJobs.length });
    return;
  }

  totalBadge.innerText = t('recordsMatch', { count: lastMatches.length });
}

// ── ACCOUNT UI / AVATAR ─────────────────────────────────
function updateAccountUI() {
  chrome.storage.local.get(['linkedInAccount', 'candidateProfile', 'savedJobs'], (r) => {
    const acc = r.linkedInAccount || null;
    const skills = (r.candidateProfile && r.candidateProfile.skills) || (candidateProfile && candidateProfile.skills) || [];
    const jobs = r.savedJobs || allJobs || [];

    const imgEl = document.getElementById('header-account-img');
    const initialsEl = document.getElementById('header-account-initials');
    const nameEl = document.getElementById('header-account-name');
    const subEl = document.getElementById('header-account-sub');
    const acctPanelImg = document.getElementById('acct-panel-img');
    const acctPanelName = document.getElementById('acct-panel-name');
    const acctPanelUrl = document.getElementById('acct-panel-url');

    if (acc && acc.name) {
      nameEl.innerHTML = acc.url ? `<a href="${h(acc.url)}" target="_blank" rel="noreferrer" style="color:inherit;text-decoration:none;">${h(acc.name)}</a>` : h(acc.name);
      subEl.innerText = acc.updatedAt ? new Date(acc.updatedAt).toLocaleString(getLocale()) : '';
      if (acc.image) {
        imgEl.src = acc.image; imgEl.style.display = ''; initialsEl.style.display = 'none';
        if (acctPanelImg) { acctPanelImg.src = acc.image; acctPanelImg.style.display = ''; }
      } else {
        imgEl.style.display = 'none';
        const initials = acc.name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase() || 'PS';
        initialsEl.innerText = initials; initialsEl.style.display = '';
        if (acctPanelImg) acctPanelImg.style.display = 'none';
      }
    } else {
      nameEl.innerText = '';
      imgEl.style.display = 'none'; initialsEl.style.display = '';
      initialsEl.innerText = 'PS';
      if (acctPanelImg) acctPanelImg.style.display = 'none';
    }

    // hide branding dot if account avatar present
    try {
      const brandDot = document.querySelector('.brand-dot');
      if (brandDot) {
        if (acc && acc.image) brandDot.style.display = 'none';
        else brandDot.style.display = '';
      }
    } catch (e) { }

    // compute matched skills and jobs based on candidateProfile skills
    const acctSkillsEl = document.getElementById('acct-skills');
    const acctJobsEl = document.getElementById('acct-jobs');
    const accountMatchCount = document.getElementById('account-match-count');

    if (!acctSkillsEl || !acctJobsEl) return;
    acctSkillsEl.innerHTML = '';
    acctJobsEl.innerHTML = '';

    if (!skills || !skills.length) {
      acctSkillsEl.innerHTML = '<div style="font-size:12px;color:var(--ink-500);">Henüz beceri profili yok.</div>';
      if (accountMatchCount) accountMatchCount.style.display = 'none';
      return;
    }

    // matched skills: those present in any saved job
    const matchedSkills = new Set();
    const matchedJobs = [];
    const normSkills = skills.map(s => normalizeText(s));

    (jobs || []).forEach((job) => {
      const text = getJobSearchText(job);
      const jobMatched = [];
      normSkills.forEach((ns, idx) => {
        if (ns && text.includes(ns)) {
          matchedSkills.add(skills[idx]);
          jobMatched.push(skills[idx]);
        }
      });
      if (jobMatched.length) {
        const info = scoreJobMatch(job, skills);
        matchedJobs.push({ job, score: info.score, matchedSkills: jobMatched });
      }
    });

    // render skills
    Array.from(matchedSkills).slice(0, 20).forEach((s) => {
      const el = document.createElement('div'); el.className = 'acct-skill'; el.innerText = s; acctSkillsEl.appendChild(el);
    });

    // render matched jobs
    matchedJobs.sort((a,b) => b.score - a.score).slice(0,6).forEach((m) => {
      const row = document.createElement('div'); row.className = 'acct-job';
      const left = document.createElement('div'); left.style.flex = '1'; left.style.marginRight = '8px'; left.innerText = `${m.job.title} — ${m.job.company}`;
      const right = document.createElement('div'); right.style.display = 'flex'; right.style.gap = '6px';
      const view = document.createElement('button'); view.className = 'btn-visit'; view.innerText = t('goToJob'); view.addEventListener('click', () => fetchJobDetailsAndShow(m.job.url));
      right.appendChild(view);
      row.appendChild(left); row.appendChild(right);
      acctJobsEl.appendChild(row);
    });

    if (accountMatchCount) {
      const cnt = matchedJobs.length;
      if (cnt > 0) { accountMatchCount.innerText = cnt; accountMatchCount.style.display = ''; }
      else { accountMatchCount.style.display = 'none'; }
    }
  });
}

// toggle panel when header-account clicked
document.getElementById('header-account').addEventListener('click', (e) => {
  const panel = document.getElementById('account-panel');
  if (!panel) return;
  if (panel.style.display === 'none' || !panel.style.display) {
    updateAccountUI(); panel.style.display = ''; // show
  } else panel.style.display = 'none';
});

// hide account panel on outside click
document.addEventListener('click', (e) => {
  const panel = document.getElementById('account-panel');
  const acct = document.getElementById('header-account');
  if (!panel || !acct) return;
  if (!panel.contains(e.target) && !acct.contains(e.target)) {
    panel.style.display = 'none';
  }
});

// ── JOBS ───────────────────────────────────────────────
function renderJobs(jobs) {
  const list = document.getElementById('job-list');
  if (jobs.length === 0) {
    const toggle = document.getElementById('profile-match-toggle');
    if (toggle && toggle.checked) {
      list.innerHTML = `<div class="empty-state"><div class="icon">🔎</div><p>${t('noMatchFound')}</p></div>`;
    } else if (currentJobSearchQuery) {
      list.innerHTML = `<div class="empty-state"><div class="icon">🔎</div><p>${t('noJobSearchResults')}</p></div>`;
    } else {
      list.innerHTML = `<div class="empty-state"><div class="icon">📋</div><p>${t('noJobsSaved')}</p></div>`;
    }
    return;
  }

  list.innerHTML = jobs.map((job, i) => {
    const matchInfo = candidateProfile?.skills?.length ? scoreJobMatch(job, candidateProfile.skills) : { score: 0, matchedSkills: [] };
    const score = Math.min(matchInfo.score || 0, 100);
    return `
    <div class="job-card">
      <div class="match-top">
        <div style="min-width:0;">
          <div class="job-title" title="${h(job.title)}">${h(job.title)}</div>
          <div class="job-company">${h(job.company)}</div>
        </div>
        ${score > 0 ? `<span class="match-score">${t('fitScore', { score })}</span>` : ''}
      </div>
      <div class="meta">
        ${job.location ? `<span>📍 ${h(job.location)}</span>` : ''}
        ${job.workType ? `<span>💼 ${h(job.workType)}</span>` : ''}
        <span>📅 ${h(job.savedAt)}</span>
      </div>
      <div class="card-actions">
        <button class="btn-visit" data-url="${h(job.url)}">${t('goToJob')}</button>
        <button class="btn-del" data-i="${i}">${t('delete')}</button>
      </div>
    </div>
    `;
  }).join('');

  list.querySelectorAll('.btn-del').forEach((btn) =>
    btn.addEventListener('click', (e) => deleteJob(parseInt(e.target.dataset.i, 10)))
  );

  list.querySelectorAll('.btn-visit').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      const url = e.currentTarget.dataset.url;
      if (!url) return;
      fetchJobDetailsAndShow(url);
    })
  );
}

function deleteJob(index) {
  const job = allJobs[index];
  chrome.storage.local.get(['savedJobs'], (r) => {
    const jobs = (r.savedJobs || []).filter((j) => j.url !== job.url);
    chrome.storage.local.set({ savedJobs: jobs }, loadAll);
  });
}

function exportJobsCSV() {
  if (!allJobs.length) { alert(t('noJobExport')); return; }
  const header = currentLang === 'en'
    ? ['Title', 'Company', 'Location', 'Work Type', 'Saved Date', 'Link']
    : ['Baslik', 'Sirket', 'Konum', 'Calisma Tipi', 'Kayit Tarihi', 'Link'];
  const rows = allJobs.map((j) => [
    `"${(j.title || '').replace(/"/g, '""')}"`,
    `"${(j.company || '').replace(/"/g, '""')}"`,
    `"${(j.location || '').replace(/"/g, '""')}"`,
    `"${(j.workType || '').replace(/"/g, '""')}"`,
    `"${(j.savedAt || '').replace(/"/g, '""')}"`,
    `"${(j.url || '').replace(/"/g, '""')}"`
  ].join(','));
  downloadCSV([header.join(','), ...rows].join('\n'), 'linkedin_ilanlar');
}

function saveCurrentLinkedInJob() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs && tabs[0];
    if (!tab || !tab.id || !tab.url || !tab.url.includes('linkedin.com/jobs/')) {
      alert(currentLang === 'en'
        ? 'Open a LinkedIn job page first.'
        : 'Önce bir LinkedIn iş ilanı sayfası aç.');
      return;
    }

    chrome.tabs.sendMessage(tab.id, { type: 'LJS_GET_JOB' }, (response) => {
      const hasRuntimeError = chrome.runtime.lastError;
      if (hasRuntimeError || !response || !response.ok || !response.job) {
        alert(currentLang === 'en'
          ? 'Could not read the current job page.'
          : 'Açık ilan sayfası okunamadı.');
        return;
      }

      const job = response.job;
      chrome.storage.local.get(['savedJobs'], (result) => {
        const jobs = result.savedJobs || [];
        if (jobs.some((savedJob) => savedJob.url === job.url)) {
          alert(currentLang === 'en'
            ? 'This job is already saved in the extension.'
            : 'Bu ilan zaten eklentide kayıtlı.');
          return;
        }

        jobs.unshift(job);
        chrome.storage.local.set({ savedJobs: jobs }, () => {
          allJobs = jobs;
          renderJobs(allJobs);
          refreshMatches();
          showInlineToast(currentLang === 'en' ? 'Job saved to extension.' : 'İlan eklentiye kaydedildi.');
        });
      });
    });
  });
}

function openLinkedInJobsSearch() {
  const query = (document.getElementById('job-search').value || '').trim();
  const mode = document.getElementById('job-search-mode')?.value || 'jobs';
  if (!query) {
    alert(currentLang === 'en' ? 'Type a role or company name first.' : 'Önce bir pozisyon veya şirket adı yaz.');
    return;
  }

  const url = mode === 'companies'
    ? `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(query)}`
    : `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}`;
  chrome.tabs.create({ url });
}

// ── PROFILES ───────────────────────────────────────────
function renderProfiles(profiles) {
  const list = document.getElementById('profile-list');
  if (profiles.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="icon">👤</div><p>${t('noProfilesSaved')}</p></div>`;
    return;
  }
  list.innerHTML = profiles.map((p, i) => `
    <div class="profile-card">
      <div class="profile-name">${h(p.name)}</div>
      ${p.headline ? `<div class="profile-headline" title="${h(p.headline)}">${h(p.headline)}</div>` : ''}
      <div class="meta">
        ${p.location ? `<span>📍 ${h(p.location)}</span>` : ''}
        <span>📅 ${h(p.savedAt)}</span>
      </div>
      <textarea class="profile-note" rows="2" placeholder="${h(t('addNotePlaceholder'))}" data-i="${i}">${h(p.note || '')}</textarea>
      <div class="card-actions">
        ${p.url ? `<a class="btn-visit-profile" href="${h(p.url)}" target="_blank">${t('goToProfile')}</a>` : ''}
        <button class="btn-save-note" data-i="${i}">${t('saveNote')}</button>
        <button class="btn-del" data-i="${i}">${t('delete')}</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.btn-save-note').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      const i = parseInt(e.target.dataset.i, 10);
      const note = list.querySelector(`textarea[data-i="${i}"]`).value;
      saveNote(i, note);
    })
  );
  list.querySelectorAll('.btn-del').forEach((btn) =>
    btn.addEventListener('click', (e) => deleteProfile(parseInt(e.target.dataset.i, 10)))
  );
}

function addProfile() {
  const name = document.getElementById('inp-name').value.trim();
  const headline = document.getElementById('inp-title').value.trim();
  let url = document.getElementById('inp-url').value.trim();

  if (!name) { alert(t('nameRequired')); return; }
  if (url && !url.startsWith('http')) url = 'https://' + url;
  if (url && allProfiles.some((p) => p.url === url)) {
    alert(t('duplicateProfile')); return;
  }

  const profile = {
    name,
    headline,
    location: '',
    url,
    note: '',
    savedAt: new Date().toLocaleDateString(getLocale())
  };

  chrome.storage.local.get(['savedProfiles'], (r) => {
    const profiles = r.savedProfiles || [];
    profiles.unshift(profile);
    chrome.storage.local.set({ savedProfiles: profiles }, () => {
      document.getElementById('inp-name').value = '';
      document.getElementById('inp-title').value = '';
      document.getElementById('inp-url').value = '';
      loadAll();
    });
  });
}

function saveNote(index, note) {
  const profile = allProfiles[index];
  chrome.storage.local.get(['savedProfiles'], (r) => {
    const profiles = r.savedProfiles || [];
    const ri = profiles.findIndex((p) => p.name === profile.name && p.savedAt === profile.savedAt);
    if (ri !== -1) {
      profiles[ri].note = note;
      chrome.storage.local.set({ savedProfiles: profiles }, () => {
        allProfiles = profiles;
        showInlineToast(t('noteSaved'));
      });
    }
  });
}

function deleteProfile(index) {
  const profile = allProfiles[index];
  chrome.storage.local.get(['savedProfiles'], (r) => {
    const profiles = (r.savedProfiles || []).filter(
      (p) => !(p.name === profile.name && p.savedAt === profile.savedAt)
    );
    chrome.storage.local.set({ savedProfiles: profiles }, loadAll);
  });
}

function exportProfilesCSV() {
  if (!allProfiles.length) { alert(t('noProfileExport')); return; }
  const header = currentLang === 'en'
    ? ['Full Name', 'Title', 'Location', 'Saved Date', 'Note', 'Link']
    : ['Ad Soyad', 'Unvan', 'Konum', 'Kayit Tarihi', 'Not', 'Link'];
  const rows = allProfiles.map((p) => [
    `"${(p.name || '').replace(/"/g, '""')}"`,
    `"${(p.headline || '').replace(/"/g, '""')}"`,
    `"${(p.location || '').replace(/"/g, '""')}"`,
    `"${(p.savedAt || '').replace(/"/g, '""')}"`,
    `"${(p.note || '').replace(/"/g, '""')}"`,
    `"${(p.url || '').replace(/"/g, '""')}"`
  ].join(','));
  downloadCSV([header.join(','), ...rows].join('\n'), 'linkedin_profiller');
}

// ── MATCHING ───────────────────────────────────────────
function normalizeText(text) {
  return (text || '')
    .toLocaleLowerCase(getLocale())
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeSearchText(text) {
  return normalizeText(text)
    .replace(/front[\s-]*end/g, 'frontend')
    .replace(/back[\s-]*end/g, 'backend')
    .replace(/full[\s-]*stack/g, 'fullstack')
    .replace(/c\s*\+\s*\+/g, 'c++')
    .replace(/\.net/g, 'dotnet');
}

function extractSkillsFromText(text) {
  const normalized = normalizeText(text);
  if (!normalized) return [];

  const found = new Set();
  SKILL_DICTIONARY.forEach((skill) => {
    const needle = normalizeText(skill);
    if (needle && normalized.includes(needle)) {
      found.add(skill);
    }
  });

  const commaTokens = normalized
    .split(/[\n,;|]/g)
    .map((s) => s.trim())
    .filter((s) => s.length >= 2 && s.length <= 32);

  commaTokens.forEach((token) => {
    if (token.includes(' ')) return;
    if (token.match(/^[a-z0-9+.#-]+$/i)) found.add(token);
  });

  return [...found].slice(0, 50);
}

function getJobSearchText(job) {
  return normalizeSearchText([
    job.title,
    job.company,
    job.location,
    job.workType,
    job.description,
    job.url
  ].join(' '));
}

function jobMatchesSearch(job, query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;

  const haystack = getJobSearchText(job);
  if (haystack.includes(normalizedQuery)) return true;

  const queryTokens = normalizedQuery.split(' ').filter(Boolean);
  return queryTokens.length > 0 && queryTokens.every((token) => haystack.includes(token));
}

function scoreJobMatch(job, skills) {
  const text = getJobSearchText(job);
  let score = 0;
  const matchedSkills = [];

  skills.forEach((skill) => {
    const needle = normalizeText(skill);
    if (!needle || needle.length < 2) return;
    if (text.includes(needle)) {
      matchedSkills.push(skill);
      score += 18;
      if (normalizeText(job.title).includes(needle)) {
        score += 8;
      }
    }
  });

  return { score, matchedSkills };
}

function inferJobSkills(job) {
  const text = getJobSearchText(job);
  return SKILL_DICTIONARY.filter((skill) => text.includes(normalizeText(skill))).slice(0, 12);
}

function generateOutreachMessage(match) {
  const job = match.job;
  const profileName = allProfiles[0]?.name || '';
  const matchedSkills = match.matchedSkills.slice(0, 3).join(', ');
  const missingSkills = getMissingSkillsForJob(job, candidateProfile?.skills || []);
  const introName = profileName ? `${profileName}, ` : '';

  if (currentLang === 'en') {
    return [
      `Hi ${job.company || 'there'} team,`,
      `${introName}I’m reaching out because the ${job.title || 'role'} looks like a strong match for my background in ${matchedSkills || 'relevant skills'}.`,
      missingSkills.length ? `I’m also actively building around ${missingSkills.slice(0, 3).join(', ')}.` : 'I believe I can contribute quickly from day one.',
      'I would love to connect and discuss how I can help your team.'
    ].join('\n');
  }

  return [
    `Merhaba ${job.company || 'ekip'},`,
    `${introName} ${job.title || 'bu pozisyon'} ilanının becerilerimle güçlü bir eşleşme olduğunu düşünüyorum: ${matchedSkills || 'ilgili yetkinlikler'}.`,
    missingSkills.length ? `Özellikle ${missingSkills.slice(0, 3).join(', ')} tarafında da kendimi geliştiriyorum.` : 'İlk günden katkı sağlayabileceğime inanıyorum.',
    'Uygun görürseniz kısa bir görüşme yapmayı isterim.'
  ].join('\n');
}

function getMissingSkillsForJob(job, skills) {
  const candidateSet = new Set((skills || []).map((skill) => normalizeText(skill)));
  return inferJobSkills(job).filter((skill) => !candidateSet.has(normalizeText(skill)));
}

function buildMatchInsight(match) {
  const jobSkills = inferJobSkills(match.job);
  const missingSkills = getMissingSkillsForJob(match.job, candidateProfile?.skills || []);
  const existingDraft = outreachState?.[match.job.url]?.message || '';
  const recommendation = match.score >= 70
    ? t('insightStrongMatch')
    : (missingSkills.length ? t('insightReviewManually') : t('insightReadyToSend'));

  return {
    jobSkills,
    missingSkills,
    recommendation,
    message: existingDraft || generateOutreachMessage(match)
  };
}

function saveOutreachState(job, nextState) {
  if (!job?.url) return;
  outreachState = {
    ...(outreachState || {}),
    [job.url]: {
      ...(outreachState?.[job.url] || {}),
      ...nextState,
      updatedAt: new Date().toISOString()
    }
  };

  chrome.storage.local.set({ outreachState }, () => {
    refreshMatches();
  });
}

function buildMatches() {
  const skills = candidateProfile?.skills || [];
  if (!skills.length || !allJobs.length) return [];

  return allJobs
    .map((job) => {
      const { score, matchedSkills } = scoreJobMatch(job, skills);
      return { job, score, matchedSkills };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 100);
}

function refreshMatches() {
  lastMatches = buildMatches();
  renderMatches(lastMatches);
  updateInsightPanel();
  updateBadges();
  try { updateProfileMatchCount(); } catch(e) { /* ignore if not yet defined */ }
  try { updateAccountUI(); } catch(e) { }
}

function updateInsightPanel() {
  const countEl = document.getElementById('insight-match-count');
  const averageEl = document.getElementById('insight-average-score');
  const recommendationEl = document.getElementById('insight-recommendation');

  if (!countEl || !averageEl || !recommendationEl) return;

  if (!candidateProfile?.skills?.length || !allJobs.length || !lastMatches.length) {
    countEl.innerText = '0';
    averageEl.innerText = '0%';
    recommendationEl.innerText = t('insightReviewManually');
    return;
  }

  const average = Math.round(lastMatches.reduce((sum, match) => sum + Math.min(match.score || 0, 100), 0) / lastMatches.length);
  const topMatch = lastMatches[0];
  const topInsight = buildMatchInsight(topMatch);

  countEl.innerText = String(lastMatches.length);
  averageEl.innerText = `${average}%`;
  recommendationEl.innerText = topInsight.recommendation;
}

function renderMatches(matches) {
  const list = document.getElementById('match-list');

  if (!candidateProfile?.skills?.length) {
    list.innerHTML = `<div class="empty-state"><div class="icon">🎯</div><p>${t('noSkillInfo')}</p></div>`;
    return;
  }

  if (!allJobs.length) {
    list.innerHTML = `<div class="empty-state"><div class="icon">📭</div><p>${t('noJobsForMatch')}</p></div>`;
    return;
  }

  if (!matches.length) {
    list.innerHTML = `<div class="empty-state"><div class="icon">🔎</div><p>${t('noMatchFound')}</p></div>`;
    return;
  }

  list.innerHTML = matches.map((m) => `
    <div class="match-card">
      ${(() => {
        const insight = buildMatchInsight(m);
        const status = outreachState?.[m.job.url]?.status || 'none';
        const statusLabel = status === 'draft' ? t('statusDraft') : (status === 'applied' ? t('statusApplied') : t('statusNone'));
        const missing = insight.missingSkills.slice(0, 3).join(', ') || '-';
        return `
      <div class="match-top">
        <div class="job-title" title="${h(m.job.title)}">${h(m.job.title)}</div>
        <span class="status-pill ${h(status)}">${h(statusLabel)}</span>
        <span class="match-score">${t('fitScore', { score: Math.min(m.score, 100) })}</span>
      </div>
      <div class="job-company">${h(m.job.company)}</div>
      <div class="meta">
        ${m.job.location ? `<span>📍 ${h(m.job.location)}</span>` : ''}
        ${m.job.workType ? `<span>💼 ${h(m.job.workType)}</span>` : ''}
      </div>
      <div class="skill-chips">
        ${m.matchedSkills.slice(0, 6).map((s) => `<span class="chip">${h(s)}</span>`).join('')}
      </div>
      <div class="match-insight">
        <div class="summary"><strong>${h(t('insightTitle'))}:</strong> ${h(insight.recommendation)}. ${h(t('insightMissingSkills', { skills: missing }))}</div>
        <div class="row">
          ${insight.jobSkills.slice(0, 4).map((skill) => `<span class="chip">${h(skill)}</span>`).join('')}
        </div>
        <textarea class="message-preview" readonly data-job-url="${h(m.job.url)}">${h(insight.message)}</textarea>
      </div>
      <div class="card-actions">
        <button class="btn-visit" data-url="${h(m.job.url)}">${t('goToJob')}</button>
        <button class="btn-save-note btn-copy-message" data-job-url="${h(m.job.url)}">${t('insightCopyMessage')}</button>
        <button class="btn-save-note btn-save-draft" data-job-url="${h(m.job.url)}">${t('insightSaveDraft')}</button>
        <button class="btn-del btn-mark-applied" data-job-url="${h(m.job.url)}">${t('insightMarkApplied')}</button>
      </div>
    </div>`;
      })()}
  `).join('');

  list.querySelectorAll('.btn-copy-message').forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const jobUrl = event.currentTarget.dataset.jobUrl;
      const match = matches.find((item) => item.job.url === jobUrl);
      if (!match) return;
      const message = buildMatchInsight(match).message;
      try {
        await navigator.clipboard.writeText(message);
        showInlineToast(t('insightCopyMessage'));
      } catch (error) {
        showInlineToast(t('insightCopyMessage'));
      }
    });
  });

  list.querySelectorAll('.btn-save-draft').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const jobUrl = event.currentTarget.dataset.jobUrl;
      const match = matches.find((item) => item.job.url === jobUrl);
      if (!match) return;
      saveOutreachState(match.job, { status: 'draft', message: buildMatchInsight(match).message });
      showInlineToast(t('insightDraftSaved'));
    });
  });

  list.querySelectorAll('.btn-mark-applied').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const jobUrl = event.currentTarget.dataset.jobUrl;
      const match = matches.find((item) => item.job.url === jobUrl);
      if (!match) return;
      saveOutreachState(match.job, { status: 'applied', message: buildMatchInsight(match).message });
      showInlineToast(t('insightAppliedSaved'));
    });
  });

  // attach visit handlers for matches as well
  list.querySelectorAll('.btn-visit').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      const url = e.currentTarget.dataset.url;
      if (!url) return;
      fetchJobDetailsAndShow(url);
    })
  );
}

async function fetchJobDetailsAndShow(url) {
  try {
    const job = await fetchJobDetailsFromUrl(url);
    showJobModal(job, url);
  } catch (e) {
    alert(currentLang === 'en' ? 'Could not load job details.' : 'Ilan detayları yüklenemedi.');
    console.error(e);
  }
}

async function fetchJobDetailsFromUrl(url) {
  const res = await fetch(url, { credentials: 'include' });
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const titleEl = doc.querySelector('h1') || doc.querySelector('[class*="job-title"]') || doc.querySelector('[class*="topcard__title"]');
  const companyEl = doc.querySelector('[class*="company-name"]') || doc.querySelector('[class*="topcard__org-name-link"]') || doc.querySelector('a[data-tracking-control-name*="company"]');
  const locationEl = doc.querySelector('[class*="topcard__flavor--bullet"]') || doc.querySelector('[class*="job-details"] [class*="location"]');
  const descriptionEl = doc.querySelector('[class*="show-more-less-html"]') || doc.querySelector('[class*="jobs-description"]') || doc.querySelector('[class*="description"]');

  return {
    title: titleEl?.innerText?.trim() || '',
    company: companyEl?.innerText?.trim() || '',
    location: locationEl?.innerText?.trim() || '',
    description: (descriptionEl?.innerText || '').trim().slice(0, 5000),
    url,
    savedAt: new Date().toLocaleDateString(getLocale())
  };
}

function showJobModal(job, url) {
  const modal = document.getElementById('job-modal');
  if (!modal) return;
  document.getElementById('job-modal-title').innerText = job.title || '—';
  document.getElementById('job-modal-company').innerText = job.company || '';
  document.getElementById('job-modal-meta').innerText = `${job.location || ''} · ${job.savedAt || ''}`;
  document.getElementById('job-modal-desc').innerText = job.description || '';
  modal.style.display = '';

  const saveBtn = document.getElementById('job-modal-save');
  const openBtn = document.getElementById('job-modal-open');
  const closeBtn = document.getElementById('job-modal-close');

  // remove previous listeners by cloning
  const saveClone = saveBtn.cloneNode(true);
  saveBtn.parentNode.replaceChild(saveClone, saveBtn);
  saveClone.addEventListener('click', () => {
    chrome.storage.local.get(['savedJobs'], (r) => {
      const jobs = r.savedJobs || [];
      if (jobs.some((j) => j.url === url)) {
        showInlineToast(currentLang === 'en' ? 'Already saved.' : 'Zaten kaydedildi.');
        return;
      }
      const toSave = { title: job.title || 'Başlık alınamadı', company: job.company || 'Şirket alınamadı', location: job.location || '', workType: '', description: job.description || '', url, savedAt: new Date().toLocaleDateString(getLocale()) };
      jobs.unshift(toSave);
      chrome.storage.local.set({ savedJobs: jobs }, () => {
        allJobs = jobs;
        renderJobs(allJobs);
        refreshMatches();
        showInlineToast(currentLang === 'en' ? 'Job saved.' : 'İlan kaydedildi.');
      });
    });
  });

  const openClone = openBtn.cloneNode(true);
  openBtn.parentNode.replaceChild(openClone, openBtn);
  openClone.addEventListener('click', () => {
    chrome.tabs.create({ url });
  });

  const closeClone = closeBtn.cloneNode(true);
  closeBtn.parentNode.replaceChild(closeClone, closeBtn);
  closeClone.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

function saveCandidateSkills(skills, source, rawText) {
  const uniqueSkills = [...new Set(skills.map((s) => s.trim()).filter(Boolean))].slice(0, 50);
  if (!uniqueSkills.length) {
    alert(t('minOneSkill'));
    return;
  }

  candidateProfile = {
    source,
    skills: uniqueSkills,
    rawText: rawText || '',
    updatedAt: new Date().toLocaleString(getLocale())
  };

  chrome.storage.local.set({ candidateProfile }, () => {
    document.getElementById('inp-skills').value = uniqueSkills.join(', ');
    updateCandidateHint();
    refreshMatches();
    showInlineToast(t('skillUpdated'));
  });
}

function updateCandidateHint() {
  const hint = document.getElementById('skill-source-hint');
  const headerStatus = document.getElementById('header-status');

  if (!candidateProfile?.skills?.length) {
    hint.innerText = t('noProfileYet');
    if (headerStatus) {
      headerStatus.innerText = t('waitingSkillProfile');
    }
    return;
  }

  const sourceLabel = candidateProfile.source === 'linkedin' ? t('linkedinProfile') : (candidateProfile.source === 'cv' ? t('cvText') : t('manualInput'));
  hint.innerText = t('sourceLine', { source: sourceLabel, count: candidateProfile.skills.length, date: candidateProfile.updatedAt });
  if (headerStatus) {
    headerStatus.innerText = t('skillProfileActive', { count: candidateProfile.skills.length });
  }
}

function saveManualSkills() {
  const value = document.getElementById('inp-skills').value.trim();
  const parsed = value.split(/[\n,;|]/g).map((s) => s.trim()).filter(Boolean);
  saveCandidateSkills(parsed, 'manual', '');
}

function parseCvText() {
  const cvText = document.getElementById('inp-cv-text').value.trim();
  if (!cvText) {
    alert(t('pasteCv'));
    return;
  }
  const extracted = extractSkillsFromText(cvText);
  if (!extracted.length) {
    alert(t('cvNotParsed'));
    return;
  }
  saveCandidateSkills(extracted, 'cv', cvText.slice(0, 4000));
}

function readFromLinkedInProfile() {
  chrome.storage.local.get(['careerPulseLastTabId'], (saved) => {
    const tryTabIds = [];
    if (saved?.careerPulseLastTabId) {
      tryTabIds.push(saved.careerPulseLastTabId);
    }

    chrome.tabs.query({ url: ['https://www.linkedin.com/in/*'] }, (profileTabs) => {
      (profileTabs || []).forEach((tab) => {
        if (tab.id && !tryTabIds.includes(tab.id)) {
          tryTabIds.push(tab.id);
        }
      });

      if (!tryTabIds.length) {
        alert(t('openProfileTab'));
        return;
      }

      const tryNext = (index) => {
        const tabId = tryTabIds[index];
        if (!tabId) {
          alert(t('profileReadError'));
          return;
        }

        chrome.tabs.sendMessage(tabId, { type: 'LJS_EXTRACT_PROFILE' }, (response) => {
          const hasRuntimeError = chrome.runtime.lastError;
          if (hasRuntimeError || !response || !response.ok) {
            tryNext(index + 1);
            return;
          }

          const text = [
            response.profile?.headline,
            response.profile?.about,
            (response.profile?.skills || []).join(', ')
          ].join(' ');

          const extracted = [...new Set([...(response.profile?.skills || []), ...extractSkillsFromText(text)])];
          if (!extracted.length) {
            alert(t('noProfileSkill'));
            return;
          }

          saveCandidateSkills(extracted, 'linkedin', text.slice(0, 4000));
        });
      };

      tryNext(0);
    });
  });
}

function clearSkills() {
  if (!confirm(t('clearSkillConfirm'))) return;
  chrome.storage.local.remove(['candidateProfile'], () => {
    candidateProfile = null;
    document.getElementById('inp-skills').value = '';
    document.getElementById('inp-cv-text').value = '';
    refreshMatches();
    updateCandidateHint();
  });
}

function exportMatchesCSV() {
  if (!lastMatches.length) {
    alert(t('noMatchExport'));
    return;
  }
  const header = currentLang === 'en'
    ? ['Fit Score', 'Matched Skills', 'Title', 'Company', 'Location', 'Work Type', 'Link']
    : ['Uyum Puani', 'Eslesen Beceriler', 'Baslik', 'Sirket', 'Konum', 'Calisma Tipi', 'Link'];
  const rows = lastMatches.map((m) => [
    `"${m.score}"`,
    `"${m.matchedSkills.join(' | ').replace(/"/g, '""')}"`,
    `"${(m.job.title || '').replace(/"/g, '""')}"`,
    `"${(m.job.company || '').replace(/"/g, '""')}"`,
    `"${(m.job.location || '').replace(/"/g, '""')}"`,
    `"${(m.job.workType || '').replace(/"/g, '""')}"`,
    `"${(m.job.url || '').replace(/"/g, '""')}"`
  ].join(','));
  downloadCSV([header.join(','), ...rows].join('\n'), 'linkedin_uygun_ilanlar');
}

// ── SEARCH ─────────────────────────────────────────────
document.getElementById('job-search').addEventListener('input', (e) => {
  applyJobSearchFilter();
});

function updateProfileMatchCount() {
  const el = document.getElementById('profile-match-count');
  const toggle = document.getElementById('profile-match-toggle');
  if (!el) return;
  const skills = candidateProfile?.skills || [];
  if (!skills.length) { el.style.display = 'none'; return; }
  const count = allJobs.filter((j) => (scoreJobMatch(j, skills).score || 0) > 0).length;
  if (count > 0) {
    el.innerText = count;
    el.style.display = '';
  } else {
    el.style.display = 'none';
  }
}

function applyJobSearchFilter() {
  currentJobSearchQuery = document.getElementById('job-search').value || '';
  const toggle = document.getElementById('profile-match-toggle');
  const hasProfile = candidateProfile?.skills?.length;

  let results = allJobs.slice();

  if (currentJobSearchQuery.trim()) {
    results = results.filter((job) => jobMatchesSearch(job, currentJobSearchQuery));
  }

  if (toggle && toggle.checked) {
    if (!hasProfile) {
      alert(t('noSkillInfo'));
      toggle.checked = false;
      renderJobs(results);
      return;
    }
    const scored = results
      .map((job) => ({ job, info: scoreJobMatch(job, candidateProfile.skills) }))
      .filter((s) => (s.info?.score || 0) > 0)
      .sort((a, b) => (b.info.score || 0) - (a.info.score || 0))
      .map((s) => s.job);
    renderJobs(scored);
  } else {
    renderJobs(results);
  }
  updateProfileMatchCount();
}

document.getElementById('profile-match-toggle').addEventListener('change', () => applyJobSearchFilter());

document.getElementById('profile-search').addEventListener('input', (e) => {
  const q = normalizeText(e.target.value);
  renderProfiles(allProfiles.filter((p) =>
    normalizeText(p.name).includes(q) ||
    normalizeText(p.headline).includes(q) ||
    normalizeText(p.note).includes(q)
  ));
});

document.getElementById('match-search').addEventListener('input', (e) => {
  const q = normalizeText(e.target.value);
  if (!q) {
    renderMatches(lastMatches);
    return;
  }

  const filtered = lastMatches.filter((m) => {
    const hay = normalizeText([
      m.job.title,
      m.job.company,
      m.job.location,
      m.job.workType,
      m.matchedSkills.join(' ')
    ].join(' '));
    return hay.includes(q);
  });
  renderMatches(filtered);
});

// ── HELPERS ────────────────────────────────────────────
function h(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function downloadCSV(content, name) {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${name}_${new Date().toLocaleDateString(getLocale()).replace(/[./]/g, '-')}.csv`;
  a.click();
}

function showInlineToast(msg) {
  const t = document.createElement('div');
  t.innerText = msg;
  t.style.cssText = 'position:fixed;bottom:12px;right:12px;background:#057642;color:white;padding:8px 14px;border-radius:8px;font-size:12px;z-index:9999;';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// ── EVENTS ─────────────────────────────────────────────
document.getElementById('btn-add-profile').addEventListener('click', addProfile);
document.getElementById('inp-url').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addProfile();
});

document.getElementById('btn-save-skills').addEventListener('click', saveManualSkills);
document.getElementById('btn-parse-cv').addEventListener('click', parseCvText);
document.getElementById('btn-read-linkedin').addEventListener('click', readFromLinkedInProfile);
document.getElementById('btn-clear-skills').addEventListener('click', clearSkills);
// New: sync from account (open profile page then extract)
document.getElementById('btn-sync-linkedin').addEventListener('click', openAndReadLinkedInProfile);
// New: CV file upload (plain text)
document.getElementById('cv-file-input').addEventListener('change', (e) => handleCvFile(e.target.files && e.target.files[0]));

document.getElementById('btn-export-jobs').addEventListener('click', exportJobsCSV);
document.getElementById('btn-save-current-job').addEventListener('click', saveCurrentLinkedInJob);
document.getElementById('btn-open-linkedin-search').addEventListener('click', openLinkedInJobsSearch);
document.getElementById('btn-export-profiles').addEventListener('click', exportProfilesCSV);
document.getElementById('btn-export-matches').addEventListener('click', exportMatchesCSV);

document.getElementById('btn-clear-jobs').addEventListener('click', () => {
  if (confirm(t('clearJobsConfirm'))) {
    chrome.storage.local.set({ savedJobs: [] }, loadAll);
  }
});

document.getElementById('btn-clear-profiles').addEventListener('click', () => {
  if (confirm(t('clearProfilesConfirm'))) {
    chrome.storage.local.set({ savedProfiles: [] }, loadAll);
  }
});

const langSelectEl = document.getElementById('lang-select');
if (langSelectEl) {
  langSelectEl.addEventListener('change', (e) => {
    const nextLang = e.target.value === 'en' ? 'en' : 'tr';
    currentLang = nextLang;
    chrome.storage.local.set({ uiLang: currentLang }, () => {
      applyStaticTexts();
      renderJobs(allJobs);
      renderProfiles(allProfiles);
      refreshMatches();
      updateCandidateHint();
      updateBadges();
    });
  });
}

const refreshAccountBtn = document.getElementById('btn-refresh-account');
if (refreshAccountBtn) {
  refreshAccountBtn.addEventListener('click', () => {
    aggressiveFetchAccount().then((found) => {
      if (!found) {
        fetchLinkedInAccount();
        setTimeout(() => {
          const nameEl = document.getElementById('header-account-name');
          if (nameEl && !nameEl.innerText.trim()) {
            openAndFetchAccount();
          }
        }, 900);
      }
    });
  });
}

const themeToggleBtn = document.getElementById('btn-theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const next = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });
}

async function aggressiveFetchAccount() {
  return new Promise((resolve) => {
    chrome.tabs.query({ url: ['https://www.linkedin.com/*'] }, (tabs) => {
      const tabIds = (tabs || []).map((t) => t.id).filter(Boolean);
      if (!tabIds.length) return resolve(false);

      let done = false;
      const tryTab = (i) => {
        const tabId = tabIds[i];
        if (!tabId) return resolve(false);
        try {
          chrome.scripting.executeScript({
            target: { tabId },
            func: () => {
              const selList = [
                'header [data-test-global-nav-profile-link]','a.global-nav__me-link','a[href^="/in/"]',
                'div.pv-top-card--list li.inline.t-24 a','div.ph5.pb5 img',
                'img.pv-top-card-profile-picture__image','button[aria-label^="Me"] img',
                'img.global-nav__me-photo','img.presence-entity__image'
              ];
              let name = '';
              let url = '';
              let image = '';
              for (const sel of selList) {
                const el = document.querySelector(sel);
                if (el) {
                  name = (el.innerText || el.alt || el.getAttribute('aria-label') || '').trim();
                  url = el.getAttribute && el.getAttribute('href') || '';
                  const img = el.tagName === 'IMG' ? el : el.querySelector && el.querySelector('img');
                  if (img && img.src) image = img.src;
                  if (url && url.startsWith('/')) url = window.location.origin + url;
                  if (name || image || url) break;
                }
              }
              // fallback: try meta tags
              if (!name) {
                const metaName = document.querySelector('meta[property="og:site_name"]') || document.querySelector('meta[name="title"]');
                if (metaName && metaName.content) name = metaName.content;
              }
              return { name, url, image };
            }
          }, (res) => {
            // Debug logging
            const dbg = (m) => {
              const el = document.getElementById('debug-output');
              if (!el) return; el.style.display = ''; el.innerText += m + "\n";
            };
            try {
              dbg(`tab ${tabId} -> executeScript result: ${JSON.stringify(res && res[0] && res[0].result).slice(0,200)}`);
              const r = res && res[0] && res[0].result;
              if (r && (r.name || r.image || r.url)) {
                const nm = r.name || '';
                const url = r.url || '';
                const img = r.image || '';
                updateHeaderAccount(nm, url);
                if (img) {
                  const imgEl = document.getElementById('header-account-img');
                  if (imgEl) { imgEl.src = img; imgEl.style.display = ''; }
                }
                chrome.storage.local.set({ linkedInAccount: { name: nm, url, image: img, updatedAt: new Date().toISOString() } });
                done = true;
                dbg('account found via executeScript');
                return resolve(true);
              }
            } catch (e) {
              dbg('executeScript parse error');
            }
            if (!done) {
              // try next tab
              if (i + 1 < tabIds.length) tryTab(i + 1);
              else { dbg('no account found in any tab'); resolve(false); }
            }
          });
        } catch (err) {
          const el = document.getElementById('debug-output'); if (el) { el.style.display = ''; el.innerText += `scripting error on tab ${tabId}: ${String(err)}\n`; }
          if (i + 1 < tabIds.length) tryTab(i + 1); else resolve(false);
        }
      };
      tryTab(0);
    });
  });
}

// ── INIT ───────────────────────────────────────────────
loadAll();

// --- Account-sync implementation ---
function openAndReadLinkedInProfile() {
  // Open the canonical self profile URL; LinkedIn will redirect to the logged-in user's profile
  chrome.tabs.create({ url: 'https://www.linkedin.com/in/me' }, (tab) => {
    if (!tab || !tab.id) {
      alert(t('profileReadError'));
      return;
    }

    const waitAndAttempt = (attemptsLeft = 8) => {
      if (attemptsLeft <= 0) { alert(t('profileReadError')); return; }
      chrome.tabs.sendMessage(tab.id, { type: 'LJS_EXTRACT_PROFILE' }, (response) => {
        const hasRuntimeError = chrome.runtime.lastError;
        if (hasRuntimeError || !response || !response.ok) {
          // try again shortly
          setTimeout(() => waitAndAttempt(attemptsLeft - 1), 900);
          return;
        }
        const text = [response.profile?.headline, response.profile?.about, (response.profile?.skills || []).join(', ')].join(' ');
        const extracted = [...new Set([...(response.profile?.skills || []), ...extractSkillsFromText(text)])];
        if (!extracted.length) { alert(t('noProfileSkill')); return; }
        saveCandidateSkills(extracted, 'linkedin', text.slice(0, 4000));
      });
    };

    // give the page a moment to load, then start attempting extraction
    setTimeout(() => waitAndAttempt(), 900);
  });
}

// --- CV file handling (plain text only for now) ---
function handleCvFile(file) {
  if (!file) return;
  const name = (file.name || '').toLowerCase();
  if (name.endsWith('.txt')) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = String(ev.target.result || '');
      document.getElementById('inp-cv-text').value = text.slice(0, 20000);
      const extracted = extractSkillsFromText(text);
      if (!extracted.length) { alert(t('cvNotParsed')); return; }
      saveCandidateSkills(extracted, 'cv', text.slice(0, 4000));
    };
    reader.readAsText(file, 'utf-8');
    return;
  }

  alert('Sadece .txt destekleniyor şimdilik. PDF/DOCX desteği yakında eklenecek.');
}
