chrome.runtime.onInstalled.addListener(async () => {
  let url = chrome.runtime.getURL("popup.html");
  let tab = await chrome.tabs.create({ url });
});
