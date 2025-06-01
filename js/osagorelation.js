document.addEventListener('DOMContentLoaded', function() {
  const addBtn = document.querySelector('.osago-form-row button[data-i18n="addBtn"]');
  const formContainer = document.querySelector('.osago-form-row > div');

  // Create a wrapper for dynamic forms
  let formsWrapper = document.createElement('div');
  formsWrapper.className = 'osago-relatives-forms';
  formContainer.insertBefore(formsWrapper, addBtn);

  function createForm(index) {
    const formDiv = document.createElement('div');
    formDiv.className = 'osago-relative-form';

    // Number (top, left)
    const numberSpan = document.createElement('div');
    numberSpan.className = 'form-number';
    numberSpan.textContent = (index + 1) + '.';
    formDiv.appendChild(numberSpan);

    // O'chirish button (top right)
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "O'chirish";
    removeBtn.type = 'button';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = function() {
      formsWrapper.removeChild(formDiv);
      updateNumbers();
    };
    formDiv.appendChild(removeBtn);

    // Seriya
    const seriya = document.createElement('input');
    seriya.type = 'text';
    seriya.placeholder = 'Seriya';
    formDiv.appendChild(seriya);

    // Passport raqami
    const passport = document.createElement('input');
    passport.type = 'text';
    passport.placeholder = 'Passport raqami';
    formDiv.appendChild(passport);

    // Tug'ilgan sanasi
    const birth = document.createElement('input');
    birth.type = 'date';
    birth.placeholder = "Tug'ilgan sanasi";
    formDiv.appendChild(birth);

    // F.I.Sh. (dropdown yoki input)
    const fio = document.createElement('select');
    fio.innerHTML = `<option value="">Sitrizaev To'lqinning</option><option value="qarindosh1">Qarindosh 1</option><option value="qarindosh2">Qarindosh 2</option>`;
    formDiv.appendChild(fio);

    return formDiv;
  }

  function updateNumbers() {
    const forms = formsWrapper.querySelectorAll('.osago-relative-form');
    forms.forEach((form, idx) => {
      form.querySelector('.form-number').textContent = (idx + 1) + '.';
    });
  }

  addBtn.addEventListener('click', function() {
    const formDiv = createForm(formsWrapper.children.length);
    formsWrapper.appendChild(formDiv);
    updateNumbers();
  });
});