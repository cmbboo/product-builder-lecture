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
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});
applyTheme(localStorage.getItem('theme') || 'dark');

// ── 메뉴 데이터 ──
const MENUS = [
  { emoji: '🍖', name: '삼겹살', cat: 'korean', desc: '상추에 싸 먹으면 최고' },
  { emoji: '🍗', name: '치킨', cat: 'korean', desc: '오늘도 치킨이지 뭐' },
  { emoji: '🥩', name: '소고기', cat: 'korean', desc: '오늘 한 번쯤은 고기 먹어야지' },
  { emoji: '🍜', name: '부대찌개', cat: 'korean', desc: '라면 사리 추가 필수' },
  { emoji: '🥘', name: '된장찌개', cat: 'korean', desc: '집밥 느낌 물씬' },
  { emoji: '🍲', name: '김치찌개', cat: 'korean', desc: '삼겹살이랑 함께면 완벽' },
  { emoji: '🥗', name: '비빔밥', cat: 'korean', desc: '쓱싹 비벼서 한 그릇' },
  { emoji: '🍱', name: '도시락', cat: 'korean', desc: '간편하게 한 끼' },
  { emoji: '🦆', name: '오리구이', cat: 'korean', desc: '부추 곁들이기 잊지 말고' },
  { emoji: '🍜', name: '짜장면', cat: 'chinese', desc: '탕수육 시켜서 같이 먹기' },
  { emoji: '🍜', name: '짬뽕', cat: 'chinese', desc: '얼큰한 국물이 땡길 때' },
  { emoji: '🥟', name: '탕수육', cat: 'chinese', desc: '부먹 vs 찍먹, 선택은 당신에게' },
  { emoji: '🥟', name: '만두', cat: 'chinese', desc: '군만두로 주세요' },
  { emoji: '🫕', name: '마라탕', cat: 'chinese', desc: '매운 거 좋아하면 무조건 이거' },
  { emoji: '🍣', name: '초밥', cat: 'japanese', desc: '연어 두 개는 기본이잖아요' },
  { emoji: '🍱', name: '돈카츠', cat: 'japanese', desc: '바삭하게, 소스 듬뿍' },
  { emoji: '🍜', name: '라멘', cat: 'japanese', desc: '진한 돼지뼈 육수로' },
  { emoji: '🍣', name: '회', cat: 'japanese', desc: '소주 한 잔이랑' },
  { emoji: '🍝', name: '파스타', cat: 'western', desc: '까르보나라냐 봉골레냐' },
  { emoji: '🍕', name: '피자', cat: 'western', desc: '도우 두껍게, 치즈 듬뿍' },
  { emoji: '🍔', name: '버거', cat: 'western', desc: '감자튀김 라지 사이즈로' },
  { emoji: '🥩', name: '스테이크', cat: 'western', desc: '미디엄 레어로 부탁해' },
  { emoji: '🌮', name: '타코', cat: 'western', desc: '살사 소스 많이 주세요' },
  { emoji: '🌯', name: '샐러드&포케', cat: 'western', desc: '오늘은 가볍게 건강식으로' },
  { emoji: '🍦', name: '떡볶이', cat: 'quick', desc: '어묵이랑 같이 먹어야 진짜' },
  { emoji: '🌭', name: '핫도그', cat: 'quick', desc: '설탕 솔솔 뿌리면 맛있는 거 알죠?' },
  { emoji: '🍜', name: '라면', cat: 'quick', desc: '계란 하나 추가' },
  { emoji: '🥪', name: '김밥', cat: 'quick', desc: '참치 마요 김밥으로 한 줄' },
  { emoji: '🥞', name: '순대', cat: 'quick', desc: '소금이랑 먹는 파 순대' },
];

// ── 필터 ──
let activeCategory = 'all';

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
  });
});

// ── 추천 카드 생성 ──
function pickMenus(count = 3) {
  const pool = activeCategory === 'all'
    ? MENUS
    : MENUS.filter(m => m.cat === activeCategory);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, pool.length));
}

function createCard(menu) {
  const card = document.createElement('div');
  card.className = 'menu-card';
  card.innerHTML = `
    <span class="menu-emoji">${menu.emoji}</span>
    <div class="menu-info">
      <strong>${menu.name}</strong>
      <span>${menu.desc}</span>
    </div>
  `;
  return card;
}

document.getElementById('spinBtn').addEventListener('click', () => {
  const result = document.getElementById('result');
  result.innerHTML = '';
  pickMenus(3).forEach((menu, i) => {
    const card = createCard(menu);
    card.style.animationDelay = `${i * 0.08}s`;
    result.appendChild(card);
  });
});
