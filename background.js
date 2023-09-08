
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message) {
    const apiUrl = 'http://localhost:3000/api/linkedin-profiles';

    const sendProfileData = async (data) => {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
        const responseData = await response.json();
        console.log('Data sent to API:', responseData);}
        else {
          console.error('Failed to send data to API:', response.statusText);
        }
      } 
      
      catch (error) {
        console.error('Error sending data to API:', error);
      }
    };

    sendProfileData(message);
  }
});
