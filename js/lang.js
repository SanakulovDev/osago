// Tarjimalarni tashqaridan import qilish
import uz from './uz.js';
import ru from './ru.js';

const translations = { uz, ru };

// Tilni localStorage dan olish
function getLang() {
  return localStorage.getItem('lang') || 'uz';
}

// Tilni o‘rnatish
function setLang(lang) {
  localStorage.setItem('lang', lang);
}
// Dastlabki matnlarni yangilash
  updateTexts();  
// Sahifadagi matnlarni yangilash
function updateTexts() {
  const lang = getLang();
  // HTML teglari bo'lishi mumkin bo'lgan kalitlar
  const htmlKeys = ['codeModalDesc', 'timer', 'relativesInfo', 'soon'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (htmlKeys.includes(key) && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    } else if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  // Inputlar uchun placeholder tarjimasi
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });
}

// Select va sidebar uchun event qo‘shish
document.addEventListener('DOMContentLoaded', function() {
  // Select orqali
  const select = document.getElementById('languageSwitcher');
  if (select) {
    select.value = getLang();
    select.addEventListener('change', function() {
      setLang(this.value);
      updateTexts();
      Array.from(document.getElementsByClassName('soon1')).forEach(function(el) {
        el.innerHTML += '<div class="menu-soon-badge" style="display:none;" data-i18n="soon">Tez kunda<span class="menu-soon-arrow"></span></div>';
      });
      // Sidebar lang ham yangilansin
      const sidebarLang = document.querySelector('.sidebar-lang');
      if (sidebarLang) sidebarLang.textContent = this.value.toUpperCase();
    });
  }

  // Sidebar tugmasi orqali
  const sidebarLang = document.querySelector('.sidebar-lang');
  if (sidebarLang) {
    sidebarLang.textContent = getLang().toUpperCase();
    sidebarLang.addEventListener('click', function() {
      const newLang = getLang() === 'uz' ? 'ru' : 'uz';
      setLang(newLang);
      updateTexts();
      Array.from(document.getElementsByClassName('soon1')).forEach(function(el) {
        el.innerHTML += '<div class="menu-soon-badge" style="display:none;" data-i18n="soon">Tez kunda<span class="menu-soon-arrow"></span></div>';
      });
      sidebarLang.textContent = newLang.toUpperCase();
      // Select ham yangilansin
      if (select) select.value = newLang;
    });
  }
});
