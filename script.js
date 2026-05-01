/* ============================================================
   CODEPEN NOTE: Add this URL in Settings > JS > External Script:
   https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js
============================================================ */

/* =============================================================
   1. SKILLS BARS
   Edit pct (0–100), name, icon, color, and note to customize.
   Add/remove objects to add/remove skills.
============================================================= */
const skills = [
  {
    name: 'Scratch (Blocks)',
    icon: '🟦',
    pct: 90,
    color: 'linear-gradient(90deg, #4c97ff, #9966ff)',
    note: 'First language — very comfortable'
  },
  {
    name: 'Python',
    icon: '🐍',
    pct: 75,
    color: 'linear-gradient(90deg, #306998, #ffd43b)',
    note: 'Solid fundamentals, still learning'
  },
  {
    name: 'Java (FTC)',
    icon: '☕',
    pct: 55,
    color: 'linear-gradient(90deg, #f89820, #e76f00)',
    note: 'Used for FTC robotics coding'
  },
  {
    name: 'C++ (Arduino)',
    icon: '🔩',
    pct: 45,
    color: 'linear-gradient(90deg, #00599c, #0078d7)',
    note: 'Hardware coding, knowing more little by little'
  },
  {
    name: 'HTML / CSS / JS',
    icon: '🌐',
    pct: 40,
    color: 'linear-gradient(90deg, #e34c26, #2563eb)',
    note: 'Still learning, but this portfolio is the proof!'
  },
];

const skillsContainer = document.getElementById('skills-container');
skills.forEach(s => {
  const row = document.createElement('div');
  row.className = 'skill-row';
  row.innerHTML = `
    <div>
      <div class="skill-name">
        <span class="skill-icon">${s.icon}</span>${s.name}
      </div>
      <div class="skill-note">${s.note}</div>
    </div>
    <div class="skill-bar-track">
      <div class="skill-bar-fill" data-pct="${s.pct}"
           style="background:${s.color}"></div>
    </div>
    <div class="skill-pct">${s.pct}%</div>
  `;
  skillsContainer.appendChild(row);
});

const skillTrigger = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
      skillTrigger.disconnect();
    }
  });
}, { threshold: 0.3 });
skillTrigger.observe(skillsContainer);


/* =============================================================
   2. SCROLL FADE-IN
============================================================= */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


/* =============================================================
   3. DARK / LIGHT MODE TOGGLE
============================================================= */
const themeBtn = document.getElementById('theme-btn');
let isDark = true;

themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '🌙' : '☀️';
});


/* =============================================================
   4. CROW RAIN EFFECT
============================================================= */
const crowBtn = document.getElementById('crow-btn');
const rainContainer = document.getElementById('crow-rain');
let crowRaining = false;
let crowInterval = null;

function spawnCrow() {
  const crow = document.createElement('div');
  crow.className = 'falling-crow';
  crow.textContent = ['🪶', '🪶', '🪶'][Math.floor(Math.random() * 1)];
  crow.style.left = Math.random() * 100 + 'vw';
  const dur = 2.5 + Math.random() * 2;
  crow.style.animationDuration = dur + 's';
  crow.style.fontSize = (1.2 + Math.random() * 5) + 'rem';
  rainContainer.appendChild(crow);
  setTimeout(() => crow.remove(), (dur + 0.5) * 1000);
}

crowBtn.addEventListener('click', () => {
  if (crowRaining) {
    clearInterval(crowInterval);
    crowRaining = false;
    crowBtn.style.background = '';
    crowBtn.style.color = '';
  } else {
    crowRaining = true;
    crowBtn.style.background = 'var(--gold)';
    crowBtn.style.color = '#000';
    crowInterval = setInterval(spawnCrow, 100);
    setTimeout(() => {
      clearInterval(crowInterval);
      crowRaining = false;
      crowBtn.style.background = '';
      crowBtn.style.color = '';
    }, 5000);
  }
});


/* =============================================================
   5. SLOT MACHINE GAME
   SYMBOLS[0] is the jackpot symbol (🐦‍⬛ crow).
   Edit the array to change reel icons.
============================================================= */
const SYMBOLS = ['🐦‍⬛', '🎮', '🍌', '🔥', '🖥️', '😊', '🐐'];

let spinning  = false;
let spinCount = 0;
let winCount  = 0;
let score     = 0;
let lightTimer = null;

function buildReels() {
  for (let i = 0; i < 3; i++) {
    const strip = document.getElementById('reel-strip-' + i);
    let html = '';
    for (let j = 0; j < 24; j++) {
      html += `<div class="reel-cell">${SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]}</div>`;
    }
    strip.innerHTML = html;
    strip.style.transition = 'none';
    strip.style.top = '0px';
  }
}
buildReels();

function animateReel(reelIndex, targetIdx, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      const strip = document.getElementById('reel-strip-' + reelIndex);
      let cells = '';
      for (let j = 0; j < 20; j++) {
        cells += `<div class="reel-cell">${SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]}</div>`;
      }
      cells += `<div class="reel-cell">${SYMBOLS[targetIdx]}</div>`;
      for (let j = 0; j < 5; j++) {
        cells += `<div class="reel-cell">${SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]}</div>`;
      }
      strip.innerHTML = cells;
      strip.style.transition = 'none';
      strip.style.top = '0px';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const dur = 0.6 + reelIndex * 0.2;
          strip.style.transition = `top ${dur}s cubic-bezier(.4,.2,.2,1)`;
          strip.style.top = -(20 * 90) + 'px';
          setTimeout(resolve, (dur + 0.15) * 1000);
        });
      });
    }, delay);
  });
}

function flashLights(fast) {
  let state = false;
  clearInterval(lightTimer);
  lightTimer = setInterval(() => {
    state = !state;
    for (let i = 0; i < 7; i++) {
      const l = document.getElementById('l' + i);
      if (l) l.classList.toggle('on', fast ? (i % 2 === (state ? 0 : 1)) : state);
    }
  }, fast ? 80 : 400);
}

function stopLights() {
  clearInterval(lightTimer);
  for (let i = 0; i < 7; i++) {
    const l = document.getElementById('l' + i);
    if (l) l.classList.remove('on');
  }
}

setInterval(() => {
  if (!spinning) {
    const r = Math.floor(Math.random() * 7);
    const l = document.getElementById('l' + r);
    if (l) { l.classList.add('on'); setTimeout(() => l.classList.remove('on'), 300); }
  }
}, 800);

function launchConfetti() {
  confetti({
    particleCount: 120, spread: 80,
    origin: { y: 0.6 },
    colors: ['#00c9a7', '#f0a500', '#2563eb', '#ffffff']
  });
}

function launchJackpotConfetti() {
  const end = Date.now() + 2500;
  (function frame() {
    confetti({ particleCount: 10, angle: 60,  spread: 55, origin: { x: 0 }, colors: ['#00c9a7', '#f0a500'] });
    confetti({ particleCount: 10, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#2563eb', '#ffffff'] });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

async function spin() {
  if (spinning) return;
  spinning = true;
  const lever = document.getElementById('lever');
  lever.classList.add('pulled', 'disabled-lever');

  const msg = document.getElementById('game-msg');
  msg.style.color = 'var(--muted)';
  msg.textContent = '🎰 Spinning...';
  flashLights(true);

  const result = [0, 1, 2].map(() => Math.floor(Math.random() * SYMBOLS.length));
  spinCount++;
  document.getElementById('spin-count').textContent = spinCount;

  try {
    await Promise.all(result.map((sym, i) => animateReel(i, sym, i * 200)));

    stopLights();
    lever.classList.remove('pulled');

    const allSame = result[0] === result[1] && result[1] === result[2];

    if (allSame) {
      const sym = SYMBOLS[result[0]];
      let pts  = 20;
      let text = `✦ WIN!  ${sym}${sym}${sym}  +20`;

      if (result[0] === 0) {
        pts  = 100;
        text = '🐦‍⬛🐦‍⬛🐦‍⬛   J A C K P O T !   +100';
        launchJackpotConfetti();
      } else if (result[0] === 1 || result[0] === 6) {
        pts  = 50;
        text = `${sym}${sym}${sym}   BIG WIN!   +50`;
        launchConfetti();
      } else {
        launchConfetti();
      }

      score    += pts;
      winCount += 1;

      document.getElementById('win-line').style.opacity = '1';
      document.querySelector('.machine-body').classList.add('win-anim');
      flashLights(false);

      setTimeout(() => {
        document.getElementById('win-line').style.opacity = '0';
        document.querySelector('.machine-body').classList.remove('win-anim');
        stopLights();
      }, 2500);

      msg.style.color = 'var(--teal)';
      msg.textContent = text;
      document.getElementById('win-count').textContent    = winCount;
      document.getElementById('score-display').textContent = score;

    } else {
      const taunts = [
        'Keep pulling! 🐦‍⬛', 'Almost there...', 'Try again!',
        'The crow tests you...', 'Fortune favors the bold!', 
        'Get your feathers in there!', 'Remeber the crow...',
        'So close...'
      ];
      msg.style.color = 'var(--muted)';
      msg.textContent = taunts[Math.floor(Math.random() * taunts.length)];
    }

  } catch (err) {
    console.error('Slot machine error:', err);
    msg.textContent = 'Something went wrong — try again!';
    stopLights();
    lever.classList.remove('pulled');
  } finally {
    spinning = false;
    lever.classList.remove('disabled-lever');
  }
}

document.getElementById('lever').addEventListener('click', spin);