// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.property-card, .form-card, .section-title').forEach(el => {
    observer.observe(el);
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
        header.style.boxShadow = '0 5px 25px rgba(0,0,0,0.6)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
    }
});

// Property Images
const propertyImages = [
    'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(45deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)'
];

document.querySelectorAll('.property-card').forEach((card, index) => {
    const image = card.querySelector('.property-image');
    image.style.backgroundImage = propertyImages[index];
});

// Form Handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if form is valid
        const formData = new FormData(this);
        const hasEmptyFields = Array.from(formData.values()).some(value => !value.trim());
        
        if (hasEmptyFields) {
            showNotification('Please fill all fields!', 'error');
            return;
        }

        // Form success
        const formType = this.classList[0];
        let message = '';
        
        switch(formType) {
            case 'buy-form':
                message = '🎉 Buy property search started! We found 25+ matching properties for you.';
                break;
            case 'rent-form':
                message = '🏠 Rent search initiated! Best rental options will be sent to you shortly.';
                break;
            case 'sell-form':
                message = '📤 Property posted successfully! Our experts will contact you within 24 hours.';
                break;
        }
        
        showNotification(message, 'success');
        this.reset();
    });
});

// Notification System
function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
        <button class="close-btn">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);

    // Close button
    notification.querySelector('.close-btn').addEventListener('click', () => {
        notification.remove();
    });
}

// View Details Modal Effect
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.property-card');
        const title = card.querySelector('.property-title').textContent;
        const price = card.querySelector('.property-price').textContent;
        
        showNotification(`📋 Property Details: ${title} - ${price}`, 'info');
    });
});

// Typing Effect for Hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    const originalText = heroTitle.textContent;
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 500);
});

// Mobile Menu (Future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
const cards = document.querySelectorAll(
  '.property-card, .why-card, .testimonial-card'
);

window.addEventListener('scroll', () => {
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;

    if(top < window.innerHe
