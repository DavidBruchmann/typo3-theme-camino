/**
 * Class to handle the toggle for dark/light modes
 *
 * The class has a static bootstrap method which returns an object, but it can
 * be instantiated differently when the parameters are known,  look in the
 * constructor method about options.
 *
 * Using the bootstrap method:
 *     import ThemeManager from './ThemeManager.js';
 *     const themeObj = ThemeManager.bootstrap();
 */
export default class ThemeManager {

    static DEFAULT_STORAGE_KEY = 'user-theme';
    static DEFAULT_MODES = ['light', 'system', 'dark'];

    constructor(config = {}) {
        document.documentElement.classList.add('js-ready');
        this.storageKey = config.storageKey || ThemeManager.DEFAULT_STORAGE_KEY;
        this.modes = config.modes || ThemeManager.DEFAULT_MODES;
        this.init();
    }

    init() {
        const saved = localStorage.getItem(this.storageKey) || 'system';
        this.apply(saved);

        // Watch for OS theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
            if (this.current === 'system') this.apply('system');
        });

        this.attachListeners();
    }

    apply(theme) {
        this.current = theme;
        const button = document.querySelector('.theme-toggle-single');

        // 1. Set the global attributes
        document.documentElement.setAttribute('data-theme', theme);
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.setAttribute('data-color-mode', isDark ? 'dark' : 'light');

        // 2. Sync Tooltip: Find the span for the NEW theme and copy its tooltip to the button
        if (button) {
            const activeIcon = button.querySelector(`.icon-${theme}`);
            if (activeIcon) {
                const translation = activeIcon.getAttribute('data-tooltip');
                button.setAttribute('data-tooltip', translation);
            }
        }

        localStorage.setItem(this.storageKey, theme);
        this.syncUI();
    }

        cycle() {
            const index = this.modes.indexOf(this.current);
            const nextIndex = (index + 1) % this.modes.length;
            this.apply(this.modes[nextIndex]);
        }

    syncUI() {
        // Sync any radio or checkbox inputs on the page
        document.querySelectorAll(`input[name="theme"][value="${this.current}"]`)
            .forEach(el => el.checked = true);

        document.querySelectorAll('input[type="checkbox"][name="theme-toggle"]')
            .forEach(el => el.checked = (this.current === 'dark'));
    }

    attachListeners() {
        document.addEventListener('click', (e) => {
            const toggle = e.target.closest('.theme-toggle');

            // Cycle button click
            if (toggle?.classList.contains('theme-toggle-single')) {
                e.preventDefault();
                this.cycle();
            }

            // Radio button change
            if (e.target.name === 'theme') {
                this.apply(e.target.value);
            }
        });
    }

    /**
     * Reads TYPO3 CSS classes like 'js-1btn-3opt' to determine toggle-type
     * and modes
     */
    static getBootstrapConfig() {
        const el = document.querySelector('.theme-toggle');
        if (!el) return { modes: ThemeManager.DEFAULT_MODES };

        const jsClass = [...el.classList].find(c => c.startsWith('js-'));
        const match = jsClass?.match(/^js-([1-3])btn-([2-3])opt$/);

        if (match) {
            const options = parseInt(match[2]);
            return {
                modes: options === 2 ? ['light', 'dark'] : ['light', 'system', 'dark']
            };
        }
        return { modes: ThemeManager.DEFAULT_MODES };
    }

    static bootstrap() {
        const config = ThemeManager.getBootstrapConfig();
        return new ThemeManager(config);
    }
}

const themeObj = ThemeManager.bootstrap();
// console.log('themeObj', themeObj);
