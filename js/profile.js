document.addEventListener('DOMContentLoaded', function () {
  // Modal elements
  const editBtn = document.querySelector('.profile-edit-btn');
  const modal = document.getElementById('profileEditModal');
  const closeBtn = document.querySelector('.profile-edit-modal-close');
  const form = document.getElementById('profileEditForm');
  const avatarInput = document.getElementById('profileEditAvatarInput');
  const avatarImg = document.getElementById('profileEditAvatarImg');
  const avatarRemove = document.getElementById('profileEditAvatarRemove');
  const mainAvatarImg = document.getElementById('profileMainAvatarImg');
  const genderBtns = document.querySelectorAll('.profile-edit-gender-btn');
  const saveBtn = document.querySelector('.profile-edit-save-btn');
  const nameInput = document.getElementById('profileEditName');
  const birthInput = document.getElementById('profileEditBirth');
  const phoneInput = document.getElementById('profileEditPhone');
  let originalPhone = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';

  // Phone code modal elements
  const phoneCodeModal = document.getElementById('profilePhoneCodeModal');
  const closePhoneCodeModal = document.getElementById('closeProfilePhoneCodeModal');
  const codeInputs = phoneCodeModal ? phoneCodeModal.querySelectorAll('input.profile-code-input') : [];
  const confirmBtn = document.getElementById('profilePhoneCodeConfirmBtn');
  const timerEl = document.getElementById('profilePhoneCodeTimer');
  const phoneNumberSpan = document.getElementById('profileModalPhoneNumber');
  let timer = null;
  let seconds = 60;

  // Open modal
  if (editBtn && modal) {
    editBtn.addEventListener('click', function () {
      // Show modal
      modal.style.display = 'flex';
      // Sync modal avatar with main avatar
      if (mainAvatarImg && avatarImg) {
        avatarImg.src = mainAvatarImg.src;
        // Show/hide remove button
        if (avatarImg.src.includes('user.svg')) {
          avatarRemove.style.display = 'none';
        } else {
          avatarRemove.style.display = 'block';
        }
      }
    });
  }
  // Close modal
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  }
  // Close modal on outside click
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // Avatar upload (shared for both main and modal)
  if (avatarInput && avatarImg && mainAvatarImg) {
    avatarInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (ev) {
          avatarImg.src = ev.target.result;
          mainAvatarImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
        avatarRemove.style.display = 'block';
      }
    });
  }
  // Avatar remove (from modal, also updates main)
  if (avatarRemove && avatarImg && mainAvatarImg && avatarInput) {
    avatarRemove.addEventListener('click', function () {
      avatarImg.src = '/assets/images/user.svg';
      mainAvatarImg.src = '/assets/images/user.svg';
      avatarInput.value = '';
      avatarRemove.style.display = 'none';
    });
  }
  // Hide remove button if default avatar
  if (avatarImg && avatarRemove) {
    if (avatarImg.src.includes('user.svg')) {
      avatarRemove.style.display = 'none';
    }
  }

  // Gender select
  genderBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      genderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Form validation (simple)
  function validateForm() {
    const name = nameInput.value.trim();
    const birth = birthInput.value.trim();
    const phone = phoneInput.value.trim();
    saveBtn.disabled = !(name && birth && phone);
  }
  [nameInput, birthInput, phoneInput].forEach(input => {
    input.addEventListener('input', validateForm);
  });
  validateForm();

  // Prevent form submit (demo only)
  if (form) {
    form.addEventListener('submit', function (e) {
      const newPhone = phoneInput.value.replace(/\D/g, '');
      if (newPhone !== originalPhone) {
        e.preventDefault();
        // Hide edit modal before showing code modal
        modal.style.display = 'none';
        // Show modal
        phoneCodeModal.classList.add('show');
        // Set phone number in modal
        phoneNumberSpan.textContent = '+998 ' + phoneInput.value;
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
        // Add body class for modal styling
        document.body.classList.add('modal-open');
        return;
      }
      // Here you would send data to backend
      modal.style.display = 'none';
    });
  }

  // Close phone code modal
  if (closePhoneCodeModal && phoneCodeModal) {
    closePhoneCodeModal.addEventListener('click', function () {
      phoneCodeModal.classList.remove('show');
      if (timer) clearInterval(timer);
      document.body.classList.remove('modal-open');
    });
  }
  if (phoneCodeModal) {
    phoneCodeModal.addEventListener('click', function (e) {
      if (e.target === phoneCodeModal) {
        phoneCodeModal.classList.remove('show');
        if (timer) clearInterval(timer);
        document.body.classList.remove('modal-open');
      }
    });
  }

  // Code input focus and enable confirm
  codeInputs.forEach((input, idx) => {
    input.addEventListener('input', function () {
      if (input.value.length === 1 && idx < codeInputs.length - 1) {
        codeInputs[idx + 1].focus();
      }
      checkCodeInputs();
    });
    input.addEventListener('keydown', function (e) {
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

  // Confirm code
  const codeForm = document.getElementById('profilePhoneCodeForm');
  if (codeForm) {
    codeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Here you would verify the code
      alert('Kod tasdiqlandi!');
      phoneCodeModal.classList.remove('show');
      if (timer) clearInterval(timer);
      document.body.classList.remove('modal-open');
      // After confirmation, you can submit the form or update the phone
      originalPhone = phoneInput.value.replace(/\D/g, '');
    });
  }
});