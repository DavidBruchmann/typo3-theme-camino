
(function() {
    const subNavLinks = document.querySelectorAll('ul#subnavigation-4 a');
    
    // 1. Function to apply the theme
    function applyTheme (themeName) {
        document.body.className = document.body.className.replace(/\btheme-\S+/g, '').trim();
        document.body.classList.add(themeName);
        localStorage.setItem('camino-theme', themeName);
    };

    // 2. Check for saved theme on page load
    const savedTheme = localStorage.getItem('camino-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // 3. Attach event listeners
    subNavLinks.forEach(link => {
       if (link.attributes.href.value.indexOf('theme-color-') > -1 || link.attributes.href.value.indexOf('theme-farbe-') > -1) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const themeName = 'theme-' + this.textContent.trim().toLowerCase().replace(/\s+/g, '-');
            applyTheme(themeName);
        });
      }
    });
  })();

      