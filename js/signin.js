document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.signin-card form');
  const phoneInput = document.querySelector('.signin-phone-input');
  const codeModal = document.getElementById('codeModal');
  const closeCodeModal = document.getElementById('closeCodeModal');
  const codeInputs = codeModal.querySelectorAll('input.signin-phone-code');
  const confirmBtn = document.getElementById('confirmBtn');
  const timerEl = document.getElementById('timer');
  const submitBtn = form.querySelector('.signin-btn');
  let timer = null;
  let seconds = 60;

  // Telefon raqam inputini tekshirish va submit tugmasini boshqarish
  function checkPhoneInput() {
    // Faqat raqamlar va bo'sh joylar olib tashlanadi
    const value = phoneInput.value.replace(/\D/g, '');
    // 9 ta raqam kiritilgan bo'lishi kerak (masalan: 774044040)
    const isValid = value.length === 9;
    submitBtn.disabled = !isValid;
    submitBtn.style.background = isValid ? '#02C463' : '#aaa';
    submitBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
  }

  // Dastlab tugma faolsiz
  checkPhoneInput();
  phoneInput.addEventListener('input', checkPhoneInput);

  // Modal ochish
  form.addEventListener('submit', function(e) {
    // Telefon raqam to'g'ri kiritilmagan bo'lsa, modal ochilmaydi
    const value = phoneInput.value.replace(/\D/g, '');
    if (value.length !== 9) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    codeModal.classList.add('show');
    seconds = 60;
    timerEl.textContent = seconds + ' Sekund';
    confirmBtn.disabled = true;
    confirmBtn.style.background = '#aaa';
    confirmBtn.style.cursor = 'not-allowed';
    codeInputs.forEach(input => input.value = '');
    codeInputs[0].focus();
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      seconds--;
      timerEl.textContent = seconds + ' Sekund';
      if (seconds <= 0) {
        clearInterval(timer);
        timerEl.textContent = 'Qayta yuborish';
      }
    }, 1000);
  });

  // Modal yopish
  closeCodeModal.addEventListener('click', function() {
    codeModal.classList.remove('show');
    if (timer) clearInterval(timer);
  });

  // Modal foniga bosganda yopish
  codeModal.addEventListener('click', function(e) {
    if (e.target === codeModal) {
      codeModal.classList.remove('show');
      if (timer) clearInterval(timer);
    }
  });

  // Kod inputlarida avtomatik fokus
  codeInputs.forEach((input, idx) => {
    input.addEventListener('input', function() {
      if (input.value.length === 1 && idx < codeInputs.length - 1) {
        codeInputs[idx + 1].focus();
      }
      checkCodeInputs();
    });
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && !input.value && idx > 0) {
        codeInputs[idx - 1].focus();
      }
    });
  });

  function checkCodeInputs() {
    let allFilled = Array.from(codeInputs).every(input => input.value.length === 1);
    confirmBtn.disabled = !allFilled;
    confirmBtn.style.background = allFilled ? '#02C463' : '#aaa';
    confirmBtn.style.cursor = allFilled ? 'pointer' : 'not-allowed';
  }

  // Kodni tasdiqlash
  document.getElementById('codeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Bu yerda kodni tekshirish yoki keyingi bosqichga o'tish mumkin
    alert('Kod tasdiqlandi!');
    codeModal.classList.remove('show');
    if (timer) clearInterval(timer);
  });
});