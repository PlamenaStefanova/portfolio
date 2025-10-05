// Инициализация при зареждане на страницата
document.addEventListener('DOMContentLoaded', function() {
    // Активиране на текущата страница в навигацията
    highlightCurrentPage();
    
    // Добавяне на анимации при скрол
    initScrollAnimations();
    
    // Инициализация на формата за контакт
    initContactForm();
    
    // Инициализация на hover ефекти
    initHoverEffects();
});

// Подчертаване на текущата страница в навигацията
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Анимации при скрол
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, article, .skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Инициализация на формата за контакт
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация на формата
            if (validateForm(this)) {
                // Симулация на изпращане на формата
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Изпращане...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Благодаря ви за съобщението! Ще се свържа с вас възможно най-скоро.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

// Валидация на формата
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            highlightError(input);
        } else {
            removeErrorHighlight(input);
        }
        
        // Специфична валидация за имейл
        if (input.type === 'email' && input.value.trim()) {
            if (!isValidEmail(input.value)) {
                isValid = false;
                highlightError(input, 'Моля, въведете валиден имейл адрес');
            }
        }
    });
    
    // Проверка за чекбокса
    const agreeCheckbox = form.querySelector('input[type="checkbox"]');
    if (agreeCheckbox && !agreeCheckbox.checked) {
        isValid = false;
        highlightError(agreeCheckbox, 'Трябва да се съгласите с условията');
    }
    
    return isValid;
}

// Проверка за валиден имейл
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Подсветяване на грешки
function highlightError(input, message = 'Това поле е задължително') {
    input.style.borderColor = 'red';
    
    // Премахване на съществуващи съобщения за грешка
    let existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Добавяне на ново съобщение за грешка
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    input.parentNode.appendChild(errorElement);
}

// Премахване на подсветката за грешки
function removeErrorHighlight(input) {
    input.style.borderColor = '';
    
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Инициализация на hover ефекти
function initHoverEffects() {
    // Добавяне на допълнителни hover ефекти
    const hoverElements = document.querySelectorAll('.btn, .project-card, .skill-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.02)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        });
    });
}

// Плавно скролиране до секции
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Функция за добавяне на активен клас при скрол
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Функция за търсене на проекти (допълнителна функционалност)
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}