  function adjustPartnersLayout() {
    const logosContainer = document.querySelector('#logos-container');
    if (window.innerWidth <= 500) {
      logosContainer.classList.remove('container');
    } else {
      logosContainer.classList.add('container');
    }
  }

  window.addEventListener('DOMContentLoaded', adjustPartnersLayout);
  window.addEventListener('resize', adjustPartnersLayout);
