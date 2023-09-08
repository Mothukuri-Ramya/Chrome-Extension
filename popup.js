
document.addEventListener('DOMContentLoaded', function () {
  const collectDataButton = document.getElementById('collectDataButton');
  const statusMessage = document.getElementById('statusMessage');
  const likeCountInput = document.getElementById('likeCount');
  const commentCountInput = document.getElementById('commentCount');

  // Function to check if both input fields have valid values
  const areInputsValid = () => {
    return likeCountInput.value > 0 && commentCountInput.value > 0;
  };

  // Function to enable/disable the button based on input validity
  const updateButtonState = () => {
    collectDataButton.disabled = !areInputsValid();
  };

  // Add event listeners to input fields to check validity
  likeCountInput.addEventListener('input', updateButtonState);
  commentCountInput.addEventListener('input', updateButtonState);

  collectDataButton.addEventListener('click', function () {
    // Ensure both input fields have valid values
    if (!areInputsValid()) {
      statusMessage.textContent = 'Please enter valid counts.';
      return;
    }

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
