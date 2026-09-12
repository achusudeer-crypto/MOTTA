const eggImage =
    document.getElementById("eggImage");

const crackedEggImage =
    document.getElementById("crackedEggImage");

const failedEggImage =
    document.getElementById("failedEggImage");

const timer =
    document.getElementById("timer");

const egg =
    document.getElementById("egg");

const message =
    document.getElementById("message");

const instruction =
    document.getElementById("instruction");

const startButton =
    document.getElementById("startButton");


/* =========================
   FAILURE SOUND
========================= */

const failSound =
    new Audio("../assets/soundhaha.mpeg");


/* =========================
   IDLE SOUND
========================= */

const idleSound =
    new Audio("../assets/hellosound.mpeg");


let timeLeft = 60;

let gameRunning = false;

let countdown = null;

let eggCracked = false;


/* =========================
   FAST CURSOR TRACKING
========================= */

let lastMouseX = null;
let lastMouseY = null;
let lastMouseTime = null;


/* =========================
   IDLE CURSOR TRACKING
========================= */

let lastMovementTime = null;

let idleTriggered = false;


/* =========================
   START BUTTON
========================= */

startButton.addEventListener(
    "click",
    startGame
);


/* =========================
   START GAME
========================= */

function startGame() {

    if (gameRunning) {
        return;
    }


    gameRunning = true;

    eggCracked = false;

    timeLeft = 60;


    /* RESET FAST CURSOR */

    lastMouseX = null;
    lastMouseY = null;
    lastMouseTime = null;


    /* RESET IDLE TIMER */

    lastMovementTime =
        Date.now();

    idleTriggered = false;


    /* RESET EGG */

    eggImage.style.display =
        "block";

    crackedEggImage.style.display =
        "none";

    failedEggImage.style.display =
        "none";


    /* RESET PEPPA ANIMATION */

    failedEggImage.classList.remove(
        "peppa-grow"
    );


    /* RESET TIMER */

    timer.textContent =
        timeLeft;


    /* HIDE BUTTON */

    startButton.style.display =
        "none";


    /* RESET TEXT */

    instruction.textContent =
        "don't touch the egg.";

    message.textContent =
        "okay... be careful.";


    /* RESET EGG ANIMATION */

    egg.classList.remove(
        "game-over"
    );


    startTimer();
}


/* =========================
   TIMER
========================= */

function startTimer() {

    clearInterval(countdown);


    countdown = setInterval(() => {

        timeLeft--;

        timer.textContent =
            timeLeft;


        if (timeLeft === 50) {

            message.textContent =
                "so far so good.";

        }


        if (timeLeft === 40) {

            message.textContent =
                "you're doing fine.";

        }


        if (timeLeft === 30) {

            message.textContent =
                "halfway there...";

        }


        if (timeLeft === 20) {

            message.textContent =
                "don't panic.";

        }


        if (timeLeft === 10) {

            message.textContent =
                "almost...";

        }


        if (timeLeft === 5) {

            message.textContent =
                "PLEASE.";

        }


        if (timeLeft === 1) {

            message.textContent =
                "ALMOST THERE...";

        }


        if (timeLeft <= 0) {

            endGame();

        }

    }, 1000);

}


/* =========================
   IDLE CHECK
========================= */

setInterval(() => {

    checkIdleTime();

}, 500);


/* =========================
   CHECK IDLE TIME
========================= */

function checkIdleTime() {

    if (!gameRunning) {
        return;
    }

    if (eggCracked) {
        return;
    }


    const idleTime =
        Date.now() - lastMovementTime;


    /* =========================
       20 SECONDS NO MOVEMENT
    ========================== */

    if (
        idleTime >= 20000 &&
        !idleTriggered
    ) {

        idleTriggered = true;


        /* PLAY HELLO SOUND */

        idleSound.currentTime = 0;

        idleSound.play()
            .catch(error => {

                console.log(
                    "Idle sound error:",
                    error
                );

            });


        /* MESSAGE */

        message.textContent =
            "HELLO?";


        /* =========================
           WAIT 8 SECONDS
           THEN CRACK
        ========================== */

        setTimeout(() => {

            if (!eggCracked) {

                crackEgg(true);

            }

        }, 8000);

    }

}


/* =========================
   MOUSE MOVEMENT
========================= */

document.addEventListener(
    "mousemove",
    handleMouseMove
);


/* =========================
   HANDLE MOUSE MOVE
========================= */

function handleMouseMove(event) {

    if (!gameRunning) {
        return;
    }

    if (eggCracked) {
        return;
    }


    /* =========================
       RESET IDLE TIMER
    ========================== */

    lastMovementTime =
        Date.now();


    /* CHECK EGG TOUCH */

    checkEggTouch(event);


    if (eggCracked) {
        return;
    }


    /* =========================
       FAST MOVEMENT
    ========================== */

    const currentTime =
        Date.now();


    if (
        lastMouseX !== null &&
        lastMouseY !== null &&
        lastMouseTime !== null
    ) {

        const distance =
            Math.sqrt(
                Math.pow(
                    event.clientX -
                    lastMouseX,
                    2
                ) +
                Math.pow(
                    event.clientY -
                    lastMouseY,
                    2
                )
            );


        const timeDifference =
            currentTime -
            lastMouseTime;


        if (timeDifference > 0) {

            const speed =
                distance /
                timeDifference;


            if (speed > 2.5) {

                message.textContent =
                    "TOO FAST.";

                crackEgg();

                return;

            }

        }

    }


    /* SAVE POSITION */

    lastMouseX =
        event.clientX;

    lastMouseY =
        event.clientY;

    lastMouseTime =
        currentTime;

}


/* =========================
   CURSOR TOUCHES EGG
========================= */

function checkEggTouch(event) {

    if (!gameRunning) {
        return;
    }

    if (eggCracked) {
        return;
    }


    const eggRect =
        egg.getBoundingClientRect();


    const cursorX =
        event.clientX;

    const cursorY =
        event.clientY;


    const touching =
        cursorX >= eggRect.left &&
        cursorX <= eggRect.right &&
        cursorY >= eggRect.top &&
        cursorY <= eggRect.bottom;


    if (touching) {

        crackEgg();

    }

}


/* =========================
   EGG CRACKS
========================= */

function crackEgg(idleFailure = false) {

    if (eggCracked) {
        return;
    }


    eggCracked = true;

    gameRunning = false;


    /* STOP TIMER */

    clearInterval(countdown);


    /* SHOW CRACKED EGG */

    eggImage.style.display =
        "none";

    crackedEggImage.style.display =
        "block";

    failedEggImage.style.display =
        "none";


    /* TIMER */

    timer.textContent =
        "💥";


    /* =========================
       TEXT
    ========================== */

    if (idleFailure) {

        instruction.textContent =
            "YOU DIDN'T TOUCH ME.";

        message.textContent =
            "I WAS WAITING. 💀";

    } else {

        instruction.textContent =
            "YOU TOUCHED IT.";

        message.textContent =
            "I TOLD YOU NOT TO.";

    }


    /* CRACK ANIMATION */

    egg.classList.add(
        "game-over"
    );


    /* =========================
       AFTER 1 SECOND
       PEPPA + FAILURE SOUND
    ========================== */

    setTimeout(() => {

        crackedEggImage.style.display =
            "none";


        failedEggImage.style.display =
            "block";


        /* RESET PEPPA ANIMATION */

        failedEggImage.classList.remove(
            "peppa-grow"
        );


        /* FORCE ANIMATION RESTART */

        void failedEggImage.offsetWidth;


        failedEggImage.classList.add(
            "peppa-grow"
        );


        /* PLAY FAILURE SOUND */

        failSound.currentTime = 0;

        failSound.play()
            .catch(error => {

                console.log(
                    "Failure sound error:",
                    error
                );

            });


        message.textContent =
            "HAHAHAHA. 💀";


    }, 1000);


    /* =========================
       TRY AGAIN
    ========================== */

    setTimeout(() => {

        message.textContent =
            "motta is cracked. 💀";


        startButton.textContent =
            "TRY AGAIN";


        startButton.style.display =
            "block";


    }, 2500);

}


/* =========================
   60 SECOND ENDING
========================= */

function endGame() {

    clearInterval(countdown);

    gameRunning = false;


    timer.textContent =
        "0";


    instruction.textContent =
        "you actually made it.";


    message.textContent =
        "wait...";


    setTimeout(() => {

        /* SHOW CRACKED EGG */

        eggImage.style.display =
            "none";

        crackedEggImage.style.display =
            "block";

        failedEggImage.style.display =
            "none";


        egg.classList.add(
            "game-over"
        );


        /* PLAY FAILURE SOUND */

        failSound.currentTime = 0;

        failSound.play()
            .catch(error => {

                console.log(
                    "Failure sound error:",
                    error
                );

            });


        message.textContent =
            "oh.";


    }, 700);


    setTimeout(() => {

        message.textContent =
            "the egg cracked anyway. 💀";


        startButton.textContent =
            "TRY AGAIN";


        startButton.style.display =
            "block";


    }, 1500);

}