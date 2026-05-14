async function rememberTab(tabId) {
  if (tabId == null) return;
  await chrome.storage.local.set({ careerPulseLastTabId: tabId });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  await rememberTab(tabId);
});

chrome.action.onClicked.addListener(async (tab) => {
  await rememberTab(tab?.id);
});
