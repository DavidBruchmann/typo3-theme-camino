
  (function() {
      const savedTheme = localStorage.getItem('camino-theme');
      if (savedTheme) {
          document.documentElement.classList.add(savedTheme);
          // Also add to body if your CSS specifically targets 'body.theme-...'
          document.addEventListener('DOMContentLoaded', () => {
              document.body.classList.add(savedTheme);
          });
      }
  })();
    