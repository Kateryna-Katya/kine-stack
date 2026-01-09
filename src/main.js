document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация иконок Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Хедер: эффект при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            header.style.padding = '30px 0';
            header.style.boxShadow = 'none';
        }
    });

    // 3. Мобильное меню
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLinks = document.querySelectorAll('.mobile-menu__link');

    const toggleMenu = () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggleMenu);

    // Закрытие меню при клике на ссылку
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // 4. Логика формы и капчи
    const aiForm = document.getElementById('aiForm');
    const phoneInput = document.getElementById('phoneInput');
    const captchaText = document.getElementById('captchaQuestion');
    const formMessage = document.getElementById('formMessage');
    let captchaAnswer;

    function generateCaptcha() {
        if (!captchaText) return;
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        captchaAnswer = n1 + n2;
        captchaText.innerText = `${n1} + ${n2} = ?`;
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    if (aiForm) {
        generateCaptcha();
        
        aiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userCaptcha = parseInt(document.getElementById('captchaInput').value);

            if (userCaptcha !== captchaAnswer) {
                formMessage.innerText = "Ошибка капчи. Попробуйте еще раз.";
                formMessage.className = "form__message error";
                generateCaptcha();
                return;
            }

            const btn = aiForm.querySelector('.form__submit');
            btn.innerText = "Отправка...";
            btn.disabled = true;

            // Имитация AJAX
            setTimeout(() => {
                btn.innerText = "Запросить доступ";
                btn.disabled = false;
                formMessage.innerText = "Успешно! Мы свяжемся с вами.";
                formMessage.className = "form__message success";
                aiForm.reset();
                generateCaptcha();
            }, 1500);
        });
    }

    // 5. Cookie Popup
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');

    if (cookiePopup && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookiePopup.classList.remove('active');
        });
    }

    // Плавный скролл для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});