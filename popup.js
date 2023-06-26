document.getElementById('search').addEventListener('click', function() {
  console.log('Search button clicked.');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const tab = tabs[0];
    console.log(`Selected tab with id: ${tab.id}`);
    chrome.tabs.executeScript(tab.id, {file: 'contentScript.js'}, function() {
      console.log('contentScript.js injected.');
      chrome.tabs.sendMessage(tab.id, {}, function(response) {
        const div = document.getElementById('emails');
        if (response && response.length > 0) {
          console.log(`Received response with emails: ${response}`);
          div.textContent = 'Emails: ' + response.join(', ');
        } else {
          console.log('No emails found in the response.');
          div.textContent = 'No emails found.';
        }
      });
    });
  });
});
