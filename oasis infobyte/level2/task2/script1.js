// ===== Theme + Font preference =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const fontPicker = document.getElementById('fontPicker');

(function initPrefs(){
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const savedFont = localStorage.getItem('font') || "'Poppins', sans-serif";
  if(savedTheme === 'light') root.classList.add('light');
  themeToggle.checked = savedTheme === 'light';
  root.style.setProperty('--font', savedFont);
  fontPicker.value = savedFont;
})();

themeToggle.addEventListener('change', () => {
  root.classList.toggle('light', themeToggle.checked);
  localStorage.setItem('theme', themeToggle.checked ? 'light' : 'dark');
});

fontPicker.addEventListener('change', (e) => {
  root.style.setProperty('--font', e.target.value);
  localStorage.setItem('font', e.target.value);
});

// ===== Parallax effect on hero background =====
const parallax = document.querySelector('.parallax');
window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.35;
  parallax.style.transform = `translateY(${y}px)`;
});

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{ threshold: 0.15 });
revealEls.forEach(el=>io.observe(el));

// ===== Quote Carousel =====
const quotes = Array.from(document.querySelectorAll('.quote'));
const quoteTrack = document.getElementById('quoteTrack');
const prev = document.getElementById('prevQuote');
const next = document.getElementById('nextQuote');
let idx = 0, auto;

function showQuote(i){
  idx = (i + quotes.length) % quotes.length;
  quotes.forEach((q, n)=> q.style.display = n === idx ? 'block' : 'none');
}
function startAuto(){
  clearInterval(auto);
  auto = setInterval(()=> showQuote(idx+1), 4000);
}
prev.addEventListener('click', ()=> { showQuote(idx-1); startAuto(); });
next.addEventListener('click', ()=> { showQuote(idx+1); startAuto(); });
showQuote(0); startAuto();

// ===== Gallery Filters + Modal =====
const chips = document.querySelectorAll('.chip');
const tiles = document.querySelectorAll('.tile');
const imgModal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');

chips.forEach(chip=>{
  chip.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    tiles.forEach(t=>{
      const show = f === 'all' || t.dataset.category === f;
      t.style.display = show ? '' : 'none';
    });
  });
});

tiles.forEach(tile=>{
  const img = tile.querySelector('img');
  img.addEventListener('click', ()=>{
    modalImg.src = img.src;
    imgModal.showModal();
  });
});
closeModal.addEventListener('click', ()=> imgModal.close());
imgModal.addEventListener('click', (e)=> {
  if(e.target === imgModal) imgModal.close();
});

// ===== Like Button (with localStorage) =====
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
let likes = parseInt(localStorage.getItem('likes') || '0', 10);
let liked = localStorage.getItem('liked') === 'true';
likeCount.textContent = likes;
likeBtn.setAttribute('aria-pressed', liked);
if(liked) likeBtn.textContent = '💜';

likeBtn.addEventListener('click', ()=>{
  liked = !liked;
  likeBtn.setAttribute('aria-pressed', liked);
  likeBtn.textContent = liked ? '💜' : '❤️';
  likes = Math.max(0, likes + (liked ? 1 : -1));
  likeCount.textContent = likes;
  localStorage.setItem('likes', String(likes));
  localStorage.setItem('liked', String(liked));
});

// ===== Guestbook (localStorage only) =====
const form = document.getElementById('guestbookForm');
const list = document.getElementById('guestbookList');
let notes = JSON.parse(localStorage.getItem('guestbook') || '[]');

function renderNotes(){
  list.innerHTML = '';
  notes.slice().reverse().forEach(n=>{
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="meta">${n.name} • ${new Date(n.time).toLocaleString()}</div>
      <div>${n.msg}</div>
    `;
    list.appendChild(li);
  });
}
renderNotes();

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('guestName').value.trim() || 'Anonymous';
  const msg = document.getElementById('guestMessage').value.trim();
  if(!msg) return;
  notes.push({ name, msg, time: Date.now() });
  localStorage.setItem('guestbook', JSON.stringify(notes));
  form.reset();
  renderNotes();
});

// ===== Back to Top =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  backToTop.classList.toggle('show', y > 600);
});
backToTop.addEventListener('click', ()=> window.scrollTo({ top: 0, behavior: 'smooth' }));
