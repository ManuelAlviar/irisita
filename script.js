/* =========================================================
   PARA IRIS — JAVASCRIPT
   ========================================================= */

/*
  CAMBIAR CANCIÓN:
  Reemplaza únicamente este ID.

  Ejemplo actual:
  https://www.youtube.com/watch?v=rYwXfmgNSVI

  ID:
  rYwXfmgNSVI
*/
const YOUTUBE_VIDEO_ID = "rYwXfmgNSVI";


/* =========================================================
   ELEMENTOS
   ========================================================= */

const app = document.getElementById("app");
const flower = document.getElementById("flower");
const revealButton = document.getElementById("revealButton");
const touchHint = document.getElementById("touchHint");

const letterPanel = document.getElementById("letterPanel");
const letterOverlay = document.getElementById("letterOverlay");
const closeLetterButton = document.getElementById("closeLetter");

const musicButton = document.getElementById("musicButton");
const musicText = musicButton.querySelector(".music-text");


/* =========================================================
   ESTADO
   ========================================================= */

let roseActivated = false;

let player = null;
let playerReady = false;
let wantsMusic = false;
let isMusicPlaying = false;


/* =========================================================
   YOUTUBE PLAYER API
   ========================================================= */

window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player("youtubePlayer", {
    width: "1",
    height: "1",

    videoId: YOUTUBE_VIDEO_ID,

    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      playlist: YOUTUBE_VIDEO_ID,
      playsinline: 1,
      rel: 0
    },

    events: {
      onReady: function () {
        playerReady = true;

        if (wantsMusic) {
          playMusic();
        }
      },

      onStateChange: function (event) {
        if (
          event.data === YT.PlayerState.PLAYING
        ) {
          setMusicState(true);
        }

        if (
          event.data === YT.PlayerState.PAUSED ||
          event.data === YT.PlayerState.ENDED
        ) {
          setMusicState(false);
        }
      },

      onAutoplayBlocked: function () {
        setMusicState(false);

        musicText.textContent =
          "Toca para escucharla";
      }
    }
  });
};


function setMusicState(playing) {
  isMusicPlaying = playing;

  musicButton.classList.toggle(
    "is-playing",
    playing
  );

  musicButton.setAttribute(
    "aria-label",
    playing
      ? "Pausar nuestra canción"
      : "Reproducir nuestra canción"
  );

  musicText.textContent =
    playing
      ? "Pausar canción"
      : "Nuestra canción";
}


function playMusic() {
  wantsMusic = true;

  if (!playerReady || !player) {
    return;
  }

  try {
    player.unMute();
    player.setVolume(62);
    player.playVideo();
  } catch (error) {
    setMusicState(false);
  }
}


function pauseMusic() {
  wantsMusic = false;

  if (!playerReady || !player) {
    return;
  }

  try {
    player.pauseVideo();
  } catch (error) {
    // No hacemos nada.
  }
}


function toggleMusic() {
  if (isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}


musicButton.addEventListener(
  "click",
  toggleMusic
);


/* =========================================================
   CARTA
   ========================================================= */

function openLetter() {
  letterPanel.classList.add("is-open");

  letterPanel.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";

  closeLetterButton.focus({
    preventScroll: true
  });
}


function closeLetter() {
  letterPanel.classList.remove("is-open");

  letterPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

  flower.focus({
    preventScroll: true
  });
}


closeLetterButton.addEventListener(
  "click",
  closeLetter
);

letterOverlay.addEventListener(
  "click",
  closeLetter
);

document.addEventListener(
  "keydown",
  function (event) {
    if (
      event.key === "Escape" &&
      letterPanel.classList.contains("is-open")
    ) {
      closeLetter();
    }
  }
);


/* =========================================================
   EFECTOS VISUALES
   ========================================================= */

function createSparkles() {
  const sparkleCount =
    window.innerWidth < 600
      ? 18
      : 30;

  for (
    let i = 0;
    i < sparkleCount;
    i++
  ) {
    const sparkle =
      document.createElement("span");

    sparkle.className = "spark";

    sparkle.style.left =
      `${Math.random() * 100}vw`;

    sparkle.style.top =
      `${Math.random() * 92}vh`;

    sparkle.style.animationDelay =
      `${-Math.random() * 4}s`;

    sparkle.style.animationDuration =
      `${2.6 + Math.random() * 4}s`;

    app.appendChild(sparkle);
  }
}


function createPetal(isBurst = false) {
  const petal =
    document.createElement("span");

  petal.className =
    "falling-petal";

  const leftPosition =
    isBurst
      ? 42 + Math.random() * 16
      : Math.random() * 100;

  petal.style.left =
    `${leftPosition}vw`;

  petal.style.setProperty(
    "--drift",
    `${(Math.random() - 0.5) * 190}px`
  );

  petal.style.animationDuration =
    isBurst
      ? `${2.7 + Math.random() * 1.3}s`
      : `${7 + Math.random() * 5}s`;

  petal.style.animationDelay =
    isBurst
      ? `${Math.random() * 0.4}s`
      : `${-Math.random() * 9}s`;

  petal.style.width =
    `${10 + Math.random() * 9}px`;

  petal.style.height =
    `${14 + Math.random() * 12}px`;

  app.appendChild(petal);

  if (isBurst) {
    setTimeout(
      function () {
        petal.remove();
      },
      4500
    );
  }
}


function createSymbolBurst() {
  const symbols = [
    "🤍",
    "✦",
    "♡"
  ];

  const count =
    window.innerWidth < 600
      ? 10
      : 14;

  for (
    let i = 0;
    i < count;
    i++
  ) {
    const symbol =
      document.createElement("span");

    symbol.className =
      "floating-symbol";

    symbol.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    symbol.style.left =
      `${46 + Math.random() * 8}%`;

    symbol.style.top =
      `${34 + Math.random() * 7}%`;

    symbol.style.setProperty(
      "--dx",
      `${(Math.random() - 0.5) * 230}px`
    );

    symbol.style.animationDelay =
      `${Math.random() * 0.28}s`;

    app.appendChild(symbol);

    setTimeout(
      function () {
        symbol.remove();
      },
      4200
    );
  }
}


/* =========================================================
   INTERACCIÓN PRINCIPAL
   ========================================================= */

function activateRose() {
  /*
    Intentamos iniciar la música desde el mismo
    gesto del usuario para maximizar compatibilidad.
  */
  playMusic();

  if (roseActivated) {
    openLetter();
    return;
  }

  roseActivated = true;

  touchHint.textContent =
    "Para Iris 🤍";

  for (
    let i = 0;
    i < 18;
    i++
  ) {
    createPetal(true);
  }

  createSymbolBurst();

  setTimeout(
    function () {
      openLetter();
    },
    850
  );
}


flower.addEventListener(
  "click",
  activateRose
);

revealButton.addEventListener(
  "click",
  activateRose
);


/* =========================================================
   INICIO
   ========================================================= */

const backgroundPetals =
  window.innerWidth < 600
    ? 10
    : 16;

for (
  let i = 0;
  i < backgroundPetals;
  i++
) {
  createPetal(false);
}

createSparkles();
