document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Optional: Extra protection for keyboard + other events
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.shiftKey && e.key === 'C')) {
      e.preventDefault();
      return false;
    }
  });