// FAQ uchun akkordeon logikasi
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    const top = item.querySelector('.faq-item-content-top');
    top.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Hammasini yopish
        faqItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-toggle').src = '/assets/images/plus.svg';
            i.querySelector('.faq-toggle').alt = 'plus';
        });
        // Agar ochiq bo'lmasa, ochish
        if (!isActive) {
            item.classList.add('active');
            toggle.src = '/assets/images/minus.svg';
            toggle.alt = 'minus';
        }
    });
});
