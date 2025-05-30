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
  // Passport inputlar ham to'ldirilgan bo'lishi kerak
  if (passportSeriya.value.trim().length !== 2) valid = false;
  if (passportRaqam.value.trim().length < 7) valid = false;
  // Faqat hammasi to'g'ri bo'lsa, davom etish tugmasi faollashadi
  passportNextBtn.disabled = !valid;
  passportNextBtn.style.background = valid ? '#02C463' : '#BDBDBD';
  passportNextBtn.style.cursor = valid ? 'pointer' : 'not-allowed';
}

// Pasport formasi validatsiyasi
function validatePassport() {
  // validateInputs() ni chaqiramiz, chunki barcha inputlar tekshiriladi
  validateInputs();
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
  stepper[1].classList.add('active');
  callBlock.style.display = 'none';
  summaryBlock.style.display = 'block';
  summaryNumber.textContent = carNumber.value.toUpperCase();
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