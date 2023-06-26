(function() {
  console.log("Running contentScript.js...");

  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  let emails = [];

  function extractEmails(node) {
    console.log(`Extracting emails from node: ${node}`);
    const nodeText = node.textContent;
    const foundEmails = nodeText.match(emailRegex);
    if (foundEmails) {
      console.log(`Found emails: ${foundEmails}`);
      emails = [...new Set([...emails, ...foundEmails])]; // Remove duplicates
      console.log(`Updated email list: ${emails}`);
    }
  }

  // Process the entire document initially
  console.log("Processing initial document...");
  extractEmails(document.body);

  // Process all future DOM changes
  const observer = new MutationObserver((mutations) => {
    console.log(`Processing ${mutations.length} mutations...`);
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        extractEmails(node);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  console.log("Mutation observer set up to process future DOM changes.");

  // Listen for a message from the popup or background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received message from popup or background script.");
    sendResponse(emails);
  });
})();
