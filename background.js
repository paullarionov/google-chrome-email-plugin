chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'document.body.innerHTML;'
  }, function(result) {
    const bodyText = result[0];
    const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = bodyText.match(emailRegex);

    if (emails && emails.length > 0) {
      alert('Found emails: ' + emails.join(', '));
    } else {
      alert('No emails found');
    }
  });
});
