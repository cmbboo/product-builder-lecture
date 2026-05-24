// ── 테마 토글 ──
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

const ICONS = { dark: '🌙', light: '☀️' };

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.textContent = ICONS[theme];
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

// 저장된 테마 복원
applyTheme(localStorage.getItem('theme') || 'dark');

// ── 로또 번호 생성 ──
function getRange(n) {
  if (n <= 10) return 'range1';
  if (n <= 20) return 'range2';
  if (n <= 30) return 'range3';
  if (n <= 40) return 'range4';
  return 'range5';
}

function generateLotto() {
  const numbers = [];
  while (numbers.length < 6) {
    const n = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(n)) numbers.push(n);
  }
  return numbers.sort((a, b) => a - b);
}

function createTicket(numbers) {
  const ticket = document.createElement('div');
  ticket.className = 'ticket';
  numbers.forEach((n, i) => {
    const ball = document.createElement('div');
    ball.className = `ball ${getRange(n)}`;
    ball.textContent = n;
    ball.style.animationDelay = `${i * 0.06}s`;
    ticket.appendChild(ball);
  });
  return ticket;
}

document.getElementById('generateBtn').addEventListener('click', () => {
  const result = document.getElementById('result');
  result.innerHTML = '';
  for (let i = 0; i < 5; i++) result.appendChild(createTicket(generateLotto()));
});
