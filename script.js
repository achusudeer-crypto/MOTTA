const eggContainer =
    document.getElementById("eggContainer");

const muscleContainer =
    document.getElementById("muscleContainer");

const crack =
    document.getElementById("crack");

const titleContainer =
    document.getElementById("titleContainer");

const warning =
    document.getElementById("warning");

const sideTexts =
    document.querySelectorAll(".side-text");

const continueButton =
    document.getElementById("continueButton");

const actionContainer =
    document.getElementById("actionContainer");


// =========================
// INTRO ANIMATION
// =========================

// Warning appears (if element exists)
setTimeout(() => {
    if (warning) {
        warning.style.opacity = "1";
    }
}, 400);

// Side text appears (if elements exist)
setTimeout(() => {
    if (sideTexts && sideTexts.length > 0) {
        sideTexts.forEach(text => {
            text.style.opacity = "0.7";
        });
    }
}, 800);

// First brown egg rolls into centre
setTimeout(() => {
    if (eggContainer) {
        eggContainer.classList.add("roll");
    }
}, 1200);

// First egg reaches centre & bounces
setTimeout(() => {
    if (eggContainer) {
        eggContainer.classList.add("bounce");
    }
}, 3700);

// Second muscle egg appears on the pedestal
setTimeout(() => {
    if (muscleContainer) {
        muscleContainer.classList.add("show");
    }
}, 4300);

// First egg disappears
setTimeout(() => {
    if (eggContainer) {
        eggContainer.classList.add("hide");
    }
}, 5000);

// Crack effect
setTimeout(() => {
    if (crack) {
        crack.classList.add("show");
    }
}, 5600);

// MOTTA title and Pedestal dock appear together
setTimeout(() => {
    if (titleContainer) {
        titleContainer.classList.add("show");
    }
    if (actionContainer) {
        actionContainer.classList.add("show");
    }
}, 6200);


// =========================
// START GAME
// =========================

if (continueButton) {
    continueButton.addEventListener("click", () => {
        window.location.href = "game/game.html";
    });
}