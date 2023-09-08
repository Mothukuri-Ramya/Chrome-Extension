
const extractProfileData = () => {
  // Replace these selectors with the actual ones on LinkedIn's website
  const profileName = document.querySelector('.profile-info .pv-top-card-section__name');
  const profileLocation = document.querySelector('.profile-info .pv-top-card-section__location');
  const profileAbout = document.querySelector('.profile-summary .pv-about__summary-text');
  const profileBio = document.querySelector('.pv-about-section .pv-about__description');
  const profileFollowerCount = document.querySelector('.pv-recent-activity-section .pv-recent-activity-section__follower-count');
  const profileConnectionCount = document.querySelector('.pv-recent-activity-section .pv-recent-activity-section__connection-count');
  const profileBioLine = document.querySelector('.pv-browsemap-section .pv-browsemap-section__member-headline');

  const profileData = {
    name: profileName ? profileName.textContent.trim() : '',
    location: profileLocation ? profileLocation.textContent.trim() : '',
    about: profileAbout ? profileAbout.textContent.trim() : '',
    bio: profileBio ? profileBio.textContent.trim() : '',
    followerCount: profileFollowerCount ? parseFloat(profileFollowerCount.textContent.trim()) : 0,
    connectionCount: profileConnectionCount ? parseFloat(profileConnectionCount.textContent.trim()) : 0,
    bioLine: profileBioLine ? profileBioLine.textContent.trim() : ''
  };
  console.log('Extracted profile data:', profileData);
  return profileData;
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message === 'extractData') {
    const extractedData = extractProfileData();
    chrome.runtime.sendMessage(extractedData);
  }
});
