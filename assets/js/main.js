// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Portfolio filtering
const filterMenu = document.querySelectorAll('.filter-menu a');
const portfolioItems = document.querySelectorAll('.portfolio-image');

filterMenu.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active state from all filters
        filterMenu.forEach(link => link.classList.remove('active-filter'));
        // Add active state to clicked filter
        this.classList.add('active-filter');
        
        const filterValue = this.getAttribute('href') || this.textContent.trim();
        
        // Show/hide portfolio items based on filter
        portfolioItems.forEach(portfolio => {
            if (filterValue === 'all' || filterValue === '#all') {
                portfolio.style.display = 'block';
                portfolio.classList.add('fade-in');
            }
        });
    });
});

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.querySelector('.contact') ? document.querySelector('.contact').closest('div').querySelector('form') : null;
    const submitBtn = document.querySelector('input[type="submit"]');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const fullName = document.querySelector('input[type="text"]').value.trim();
            const email = document.querySelector('input[type="email"]').value.trim();
            const message = document.querySelector('textarea').value.trim();
            
            // Validation
            if (!fullName) {
                showNotification('Please enter your full name', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (!message) {
                showNotification('Please enter a message', 'error');
                return;
            }
            
            // Show success message
            showNotification('✨ Thanks for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            document.querySelector('input[type="text"]').value = '';
            document.querySelector('input[type="email"]').value = '';
            document.querySelector('textarea').value = '';
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Dark mode toggle
function initDarkMode() {
    const darkModeBtn = document.getElementById('darkModeToggle') || createDarkModeButton();
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const newDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', newDarkMode);
        darkModeBtn.innerHTML = newDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

function createDarkModeButton() {
    const btn = document.createElement('button');
    btn.id = 'darkModeToggle';
    btn.className = 'dark-mode-toggle';
    btn.innerHTML = '<i class="fas fa-moon"></i>';
    btn.title = 'Toggle Dark Mode';
    document.body.appendChild(btn);
    return btn;
}

// Scroll animations - reveal elements on scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.service, .portfolio, .testimonial, .about_us, .video');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Hover effects on service cards
function addServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.col-md-3');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Back to top button
function initBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTopBtn') || createBackToTopButton();
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function createBackToTopButton() {
    const btn = document.createElement('button');
    btn.id = 'backToTopBtn';
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.title = 'Back to top';
    document.body.appendChild(btn);
    return btn;
}

// Portfolio modal/lightbox
function initPortfolioModal() {
    const portfolioItems = document.querySelectorAll('.portfolio-image');
    
    portfolioItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            openPortfolioModal(index);
        });
    });
}

function openPortfolioModal(index) {
    const modal = document.getElementById('portfolioModal') || createPortfolioModal();
    
    const modalImg = modal.querySelector('.modal-image');
    const portfolioItems = document.querySelectorAll('.portfolio-image');
    const backgroundImage = window.getComputedStyle(portfolioItems[index]).backgroundImage;
    
    if (backgroundImage) {
        modalImg.style.backgroundImage = backgroundImage;
    }
    
    modal.classList.add('show');
}

function createPortfolioModal() {
    const modal = document.createElement('div');
    modal.id = 'portfolioModal';
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-image" style="width: 100%; height: 500px; background-size: cover; background-position: center;"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    return modal;
}

// Add parallax effect to header
function initParallaxEffect() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        header.style.backgroundPosition = `center ${scrollPos * 0.5}px`;
    });
}

// Animate buttons on hover
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    handleScrollAnimations();
    addServiceCardEffects();
    initBackToTopButton();
    initPortfolioModal();
    initContactForm();
    initParallaxEffect();
    initButtonEffects();
    
    console.log('✨ Blue Easy - All interactive features initialized!');
});
