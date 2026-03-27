const themeToggleBtn = document.querySelector(".theme-toggle");
const themeToggleIcon = document.querySelector(".theme-toggle__icon");
const siteHeader = document.querySelector(".site-header");
const root = document.documentElement;

const THEME_KEY = "theme";

function setTheme(theme) {
    if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
        themeToggleIcon.innerHTML = '<i class="ri-sun-line"></i>';
        themeToggleBtn.setAttribute("aria-label", "Switch to light theme");
        themeToggleBtn.setAttribute("title", "Switch to light theme");
    } else {
        root.removeAttribute("data-theme");
        themeToggleIcon.innerHTML = '<i class="ri-moon-line"></i>';
        themeToggleBtn.setAttribute("aria-label", "Switch to dark theme");
        themeToggleBtn.setAttribute("title", "Switch to dark theme");
    }

    localStorage.setItem(THEME_KEY, theme);
}

function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemPrefersDark ? "dark" : "light";
}

const initialTheme = getPreferredTheme();
setTheme(initialTheme);

themeToggleBtn.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
});

let lastScrollY = window.scrollY;

function updateHeaderState() {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY;
    const hasScrolled = currentScrollY > 16;

    siteHeader.classList.toggle("is-scrolled", hasScrolled);

    if (currentScrollY <= 16) {
        siteHeader.classList.remove("is-hidden");
    } else if (isScrollingDown && currentScrollY > 96) {
        siteHeader.classList.add("is-hidden");
    } else {
        siteHeader.classList.remove("is-hidden");
    }

    lastScrollY = currentScrollY;
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });
