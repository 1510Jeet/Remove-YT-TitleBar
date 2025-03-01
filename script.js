// Function to hide the YouTube title bar
function hideYouTubeTitleBar() {
    const titleBar = document.getElementsByClassName("ytp-chrome-top")[0];
    if (titleBar) {
      titleBar.style.visibility = "hidden";
      return true; // Successfully found and hid the element
    } else {
      return false; // Element not found
    }
  }
  
  // Function that attempts to hide the title bar multiple times
  function attemptHideWithRetry() {
    if (!hideYouTubeTitleBar()) {
      // If the element wasn't found, try again after a delay
      setTimeout(attemptHideWithRetry, 1000);
    }
  }
  
  // Start the initial attempt
  attemptHideWithRetry();
  
  // Also add a mutation observer to handle dynamic loading of videos
  const observer = new MutationObserver(function(mutations) {
    // When the DOM changes, try to hide the title bar again
    hideYouTubeTitleBar();
  });
  
  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // For YouTube's SPA (Single Page Application) navigation
  // Add an event listener for URL changes
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      attemptHideWithRetry();
    }
  }).observe(document, {subtree: true, childList: true});
  