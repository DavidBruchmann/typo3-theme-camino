const BREAKPOINT = 1280;

const body         = document.body;
const menuButtons  = document.querySelectorAll('.JS_header-menu-button');
const nav          = document.getElementById('navigation');
const subnavLinks  = document.querySelectorAll('.JS_header_subnav_link');
const languageDropdowns = document.querySelectorAll('.JS_header-language-dropdown');

(function() {
    const saved = localStorage.getItem('user-theme') || 'system';
    const isDark = saved === 'dark' || (saved === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
})();

if (menuButtons.length && nav) {
  const closeLanguageDropdown = languageDropdown => {
    const button = languageDropdown.querySelector('.JS_header-language-button');
    const menu = languageDropdown.querySelector('.JS_header-language-menu');

    languageDropdown.classList.remove('header__language-dropdown--open');

    if (button instanceof HTMLButtonElement) {
      button.setAttribute('aria-expanded', 'false');
    }

    if (menu instanceof HTMLElement) {
      menu.setAttribute('aria-hidden', 'true');
    }
  };

  const openLanguageDropdown = languageDropdown => {
    const button = languageDropdown.querySelector('.JS_header-language-button');
    const menu = languageDropdown.querySelector('.JS_header-language-menu');

    languageDropdown.classList.add('header__language-dropdown--open');

    if (button instanceof HTMLButtonElement) {
      button.setAttribute('aria-expanded', 'true');
    }

    if (menu instanceof HTMLElement) {
      menu.setAttribute('aria-hidden', 'false');
    }
  };

  const closeAllLanguageDropdowns = () => {
    languageDropdowns.forEach(closeLanguageDropdown);
  };

  languageDropdowns.forEach(languageDropdown => {
    const button = languageDropdown.querySelector('.JS_header-language-button');
    const menu = languageDropdown.querySelector('.JS_header-language-menu');

    if (!(button instanceof HTMLButtonElement) || !(menu instanceof HTMLElement)) {
      return;
    }

    button.addEventListener('click', event => {
      event.preventDefault();

      const isOpen = languageDropdown.classList.contains('header__language-dropdown--open');
      closeAllLanguageDropdowns();

      if (!isOpen) {
        openLanguageDropdown(languageDropdown);
      }
    });

    languageDropdown.addEventListener('focusout', event => {
      const nextTarget = event.relatedTarget;
      if (!(nextTarget instanceof Node) || !languageDropdown.contains(nextTarget)) {
        closeLanguageDropdown(languageDropdown);
      }
    });
  });

  document.addEventListener('click', event => {
    const clickTarget = event.target;
    if (!(clickTarget instanceof Node)) {
      return;
    }

    languageDropdowns.forEach(languageDropdown => {
      if (!languageDropdown.contains(clickTarget)) {
        closeLanguageDropdown(languageDropdown);
      }
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeAllLanguageDropdowns();
    }
  });

  const isMobile = () => window.innerWidth < BREAKPOINT;

  const updateScrollLock = () => {
    const menuOpen = nav.classList.contains('header__menu--open');
    body.style.overflow = menuOpen ? 'hidden' : '';
  };

/** NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW START */
/*
// Select your elements based on existing classes
const navItems = document.querySelectorAll('.JS_header-nav-list-item');
const subnavLinks = document.querySelectorAll('.JS_header_subnav_link');

// 1. IMPROVED SUBNAV TOGGLE (Mobile + Desktop Keyboard)
subnavLinks.forEach(link => {
  link.addEventListener('click', event => {
    // If it's mobile, keep your existing slide-in logic
    if (isMobile()) {
      event.preventDefault();
      const targetId = link.dataset.target;
      const subnav = document.getElementById(targetId);
      if (subnav) subnav.classList.toggle('header__subnav--active');
      return;
    }

    // DESKTOP LOGIC:
    // If a keyboard user hits "Enter" on the link itself, let it navigate.
    // If they hit "Space" (which triggers a click on buttons/summaries),
    // we let the <details> toggle naturally.
  });
});

// 2. DESKTOP ACCESSIBILITY & POLISH
navItems.forEach(item => {
  const details = item.querySelector('details');
  if (!details) return;

  // CLOSE ON ESCAPE: Standard accessibility for menus
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && details.hasAttribute('open')) {
      details.removeAttribute('open');
      item.querySelector('.header__nav-item').focus();
    }
  });

  // CLOSE ON CLICK OUTSIDE: Makes the menu feel "smart"
  document.addEventListener('click', (e) => {
    if (!item.contains(e.target) && details.hasAttribute('open')) {
      details.removeAttribute('open');
    }
  });

  // HOVER DELAY (Optional): Prevents the menu from flickering
  // if the mouse leaves for a split second.
  let timeout;
  item.addEventListener('mouseleave', () => {
    if (!isMobile()) {
      timeout = setTimeout(() => {
        details.removeAttribute('open');
      }, 300); // 300ms "grace period"
    }
  });

  item.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
  });
});
*/

/** NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW NEW END */


  // menu buttons
  menuButtons.forEach(menuButton => {
    menuButton.addEventListener('click', event => {
      if (!isMobile()) return;
      event.preventDefault();

      nav.classList.toggle('header__menu--open');
      menuButton.classList.toggle('header__menu-button--open');
      body.classList.toggle('body--menu-open');

      updateScrollLock();
    });
  });

  // toggle subnavigation
  subnavLinks.forEach(link => {
    link.addEventListener('click', event => {
      if (!isMobile()) return;
      event.preventDefault();

      const targetId = link.dataset.target;
      if (!targetId) return;

      const subnav = document.getElementById(targetId);
      if (!subnav) return;

      subnav.classList.toggle('header__subnav--active');
    });
  });
  /*
  */

  // Reset at desktop viewport
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      closeAllLanguageDropdowns();
      nav.classList.remove('header__menu--open');
      body.classList.remove('body--menu-open');
      body.style.overflow = '';

      menuButtons.forEach(btn => {
        btn.classList.remove('header__menu-button--open');
      });

      document
        .querySelectorAll('.JS_header-subnav.header__subnav--active')
        .forEach(openSubnav => {
          openSubnav.classList.remove('header__subnav--active');
        });
    }
  });
}
