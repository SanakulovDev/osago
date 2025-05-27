// Stepper boshqaruvi va inputlar uchun validation
const stepper = document.querySelectorAll('.osago-step');
const form = document.getElementById('osago-main-form');
const carNumber = document.getElementById('car-number');
const texSeriya = document.getElementById('tex-seriya');
const texRaqam = document.getElementById('tex-raqam');
const passportForm = document.getElementById('passport-form');
const passportSeriya = document.getElementById('passport-seriya');
const passportRaqam = document.getElementById('passport-raqam');
const passportNextBtn = document.getElementById('passport-next-btn');
const callBlock = document.getElementById('call-block');
const summaryBlock = document.getElementById('summary-block');
const summaryNumber = document.getElementById('summary-number');
const summaryModel = document.getElementById('summary-model');

// Ma'lumotlarni kiritish formasi validatsiyasi
function validateInputs() {
  let valid = true;
  if (carNumber.value.trim().length < 5) valid = false;
  if (texSeriya.value.trim().length !== 2) valid = false;
  if (texRaqam.value.trim().length < 5) valid = false;
  // ...bu yerda davom ettirish tugmasi yo'q, passport form validatsiyasi alohida
}

// Pasport formasi validatsiyasi
function validatePassport() {
  let valid = true;
  if (passportSeriya.value.trim().length !== 2) valid = false;
  if (passportRaqam.value.trim().length < 7) valid = false;
  passportNextBtn.disabled = !valid;
  passportNextBtn.style.background = valid ? '#02C463' : '#BDBDBD';
  passportNextBtn.style.cursor = valid ? 'pointer' : 'not-allowed';
}

carNumber.addEventListener('input', validateInputs);
texSeriya.addEventListener('input', validateInputs);
texRaqam.addEventListener('input', validateInputs);

passportSeriya.addEventListener('input', validatePassport);
passportRaqam.addEventListener('input', validatePassport);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  // Stepperda 2-stepni active qilish
  stepper[1].classList.add('active');
  // Pasport inputlarini ochiq qoldirish (endi disabled emas)
  passportSeriya.focus();
});

passportForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // Stepperda 2-stepni active qilish (faqat 2 ta chiziq bo'ladi)
  stepper[1].classList.add('active');
  // 3-chiziq yo'q, shuning uchun stepper[2] ishlatilmaydi
  // Qo'ng'iroq blokini yashirish, summary blokini ko'rsatish
  callBlock.style.display = 'none';
  summaryBlock.style.display = 'block';
  // Ma'lumotlarni chiqarish
  summaryNumber.textContent = carNumber.value.toUpperCase();
  // Mashina modelini avtomatik olish uchun backend kerak, hozircha LACETTI qoldiriladi
  // summaryModel.textContent = ...;
});

// Stepper CSS
const style = document.createElement('style');
style.innerHTML = `
.osago-step {
  flex: 1;
  height: 7px;
  background: #E9ECF8;
  border-radius: 6px;
  transition: background 0.3s;
}
.osago-step.active {
  background: #02C463;
}
`;
document.head.appendChild(style);
