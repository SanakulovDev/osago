// Enable 'Davom etish' button only if phone is 9 digits and checkbox is checked

document.addEventListener('DOMContentLoaded', function () {
  const phoneInput = document.getElementById('phone-input');
  const checkbox = document.getElementById('privacy-checkbox');
  const submitBtn = document.querySelector('.osagophone-phone-submit-btn');

  function validate() {
    const phoneValid = phoneInput && phoneInput.value.length === 9 && /^\d{9}$/.test(phoneInput.value);
    const checked = checkbox && checkbox.checked;
    if (phoneValid && checked) {
      submitBtn.disabled = false;
      submitBtn.classList.add('enabled');
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove('enabled');
    }
  }

  if (phoneInput) phoneInput.addEventListener('input', validate);
  if (checkbox) checkbox.addEventListener('change', validate);

  // Optional: Prevent non-numeric input
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      this.value = this.value.replace(/[^\d]/g, '');
    });
  }

  // Phone code modal logic
  const phoneForm = document.getElementById('phone-form');
  const phoneCodeModal = document.getElementById('phoneCodeModal');
  const phoneCodeModalClose = document.getElementById('phoneCodeModalClose');
  const codeInputs = phoneCodeModal ? phoneCodeModal.querySelectorAll('.code-input') : [];
  const codeConfirmBtn = document.getElementById('codeConfirmBtn');
  const codeTimer = document.getElementById('code-timer');
  const modalPhoneNumber = document.getElementById('modal-phone-number');
  let timer = null;
  let seconds = 30;

  // Open modal on form submit
  if (phoneForm && phoneCodeModal) {
    phoneForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Set phone number in modal
      if (modalPhoneNumber && phoneInput) {
        const val = phoneInput.value;
        modalPhoneNumber.textContent = '+998 ' + val.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
      }
      // Reset code inputs
      codeInputs.forEach(input => input.value = '');
      codeConfirmBtn.disabled = true;
      codeConfirmBtn.classList.remove('enabled');
      // Show modal
      phoneCodeModal.classList.add('active');
      // Start timer
      seconds = 30;
      if (codeTimer) codeTimer.textContent = seconds + ' Sekund';
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        seconds--;
        if (codeTimer) codeTimer.textContent = seconds > 0 ? (seconds + ' Sekund') : 'Qayta yuborish';
        if (seconds <= 0) clearInterval(timer);
      }, 1000);
      // Focus first input
      if (codeInputs[0]) codeInputs[0].focus();
      document.body.classList.add('modal-open');
    });
  }

  // Close modal
  if (phoneCodeModalClose && phoneCodeModal) {
    phoneCodeModalClose.addEventListener('click', function() {
      phoneCodeModal.classList.remove('active');
      document.body.classList.remove('modal-open');
      if (timer) clearInterval(timer);
    });
  }
  // Close modal on background click
  if (phoneCodeModal) {
    phoneCodeModal.addEventListener('click', function(e) {
      if (e.target === phoneCodeModal) {
        phoneCodeModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        if (timer) clearInterval(timer);
      }
    });
  }
  // Code input navigation and confirm button enable
  codeInputs.forEach((input, idx) => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^\d]/g, '');
      if (this.value.length === 1 && idx < codeInputs.length - 1) {
        codeInputs[idx + 1].focus();
      }
      checkCodeInputs();
    });
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && !this.value && idx > 0) {
        codeInputs[idx - 1].focus();
      }
    });
  });
  function checkCodeInputs() {
    let allFilled = Array.from(codeInputs).every(input => input.value.length === 1);
    if (allFilled) {
      codeConfirmBtn.disabled = false;
      codeConfirmBtn.classList.add('enabled');
    } else {
      codeConfirmBtn.disabled = true;
      codeConfirmBtn.classList.remove('enabled');
    }
  }
  // Prevent form submit in modal (if any)
  if (codeConfirmBtn && phoneCodeModal) {
    codeConfirmBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Here you would verify the code
      phoneCodeModal.classList.remove('active');
      document.body.classList.remove('modal-open');
      if (timer) clearInterval(timer);
      // Success action here
    });
  }
});
