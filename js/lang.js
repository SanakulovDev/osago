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

// Sahifadagi matnlarni yangilash
function updateTexts() {
  const lang = getLang();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    // codeModalDesc va timer uchun innerHTML ishlatamiz, boshqalar uchun textContent
    if ((key === 'codeModalDesc' || key === 'timer') && translations[lang][key]) {
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
      sidebarLang.textContent = newLang.toUpperCase();
      // Select ham yangilansin
      if (select) select.value = newLang;
    });
  }

  // Dastlabki matnlarni yangilash
  updateTexts();
});