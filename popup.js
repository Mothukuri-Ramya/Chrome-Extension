

document.addEventListener('DOMContentLoaded', function () {
  const collectDataButton = document.getElementById('collectDataButton');
  const statusMessage = document.getElementById('statusMessage');

  collectDataButton.addEventListener('click', function () {
    statusMessage.textContent = 'Collecting LinkedIn data...';
    const linkedinProfiles = [
      'https://www.linkedin.com/in/tejaswi-manda',
      'https://www.linkedin.com/in/divya-kallagunta-3187b820b/',
      'https://www.linkedin.com/in/mothukuri-ramya-b097b420b/'
    ];

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      for (const profileLink of linkedinProfiles) {
        chrome.tabs.create({ url: profileLink }, function (newTab) {
          // Execute script to extract data once the new tab is loaded
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            function: () => {
              chrome.runtime.sendMessage('extractData');
            }
          });
        });
      }
      statusMessage.textContent = 'Data collection completed.';
    });
  });
});








