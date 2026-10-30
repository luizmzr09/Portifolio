
// ==============================
// ELEMENTOS PRINCIPAIS
// ==============================

const root = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const projectFrame = document.getElementById("projectFrame");

const modalClose = document.getElementById("modalClose");
const modalCloseBottom = document.getElementById("modalCloseBottom");

const scrollProgress = document.getElementById("scrollProgress");

const appearanceToggle = document.getElementById("appearanceToggle");
const appearancePanel = document.getElementById("appearancePanel");
const colorPreset = document.getElementById("colorPreset");
const customBackground = document.getElementById("customBackground");
const appearanceReset = document.getElementById("appearanceReset");


// ==============================
// PROJETOS WEB
// ==============================

const projects = {
    sonical: {
        title: "Loja Sonical",
        src: "projetos/loja-sonical/index.html"
    },

    techshop: {
        title: "TechShop",
        src: "projetos/techshop/index.html"
    }
};


// ==============================
// TEMAS E APARÊNCIA
// ==============================

function updateThemeIcon(theme) {
    if (!themeIcon || !themeToggle) return;

    const isDark = theme === "dark" ||
        theme === "navy" ||
        theme === "graphite" ||
        theme === "green" ||
        theme === "purple";

    themeIcon.textContent = isDark ? "☼" : "☾";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Ativar tema claro" : "Ativar tema escuro"
    );
}


function saveAppearance(theme, color = null) {
    try {
        localStorage.setItem("portfolioTheme", theme);

        if (color) {
            localStorage.setItem("portfolioCustomColor", color);
        } else {
            localStorage.removeItem("portfolioCustomColor");
        }
    } catch (error) {
        console.warn("Não foi possível salvar a aparência.", error);
    }
}


function setTheme(theme, save = true) {
    root.dataset.theme = theme;

    // Remove personalizações anteriores
    root.style.removeProperty("--bg");
    root.style.removeProperty("--surface");
    root.style.removeProperty("--surface2");
    root.style.removeProperty("--text");
    root.style.removeProperty("--muted");
    root.style.removeProperty("--line");
    root.style.removeProperty("--soft");
    root.style.removeProperty("--header");

    if (theme === "custom") {
        const color = customBackground?.value || "#111827";

        const rgb = color.match(/[0-9a-f]{2}/gi).map(
            value => parseInt(value, 16)
        );

        const brightness =
            (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

        const isLight = brightness > 145;

        root.style.setProperty("--bg", color);
        root.style.setProperty(
            "--surface",
            `color-mix(in srgb, ${color}, ${isLight ? "#000000" : "#ffffff"} 5%)`
        );
        root.style.setProperty(
            "--surface2",
            `color-mix(in srgb, ${color}, ${isLight ? "#000000" : "#ffffff"} 10%)`
        );

        root.style.setProperty(
            "--text",
            isLight ? "#171a2b" : "#f3f5ff"
        );

        root.style.setProperty(
            "--muted",
            isLight ? "#646b83" : "#a4abc2"
        );

        root.style.setProperty(
            "--line",
            isLight
                ? "rgba(56, 66, 110, .15)"
                : "rgba(163, 174, 216, .15)"
        );

        root.style.setProperty(
            "--soft",
            `color-mix(in srgb, ${color}, ${isLight ? "#000000" : "#ffffff"} 15%)`
        );

        root.style.setProperty(
            "--header",
            `color-mix(in srgb, ${color} 88%, transparent)`
        );
    }

    updateThemeIcon(theme);

    if (colorPreset) {
        colorPreset.value = theme;
    }

    if (save) {
        saveAppearance(
            theme,
            theme === "custom" ? customBackground?.value : null
        );
    }
}


// Carrega a aparência salva

function loadAppearance() {
    try {
        const savedTheme = localStorage.getItem("portfolioTheme");
        const savedColor = localStorage.getItem("portfolioCustomColor");

        const validThemes = [
            "dark",
            "light",
            "navy",
            "graphite",
            "green",
            "purple",
            "custom"
        ];

        if (savedColor && customBackground) {
            customBackground.value = savedColor;
        }

        if (validThemes.includes(savedTheme)) {
            setTheme(savedTheme, false);
        } else {
            setTheme("dark", false);
        }

    } catch (error) {
        setTheme("dark", false);
    }
}


loadAppearance();


// Alterna entre claro e escuro

themeToggle?.addEventListener("click", () => {
    const currentTheme = root.dataset.theme;

    const nextTheme =
        currentTheme === "light" ? "dark" : "light";

    setTheme(nextTheme);
});


// Abre e fecha o painel de aparência

appearanceToggle?.addEventListener("click", () => {
    const isHidden = appearancePanel.hidden;

    appearancePanel.hidden = !isHidden;

    appearanceToggle.setAttribute(
        "aria-expanded",
        String(isHidden)
    );
});


// Seleciona um tema pronto

colorPreset?.addEventListener("change", () => {
    const selectedTheme = colorPreset.value;

    if (selectedTheme === "custom") {
        setTheme("custom");
    } else {
        setTheme(selectedTheme);
    }
});


// Escolhe uma cor personalizada

customBackground?.addEventListener("input", () => {
    if (colorPreset) {
        colorPreset.value = "custom";
    }

    setTheme("custom");
});


// Restaura a aparência original

appearanceReset?.addEventListener("click", () => {
    if (customBackground) {
        customBackground.value = "#111827";
    }

    setTheme("dark");
});


// Fecha o painel ao clicar fora dele

document.addEventListener("click", event => {
    if (
        appearancePanel &&
        appearanceToggle &&
        !appearancePanel.hidden &&
        !appearancePanel.contains(event.target) &&
        !appearanceToggle.contains(event.target)
    ) {
        appearancePanel.hidden = true;
        appearanceToggle.setAttribute("aria-expanded", "false");
    }
});


// ==============================
// MENU DE NAVEGAÇÃO
// ==============================

menuToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
});


navMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");

        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Abrir menu");

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }
    });
});


// ==============================
// MODAL DOS PROJETOS
// ==============================

function openProject(key) {
    const project = projects[key];

    if (!project || !modal || !projectFrame || !modalTitle) {
        return;
    }

    modalTitle.textContent = project.title;
    projectFrame.src = project.src;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    modalClose?.focus();
}


function closeProject() {
    if (!modal || !projectFrame) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    projectFrame.src = "about:blank";

    document.body.style.overflow = "";
}


// Botões que abrem os projetos

document.querySelectorAll("[data-project]").forEach(button => {
    button.addEventListener("click", () => {
        openProject(button.dataset.project);
    });
});


// Botões que fecham o modal

modalClose?.addEventListener("click", closeProject);

modalCloseBottom?.addEventListener("click", closeProject);

modal?.querySelector("[data-close-modal]")?.addEventListener(
    "click",
    closeProject
);


// Fecha com a tecla ESC

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        modal?.classList.contains("open")
    ) {
        closeProject();
    }
});


// ==============================
// BARRA DE PROGRESSO
// ==============================

function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollable > 0
        ? window.scrollY / scrollable * 100
        : 0;

    scrollProgress.style.width = `${progress}%`;
}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

updateScrollProgress();


// ==============================
// ANIMAÇÕES DE ENTRADA
// ==============================

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    document.querySelectorAll(".reveal").forEach(element => {
        revealObserver.observe(element);
    });

} else {
    document.querySelectorAll(".reveal").forEach(element => {
        element.classList.add("visible");
    });
}


// ==============================
// DESTAQUE DO MENU
// ==============================

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );
                });
            }
        });
    }, {
        rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}
