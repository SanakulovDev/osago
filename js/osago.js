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
  // Stepper 1: Ma'lumotlar to'g'ri bo'lsa birinchi step active
  if (valid) {
    stepper[0].classList.add('active');
  } else {
    stepper[0].classList.remove('active');
  }
  // Passport inputlar ham to'ldirilgan bo'lishi kerak
  let passportValid = true;
  if (passportSeriya.value.trim().length !== 2) passportValid = false;
  if (passportRaqam.value.trim().length < 7) passportValid = false;
  // Stepper 2: Passport inputlar ham to'g'ri bo'lsa ikkinchi step active
  if (valid && passportValid) {
    stepper[1].classList.add('active');
  } else {
    stepper[1].classList.remove('active');
  }
  // Faqat hammasi to'g'ri bo'lsa, davom etish tugmasi faollashadi
  passportNextBtn.disabled = !(valid && passportValid);
  passportNextBtn.style.background = (valid && passportValid) ? '#02C463' : '#BDBDBD';
  passportNextBtn.style.cursor = (valid && passportValid) ? 'pointer' : 'not-allowed';
}

// Pasport formasi validatsiyasi
function validatePassport() {
  validateInputs();
}

carNumber.addEventListener('input', validateInputs);
texSeriya.addEventListener('input', validateInputs);
texRaqam.addEventListener('input', validateInputs);

passportSeriya.addEventListener('input', validatePassport);
passportRaqam.addEventListener('input', validatePassport);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  passportSeriya.focus();
});

passportForm.addEventListener('submit', function(e) {
  // Faqat barcha inputlar to'ldirilgan bo'lsa submit ishlaydi
  if (
    carNumber.value.trim().length < 5 ||
    texSeriya.value.trim().length !== 2 ||
    texRaqam.value.trim().length < 5 ||
    passportSeriya.value.trim().length !== 2 ||
    passportRaqam.value.trim().length < 7
  ) {
    e.preventDefault();
    return;
  }
  e.preventDefault();
  // Ma'lumotlarni localStorage ga saqlash
  localStorage.setItem('osago_car_number', carNumber.value);
  localStorage.setItem('osago_tex_seriya', texSeriya.value);
  localStorage.setItem('osago_tex_raqam', texRaqam.value);
  localStorage.setItem('osago_passport_seriya', passportSeriya.value);
  localStorage.setItem('osago_passport_raqam', passportRaqam.value);
  // window.location orqali boshqa sahifaga o'tish
  window.location.href = 'osagopolis.html';
});

// Qo'ng'iroq qiling blokini inputlar to'g'ri to'ldirilganda avtomatik ma'lumot bilan almashtirish
function updateSummaryBlock() {
  const valid = carNumber.value.trim().length >= 5 && texSeriya.value.trim().length === 2 && texRaqam.value.trim().length >= 5 && passportSeriya.value.trim().length === 2 && passportRaqam.value.trim().length >= 7;
  if (valid) {
    callBlock.style.display = 'none';
    summaryBlock.style.display = 'block';
    summaryNumber.textContent = carNumber.value.toUpperCase();
    // summaryModel.textContent = ...; // Agar model ham bo'lsa shu yerda chiqariladi
  } else {
    callBlock.style.display = 'flex';
    summaryBlock.style.display = 'none';
  }
}

carNumber.addEventListener('input', updateSummaryBlock);
texSeriya.addEventListener('input', updateSummaryBlock);
texRaqam.addEventListener('input', updateSummaryBlock);
passportSeriya.addEventListener('input', updateSummaryBlock);
passportRaqam.addEventListener('input', updateSummaryBlock);

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

document.addEventListener('DOMContentLoaded', function() {
    // Initialize date picker with today's date
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    // Example stepper functionality
    const steps = document.querySelectorAll('.osago-step');
    
    // This would be called when user progresses through the form
    function updateStepper(currentStep) {
        steps.forEach((step, index) => {
            if (index <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    // Initialize with first step active
    updateStepper(0);
});