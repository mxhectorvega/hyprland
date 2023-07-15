"use strict";

chrome.tabs.query({
  active: true,
  currentWindow: true
}, tabs => {
  if (tabs[0].url.toLowerCase().endsWith(".pdf")) {
    window.location = "popup-translate-document.html";
  }
});
chrome.runtime.sendMessage({
  action: "getTabMimeType"
}, mimeType => {
  checkedLastError();
  if (mimeType && mimeType.toLowerCase() === "application/pdf") {
    window.location = "popup-translate-document.html";
  }
});
//# sourceMappingURL=https://raw.githubusercontent.com/FilipePS/TWP---Source-Maps/main/maps/9.7.2/detect-pdf.js.map
