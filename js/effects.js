/**
 * effects.js - Custom visual effects for akugambar.co
 * Includes: Custom Cursor, Magnetic Buttons, and smooth interaction logic.
 */

document.addEventListener("DOMContentLoaded", () => {
    initCursor();
});

/**
 * Aesthetic Custom Cursor Logic
 * A sophisticated ring + dot cursor with smooth trailing and contextual feedback.
 */
function initCursor() {
    const cursor = document.createElement("div");
    const cursorRing = document.createElement("div");
    const cursorLabel = document.createElement("span");

    cursor.className = "custom-cursor-dot";
    cursorRing.className = "custom-cursor-ring";
    cursorLabel.className = "custom-cursor-label";
    cursorLabel.innerText = "VIEW";

    document.body.appendChild(cursor);
    document.body.appendChild(cursorRing);
    cursorRing.appendChild(cursorLabel);

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Smooth lerping
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        cursor.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

        requestAnimationFrame(animate);
    }
    animate();

    // Interaction feedbacks
    const handleMouseEnter = (e) => {
        const el = e.currentTarget;
        document.body.classList.add("cursor-active");

        if (el.classList.contains("work-card") || el.classList.contains("portfolio-card")) {
            document.body.classList.add("cursor-view-mode");
        }
    };

    const handleMouseLeave = () => {
        document.body.classList.remove("cursor-active", "cursor-view-mode");
    };

    const refreshListeners = () => {
        const interactables = document.querySelectorAll("a, button, .work-card, .portfolio-card, .chip, .faq-question");
        interactables.forEach((el) => {
            el.removeEventListener("mouseenter", handleMouseEnter);
            el.removeEventListener("mouseleave", handleMouseLeave);
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });
    };

    refreshListeners();

    // Handle dynamic content
    const observer = new MutationObserver(refreshListeners);
    const main = document.querySelector('main');
    if (main) observer.observe(main, { childList: true, subtree: true });
}
