document.getElementById('search').addEventListener('click', function() {
  chrome.runtime.sendMessage({}, function(response) {
    const div = document.getElementById('emails');
    div.textContent = 'Emails: ' + response.join(', ');
  });
});
