let lastSaveTime = 0;
let lastAutoSavedUrl = '';
const MIN_SAVE_INTERVAL = 3000;

function getJobDetails() {
  const titleEl =
    document.querySelector('h1') ||
    document.querySelector('[class*="job-title"]') ||
    document.querySelector('[class*="topcard__title"]');

  const companyEl =
    document.querySelector('[class*="company-name"]') ||
    document.querySelector('[class*="topcard__org-name-link"]') ||
    document.querySelector('[class*="hiring-entity"]') ||
    document.querySelector('a[data-tracking-control-name*="company"]');

  const locationEl =
    document.querySelector('[class*="topcard__flavor--bullet"]') ||
    document.querySelector('[class*="job-details"] [class*="location"]') ||
    document.querySelector('[class*="tvm__text"]') ||
    document.querySelector('[class*="topcard__flavor"]:not([class*="channel"])');

  const workTypeEl =
    document.querySelector('[class*="workplace-type"]') ||
    document.querySelector('[class*="remote"]');

  const descriptionEl =
    document.querySelector('[class*="show-more-less-html"]') ||
    document.querySelector('[class*="jobs-description"]') ||
    document.querySelector('[class*="description"]');

  const title = titleEl?.innerText?.trim() || '';
  const company = companyEl?.innerText?.trim() || '';
  const location = locationEl?.innerText?.trim() || '';
  const workType = workTypeEl?.innerText?.trim() || '';
  const description = (descriptionEl?.innerText || '').trim().slice(0, 5000);

  console.log('[LJS] Bulunan bilgiler:', { title, company, location, workType, description });

  return {
    title: title || 'Başlık alınamadı',
    company: company || 'Şirket alınamadı',
    location,
    workType,
    description,
    url: window.location.href,
    savedAt: new Date().toLocaleDateString('tr-TR')
  };
}

function extractLinkedInProfile() {
  const isProfilePage = /linkedin\.com\/in\//i.test(window.location.href);
  if (!isProfilePage) {
    return { ok: false, error: 'Bu sekme LinkedIn profil sayfası değil.' };
  }

  const name =
    document.querySelector('h1')?.innerText?.trim() ||
    document.querySelector('[class*="text-heading"]')?.innerText?.trim() ||
    '';

  const headline =
    document.querySelector('[data-generated-suggestion-target]')?.innerText?.trim() ||
    document.querySelector('[class*="text-body-medium"]')?.innerText?.trim() ||
    '';

  const about =
    document.querySelector('[id="about"] ~ div')?.innerText?.trim() ||
    document.querySelector('[class*="inline-show-more-text"]')?.innerText?.trim() ||
    '';

  const skills = [...document.querySelectorAll('span, a')]
    .map((el) => (el.innerText || '').trim())
    .filter((s) => s.length > 1 && s.length < 40)
    .filter((s) => /[a-zA-ZçğıöşüÇĞİÖŞÜ]/.test(s))
    .slice(0, 400);

  return {
    ok: true,
    profile: {
      name,
      headline,
      about,
      skills,
      url: window.location.href
    }
  };
}

function extractLinkedInAccount() {
  const selectors = [
    'a[href^="/in/"][data-control-name]',
    'a[href^="/in/"]',
    'a.global-nav__me-link',
    'button[aria-label*="Me"] a[href^="/in/"]',
    'button[aria-label*="Profil"] a[href^="/in/"]',
    'img.global-nav__me-photo',
    'img.pv-top-card-profile-picture__image',
    'img.presence-entity__image'
  ];

  for (const selector of selectors) {
    const found = document.querySelector(selector);
    if (!found) continue;

    let name = (found.innerText || found.alt || found.getAttribute('aria-label') || '').trim();
    let url = found.getAttribute('href') || '';
    let image = found.src || '';

    const imgEl = found.querySelector ? found.querySelector('img') : null;
    if (!name && imgEl) {
      name = (imgEl.alt || imgEl.getAttribute('aria-label') || '').trim();
    }
    if (!image && imgEl && imgEl.src) {
      image = imgEl.src;
    }
    if (url && url.startsWith('/')) {
      url = window.location.origin + url;
    }
    if (name || url || image) {
      return {
        ok: true,
        accountName: name,
        accountUrl: url,
        accountImage: image
      };
    }
  }

  const metaName = document.querySelector('meta[property="og:title"]') || document.querySelector('meta[name="title"]');
  const name = (metaName?.content || '').trim();
  if (name) {
    return { ok: true, accountName: name, accountUrl: window.location.href, accountImage: '' };
  }

  return { ok: false };
}

function createSaveButton() {
  if (document.getElementById('ljs-save-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'ljs-save-btn';
  btn.innerText = '🔖 İlanı Kaydet';

  btn.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastSaveTime < MIN_SAVE_INTERVAL) {
      showToast('⏳ Lütfen biraz bekle...', 'warning');
      return;
    }
    lastSaveTime = now;

    const job = getJobDetails();

    if (job.title === 'Başlık alınamadı') {
      const devam = confirm('⚠️ İlan başlığı otomatik alınamadı.\n\nYine de URL ile kaydetmek ister misin?\n\n' + job.url);
      if (!devam) return;
    }

    chrome.storage.local.get(['savedJobs'], (result) => {
      const jobs = result.savedJobs || [];
      if (jobs.some(j => j.url === job.url)) {
        showToast('⚠️ Bu ilan zaten kaydedilmiş!', 'warning');
        return;
      }
      jobs.unshift(job);
      chrome.storage.local.set({ savedJobs: jobs }, () => {
        showToast('✅ İlan kaydedildi!', 'success');
        btn.innerText = '✅ Kaydedildi';
        btn.disabled = true;
      });
    });
  });

  document.body.appendChild(btn);
}

function isJobDetailPage() {
  return /linkedin\.com\/jobs\/view\//i.test(window.location.href) || /linkedin\.com\/jobs\/collections\//i.test(window.location.href);
}

function autoSaveCurrentJob() {
  if (!isJobDetailPage()) return;

  const job = getJobDetails();
  const currentUrl = job.url;

  if (!currentUrl || lastAutoSavedUrl === currentUrl) return;

  const titleIsMissing = job.title === 'Başlık alınamadı';
  const companyIsMissing = job.company === 'Şirket alınamadı';
  if (titleIsMissing && companyIsMissing) return;

  chrome.storage.local.get(['savedJobs'], (result) => {
    const jobs = result.savedJobs || [];
    if (jobs.some((savedJob) => savedJob.url === currentUrl)) {
      lastAutoSavedUrl = currentUrl;
      const saveBtn = document.getElementById('ljs-save-btn');
      if (saveBtn) {
        saveBtn.innerText = '✅ Kaydedildi';
        saveBtn.disabled = true;
      }
      return;
    }

    jobs.unshift(job);
    chrome.storage.local.set({ savedJobs: jobs }, () => {
      lastAutoSavedUrl = currentUrl;
      const saveBtn = document.getElementById('ljs-save-btn');
      if (saveBtn) {
        saveBtn.innerText = '✅ Kaydedildi';
        saveBtn.disabled = true;
      }
      showToast('✅ İlan eklentiye kaydedildi!', 'success');
    });
  });
}

function showToast(message, type) {
  const existing = document.getElementById('ljs-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'ljs-toast';
  toast.innerText = message;
  toast.className = 'ljs-toast ljs-toast-' + type;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function init() { setTimeout(() => { createSaveButton(); autoSaveCurrentJob(); }, 1500); }

if (window.location.href.includes('/jobs/')) {
  init();
}

let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    const oldBtn = document.getElementById('ljs-save-btn');
    if (oldBtn) oldBtn.remove();
    lastAutoSavedUrl = '';
    if (currentUrl.includes('/jobs/')) init();
  }
}).observe(document, { subtree: true, childList: true });

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'LJS_EXTRACT_PROFILE') {
    sendResponse(extractLinkedInProfile());
    return true;
  }
  if (message?.type === 'LJS_GET_JOB') {
    sendResponse({ ok: true, job: getJobDetails() });
    return true;
  }
  if (message?.type === 'LJS_GET_ACCOUNT') {
    sendResponse(extractLinkedInAccount());
    return true;
  }
  return false;
});
