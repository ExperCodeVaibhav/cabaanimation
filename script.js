/* ========================================
   CAABAA LANDING PAGE - JAVASCRIPT
   Interactive functionality for futuristic car modification site
   Features: Mobile menu, carousels, smooth scroll, animations
   ======================================== */

/* ========================================
   MOBILE MENU TOGGLE
   Shows/hides mobile navigation menu
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    
    // Get mobile menu elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Toggle mobile menu on button click
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    /* ========================================
       HEADER SCROLL EFFECT
       Changes header appearance on scroll
       ======================================== */
    const header = document.querySelector('.header-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 15, 30, 0.95)';
        } else {
            header.style.background = 'rgba(15, 15, 30, 0.9)';
        }
    });
    
    /* ========================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       Smooth scrolling behavior for navigation
       ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header-nav').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* ========================================
       ANIMATED CAR ELEMENT
       Animates car icon across the about sections
       ======================================== */
    const animatedCar = document.getElementById('animated-car');
    
    // Add scroll-based animation trigger
    if (animatedCar) {
        window.addEventListener('scroll', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const rect = aboutSection.getBoundingClientRect();
                
                // Only animate when about section is in view
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    animatedCar.style.opacity = '0.5';
                } else {
                    animatedCar.style.opacity = '0.1';
                }
            }
        });
    }
    
    /* ========================================
       SCROLL ANIMATIONS
       Fade in elements as they enter viewport
       ======================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    /* ========================================
       NEWSLETTER FORM SUBMISSION
       Handles newsletter subscription
       ======================================== */
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simple validation
            if (email && email.includes('@')) {
                // Show success message
                alert('Thank you for subscribing! You will receive updates at ' + email);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    /* ========================================
       INITIALIZE ALL CAROUSELS
       Set up carousel functionality on page load
       ======================================== */
    initializeCarousels();
    
    // Auto-play carousels every 5 seconds
    setInterval(function() {
        autoPlayCarousels();
    }, 5000);
    
});

/* ========================================
   CAROUSEL FUNCTIONS
   Navigation and control for all carousels
   ======================================== */

// Store current slide index for each carousel
const carouselStates = {
    'modifications-carousel': 0,
    'accessories-carousel': 0,
    'launches-carousel': 0,
    'insurance-carousel': 0
};

/**
 * Initialize all carousels on page load
 * All carousels show one slide at a time
 */
function initializeCarousels() {
    // Initialize all carousels to show only active slide
    const allCarousels = ['modifications-carousel', 'accessories-carousel', 'launches-carousel', 'insurance-carousel'];
    
    allCarousels.forEach(carouselId => {
        updateCarouselDisplay(carouselId, 0);
    });
}

/**
 * Move carousel to next or previous slide
 * @param {string} carouselId - ID of the carousel wrapper
 * @param {number} direction - Direction to move (1 for next, -1 for previous)
 */
function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    // Get current index
    let currentIndex = carouselStates[carouselId] || 0;
    
    // Calculate new index
    currentIndex += direction;
    
    // Wrap around if needed
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    
    // Update state
    carouselStates[carouselId] = currentIndex;
    
    // Update slides
    updateCarouselDisplay(carouselId, currentIndex);
}

/**
 * Jump to specific slide in carousel
 * @param {string} carouselId - ID of the carousel wrapper
 * @param {number} index - Slide index to jump to
 */
function goToSlide(carouselId, index) {
    carouselStates[carouselId] = index;
    updateCarouselDisplay(carouselId, index);
}

/**
 * Update carousel display to show active slide
 * @param {string} carouselId - ID of the carousel wrapper
 * @param {number} activeIndex - Index of slide to show
 */
function updateCarouselDisplay(carouselId, activeIndex) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll(`#${carouselId.replace('-carousel', '-indicators')} .indicator`);
    
    // Update slides
    slides.forEach((slide, index) => {
        if (index === activeIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

/**
 * Auto-play all carousels
 * Advances each carousel by one slide
 */
function autoPlayCarousels() {
    // Only auto-play if user hasn't interacted recently
    Object.keys(carouselStates).forEach(carouselId => {
        const carousel = document.getElementById(carouselId);
        
        // Check if carousel is in viewport
        if (carousel && isElementInViewport(carousel)) {
            moveCarousel(carouselId, 1);
        }
    });
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} el - Element to check
 * @returns {boolean} True if element is visible
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ========================================
   CTA BUTTON INTERACTIONS
   Handles all call-to-action button clicks
   ======================================== */

// Hero CTA button
document.addEventListener('DOMContentLoaded', function() {
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function() {
            // Scroll to modifications section
            const modificationsSection = document.getElementById('modifications');
            if (modificationsSection) {
                modificationsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Main CTA button (Start Modifying)
    const mainCta = document.querySelector('.cta-btn-large');
    if (mainCta) {
        mainCta.addEventListener('click', function() {
            // Could open a modal or redirect to signup
            alert('Welcome to CAABAA! This would typically open a modification wizard or signup form.');
        });
    }
    
    // Auth buttons
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('Login functionality would be implemented here.');
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            alert('Signup functionality would be implemented here.');
        });
    }
});

/* ========================================
   PARALLAX SCROLL EFFECTS
   Creates depth effect on scroll
   ======================================== */
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Parallax effect on hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

/* ========================================
   LOADING PLACEHOLDER IMAGES
   Generate gradient placeholders for images
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Function to create gradient placeholder
    function createPlaceholder(element, gradientType) {
        const gradients = {
            'mod-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'mod-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'mod-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'acc-1': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'acc-2': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'acc-3': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            'acc-4': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'launch-1': 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
            'launch-2': 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
            'launch-3': 'linear-gradient(135deg, #f77062 0%, #fe5196 100%)',
            'launch-4': 'linear-gradient(135deg, #3b41c5 0%, #a981bb 100%)',
            'about-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'about-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'about-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        };
        
        element.style.background = gradients[gradientType] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        element.style.minHeight = '300px';
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
        element.style.color = 'white';
        element.style.fontSize = '1.2rem';
        element.style.fontWeight = '700';
        element.style.textAlign = 'center';
        element.style.padding = '2rem';
    }
    
    // Apply placeholders to all images
    const imageIds = [
        'about-img-1', 'about-img-2', 'about-img-3',
        'mod-img-1', 'mod-img-2', 'mod-img-3',
        'acc-img-1', 'acc-img-2', 'acc-img-3', 'acc-img-4',
        'launch-img-1', 'launch-img-2', 'launch-img-3', 'launch-img-4'
    ];
    
    imageIds.forEach(id => {
        const img = document.getElementById(id);
        if (img) {
            // Hide broken image icon
            img.style.display = 'none';
            
            // Create placeholder in parent
            const parent = img.parentElement;
            const placeholder = document.createElement('div');
            const type = id.replace('-img-', '-');
            
            createPlaceholder(placeholder, type);
            placeholder.innerHTML = `<div>${id.replace('-img-', ' ').replace('-', ' ').toUpperCase()}<br>Placeholder Image</div>`;
            
            parent.appendChild(placeholder);
        }
    });
});

/* ========================================
   CONSOLE LOG - DEVELOPMENT INFO
   Display information for developers
   ======================================== */
console.log('%c CAABAA Landing Page ', 'background: linear-gradient(135deg, #00f7ff, #b800ff); color: white; font-size: 20px; padding: 10px; font-weight: bold;');
console.log('%c Futuristic Car Modification Platform ', 'color: #00f7ff; font-size: 14px;');
console.log('%c Built with HTML, CSS, JavaScript & Tailwind CSS ', 'color: #b0b0b0; font-size: 12px;');
