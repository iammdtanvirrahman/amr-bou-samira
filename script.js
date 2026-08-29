const starsContainer = document.querySelector('.stars');

const starColors = [
  '#ffffff', '#dbeafe', '#93c5fd', '#67e8f9',
  '#c4b5fd', '#f0abfc', '#fde68a', '#fed7aa', '#a7f3d0'
];

// Static twinkling stars
for (let i = 0; i < 650; i++) {
  const star = document.createElement('div');
  star.className = 'star';

  const size = Math.random() < 0.88
    ? Math.random() * 1.7 + 0.7
    : Math.random() * 3 + 1.5;

  const color = starColors[Math.floor(Math.random() * starColors.length)];

  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.backgroundColor = color;
  star.style.boxShadow = `0 0 ${size > 2.2 ? 9 : 4}px ${color}`;
  star.style.animationDuration = Math.random() * 3 + 1.2 + 's';
  star.style.animationDelay = Math.random() * 4 + 's';

  starsContainer.appendChild(star);
}

// Moving multi-color stars
const movingStarColors = [
  '#ffffff', '#67e8f9', '#93c5fd', '#c4b5fd',
  '#f0abfc', '#fde68a', '#a7f3d0', '#fed7aa'
];

for (let i = 0; i < 30; i++) {
  const star = document.createElement('div');
  star.className = 'moving-star';

  const size = Math.random() * 2.5 + 2;
  const color = movingStarColors[Math.floor(Math.random() * movingStarColors.length)];

  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 75 + '%';
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.backgroundColor = color;
  star.style.boxShadow = `0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}`;
  star.style.animationDuration = Math.random() * 7 + 7 + 's';
  star.style.animationDelay = Math.random() * -12 + 's';

  starsContainer.appendChild(star);
}

/*
 * DATE-BASED LUNAR PHASE
 *
 * Reference: known New Moon on 2000-01-06 18:14 UTC.
 * Synodic month: 29.530588853 days.
 * The calculated lunar age is mapped to the 8 supplied realistic images.
 * Between two phase images we cross-fade, so the Moon changes gradually
 * instead of jumping abruptly from one image to another.
 */
const moonImages = [...document.querySelectorAll('.moon-phase-image')];
const SYNODIC_MONTH = 29.530588853;
const REFERENCE_NEW_MOON_UTC = Date.UTC(2000, 0, 6, 18, 14, 0);

function getLunarAge(date = new Date()) {
  const daysSinceReference = (date.getTime() - REFERENCE_NEW_MOON_UTC) / 86400000;
  return ((daysSinceReference % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
}

function updateMoonPhase() {
  if (moonImages.length !== 8) return;

  const age = getLunarAge();
  const phase = age / SYNODIC_MONTH; // 0..1

  // 8 supplied images are positioned at these points of the lunar cycle.
  // 0 = new, .125 = waxing crescent, .25 = first quarter, etc.
  const exactPosition = phase * 8;
  const lowerIndex = Math.floor(exactPosition) % 8;
  const upperIndex = (lowerIndex + 1) % 8;
  const blend = exactPosition - Math.floor(exactPosition);

  moonImages.forEach((image) => {
    image.classList.remove('active', 'blend');
    image.style.opacity = '0';
  });

  moonImages[lowerIndex].classList.add('active');
  moonImages[lowerIndex].style.opacity = String(1 - blend);

  moonImages[upperIndex].classList.add('blend');
  moonImages[upperIndex].style.opacity = String(blend);

  // Useful for debugging in the console without affecting the UI.
  document.querySelector('.moon')?.setAttribute('data-lunar-age', age.toFixed(2));
}

updateMoonPhase();

// Refresh once per minute so the phase follows the current date/time.
setInterval(updateMoonPhase, 60000);

const messages = [
  "ওগো আমার মায়াবতী সামিরা...।",
  "তুমি আমার জীবনে ঐ চাঁদটার চেয়েও বেশি সুন্দর, বেশি স্পেশাল।",
  "তুমি আমার মায়াবতী রাজকন্যা, আমার মিষ্টি বউ, সুন্দরী আমার...",
  "আমি যদি অর্ফিয়াস হতাম, সারাটি জীবন শুধু তোমার জন্যই বাঁশি বাজাতাম।",
  "দা ভিঞ্চি হলে সারাজীবন তোমাকেই আঁকতাম।",
  "শেক্সপিয়ার হলে তুমি হতে আমার গল্পের নায়িকা।",
  "আমি যদি শাহজাহান হতাম, তুমি হতে আমার মমতাজ।",
  "তুমি আছো বলেই আমার রাতগুলো এত সুন্দর, চাঁদ যেন তোমারই প্রতিবিম্ব।",
  "তোমার হাসি আমাকে অন্ধকারেও পথ দেখায়।",
  "তুমি ছাড়া আমি অসম্পূর্ণ — এক অপূর্ণ গল্পের নায়ক।",
  "তোমাকে ভালোবাসি তারাও জানে, রাতের আকাশই তার সাক্ষী।",
  "ইতি কেবল তোমারই তানভীর"
];

let index = 0;
const floatingText = document.getElementById('floatingText');

function showNextMessage() {
  floatingText.textContent = messages[index];
  floatingText.style.animation = 'none';
  void floatingText.offsetWidth;
  floatingText.style.animation = null;
  index = (index + 1) % messages.length;
}

showNextMessage();
setInterval(showNextMessage, 6000);
