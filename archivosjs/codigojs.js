document.addEventListener("DOMContentLoaded", function () {

// ── Declaraciones globales ──
    const menuButton = document.querySelector(".menu-button");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.getElementById("menuOverlay");

// ── Pestañas de navegación (navbar + menú móvil) ──
    const tabs = document.querySelectorAll('.nav-links li a, .menu-nav-item');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelectorAll('.nav-links li a').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.menu-nav-item').forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            const href = tab.getAttribute('href');
            document.querySelectorAll(`a[href="${href}"]`).forEach(t => t.classList.add('active'));
            const pane = document.querySelector(href);
            if (pane) pane.classList.add('active');

            if (navMenu) navMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
        });
    });

// ── Botón de menú desplegable ──
    if (menuButton && navMenu) {
        menuButton.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
            if (menuOverlay) menuOverlay.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target)) {
                navMenu.classList.remove("active");
                if (menuOverlay) menuOverlay.classList.remove("active");
            }
        });
    }

// ── Acordeón de Education ──
    const items = document.querySelectorAll(".edu-item");
    items.forEach(item => {
        const question = item.querySelector(".edu-question");
        if (question) {
            question.addEventListener("click", () => {
                item.classList.toggle("active");
            });
        }
    });

});

// ── Mostrar toast al presionar copiar──
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastText = toast.querySelector('.toast-text');
        toastText.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

// ── Copiar dirección de wallet ──
    function copyToClipboard(address) {
        navigator.clipboard.writeText(address).then(() => {
            showToast('¡Dirección copiada!');
        });
    }

// ── Copiar email ──
    function copyEmail() {
        const email = document.querySelector('.social-item span').textContent;
        navigator.clipboard.writeText(email).then(() => {
            showToast('¡Correo copiado!');
        });
    }

// ── Mostrar/ocultar buscador ──
    function toggleSearch() {
        const box = document.getElementById('eduSearchBox');
        box.classList.toggle('visible');
        if (box.classList.contains('visible')) {
            document.getElementById('eduSearchInput').focus();
        }
    }

// ── Filtrar preguntas por texto ──
    function filterQuestions() {
        const input = document.getElementById('eduSearchInput').value.toLowerCase();
        const items = document.querySelectorAll('.edu-item');

        items.forEach(item => {
            const question = item.querySelector('.edu-question span').textContent.toLowerCase();
            item.style.display = question.includes(input) ? 'block' : 'none';
        });

        const categories = document.querySelectorAll('.edu-category');
        categories.forEach(cat => {
            const visibles = [...cat.querySelectorAll('.edu-item')].some(i => i.style.display !== 'none');
            cat.style.display = visibles ? 'block' : 'none';
        });
    }


