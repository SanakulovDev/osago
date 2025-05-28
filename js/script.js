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
    btn.addEventListener('click', function() {
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
    item.addEventListener('click', function(e) {
        const badge = item.querySelector('.menu-soon-badge');
        if (currentMenuBadge && currentMenuBadge !== badge) {
            currentMenuBadge.style.display = 'none';
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
});