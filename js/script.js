const serviceOpen = document.querySelector('#fastServiceModalOpen')
const serviceModal = document.querySelector("#fastServiceModal")
const serviceClose = document.querySelector("#fastServiceModalClose")

// Modalni ochish
serviceOpen.addEventListener("click", () => {
    serviceModal.style.display = 'block'
})

// Modalni yopish
serviceClose.addEventListener("click", () => {
    serviceModal.style.display = 'none'
})

// Modaldan tashqari joy bosilganda
window.addEventListener('click', (e) => {
    if(e.target === serviceModal) {
        serviceModal.style.display = 'none'
    }
})

const towtruckBtn = document.getElementById('towtruckBtn');
const towtruckModal = document.getElementById('towtruckModal');
const towtruckModalClose = document.getElementById('towtruckModalClose');

if (towtruckBtn && towtruckModal && towtruckModalClose) {
    towtruckBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        serviceModal.style.display = 'none';
        towtruckModal.style.display = 'block';
    });
    towtruckModalClose.addEventListener('click', function() {
        towtruckModal.style.display = 'none';
        // Formani tozalash
        if (towtruckForm) {
            towtruckForm.reset();
            const submitBtn = towtruckForm.querySelector('.towtruck-submit');
            if (submitBtn) {
                submitBtn.classList.remove('enabled');
                submitBtn.disabled = true;
                submitBtn.style.cursor = 'not-allowed';
            }
        }
    });
    window.addEventListener('click', function(e) {
        if (e.target === towtruckModal) {
            towtruckModal.style.display = 'none';
            // Formani tozalash
            if (towtruckForm) {
                towtruckForm.reset();
                const submitBtn = towtruckForm.querySelector('.towtruck-submit');
                if (submitBtn) {
                    submitBtn.classList.remove('enabled');
                    submitBtn.disabled = true;
                    submitBtn.style.cursor = 'not-allowed';
                }
            }
        }
    });
}

// Form validation (submit faqat inputlar to‘ldirilganda aktiv bo‘lsin)
const towtruckForm = document.querySelector('.towtruck-form');
if (towtruckForm) {
    const nameInput = towtruckForm.querySelector('.towtruck-input');
    const phoneInput = towtruckForm.querySelector('.towtruck-input-phone');
    const submitBtn = towtruckForm.querySelector('.towtruck-submit');
    function validate() {
        if (nameInput.value.trim().length > 0 && phoneInput.value.trim().length === 9) {
            submitBtn.classList.add('enabled');
            submitBtn.disabled = false;
            submitBtn.style.cursor = 'pointer';
        } else {
            submitBtn.classList.remove('enabled');
            submitBtn.disabled = true;
            submitBtn.style.cursor = 'not-allowed';
        }
    }
    nameInput.addEventListener('input', validate);
    phoneInput.addEventListener('input', validate);
    towtruckForm.addEventListener('submit', function(e) {
        e.preventDefault();
    });
}

const serviceBtns = document.querySelectorAll('.fast-service-btn');
let currentBadge = null;

serviceBtns.forEach(btn => {
    if (btn.id === 'towtruckBtn') return;
    btn.addEventListener('mouseover', function() {
        const card = btn.closest('.fast-service-card');
        const badge = card.querySelector('.soon-badge');
        if (currentBadge && currentBadge !== badge) {
            currentBadge.style.display = 'none';
        }
        if (badge) {
            badge.style.display = 'flex';
            currentBadge = badge;
            setTimeout(() => {
                if (currentBadge === badge) {
                    badge.style.display = 'none';
                    currentBadge = null;
                }
            }, 5000);
        }
    });
});

// MENU BAR "Tez kunda" badge
const menuItems = document.querySelectorAll('.menu-item');
let currentMenuBadge = null;

menuItems.forEach((item, idx) => {
    if (idx === 0) return; // OSAGO uchun badge yo'q
    item.addEventListener('mouseover', function(e) {
        const badge = item.querySelector('.menu-soon-badge');
        if (currentMenuBadge && currentMenuBadge !== badge) {
            currentMenuBadge.style.display = 'none';
            currentMenuBadge.style.transition = '.3s';
        }
        if (badge) {
            badge.style.display = 'flex';
            currentMenuBadge = badge;
            setTimeout(() => {
                if (currentMenuBadge === badge) {
                    badge.style.display = 'none';
                    currentMenuBadge = null;
                }
            }, 3000);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const burgerBtn = document.getElementById('burgerMenuBtn');
  const sidebar = document.querySelector('.sidebar-menu');
  const overlay = document.querySelector('.sidebar-overlay');
  const closeBtn = document.querySelector('.sidebar-close');
  
  // Toggle sidebar
  burgerBtn.addEventListener('click', function() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('sidebar-open');
  });
  
  // Close sidebar
  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
  }
  
  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  
  // Close when clicking on links (optional)
  document.querySelectorAll('.sidebar-item, .sidebar-mainnav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      if (!this.classList.contains('sidebar-disabled')) {
        closeSidebar();
      } else {
        e.preventDefault();
      }
    });
  });
  
  // Mobil sidebar menyudagi 'Tezkor xizmat' nav-linki bosilganda modal ochish
  if (window.innerWidth <= 992) {
    document.querySelectorAll('.sidebar-mainnav .nav-link').forEach(link => {
      if (link.textContent.trim().includes('Tezkor xizmat')) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          // Sidebarni yopish
          document.querySelector('.sidebar-menu').classList.remove('active');
          document.querySelector('.sidebar-overlay').classList.remove('active');
          document.body.classList.remove('sidebar-open');
          // Modalni ochish
          const serviceModal = document.getElementById('fastServiceModal');
          if (serviceModal) serviceModal.style.display = 'block';
        });
      }
    });
  }

  // Fast Service Modal open (header)
  document.getElementById('fastServiceModalOpen')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('fastServiceModal').style.display = 'block';
    // Optionally close sidebar if open
    document.querySelector('.sidebar-menu')?.classList.remove('active');
    document.querySelector('.sidebar-overlay')?.classList.remove('active');
  });

  // Fast Service Modal open (sidebar)
  document.getElementById('fastServiceModalOpenSidebar')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('fastServiceModal').style.display = 'block';
    // Optionally close sidebar if open
    document.querySelector('.sidebar-menu')?.classList.remove('active');
    document.querySelector('.sidebar-overlay')?.classList.remove('active');
  });

  // OSAGO ma'lumotlarini localStorage dan o'qib, kerakli joylarga chiqarish
  var carNumber = localStorage.getItem('osago_car_number') || '';
  var texSeriya = localStorage.getItem('osago_tex_seriya') || '';
  var texRaqam = localStorage.getItem('osago_tex_raqam') || '';
  var passportSeriya = localStorage.getItem('osago_passport_seriya') || '';
  var passportRaqam = localStorage.getItem('osago_passport_raqam') || '';

  // Mashina modeli va davlat raqami joylashgan joylarni topamiz
  var infoModel = document.querySelector('.info-value[data-osago="model"]');
  var infoNumber = document.querySelector('.info-value[data-osago="number"]');
  var infoFio = document.querySelector('.info-value[data-osago="fio"]');

  if (infoNumber) infoNumber.textContent = carNumber.toUpperCase();
  // Model va FIO uchun ham localStorage yoki default qiymat ishlatiladi
  // (Agar kerak bo'lsa, model va FIO ham formdan olinadi)
  
  // --- Polis ma'lumotlari validation va button ko'rsatish ---
  function validatePolisForm() {
    const type = document.getElementById('polis-type').value;
    const duration = document.getElementById('polis-duration').value;
    const date = document.getElementById('polis-date').value;
    const company = document.getElementById('polis-company').value;
    const agree = document.getElementById('polis-agree');
    const btn = document.getElementById('polis-continue-btn');
    const block = document.getElementById('polis-continue-block');
    const summaryBlock = document.getElementById('policy-summary-block');
    const summaryCompany = document.getElementById('summary-company');
    // Barcha select va date to'ldirilgan bo'lsa block chiqadi
    if(type && duration && date && company) {
      block.style.display = 'block';
      // Policy summary blokini ko'rsatish
      if (summaryBlock) {
        summaryBlock.style.display = 'block';
        if (summaryCompany) summaryCompany.textContent = company;
      }
      // Checkbox belgilangan bo'lsa button active
      btn.disabled = !agree.checked;
      btn.style.background = agree.checked ? '#02C463' : '#BDBDBD';
      btn.style.cursor = agree.checked ? 'pointer' : 'not-allowed';
    } else {
      block.style.display = 'none';
      // Policy summary blokini yashirish
      if (summaryBlock) summaryBlock.style.display = 'none';
    }
    // LocalStorage-ga saqlash
    localStorage.setItem('polis_type', type);
    localStorage.setItem('polis_duration', duration);
    localStorage.setItem('polis_date', date);
    localStorage.setItem('polis_company', company);
  }
  ['polis-type','polis-duration','polis-date','polis-company'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.addEventListener('change', validatePolisForm);
  });
  const agree = document.getElementById('polis-agree');
  if(agree) agree.addEventListener('change', validatePolisForm);

  // Sahifa yuklanganda ham policy-summary blokini to'g'ri ko'rsatish
  validatePolisForm();

  // --- Polis davom etish modal ---
  function showPolisModal() {
    // Modalni ko'rsatish
    const modal = document.getElementById('polisInfoModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  // Modalni yopish uchun eventlar (faqat bir marta va DOMContentLoaded tashqarisida)
  (function setupPolisModalEvents() {
    const modal = document.getElementById('polisInfoModal');
    if (modal) {
      // Yopish tugmasi
      const closeBtn = modal.querySelector('#polisInfoModalClose');
      if (closeBtn) {
        closeBtn.onclick = function(e) {
          e.stopPropagation();
          modal.style.display = 'none';
        };
      }
      // Modal tashqarisiga bosilganda
      modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.style.display = 'none';
      });
    }
  })();

  const polisContinueBtn = document.getElementById('polis-continue-btn');
  if (polisContinueBtn) {
    polisContinueBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Faqat barcha inputlar va checkbox to'g'ri bo'lsa sahifaga o'tkaziladi
      const type = document.getElementById('polis-type').value;
      const duration = document.getElementById('polis-duration').value;
      const date = document.getElementById('polis-date').value;
      const company = document.getElementById('polis-company').value;
      const agree = document.getElementById('polis-agree');
      if(type && duration && date && company && agree.checked) {
        window.location.href = 'osagorelation.html';
      }
    });
  }

  // Checkbox belgilanganda ham modal chiqishi uchun
  if (agree) {
    agree.addEventListener('change', function() {
      if (agree.checked) {
        const type = document.getElementById('polis-type').value;
        const duration = document.getElementById('polis-duration').value;
        const date = document.getElementById('polis-date').value;
        const company = document.getElementById('polis-company').value;
        if(type && duration && date && company) {
          showPolisModal();
        }
      }
    });
  }
});

if (!window._soonBadgeInjected) {
  window._soonBadgeInjected = true;
  setTimeout(function() {
    Array.from(document.getElementsByClassName('soon1')).forEach(function(el) {
      el.innerHTML += '<div class="menu-soon-badge" style="display:none;" data-i18n="soon">Tez kunda<span class="menu-soon-arrow"></span></div>';
    });
  }, 1000);
}

document.getElementById('osagoInfoBtn').onclick = function() {
      document.getElementById('osagoInfoModal').style.display = 'flex';
    };
    document.getElementById('osagoInfoModalClose').onclick = function() {
      document.getElementById('osagoInfoModal').style.display = 'none';
    };
    // Close modal on overlay click
    document.getElementById('osagoInfoModal').onclick = function(e) {
      if (e.target === this) this.style.display = 'none';
    };
   


    // "Davom etish" tugmasi bosilganda osagophone.html sahifasiga o'tkazish
    document.addEventListener('DOMContentLoaded', function() {
      const continueBtn = document.querySelector('.continue-btn');
      if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
          e.preventDefault();
          window.location.href = 'osagophone.html';
        });
      }
    });

