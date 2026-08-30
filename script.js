const starsContainer = document.querySelector('.stars');

/* Dense, natural-looking star field */
const starColors = ['#ffffff','#dbeafe','#93c5fd','#67e8f9','#c4b5fd','#f0abfc','#fde68a','#fed7aa','#a7f3d0'];

for (let i = 0; i < 1000; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() < 0.90 ? Math.random() * 1.8 + 0.65 : Math.random() * 3.2 + 1.4;
  const color = starColors[Math.floor(Math.random() * starColors.length)];
  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.backgroundColor = color;
  star.style.boxShadow = `0 0 ${size > 2.2 ? 10 : 4.5}px ${color}`;
  star.style.animationDuration = Math.random() * 3.8 + 1.2 + 's';
  star.style.animationDelay = Math.random() * 5 + 's';
  starsContainer.appendChild(star);
}

/* A few slower, brighter stars drifting across the sky */
const movingStarColors = ['#ffffff','#67e8f9','#93c5fd','#c4b5fd','#f0abfc','#fde68a','#a7f3d0','#fed7aa'];
for (let i = 0; i < 38; i++) {
  const star = document.createElement('div');
  star.className = 'moving-star';
  const size = Math.random() * 2.7 + 1.8;
  const color = movingStarColors[Math.floor(Math.random() * movingStarColors.length)];
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 72 + '%';
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.backgroundColor = color;
  star.style.boxShadow = `0 0 ${size * 3}px ${color}, 0 0 ${size * 7}px ${color}`;
  star.style.animationDuration = Math.random() * 8 + 8 + 's';
  star.style.animationDelay = Math.random() * -16 + 's';
  starsContainer.appendChild(star);
}

/* Tiny warm/cool fireflies concentrated around the house / lower horizon */
const fireflyColors = ['#fff7b2', '#fde68a', '#fef3c7', '#d9f99d', '#a7f3d0', '#bae6fd'];
for (let i = 0; i < 55; i++) {
  const firefly = document.createElement('div');
  firefly.className = 'firefly';
  const size = Math.random() * 2.4 + 1.4;
  const color = fireflyColors[Math.floor(Math.random() * fireflyColors.length)];

  /* Keep most lights around the visible house/ground area. */
  firefly.style.left = (8 + Math.random() * 84) + '%';
  firefly.style.top = (57 + Math.random() * 37) + '%';
  firefly.style.width = size + 'px';
  firefly.style.height = size + 'px';
  firefly.style.backgroundColor = color;
  firefly.style.boxShadow = `0 0 ${size * 4}px ${color}, 0 0 ${size * 9}px ${color}`;
  firefly.style.setProperty('--drift-x', (Math.random() * 70 - 35) + 'px');
  firefly.style.setProperty('--drift-y', (Math.random() * 55 - 28) + 'px');
  firefly.style.animationDuration = (Math.random() * 3.5 + 3.5) + 's';
  firefly.style.animationDelay = (Math.random() * -7) + 's';
  starsContainer.appendChild(firefly);
}

/* DATE-BASED LUNAR PHASE — EXACTLY ONE IMAGE */
const moonImage = document.querySelector('.moon-phase-image');
const moonElement = document.querySelector('.moon');
const SYNODIC_MONTH = 29.530588853;
const REFERENCE_NEW_MOON_UTC = Date.UTC(2000, 0, 6, 18, 14, 0);

const moonPhaseImages = [
  'moon-new.png',
  'moon-crescent-waxing.png',
  'moon-quarter-first.png',
  'moon-gibbous-waxing.png',
  'moon-full.png',
  'moon-gibbous-waning.png',
  'moon-quarter-last.png',
  'moon-crescent-waning.png'
];

function getLunarAge(date = new Date()) {
  const days = (date.getTime() - REFERENCE_NEW_MOON_UTC) / 86400000;
  return ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
}

function getMoonPhaseIndex(age) {
  return Math.floor((age / SYNODIC_MONTH) * 8 + 0.5) % 8;
}

function updateMoonPhase() {
  if (!moonImage) return;

  const age = getLunarAge();
  const index = getMoonPhaseIndex(age);
  const filename = moonPhaseImages[index];

  if (!moonImage.src.endsWith('/' + filename)) {
    moonImage.src = './' + filename;
  }

  moonImage.alt = filename.replace('moon-', '').replace('.png', '');

  if (moonElement) {
    moonElement.dataset.lunarAge = age.toFixed(3);
    moonElement.dataset.lunarPhase = filename;
  }
}

updateMoonPhase();
setInterval(updateMoonPhase, 60000);

const messages = [
  'ওগো আমার মায়াবতী সামিরা...।',
  'তুমি আমার জীবনে ঐ চাঁদটার চেয়েও বেশি সুন্দর, বেশি স্পেশাল।',
  'তুমি আমার মায়াবতী রাজকন্যা, আমার মিষ্টি বউ, সুন্দরী আমার...',
  'আমি যদি অর্ফিয়াস হতাম, সারাটি জীবন শুধু তোমার জন্যই বাঁশি বাজাতাম।',
  'দা ভিঞ্চি হলে সারাজীবন তোমাকেই আঁকতাম।',
  'শেক্সপিয়ার হলে তুমি হতে আমার গল্পের নায়িকা।',
  'আমি যদি শাহজাহান হতাম, তুমি হতে আমার মমতাজ।',
  'তুমি আছো বলেই আমার রাতগুলো এত সুন্দর, চাঁদ যেন তোমারই প্রতিবিম্ব।',
  'তোমার হাসি আমাকে অন্ধকারেও পথ দেখায়।',
  'তুমি ছাড়া আমি অসম্পূর্ণ — এক অপূর্ণ গল্পের নায়ক।',
  'তোমাকে ভালোবাসি তারাও জানে, রাতের আকাশই তার সাক্ষী।',
  'ইতি কেবল তোমারই তানভীর'
];

let index = 0;
const floatingText = document.getElementById('floatingText');

function showNextMessage() {
  if (!floatingText) return;
  floatingText.textContent = messages[index];
  floatingText.style.animation = 'none';
  void floatingText.offsetWidth;
  floatingText.style.animation = null;
  index = (index + 1) % messages.length;
}

showNextMessage();
setInterval(showNextMessage, 6000);
